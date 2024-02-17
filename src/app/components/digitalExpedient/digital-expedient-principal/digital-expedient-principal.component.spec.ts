import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DigitalExpedientPrincipalComponent } from './digital-expedient-principal.component';

describe('DigitalExpedientPrincipalComponent', () => {
  let component: DigitalExpedientPrincipalComponent;
  let fixture: ComponentFixture<DigitalExpedientPrincipalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DigitalExpedientPrincipalComponent]
    });
    fixture = TestBed.createComponent(DigitalExpedientPrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
