import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DailyLog } from './daily-logs/daily-logs.model';



@Injectable({
  providedIn: 'root'
})
export class DailyLogService {
 
  private logsUrl = 'http://localhost:3000/daily-logs'; 

  constructor(private http: HttpClient) {}

  createLog(log: DailyLog): Observable<DailyLog> {
    return this.http.post<DailyLog>(this.logsUrl, log);
  }

  getLogsByDate(date: string): Observable<DailyLog[]> {
    console.log('Calling getLogsByDate with date:', date);
    return this.http.get<DailyLog[]>(this.logsUrl);
  }
  
  searchLogs(query: string): Observable<DailyLog[]> {
    return this.http.get<DailyLog[]>(`${this.logsUrl}?q=${query}`);
  }

  deleteLog(logId: number): Observable<void> {
    return this.http.delete<void>(`${this.logsUrl}/${logId}`);
  }


}
