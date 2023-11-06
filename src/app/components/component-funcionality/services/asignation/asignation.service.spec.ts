import { TestBed } from '@angular/core/testing';

import { AsignationService } from './asignation.service';

describe('AsignationService', () => {
  let service: AsignationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AsignationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
