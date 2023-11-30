import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivosComponent } from './archivos.component';

describe('ArchivosComponent', () => {
  let component: ArchivosComponent;
  let fixture: ComponentFixture<ArchivosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArchivosComponent]
    });
    fixture = TestBed.createComponent(ArchivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
