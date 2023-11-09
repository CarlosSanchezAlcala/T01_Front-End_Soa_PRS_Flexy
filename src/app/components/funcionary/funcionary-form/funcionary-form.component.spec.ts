import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuncionaryFormComponent } from './funcionary-form.component';

describe('FuncionaryFormComponent', () => {
  let component: FuncionaryFormComponent;
  let fixture: ComponentFixture<FuncionaryFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FuncionaryFormComponent]
    });
    fixture = TestBed.createComponent(FuncionaryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
