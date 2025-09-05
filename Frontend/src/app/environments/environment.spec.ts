import { TestBed } from '@angular/core/testing';

import { environment } from './environment';

describe('Environment', () => {
  let service: any;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = environment;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
