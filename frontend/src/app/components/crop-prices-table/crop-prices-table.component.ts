import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CropDetails } from '../../models/crop-details';

@Component({
  selector: 'app-crop-prices-table',
  imports: [MatTableModule, MatPaginatorModule, MatSortModule, MatCardModule, MatButtonModule],
  templateUrl: './crop-prices-table.component.html',
  styleUrl: './crop-prices-table.component.css',
})
export class CropPricesTableComponent implements AfterViewInit {
  displayedColumns: string[] = ['source_id', 'crop_type_id', 'min_price', 'max_price', 'avg_price'];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @Input() set data(data: CropDetails[]) {
    this.dataSource.data = data;
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
}
