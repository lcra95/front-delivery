import { TestBed } from '@angular/core/testing';

import { PuntoService } from './punto.service';

describe('PuntoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PuntoService = TestBed.get(PuntoService);
    expect(service).toBeTruthy();
  });
});
