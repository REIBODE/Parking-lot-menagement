import { Component, OnInit } from '@angular/core';

import {  SubscriptionService } from '../subscription.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SubscriberService } from '../subscriber.service';
import { Subscription } from './subscriptions.model';


@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.css']
})
export class SubscriptionsComponent implements OnInit {
 
  subscriptions: Subscription[] = [];
  selectedSubscription: Subscription | null = null;
  searchQuery: string = '';

  subscribers: any[] = [];

  subscriptionForm: FormGroup;

  constructor(private formBuilder: FormBuilder, 
    private subscriptionService: SubscriptionService ,
    private subscriberService: SubscriberService) {

    this.subscriptionForm = this.formBuilder.group({
      id: [null],
      code: ['', Validators.required],
      subscriberId: [null, Validators.required],
      price: [null, Validators.required],
      discountValue: [null, Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      //isDeleted: [true]
      isDeleted: [false]
      
    });
  }

  ngOnInit(): void {
    this.subscriptionService.getSubscriptions().subscribe((subscriptions) => {
      this.subscriptions = subscriptions 
    });
    //Name from subscriber
    this.subscriberService.getSubscribers().subscribe((subscribers) => {
      this.subscribers = subscribers;
    });
  }

  getSubscriptions(): void {
    this.subscriptionService.getSubscriptions().subscribe((subscriptions) => {
      this.subscriptions = subscriptions;
    });
  }

  createSubscription(): void {
    if (this.subscriptionForm.valid) {
      const newSubscription: Subscription = { ...this.subscriptionForm.value };
      if(this.subscriptions.some(subscription =>subscription.code === newSubscription.code)){
        alert('A person with the same code  number already exists!');
        return;
      }
      this.subscriptionService.createSubscription(newSubscription).subscribe((subscription) =>{
        this.subscriptions.push(subscription);
        this.clearForm();
      });
    }
  }

  updateSubscription(): void {
    if (this.subscriptionForm.valid && this.selectedSubscription) {
      const updatedSubscription: Subscription = { ...this.subscriptionForm.value };
      updatedSubscription.id = this.selectedSubscription.id;
      this.subscriptionService.updateSubscription(updatedSubscription).subscribe((subscription) => {
        const index = this.subscriptions.findIndex((s) => s.id === subscription.id);
        if (index !== -1) {
          this.subscriptions[index] = subscription;
        }
        this.filterSubscriptions();
        this.clearForm();
      });
    }
  }

  deleteSubscription(id: number): void {
    this.subscriptionService.deleteSubscription(id).subscribe(() => {
      const index = this.subscriptions.findIndex((s) => s.id === id);
      if (index !== -1) {
        this.subscriptions[index].isDeleted = true;
      }
      this.filterSubscriptions();
      this.clearForm();
    });
  }

  // restoreSubscription(id: number): void {
  //   this.subscriptionService.restoreSubscription(id).subscribe(() => {
  //     const index = this.subscriptions.findIndex((s) => s.id === id);
  //     if (index !== -1) {
  //       this.subscriptions[index].isDeleted = false;
  //     }
  //     this.filterSubscriptions();
  //     this.clearForm();
  //   });
  // }

  selectSubscription(subscription: Subscription): void {
    this.selectedSubscription = { ...subscription };
    this.subscriptionForm.patchValue(this.selectedSubscription);
  }

  clearForm(): void {
    this.selectedSubscription = null;
    this.subscriptionForm.reset();
  }

  filterSubscriptions(): void {
    if(this.searchQuery.trim() === ''){
      this.subscriptionService.getSubscriptions().subscribe((subscriptions) => {
        this.subscriptions = subscriptions;
    });
  } else{
    this.subscriptionService.searchSubscriptions(this.searchQuery).subscribe((subscriptions) => {
      this.subscriptions = subscriptions;
    });
    }
  }

  viewSubscriptionDetails(subscription: Subscription): void {
    const subscriberName = this.getSubscriberName(subscription.subscriberId);
    alert(`Subscription Details:
      Code: ${subscription.code}
      Subscriber Name: ${subscriberName}
      Subscriber Id: ${subscription.subscriberId}
      Price: $${subscription.price  }
      Discount Value: ${subscription.discountValue}
      Start Date: ${subscription.startDate}
      End Date: ${subscription.endDate}
      Is Deleted: ${subscription.isDeleted ? 'Yes' : 'No'}
    `);
  }

  //Name from ssubscriber 
  getSubscriberName(subscriberId: number): string {
    const subscriber = this.subscribers.find((sub) => sub.id === subscriberId);
    return subscriber ? `${subscriber.firstName} ${subscriber.lastName}` : 'Unknown';
  }

}
