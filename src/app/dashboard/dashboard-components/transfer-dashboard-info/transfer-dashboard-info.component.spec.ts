import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferDashboardInfoComponent } from './transfer-dashboard-info.component';

describe('TransferDashboardInfoComponent', () => {
  let component: TransferDashboardInfoComponent;
  let fixture: ComponentFixture<TransferDashboardInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TransferDashboardInfoComponent]
    });
    fixture = TestBed.createComponent(TransferDashboardInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
