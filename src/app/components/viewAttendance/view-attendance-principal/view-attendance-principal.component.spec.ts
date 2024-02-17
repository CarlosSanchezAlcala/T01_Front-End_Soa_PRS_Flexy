import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAttendancePrincipalComponent } from './view-attendance-principal.component';

describe('ViewAttendancePrincipalComponent', () => {
  let component: ViewAttendancePrincipalComponent;
  let fixture: ComponentFixture<ViewAttendancePrincipalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewAttendancePrincipalComponent]
    });
    fixture = TestBed.createComponent(ViewAttendancePrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
