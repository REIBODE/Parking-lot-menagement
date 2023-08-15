import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParkingSpotService {
  private apiUrl = 'http://localhost:3000';
  
  
  constructor(private http: HttpClient) { }

  getParkingSpotDetails(): Observable<any> {
    return this.http.get(`${this.apiUrl}/parking-spots`);
  }

  updateParkingSpotDetails(data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/parking-spots`, data);
  }
}
