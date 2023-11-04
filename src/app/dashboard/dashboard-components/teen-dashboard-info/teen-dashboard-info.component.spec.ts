import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeenDashboardInfoComponent } from './teen-dashboard-info.component';

describe('TeenDashboardInfoComponent', () => {
  let component: TeenDashboardInfoComponent;
  let fixture: ComponentFixture<TeenDashboardInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TeenDashboardInfoComponent]
    });
    fixture = TestBed.createComponent(TeenDashboardInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
