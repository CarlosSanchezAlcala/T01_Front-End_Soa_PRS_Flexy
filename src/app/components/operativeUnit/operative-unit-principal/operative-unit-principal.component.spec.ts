import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperativeUnitPrincipalComponent } from './operative-unit-principal.component';

describe('OperativeUnitPrincipalComponent', () => {
  let component: OperativeUnitPrincipalComponent;
  let fixture: ComponentFixture<OperativeUnitPrincipalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OperativeUnitPrincipalComponent]
    });
    fixture = TestBed.createComponent(OperativeUnitPrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
