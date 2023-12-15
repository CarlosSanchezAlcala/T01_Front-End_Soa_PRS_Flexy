import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomePrincipalComponent } from './welcome-principal.component';

describe('WelcomePrincipalComponent', () => {
  let component: WelcomePrincipalComponent;
  let fixture: ComponentFixture<WelcomePrincipalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WelcomePrincipalComponent]
    });
    fixture = TestBed.createComponent(WelcomePrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
