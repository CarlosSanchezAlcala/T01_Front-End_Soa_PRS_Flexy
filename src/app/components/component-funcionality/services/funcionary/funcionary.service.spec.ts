import { TestBed } from '@angular/core/testing';

import { FuncionaryService } from './funcionary.service';

describe('FuncionaryService', () => {
  let service: FuncionaryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FuncionaryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
