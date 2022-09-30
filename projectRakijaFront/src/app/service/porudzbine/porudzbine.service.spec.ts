import { TestBed } from '@angular/core/testing';

import { PorudzbineService } from './porudzbine.service';

describe('PorudzbineService', () => {
  let service: PorudzbineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PorudzbineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
