import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CropPricesTableComponent } from './crop-prices-table.component';

describe('CropPricesTableComponent', () => {
  let component: CropPricesTableComponent;
  let fixture: ComponentFixture<CropPricesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CropPricesTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CropPricesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
