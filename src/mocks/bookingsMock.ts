import type { Booking } from "@/types/booking";
import { nanoid } from "nanoid";

export const mockBookings: Booking[] = [
  {
    id: nanoid(),
    customer: {
      id: "c1",
      fullname: "Nguyễn Thị A",
      phone: "0987654321",
    },
    services: ["1", "2"],
    staff: "s1",
    date: "2025-06-12",
    startTime: "10:00",
    status: "confirmed",
    notes: "Khách quen",
    history: [{ timestamp: "2025-06-10T09:00:00", action: "Booking created" }],
  },
  {
    id: nanoid(),
    customer: {
      id: "c2",
      fullname: "Trần Văn B",
      phone: "0912345678",
    },
    services: ["3"],
    staff: "s2",
    date: "2025-06-12",
    startTime: "14:00",
    status: "pending",
  },
  {
    id: nanoid(),
    customer: {
      id: "c3",
      fullname: "Lê Thị C",
      phone: "0909999999",
    },
    services: ["4", "5"],
    staff: "s3",
    date: "2025-06-13",
    startTime: "09:00",
    status: "done",
    notes: "Đã thanh toán",
  },
];
