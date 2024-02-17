import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperativeUnitAsignationProgramFormComponent } from './operative-unit-asignation-program-form.component';

describe('OperativeUnitAsignationProgramFormComponent', () => {
  let component: OperativeUnitAsignationProgramFormComponent;
  let fixture: ComponentFixture<OperativeUnitAsignationProgramFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OperativeUnitAsignationProgramFormComponent]
    });
    fixture = TestBed.createComponent(OperativeUnitAsignationProgramFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
