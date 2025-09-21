import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CropPricesChartsComponent } from './crop-prices-charts.component';

describe('CropPricesChartsComponent', () => {
  let component: CropPricesChartsComponent;
  let fixture: ComponentFixture<CropPricesChartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CropPricesChartsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CropPricesChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
