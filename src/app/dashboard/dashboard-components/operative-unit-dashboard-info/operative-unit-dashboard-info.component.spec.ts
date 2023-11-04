import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperativeUnitDashboardInfoComponent } from './operative-unit-dashboard-info.component';

describe('OperativeUnitDashboardInfoComponent', () => {
  let component: OperativeUnitDashboardInfoComponent;
  let fixture: ComponentFixture<OperativeUnitDashboardInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OperativeUnitDashboardInfoComponent]
    });
    fixture = TestBed.createComponent(OperativeUnitDashboardInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
