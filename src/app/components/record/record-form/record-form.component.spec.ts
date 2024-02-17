import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordFormComponent } from './record-form.component';

describe('RecordFormComponent', () => {
  let component: RecordFormComponent;
  let fixture: ComponentFixture<RecordFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecordFormComponent]
    });
    fixture = TestBed.createComponent(RecordFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
