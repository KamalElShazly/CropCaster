import { Routes } from '@angular/router';
import { CropPricesComponent } from './components/crop-prices/crop-prices.component';

export const routes: Routes = [
  { path: '', redirectTo: 'prices', pathMatch: 'full' },
  { path: 'prices', component: CropPricesComponent },
];
