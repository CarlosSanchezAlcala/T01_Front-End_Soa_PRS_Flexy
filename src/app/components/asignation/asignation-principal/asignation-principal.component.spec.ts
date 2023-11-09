import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignationPrincipalComponent } from './asignation-principal.component';

describe('AsignationPrincipalComponent', () => {
  let component: AsignationPrincipalComponent;
  let fixture: ComponentFixture<AsignationPrincipalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AsignationPrincipalComponent]
    });
    fixture = TestBed.createComponent(AsignationPrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
