export type BookingStatus = "pending" | "confirmed" | "cancelled" | "done";

export interface Booking {
  id: string;
  customer: {
    id: string;
    fullname: string;
    phone: string;
  };
  services: string[]; // list of service ids
  staff: string; // staff id
  date: string; // yyyy-mm-dd
  startTime: string; // HH:mm
  status: BookingStatus;
  notes?: string;
  history?: {
    timestamp: string;
    action: string;
  }[];
}
