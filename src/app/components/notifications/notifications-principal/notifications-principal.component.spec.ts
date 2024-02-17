import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationsPrincipalComponent } from './notifications-principal.component';

describe('NotificationsPrincipalComponent', () => {
  let component: NotificationsPrincipalComponent;
  let fixture: ComponentFixture<NotificationsPrincipalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotificationsPrincipalComponent]
    });
    fixture = TestBed.createComponent(NotificationsPrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
