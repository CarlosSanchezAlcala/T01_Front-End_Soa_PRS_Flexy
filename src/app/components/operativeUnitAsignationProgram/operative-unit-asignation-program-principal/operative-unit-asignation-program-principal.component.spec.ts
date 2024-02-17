import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperativeUnitAsignationProgramPrincipalComponent } from './operative-unit-asignation-program-principal.component';

describe('OperativeUnitAsignationProgramPrincipalComponent', () => {
  let component: OperativeUnitAsignationProgramPrincipalComponent;
  let fixture: ComponentFixture<OperativeUnitAsignationProgramPrincipalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OperativeUnitAsignationProgramPrincipalComponent]
    });
    fixture = TestBed.createComponent(OperativeUnitAsignationProgramPrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
