import { TestBed } from '@angular/core/testing';

import { DashboardDataServiceService } from './dashboard-data-service.service';

describe('DashboardDataServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DashboardDataServiceService = TestBed.get(DashboardDataServiceService);
    expect(service).toBeTruthy();
  });
});
