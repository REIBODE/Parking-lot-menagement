import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ParkingSpotsComponent } from './parking-spots/parking-spots.component';
import { PricingPlansComponent } from './pricing-plans/pricing-plans.component';
import { SubscribersComponent } from './subscribers/subscribers.component';
import { SubscriptionsComponent } from './subscriptions/subscriptions.component';
import { DailyLogsComponent } from './daily-logs/daily-logs.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    ParkingSpotsComponent,
    PricingPlansComponent,
    SubscribersComponent,
    SubscriptionsComponent,
    DailyLogsComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
