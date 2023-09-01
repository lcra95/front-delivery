import { TestBed } from '@angular/core/testing';

import { TasacambioService } from './tasacambio.service';

describe('TasacambioService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TasacambioService = TestBed.get(TasacambioService);
    expect(service).toBeTruthy();
  });
});
