import { TestBed } from '@angular/core/testing';

import { TransferTeenService } from './transfer-teen.service';

describe('TransferTeenService', () => {
  let service: TransferTeenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransferTeenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
