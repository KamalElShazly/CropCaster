export class CropDetails {
  constructor(
    public source_id: string,
    public crop_category_id: string,
    public crop_type_id: string,
    public video_published_date: Date,
    public video_processed_date: Date,
    public min_price: number,
    public max_price: number
  ) {}

  get avg_price(): number {
    return Math.round((this.min_price + this.max_price) / 2);
  }
}
