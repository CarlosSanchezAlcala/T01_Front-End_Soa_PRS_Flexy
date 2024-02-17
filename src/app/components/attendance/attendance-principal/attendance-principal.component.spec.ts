import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendancePrincipalComponent } from './attendance-principal.component';

describe('AttendancePrincipalComponent', () => {
  let component: AttendancePrincipalComponent;
  let fixture: ComponentFixture<AttendancePrincipalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AttendancePrincipalComponent]
    });
    fixture = TestBed.createComponent(AttendancePrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
