import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignationProgramPrincipalComponent } from './asignation-program-principal.component';

describe('AsignationProgramPrincipalComponent', () => {
  let component: AsignationProgramPrincipalComponent;
  let fixture: ComponentFixture<AsignationProgramPrincipalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AsignationProgramPrincipalComponent]
    });
    fixture = TestBed.createComponent(AsignationProgramPrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
