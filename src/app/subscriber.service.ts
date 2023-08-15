import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Subscriber } from './subscribers/subscribers.model';

// export interface Subscriber {
//   id: number;
//   firstName: string;
//   lastName: string;
//   idCardNumber: string;
//   email: string;
//   phoneNumber: string;
//   birthday: string;
//   plateNumber: string;
//   isDeleted: boolean;
// }

@Injectable({
  providedIn: 'root'
})
export class SubscriberService {

  private subscribersUrl = 'http://localhost:3000/subscribers';

  constructor(private http: HttpClient) { }

  getSubscribers(): Observable<Subscriber[]> {
    return this.http.get<Subscriber[]>(this.subscribersUrl);
  }

  createSubscriber(subscriber: Subscriber): Observable<Subscriber> {
    return this.http.post<Subscriber>(this.subscribersUrl, subscriber);
  }

  updateSubscriber(subscriber: Subscriber): Observable<Subscriber> {
    const url = `${this.subscribersUrl}/${subscriber.id}`;
    return this.http.put<Subscriber>(url, subscriber);
  }

  deleteSubscriber(id: number): Observable<void> {
    const url = `${this.subscribersUrl}/${id}`;
    return this.http.delete<void>(url);
  }

  // restoreSubscriber(id: number): Observable<void> {
  //   const url = `${this.subscribersUrl}/${id}`;
  //   return this.http.patch<void>(url, { isDeleted: false });
  // }

  searchSubscribers(query: string): Observable<Subscriber[]> {
    return this.getSubscribers().pipe(
      map((subscribers) => {
        if (query.trim() === '') {
          return subscribers;
        } else {
          return subscribers.filter(
            (subscriber) =>
              subscriber.firstName.toLowerCase().includes(query.toLowerCase()) ||
              subscriber.lastName.toLowerCase().includes(query.toLowerCase()) ||
              subscriber.idCardNumber.toLowerCase().includes(query.toLowerCase()) ||
              subscriber.email.toLowerCase().includes(query.toLowerCase())
          );
        }
      })
    );
  }

  // Function that displays the name in subscription
  getSubscriberById(id: number): Observable<Subscriber | undefined> {
    return this.http.get<Subscriber[]>(`${this.subscribersUrl}?id=${id}`).pipe(
      map(subscribers => subscribers.find(subscriber => subscriber.id === id))
    );
  }

}



