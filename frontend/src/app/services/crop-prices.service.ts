import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CropDetails } from '../models/crop-details';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CropPricesService {
  private apiUrl = `${environment.baseUrl}/api/prices`;

  constructor(private http: HttpClient) {}

  getPrices(): Observable<CropDetails[]> {
    return this.http
      .get<any[]>(this.apiUrl)
      .pipe(
        map((rawData) =>
          rawData.map(
            (e) =>
              new CropDetails(
                e.source_id,
                e.crop_category_id,
                e.crop_type_id,
                new Date(e.publish_date),
                new Date(e.processing_date),
                e.min_price,
                e.max_price
              )
          )
        )
      );
  }
}
