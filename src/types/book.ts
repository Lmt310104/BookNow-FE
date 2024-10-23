export interface BookDetail {
  title: string;
  author?: string;
  categoryId: string;
  entryPrice: number;
  price: number;
  stockQuantity: number;
  description: string;
  image: File | null;
  preview?: string
}


