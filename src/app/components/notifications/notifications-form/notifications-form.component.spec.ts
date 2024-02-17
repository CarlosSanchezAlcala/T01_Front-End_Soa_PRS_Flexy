import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationsFormComponent } from './notifications-form.component';

describe('NotificationsFormComponent', () => {
  let component: NotificationsFormComponent;
  let fixture: ComponentFixture<NotificationsFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotificationsFormComponent]
    });
    fixture = TestBed.createComponent(NotificationsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
