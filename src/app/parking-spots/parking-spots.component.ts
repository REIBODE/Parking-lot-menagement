import { Component, OnDestroy, OnInit } from '@angular/core';
import { ParkingSpotService } from '../parking-spot.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-parking-spots',
  templateUrl: './parking-spots.component.html',
  styleUrls: ['./parking-spots.component.css']
})
export class ParkingSpotsComponent implements OnInit, OnDestroy{

  totalSpots: number;
  reservedSpots: number;
  regularSpots: number;
  private initialTotalSpots: number;
  private initialReservedSpots: number;
  private subscription: Subscription;

  constructor(private parkingSpotService: ParkingSpotService) {
    this.totalSpots = 0;
    this.reservedSpots = 0;
    this.regularSpots = 0;
    this.initialTotalSpots = 0;
    this.initialReservedSpots = 0;
    this.subscription = new Subscription();
  }

  ngOnInit(): void {
    this.getParkingSpotDetails();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getParkingSpotDetails() {
    //debugger
    this.subscription = this.parkingSpotService.getParkingSpotDetails().subscribe(
      (data: any) => {
        //debugger
        this.totalSpots = data.totalSpots;
        this.reservedSpots = data.reservedSpots;
        this.initialTotalSpots = data.totalSpots;
        this.initialReservedSpots = data.reservedSpots;
        this.updateRegularSpots(); 
      },
      (error) => {
        console.error('Error fetching parking spot details:', error);
      }
    );
  }

  updateRegularSpots() {
    this.regularSpots = this.totalSpots - this.reservedSpots; // Calculate the value of regular spots

    if (this.regularSpots < 0) {
      this.regularSpots = 0;
    }
  }

  updateParkingSpotDetails() {
    if (this.totalSpots !== this.initialTotalSpots || this.reservedSpots !== this.initialReservedSpots) {
      this.updateRegularSpots();

      const data = {
        totalSpots: this.totalSpots,
        reservedSpots: this.reservedSpots
      };

      this.parkingSpotService.updateParkingSpotDetails(data).subscribe(
        (response: any) => {
          console.log('Parking spots updated successfully:', response);
          // Save the new  copy of value after update db.json
          this.initialTotalSpots = this.totalSpots;
          this.initialReservedSpots = this.reservedSpots;
        },
        (error) => {
          console.error('Error updating parking spots:', error);
        }
      );
    }
  }


}
