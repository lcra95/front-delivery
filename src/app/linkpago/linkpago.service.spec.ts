import { TestBed } from '@angular/core/testing';

import { LinkpagoService } from './linkpago.service';

describe('LinkpagoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LinkpagoService = TestBed.get(LinkpagoService);
    expect(service).toBeTruthy();
  });
});
