import { TestBed } from '@angular/core/testing';

import { NobleService } from './noble.service';

describe('NobleService', () => {
  let service: NobleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NobleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
