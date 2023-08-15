// pricing-plans.component.ts
import { Component, OnInit } from '@angular/core';

import { PricingPlanService } from '../pricing-plan.service';



@Component({
  selector: 'app-pricing-plans',
  templateUrl: './pricing-plans.component.html',
  styleUrls: ['./pricing-plans.component.css']
})
export class PricingPlansComponent implements OnInit {


  pricingPlans: any[];
  selectedPlanType: string;
  selectedPlan: any;

  plan = {
    minimumHours: 0,
  };

  constructor(private pricingPlanService: PricingPlanService) {
    this.pricingPlans = [];
    this.selectedPlanType = 'Weekday';
  }

  ngOnInit(): void {
    this.getPricingPlans();
  }

  getPricingPlans() {
    this.pricingPlanService.getPricingPlans().subscribe(
      (data: any[]) => {
        this.pricingPlans = data;
        if (this.pricingPlans.length > 0) {
          this.updateSelectedPlan(); 
        }
      },
      (error) => {
        console.error('Error fetching pricing plans:', error);
      }
    );
  }

  updateSelectedPlan() {
    //Find the selected plan based on selectedPlanType
    this.selectedPlan = this.pricingPlans.find((plan) => plan.type === this.selectedPlanType);
  }

  updatePricingPlanDetails() {
    if (this.selectedPlanType && this.selectedPlan) {
      this.pricingPlanService.updatePricingPlan(this.selectedPlan).subscribe(
        (response: any) => {
          console.log('Pricing plan updated successfully:', response);
        },
        (error) => {
          console.error('Error updating pricing plan:', error);
        }
      );
    }
  }

}






