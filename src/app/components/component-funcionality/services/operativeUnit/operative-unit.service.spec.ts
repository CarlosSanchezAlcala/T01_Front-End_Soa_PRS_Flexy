import { TestBed } from '@angular/core/testing';

import { OperativeUnitService } from './operative-unit.service';

describe('OperativeUnitService', () => {
  let service: OperativeUnitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OperativeUnitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
