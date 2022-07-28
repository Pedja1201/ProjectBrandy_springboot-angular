import { TestBed } from '@angular/core/testing';

import { KupciService } from './kupci.service';

describe('KupciService', () => {
  let service: KupciService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KupciService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
