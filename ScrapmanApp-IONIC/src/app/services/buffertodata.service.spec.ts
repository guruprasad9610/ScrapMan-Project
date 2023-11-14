import { TestBed } from '@angular/core/testing';

import { BuffertodataService } from './buffertodata.service';

describe('BuffertodataService', () => {
  let service: BuffertodataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuffertodataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
