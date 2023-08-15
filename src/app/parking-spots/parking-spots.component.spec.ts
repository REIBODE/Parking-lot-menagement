import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkingSpotsComponent } from './parking-spots.component';

describe('ParkingSpotsComponent', () => {
  let component: ParkingSpotsComponent;
  let fixture: ComponentFixture<ParkingSpotsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ParkingSpotsComponent]
    });
    fixture = TestBed.createComponent(ParkingSpotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
