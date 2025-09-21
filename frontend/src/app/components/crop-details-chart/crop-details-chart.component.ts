import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { CropDetails } from '../../models/crop-details';
import { MetadataService } from '../../services/metadata.service';

@Component({
  selector: 'app-crop-details-chart',
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './crop-details-chart.component.html',
  styleUrl: './crop-details-chart.component.css',
})
export class CropDetailsChartComponent implements OnInit, OnChanges {
  @Input() cropData: CropDetails[] = [];
  @Input() cropTypeId: string = '';
  @Input() cropCategoryId: string = '';
  @Input() sourceId: string = '';

  chartData!: ChartConfiguration<'line'>['data'];
  chartOptions: ChartOptions<'line'> = {};

  constructor(private metadataService: MetadataService) {}

  ngOnInit() {
    this.initializeChartOptions();
    this.updateChartData();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['cropData'] && !changes['cropData'].firstChange) {
      this.updateChartData();
    }
  }

  private initializeChartOptions() {
    this.chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: `${this.cropTypeId} - Price Trends`,
          font: {
            size: 16,
            weight: 'bold',
          },
        },
        legend: {
          display: true,
          position: 'top',
          labels: {
            usePointStyle: true,
            padding: 20,
          },
        },
        tooltip: {
          mode: 'index',
          intersect: false,
          callbacks: {
            title: function (context) {
              return context[0].label;
            },
            label: function (context) {
              const label = context.dataset.label || '';
              const value = context.parsed.y;
              return `${label}: ${value.toFixed(2)}`;
            },
          },
        },
      },
      scales: {
        x: {
          type: 'category',
          title: {
            display: true,
            text: 'Date',
          },
          grid: {
            display: true,
            color: 'rgba(0, 0, 0, 0.1)',
          },
          ticks: {
            maxTicksLimit: 10,
          },
        },
        y: {
          beginAtZero: false,
          title: {
            display: true,
            text: 'Price',
          },
          grid: {
            display: true,
            color: 'rgba(0, 0, 0, 0.1)',
          },
          ticks: {
            callback: function (value) {
              return value;
            },
          },
        },
      },
      interaction: {
        mode: 'nearest',
        axis: 'x',
        intersect: false,
      },
    };
  }

  private updateChartData() {
    if (!this.cropData || this.cropData.length === 0) {
      this.chartData = {
        labels: [],
        datasets: [],
      };
      return;
    }

    // Sort data by date
    const sortedData = [...this.cropData].sort(
      (a, b) =>
        new Date(a.video_published_date).getTime() - new Date(b.video_published_date).getTime()
    );

    const labels = sortedData.map((item) => {
      const date = new Date(item.video_published_date);
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    });
    const avgPrices = sortedData.map((item) => item.avg_price);
    const minPrices = sortedData.map((item) => item.min_price);
    const maxPrices = sortedData.map((item) => item.max_price);

    this.chartData = {
      labels: labels,
      datasets: [
        // Average price line
        {
          label: 'Average Price',
          data: avgPrices,
          borderColor: '#2563eb',
          backgroundColor: 'rgba(37, 99, 235, 0.1)',
          borderWidth: 3,
          fill: false,
          tension: 0.4,
          pointBackgroundColor: '#2563eb',
          pointBorderColor: '#ffffff',
          pointBorderWidth: 2,
          pointRadius: 6,
          pointHoverRadius: 8,
        },
        // Min price line
        {
          label: 'Min Price',
          data: minPrices,
          borderColor: '#dc2626',
          backgroundColor: 'rgba(220, 38, 38, 0.1)',
          borderWidth: 2,
          fill: false,
          tension: 0.4,
          pointBackgroundColor: '#dc2626',
          pointBorderColor: '#ffffff',
          pointBorderWidth: 2,
          pointRadius: 4,
          pointHoverRadius: 6,
          borderDash: [5, 5],
        },
        // Max price line
        {
          label: 'Max Price',
          data: maxPrices,
          borderColor: '#16a34a',
          backgroundColor: 'rgba(22, 163, 74, 0.1)',
          borderWidth: 2,
          fill: false,
          tension: 0.4,
          pointBackgroundColor: '#16a34a',
          pointBorderColor: '#ffffff',
          pointBorderWidth: 2,
          pointRadius: 4,
          pointHoverRadius: 6,
          borderDash: [5, 5],
        },
        // Price range area (between min and max)
        {
          label: 'Price Range',
          data: maxPrices,
          borderColor: 'transparent',
          backgroundColor: 'rgba(59, 130, 246, 0.2)',
          fill: '+1',
          tension: 0.4,
          pointRadius: 0,
          pointHoverRadius: 0,
        },
      ],
    };

    // Update the fill property for the range area to fill between min and max
    if (this.chartData.datasets.length > 3) {
      this.chartData.datasets[3].fill = '+1';
    }
  }

  get hasData(): boolean {
    return this.cropData && this.cropData.length > 0;
  }

  get dataSummary(): { avg: number; min: number; max: number } {
    if (!this.hasData) {
      return { avg: 0, min: 0, max: 0 };
    }

    const prices = this.cropData.map((item) => item.avg_price);
    return {
      avg: Math.round(prices.reduce((sum, price) => sum + price, 0) / prices.length),
      min: Math.min(...prices),
      max: Math.max(...prices),
    };
  }

  get latestDataSummary(): { avg: number; min: number; max: number } {
    if (!this.hasData) {
      return { avg: 0, min: 0, max: 0 };
    }

    const latest = this.cropData[this.cropData.length - 1];
    return {
      avg: latest.avg_price,
      min: latest.min_price,
      max: latest.max_price,
    };
  }
}
