import { TestBed } from '@angular/core/testing';

import { BrandiesService } from './brandies.service';

describe('BrandiesService', () => {
  let service: BrandiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BrandiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
