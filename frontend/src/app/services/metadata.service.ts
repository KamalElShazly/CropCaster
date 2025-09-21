import { Injectable } from '@angular/core';
import { Source } from '../models/source';
import { Category } from '../models/crop-category';
import { CropType } from '../models/crop-type';

@Injectable({
  providedIn: 'root',
})
export class MetadataService {
  private sources: Map<string, Source> = new Map();
  private categories: Map<string, Category> = new Map();
  private cropTypes: Map<string, CropType> = new Map();

  constructor() {
    this.initializeMetadata();
  }

  private initializeMetadata() {
    // Initialize sources
    const sourceData: Source[] = [
      {
        source_id: 'reda_meshref_youtube',
        name_ar: 'قناة رضا مشرف',
        name_en: 'Reda Meshref Channel',
        type: 'youtube',
        url: 'https://www.youtube.com/channel/UCZHHlx_dBZIl-R7ZE2WxFWw',
        order: 1,
      },
      {
        source_id: 'modern_agriculture_youtube',
        name_ar: 'قناة الزراعة الحديثة',
        name_en: 'Modern Agriculture Channel',
        type: 'youtube',
        url: 'https://www.youtube.com/channel/UCUahHBzRfv4N5fvTy2UJ9qQ',
        order: 2,
      },
    ];

    // Initialize categories
    const categoryData: Category[] = [
      {
        category_id: 'rice',
        name_ar: 'رز',
        name_en: 'Rice',
      },
    ];

    // Initialize crop types
    const cropTypeData: CropType[] = [
      {
        type_id: 'small_barely_rice',
        name_ar: 'أرز شعير رفيع',
        name_en: 'Small Barley Rice',
        category_id: 'rice',
        order: 1,
      },
      {
        type_id: 'broad_barely_rice',
        name_ar: 'أرز شعير عريض',
        name_en: 'Broad Barley Rice',
        category_id: 'rice',
        order: 2,
      },
      {
        type_id: 'small_white_rice',
        name_ar: 'أرز أبيض رفيع',
        name_en: 'Small White Rice',
        category_id: 'rice',
        order: 3,
      },
      {
        type_id: 'broad_white_rice',
        name_ar: 'أرز أبيض عريض',
        name_en: 'Broad White Rice',
        category_id: 'rice',
        order: 4,
      },
    ];

    // Populate maps
    sourceData.forEach((source) => this.sources.set(source.source_id, source));
    categoryData.forEach((category) => this.categories.set(category.category_id, category));
    cropTypeData.forEach((type) => this.cropTypes.set(type.type_id, type));
  }

  getSourceName(sourceId: string, language: 'en' | 'ar' = 'en'): string {
    const source = this.sources.get(sourceId);
    if (!source) return sourceId;
    return language === 'ar' ? source.name_ar : source.name_en;
  }

  getCategoryName(categoryId: string, language: 'en' | 'ar' = 'en'): string {
    const category = this.categories.get(categoryId);
    if (!category) return categoryId;
    return language === 'ar' ? category.name_ar : category.name_en;
  }

  getCropTypeName(typeId: string, language: 'en' | 'ar' = 'en'): string {
    const type = this.cropTypes.get(typeId);
    if (!type) return typeId;
    return language === 'ar' ? type.name_ar : type.name_en;
  }

  getSource(sourceId: string): Source | undefined {
    return this.sources.get(sourceId);
  }

  getCategory(categoryId: string): Category | undefined {
    return this.categories.get(categoryId);
  }

  getCropType(typeId: string): CropType | undefined {
    return this.cropTypes.get(typeId);
  }

  getAllSources(): Source[] {
    return Array.from(this.sources.values());
  }

  getAllCategories(): Category[] {
    return Array.from(this.categories.values());
  }

  getAllCropTypes(): CropType[] {
    return Array.from(this.cropTypes.values());
  }

  getCropTypesByCategory(categoryId: string): CropType[] {
    return Array.from(this.cropTypes.values()).filter((type) => type.category_id === categoryId);
  }
}
