import { Component, OnInit } from '@angular/core';
import { SubscriberService } from '../subscriber.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscriber } from './subscribers.model';



@Component({
  selector: 'app-subscribers',
  templateUrl: './subscribers.component.html',
  styleUrls: ['./subscribers.component.css']
})
export class SubscribersComponent implements OnInit {

  subscribers: Subscriber[] = [];
  selectedSubscriber: Subscriber | null = null;
  searchQuery: string = '';

  subscriberForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private subscriberService: SubscriberService) {
    this.subscriberForm = this.formBuilder.group({
      id: [null],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      idCardNumber: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      birthday: ['', Validators.required],
      plateNumber: ['', Validators.required],
      isDeleted: [false]
      //isDeleted: [true]
    });
  }

  ngOnInit(): void {
    this.subscriberService.getSubscribers().subscribe((subscribers) => {
      this.subscribers = subscribers;
    });
  }

  getSubscribers(): void {
    this.subscriberService.getSubscribers().subscribe((subscribers) => {
      this.subscribers = subscribers;
    });
  }

  createSubscriber(): void {
    if (this.subscriberForm.valid) {
      const newSubscriber: Subscriber = { ...this.subscriberForm.value };
      // Check if a person with the same ID card number already exists
      if (this.subscribers.some(subscriber => subscriber.idCardNumber === newSubscriber.idCardNumber)) {
        alert('A person with the same ID card number already exists!');
        return;
      }
      this.subscriberService.createSubscriber(newSubscriber).subscribe((subscriber) => {
        this.subscribers.push(subscriber);
        this.clearForm();
      });
    }
  }

  updateSubscriber(): void {
    if (this.subscriberForm.valid && this.selectedSubscriber) {
      const updatedSubscriber: Subscriber = { ...this.subscriberForm.value };
      updatedSubscriber.id = this.selectedSubscriber.id;
      this.subscriberService.updateSubscriber(updatedSubscriber).subscribe((subscriber) => {
        const index = this.subscribers.findIndex((s) => s.id === subscriber.id);
        if (index !== -1) {
          this.subscribers[index] = subscriber;
        }
        this.clearForm();
      });
    }
  }

  deleteSubscriber(id: number): void {
    const subscriber = this.subscribers.find((s) => s.id === id);
    if (subscriber && !subscriber.isDeleted) {
      this.subscriberService.deleteSubscriber(id).subscribe(() => {
        subscriber.isDeleted = true;
        this.filterSubscribers();
      });
    } //else if (subscriber && subscriber.isDeleted) {
    //   this.subscriberService.restoreSubscriber(id).subscribe(() => {
    //     subscriber.isDeleted = false;
    //     this.filterSubscribers();
    //   });
    // }
  }

  selectSubscriber(subscriber: Subscriber): void {
    this.selectedSubscriber = { ...subscriber };
    this.subscriberForm.patchValue(this.selectedSubscriber);
  }

  clearForm(): void {
    this.selectedSubscriber = null;
    this.subscriberForm.reset();
  }

  filterSubscribers(): void {
    if (this.searchQuery.trim() === '') {
      // If the search query is empty, show all subscribers
      this.subscriberService.getSubscribers().subscribe((subscribers) => {
        this.subscribers = subscribers;
      });
    } else {
      // If the search query is not empty, filter subscribers based on firstName and lastName
      this.subscriberService.searchSubscribers(this.searchQuery).subscribe((subscribers) => {
        this.subscribers = subscribers;
      });
    }
  }

}
