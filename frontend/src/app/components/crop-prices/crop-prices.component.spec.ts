import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CropPricesComponent } from './crop-prices.component';

describe('CropPricesComponent', () => {
  let component: CropPricesComponent;
  let fixture: ComponentFixture<CropPricesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CropPricesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CropPricesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
