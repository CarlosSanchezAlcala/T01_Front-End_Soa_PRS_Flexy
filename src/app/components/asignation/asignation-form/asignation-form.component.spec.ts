import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignationFormComponent } from './asignation-form.component';

describe('AsignationFormComponent', () => {
  let component: AsignationFormComponent;
  let fixture: ComponentFixture<AsignationFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AsignationFormComponent]
    });
    fixture = TestBed.createComponent(AsignationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
