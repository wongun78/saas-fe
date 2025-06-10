export type Category =
  | "Sơn móng"
  | "Đắp gel"
  | "Spa tay"
  | "Spa chân"
  | "Vẽ nail";

export interface Service {
  id: string;
  name: string;
  category: Category;
  duration: number; // phút
  price: number; // VND
  description?: string;
  isActive: boolean;
}
