import { TestBed } from '@angular/core/testing';

import { DynamicAuthenticationService } from './dynamic-authentication.service';

describe('DynamicAuthenticationService', () => {
  let service: DynamicAuthenticationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DynamicAuthenticationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
