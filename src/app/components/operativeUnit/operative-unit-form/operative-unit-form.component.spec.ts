import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperativeUnitFormComponent } from './operative-unit-form.component';

describe('OperativeUnitFormComponent', () => {
  let component: OperativeUnitFormComponent;
  let fixture: ComponentFixture<OperativeUnitFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OperativeUnitFormComponent]
    });
    fixture = TestBed.createComponent(OperativeUnitFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
