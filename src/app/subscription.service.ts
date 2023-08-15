import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Subscription } from './subscriptions/subscriptions.model';

// export interface Subscription {
//   id: number;
//   code: string;
//   subscriberId: number;
//   price: number;
//   discountValue: number;
//   startDate: string;
//   endDate: string;
//   isDeleted: boolean;
// }

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  private subscriptionsUrl = 'http://localhost:3000/subscriptions';

  constructor(private http: HttpClient) { }

  getSubscriptions(): Observable<Subscription[]> {
    return this.http.get<Subscription[]>(this.subscriptionsUrl);
  }

  createSubscription(subscription: Subscription): Observable<Subscription> {
    return this.http.post<Subscription>(this.subscriptionsUrl, subscription);
  }

  updateSubscription(subscription: Subscription): Observable<Subscription> {
    const url = `${this.subscriptionsUrl}/${subscription.id}`;
    return this.http.put<Subscription>(url, subscription);
  }

  deleteSubscription(id: number): Observable<void> {
    const url = `${this.subscriptionsUrl}/${id}`;
    return this.http.delete<void>(url);
  }

  // restoreSubscription(id: number): Observable<void> {
  //   const url = `${this.subscriptionsUrl}/${id}`;
  //   return this.http.patch<void>(url, { isDeleted: false });
  // }

  searchSubscriptions(query: string): Observable<Subscription[]> {
    return this.getSubscriptions().pipe(
      map((subscriptions) => {
        if (query.trim() === '') {
          return subscriptions;
        } else {
          return subscriptions.filter(
            (subscription) =>
              subscription.code.toLowerCase().includes(query.toLowerCase()) ||
              subscription.subscriberId.toString() === query
          );
        }
      })
    );
  }

}
