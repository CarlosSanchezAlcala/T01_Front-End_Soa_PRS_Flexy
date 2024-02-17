import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CooperatingEntitiesPrincipalComponent } from './cooperating-entities-principal.component';

describe('CooperatingEntitiesPrincipalComponent', () => {
  let component: CooperatingEntitiesPrincipalComponent;
  let fixture: ComponentFixture<CooperatingEntitiesPrincipalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CooperatingEntitiesPrincipalComponent]
    });
    fixture = TestBed.createComponent(CooperatingEntitiesPrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
