import { TestBed } from '@angular/core/testing';

import { DataLoadersService } from './data-loaders.service';

describe('DataLoadersService', () => {
  let service: DataLoadersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataLoadersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
