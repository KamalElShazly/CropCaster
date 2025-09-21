import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { CropPricesTableComponent } from '../crop-prices-table/crop-prices-table.component';
import { CropPricesChartsComponent } from '../crop-prices-charts/crop-prices-charts.component';
import { CropPricesService } from '../../services/crop-prices.service';

@Component({
  selector: 'app-crop-prices',
  imports: [CommonModule, MatTabsModule, CropPricesTableComponent, CropPricesChartsComponent],
  templateUrl: './crop-prices.component.html',
  styleUrl: './crop-prices.component.css',
})
export class CropPricesComponent {
  data: any[] = [];
  loading = true;
  error: string | null = null;

  constructor(private pricesService: CropPricesService) {}

  ngOnInit() {
    this.pricesService.getPrices().subscribe({
      next: (data) => {
        this.data = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load crop prices';
        this.loading = false;
      },
    });
  }
}
