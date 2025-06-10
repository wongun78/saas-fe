import { create } from "zustand";
import type { Booking } from "@/types/booking";
import { mockBookings } from "@/mocks/bookingsMock";

interface BookingStore {
  bookings: Booking[];
  addBooking: (booking: Booking) => void;
  updateBooking: (booking: Booking) => void;
  deleteBooking: (id: string) => void;
}

export const useBookingStore = create<BookingStore>((set) => ({
  bookings: mockBookings,

  addBooking: (booking) =>
    set((state) => ({
      bookings: [...state.bookings, booking],
    })),

  updateBooking: (updated) =>
    set((state) => ({
      bookings: state.bookings.map((b) => (b.id === updated.id ? updated : b)),
    })),

  deleteBooking: (id) =>
    set((state) => ({
      bookings: state.bookings.filter((b) => b.id !== id),
    })),
}));
