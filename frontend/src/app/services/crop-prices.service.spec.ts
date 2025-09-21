import { TestBed } from '@angular/core/testing';

import { CropPricesService } from './crop-prices.service';

describe('CropPricesService', () => {
  let service: CropPricesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CropPricesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
