import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuncionaryPrincipalComponent } from './funcionary-principal.component';

describe('FuncionaryPrincipalComponent', () => {
  let component: FuncionaryPrincipalComponent;
  let fixture: ComponentFixture<FuncionaryPrincipalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FuncionaryPrincipalComponent]
    });
    fixture = TestBed.createComponent(FuncionaryPrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
