import { TestBed } from '@angular/core/testing';

import { BrandyServiceService } from './brandy-service.service';

describe('BrandyServiceService', () => {
  let service: BrandyServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BrandyServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
