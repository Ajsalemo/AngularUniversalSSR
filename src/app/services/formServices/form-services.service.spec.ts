import { TestBed } from '@angular/core/testing';

import { FormServicesService } from './form-services.service';

describe('FormServicesService', () => {
  let service: FormServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
