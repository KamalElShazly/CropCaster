import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CropDetailsChartComponent } from './crop-details-chart.component';
import { CropDetails } from '../../models/crop-details';

describe('CropDetailsChartComponent', () => {
  let component: CropDetailsChartComponent;
  let fixture: ComponentFixture<CropDetailsChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CropDetailsChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CropDetailsChartComponent);
    component = fixture.componentInstance;
    
    // Create sample data for testing
    const sampleData = [
      new CropDetails('source1', 'vegetables', 'tomatoes', '2024-01-01', new Date('2024-01-01'), 2.50, 3.00),
      new CropDetails('source1', 'vegetables', 'tomatoes', '2024-01-02', new Date('2024-01-02'), 2.75, 3.25),
      new CropDetails('source1', 'vegetables', 'tomatoes', '2024-01-03', new Date('2024-01-03'), 3.00, 3.50),
      new CropDetails('source1', 'vegetables', 'lettuce', '2024-01-01', new Date('2024-01-01'), 1.50, 2.00),
      new CropDetails('source1', 'vegetables', 'lettuce', '2024-01-02', new Date('2024-01-02'), 1.75, 2.25),
      new CropDetails('source1', 'vegetables', 'lettuce', '2024-01-03', new Date('2024-01-03'), 2.00, 2.50),
    ];

    component.cropData = sampleData;
    component.cropTypeId = 'tomatoes';
    component.cropCategoryId = 'vegetables';
    component.sourceId = 'source1';
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have data', () => {
    expect(component.hasData).toBe(true);
    expect(component.cropData.length).toBe(6);
  });

  it('should calculate data summary correctly', () => {
    const summary = component.dataSummary;
    expect(summary.count).toBe(6);
    expect(summary.avg).toBeGreaterThan(0);
    expect(summary.min).toBeGreaterThan(0);
    expect(summary.max).toBeGreaterThan(0);
  });

  it('should organize chart data correctly', () => {
    component.ngOnInit();
    expect(component.chartData).toBeDefined();
    expect(component.chartData.labels).toBeDefined();
    expect(component.chartData.datasets).toBeDefined();
    expect(component.chartData.datasets.length).toBe(4); // avg, min, max, range
  });

  it('should handle empty data', () => {
    component.cropData = [];
    component.ngOnInit();
    expect(component.hasData).toBe(false);
    expect(component.dataSummary.count).toBe(0);
  });
});