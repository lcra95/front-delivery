import { TestBed } from '@angular/core/testing';

import { RevisarService } from './revisar.service';

describe('RevisarService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RevisarService = TestBed.get(RevisarService);
    expect(service).toBeTruthy();
  });
});
