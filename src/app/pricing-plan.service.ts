import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PricingPlanService {

  private apiUrl = 'http://localhost:3000'

  constructor(private http : HttpClient) { }

  getPricingPlans():Observable<any[]>{
    return this.http.get<any[]>(`${this.apiUrl}/pricing-plans`)
  }

  updatePricingPlan(data : any ): Observable<any>{
    return this.http.put(`${this.apiUrl}/pricing-plans/${data.id}`, data);
  }
}
