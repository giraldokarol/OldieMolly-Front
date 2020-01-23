import { TestBed } from '@angular/core/testing';

import { ServiceGetCategoryService } from './service-get-category.service';

describe('ServiceGetCategoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServiceGetCategoryService = TestBed.get(ServiceGetCategoryService);
    expect(service).toBeTruthy();
  });
});
