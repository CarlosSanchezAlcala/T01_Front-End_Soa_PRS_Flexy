import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialPrincipalComponent } from './historial-principal.component';

describe('HistorialPrincipalComponent', () => {
  let component: HistorialPrincipalComponent;
  let fixture: ComponentFixture<HistorialPrincipalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HistorialPrincipalComponent]
    });
    fixture = TestBed.createComponent(HistorialPrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
