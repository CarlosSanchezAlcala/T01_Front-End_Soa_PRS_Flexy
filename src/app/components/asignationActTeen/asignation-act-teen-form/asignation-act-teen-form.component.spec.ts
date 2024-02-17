import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignationActTeenFormComponent } from './asignation-act-teen-form.component';

describe('AsignationActTeenFormComponent', () => {
  let component: AsignationActTeenFormComponent;
  let fixture: ComponentFixture<AsignationActTeenFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AsignationActTeenFormComponent]
    });
    fixture = TestBed.createComponent(AsignationActTeenFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
