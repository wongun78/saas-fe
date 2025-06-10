import type { Service } from "@/types/service";
import { nanoid } from "nanoid";

export const mockServices: Service[] = [
  {
    id: nanoid(),
    name: "Sơn gel cơ bản",
    category: "Sơn móng",
    duration: 30,
    price: 150000,
    isActive: true,
  },
  {
    id: nanoid(),
    name: "Đắp gel ombre",
    category: "Đắp gel",
    duration: 60,
    price: 400000,
    isActive: true,
  },
  {
    id: nanoid(),
    name: "Spa tay dưỡng ẩm",
    category: "Spa tay",
    duration: 25,
    price: 200000,
    isActive: true,
  },
  {
    id: nanoid(),
    name: "Chăm sóc móng chân",
    category: "Spa chân",
    duration: 35,
    price: 220000,
    isActive: true,
  },
  {
    id: nanoid(),
    name: "Vẽ hoa nghệ thuật",
    category: "Vẽ nail",
    duration: 20,
    price: 300000,
    isActive: true,
  },
];
