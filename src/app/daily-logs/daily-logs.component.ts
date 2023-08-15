import { Component, OnInit } from '@angular/core';
import { DailyLogService } from '../daily-log.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DailyLog } from './daily-logs.model';


@Component({
  selector: 'app-daily-logs',
  templateUrl: './daily-logs.component.html',
  styleUrls: ['./daily-logs.component.css']
})
export class DailyLogsComponent implements OnInit {

  logForm: FormGroup = new FormGroup({});

  selectedDate: string = '';
  logsByDate: DailyLog[] = [];
  searchQuery: string = '';
  searchResults: DailyLog[] = [];
  selectedLog: DailyLog | undefined = undefined;

  constructor(private formBuilder: FormBuilder, private dailyLogService: DailyLogService) { }

  ngOnInit(): void {
    this.logForm = this.formBuilder.group({
      code: ['', Validators.required],
      subscriptionId: ['', Validators.required],
      checkInTime: ['', Validators.required],
      checkOutTime: ['', Validators.required],
      price: ['', Validators.required]
    });
  }

  createLog(): void {
    if (this.logForm.valid) {
      const newLog: DailyLog = { ...this.logForm.value };
      this.dailyLogService.createLog(newLog).subscribe(
        (log) => {
          this.logForm.reset();
          alert('Log created successfully!');
        },
        (error) => {
          alert('Error creating log: ' + error.message);
        }
      );
    }
  }

  viewLogsByDate(): void {
    if (this.selectedDate) {
      this.dailyLogService.getLogsByDate(this.selectedDate).subscribe(
        (logs) => {
          this.logsByDate = logs;
        },
        (error) => {
          alert('Error fetching logs: ' + error.message);
        }
      );
    }
  }

  searchLogs(): void {
    if (this.searchQuery) {
      this.dailyLogService.searchLogs(this.searchQuery).subscribe(
        (logs) => {
          this.searchResults = logs;
        },
        (error) => {
          alert('Error searching logs: ' + error.message);
        }
      );
    } else {
      this.searchResults = [];
    }
  }  
  
 

  viewLogDetails(log: DailyLog): void {
    this.selectedLog = log;
  }

  closeLogDetails(): void {
    this.selectedLog = undefined;
  }

  closeLogsByDate(): void {
    this.selectedDate = '';
    this.logsByDate = [];
  }

  deleteLog(logId: number): void {
    if (confirm('Are you sure you want to delete this log?')) {
      this.dailyLogService.deleteLog(logId).subscribe(
        () => {
          alert('Log deleted successfully!');
          this.viewLogsByDate();
          this.searchLogs();
        },
        (error) => {
          alert('Error deleting log: ' + error.message);
        }
      );
    }
  }

  

}
