import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeenPrincipalComponent } from './teen-principal.component';

describe('TeenPrincipalComponent', () => {
  let component: TeenPrincipalComponent;
  let fixture: ComponentFixture<TeenPrincipalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TeenPrincipalComponent]
    });
    fixture = TestBed.createComponent(TeenPrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
