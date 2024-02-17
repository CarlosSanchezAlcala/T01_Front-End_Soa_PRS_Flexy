import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CooperatingEntitiesFormComponent } from './cooperating-entities-form.component';

describe('CooperatingEntitiesFormComponent', () => {
  let component: CooperatingEntitiesFormComponent;
  let fixture: ComponentFixture<CooperatingEntitiesFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CooperatingEntitiesFormComponent]
    });
    fixture = TestBed.createComponent(CooperatingEntitiesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
