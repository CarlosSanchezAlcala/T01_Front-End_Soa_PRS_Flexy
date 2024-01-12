import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitiesPrincipalComponent } from './activities-principal.component';

describe('ActivitiesPrincipalComponent', () => {
  let component: ActivitiesPrincipalComponent;
  let fixture: ComponentFixture<ActivitiesPrincipalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActivitiesPrincipalComponent]
    });
    fixture = TestBed.createComponent(ActivitiesPrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
