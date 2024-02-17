import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignationProgramFormComponent } from './asignation-program-form.component';

describe('AsignationProgramFormComponent', () => {
  let component: AsignationProgramFormComponent;
  let fixture: ComponentFixture<AsignationProgramFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AsignationProgramFormComponent]
    });
    fixture = TestBed.createComponent(AsignationProgramFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
