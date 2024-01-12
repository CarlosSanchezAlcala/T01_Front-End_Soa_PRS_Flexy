import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitiesFormComponent } from './activities-form.component';

describe('ActivitiesFormComponent', () => {
  let component: ActivitiesFormComponent;
  let fixture: ComponentFixture<ActivitiesFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActivitiesFormComponent]
    });
    fixture = TestBed.createComponent(ActivitiesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
