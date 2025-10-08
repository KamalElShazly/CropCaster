import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { CommonModule } from '@angular/common';
import { CropDetails } from '../../models/crop-details';
import { CropDetailsChartComponent } from '../crop-details-chart/crop-details-chart.component';
import { MetadataService } from '../../services/metadata.service';

interface CategoryData {
  categoryId: string;
  sources: SourceData[];
}

interface SourceData {
  sourceId: string;
  types: TypeData[];
}

interface TypeData {
  typeId: string;
  data: CropDetails[];
}

@Component({
  selector: 'app-crop-prices-charts',
  imports: [CommonModule, MatCardModule, MatExpansionModule, CropDetailsChartComponent],
  templateUrl: './crop-prices-charts.component.html',
  styleUrl: './crop-prices-charts.component.css',
})
export class CropPricesChartsComponent implements OnChanges {
  @Input() data: CropDetails[] = [];

  organizedData: CategoryData[] = [];
  organizedSummaryData?: CategoryData;

  constructor(private metadataService: MetadataService) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data'] && this.data.length > 0) {
      this.organizeData();
    }
  }

  private organizeData() {
    // Group data by crop_category_id, then by source_id, then by crop_type_id
    const categoryMap = new Map<string, Map<string, Map<string, CropDetails[]>>>();

    this.data.forEach((item) => {
      if (!categoryMap.has(item.crop_category_id)) {
        categoryMap.set(item.crop_category_id, new Map());
      }

      const categorySources = categoryMap.get(item.crop_category_id)!;
      if (!categorySources.has(item.source_id)) {
        categorySources.set(item.source_id, new Map());
      }

      const sourceTypes = categorySources.get(item.source_id)!;
      if (!sourceTypes.has(item.crop_type_id)) {
        sourceTypes.set(item.crop_type_id, []);
      }

      sourceTypes.get(item.crop_type_id)!.push(item);
    });

    // Convert to the organized structure
    this.organizedData = Array.from(categoryMap.entries()).map(([categoryId, sources]) => {
      const sourcesArray = Array.from(sources.entries())
        .sort(([a], [b]) => this.sortSources(a, b))
        .map(([sourceId, types]) => ({
          sourceId,
          types: Array.from(types.entries())
            .sort(([a], [b]) => this.sortCropTypes(a, b))
            .map(([typeId, data]) => ({
              typeId,
              data: data.sort((a, b) => a.publish_date.getTime() - b.publish_date.getTime()),
            })),
        }));

      // Add summary source at the beginning or end
      const summarySource = this.createSummarySource(sources);
      sourcesArray.unshift(summarySource); // Add at the beginning

      return {
        categoryId,
        sources: sourcesArray,
      };
    });
  }

  private createSummarySource(sources: Map<string, Map<string, CropDetails[]>>): SourceData {
    const summaryTypesMap = new Map<string, Map<string, CropDetails[]>>();

    // Group all data by type and date
    sources.forEach((types) => {
      types.forEach((data, typeId) => {
        if (!summaryTypesMap.has(typeId)) {
          summaryTypesMap.set(typeId, new Map());
        }

        const typeDataByDate = summaryTypesMap.get(typeId)!;

        data.forEach((item) => {
          const dateKey = item.publish_date.toISOString().split('T')[0]; // Use date as key

          if (!typeDataByDate.has(dateKey)) {
            typeDataByDate.set(dateKey, []);
          }

          typeDataByDate.get(dateKey)!.push(item);
        });
      });
    });

    // Calculate averages for each type and date
    return {
      sourceId: 'summary',
      types: Array.from(summaryTypesMap.entries())
        .sort(([a], [b]) => this.sortCropTypes(a, b))
        .map(([typeId, dataByDate]) => ({
          typeId,
          data: Array.from(dataByDate.entries())
            .map(([dateKey, items]) => {
              const minPrice = Math.min(...items.map(item => item.min_price));
              const maxPrice = Math.max(...items.map(item => item.max_price));

              // Use the first item's dates and IDs as template
              const firstItem = items[0];

              return new CropDetails(
                'summary', // source_id
                firstItem.crop_category_id,
                typeId,
                firstItem.publish_date,
                firstItem.processing_date,
                minPrice,
                maxPrice
              );
            })
            .sort((a, b) => a.publish_date.getTime() - b.publish_date.getTime()),
        })),
    };
  }

  get hasData(): boolean {
    return this.organizedData.length > 0;
  }

  get totalCharts(): number {
    return this.organizedData.reduce(
      (total, category) =>
        total +
        category.sources.reduce((sourceTotal, source) => sourceTotal + source.types.length, 0),
      0
    );
  }

  private sortSources(sourceA: string, sourceB: string): number {
    const orderA = this.metadataService.getSource(sourceA)?.order;
    const orderB = this.metadataService.getSource(sourceB)?.order;

    // If both types have defined order, sort by that order
    if (orderA !== undefined && orderB !== undefined) {
      return orderA - orderB;
    }

    // If only one has defined order, prioritize it
    if (orderA !== undefined) return -1;
    if (orderB !== undefined) return 1;

    // If neither has defined order, sort alphabetically
    return sourceA.localeCompare(sourceB);
  }

  private sortCropTypes(typeA: string, typeB: string): number {
    const orderA = this.metadataService.getCropType(typeA)?.order;
    const orderB = this.metadataService.getCropType(typeB)?.order;

    // If both types have defined order, sort by that order
    if (orderA !== undefined && orderB !== undefined) {
      return orderA - orderB;
    }

    // If only one has defined order, prioritize it
    if (orderA !== undefined) return -1;
    if (orderB !== undefined) return 1;

    // If neither has defined order, sort alphabetically
    return typeA.localeCompare(typeB);
  }

  // Helper methods to get display names
  getCategoryDisplayName(categoryId: string): string {
    return this.metadataService.getCategoryName(categoryId, 'en');
  }

  getSourceDisplayName(sourceId: string): string {
    return this.metadataService.getSourceName(sourceId, 'en');
  }

  getCropTypeDisplayName(typeId: string): string {
    return this.metadataService.getCropTypeName(typeId, 'en');
  }
}
