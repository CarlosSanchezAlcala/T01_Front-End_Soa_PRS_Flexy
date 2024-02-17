import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordPrincipalComponent } from './record-principal.component';

describe('RecordPrincipalComponent', () => {
  let component: RecordPrincipalComponent;
  let fixture: ComponentFixture<RecordPrincipalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecordPrincipalComponent]
    });
    fixture = TestBed.createComponent(RecordPrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
