import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignationActTeenPrincipalComponent } from './asignation-act-teen-principal.component';

describe('AsignationActTeenPrincipalComponent', () => {
  let component: AsignationActTeenPrincipalComponent;
  let fixture: ComponentFixture<AsignationActTeenPrincipalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AsignationActTeenPrincipalComponent]
    });
    fixture = TestBed.createComponent(AsignationActTeenPrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
