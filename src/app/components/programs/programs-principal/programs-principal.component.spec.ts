import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramsPrincipalComponent } from './programs-principal.component';

describe('ProgramsPrincipalComponent', () => {
  let component: ProgramsPrincipalComponent;
  let fixture: ComponentFixture<ProgramsPrincipalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProgramsPrincipalComponent]
    });
    fixture = TestBed.createComponent(ProgramsPrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
