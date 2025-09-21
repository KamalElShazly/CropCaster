import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { CropPricesTabsComponent } from './crop-prices-tabs.component';

describe('CropPricesTabsComponent', () => {
  let component: CropPricesTabsComponent;
  let fixture: ComponentFixture<CropPricesTabsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CropPricesTabsComponent],
      imports: [
        MatButtonModule,
        MatIconModule,
        MatListModule,
        MatSidenavModule,
        MatToolbarModule,
      ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CropPricesTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
