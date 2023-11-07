import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeenFormComponent } from './teen-form.component';

describe('TeenFormComponent', () => {
  let component: TeenFormComponent;
  let fixture: ComponentFixture<TeenFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TeenFormComponent]
    });
    fixture = TestBed.createComponent(TeenFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
