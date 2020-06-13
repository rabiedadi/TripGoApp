import { TestBed } from '@angular/core/testing';

import { HotelLoaderService } from './hotel-loader.service';

describe('HotelLoaderService', () => {
  let service: HotelLoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HotelLoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
