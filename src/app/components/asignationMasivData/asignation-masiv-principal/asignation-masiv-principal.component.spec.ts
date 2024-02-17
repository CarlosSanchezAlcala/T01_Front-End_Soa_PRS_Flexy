import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignationMasivPrincipalComponent } from './asignation-masiv-principal.component';

describe('AsignationMasivPrincipalComponent', () => {
  let component: AsignationMasivPrincipalComponent;
  let fixture: ComponentFixture<AsignationMasivPrincipalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AsignationMasivPrincipalComponent]
    });
    fixture = TestBed.createComponent(AsignationMasivPrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
