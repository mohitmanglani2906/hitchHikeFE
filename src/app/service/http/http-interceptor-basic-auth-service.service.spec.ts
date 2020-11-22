import { TestBed } from '@angular/core/testing';

import { HttpInterceptorBasicAuthServiceService } from './http-interceptor-basic-auth-service.service';

describe('HttpInterceptorBasicAuthServiceService', () => {
  let service: HttpInterceptorBasicAuthServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpInterceptorBasicAuthServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
