import { TestBed } from '@angular/core/testing';

import { RakijeService } from './rakije.service';

describe('RakijeService', () => {
  let service: RakijeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RakijeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
