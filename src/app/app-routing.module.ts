import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ParkingSpotsComponent } from './parking-spots/parking-spots.component';
import { PricingPlansComponent } from './pricing-plans/pricing-plans.component';
import { SubscribersComponent } from './subscribers/subscribers.component';
import { SubscriptionsComponent } from './subscriptions/subscriptions.component';
import { DailyLogsComponent } from './daily-logs/daily-logs.component';
import { HomeComponent } from './home/home.component';



const routes: Routes = [
  {
    //path: '' , redirectTo:'/parking-spots' , pathMatch:'full'
    path: '' , redirectTo:'/home' , pathMatch:'full'
  },
  { 
    path: 'home', component: HomeComponent 
  },
  {
    path : 'parking-spots' , component:ParkingSpotsComponent
  },
  {
    path: 'pricing-plans', component: PricingPlansComponent
  },
  {
    path: 'subscribers' , component:SubscribersComponent
  },
  {
    path: 'subscriptions/:id' , component:SubscriptionsComponent
  },
  {
    path : 'daily-logs' , component: DailyLogsComponent
  },
  {
    // path :'**' ,redirectTo : '/parking-spots'
    path :'**' ,redirectTo : 'home'
  }
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
