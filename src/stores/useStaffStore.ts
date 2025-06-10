import { create } from "zustand";
import type { Staff } from "@/types/staff";
import { mockStaffs } from "@/mocks/staffsMock";

interface StaffState {
  staffs: Staff[];
  addStaff: (staff: Staff) => void;
  updateStaff: (staff: Staff) => void;
  deleteStaff: (id: string) => void;
}

export const useStaffStore = create<StaffState>((set) => ({
  staffs: mockStaffs,

  addStaff: (staff) =>
    set((state) => ({
      staffs: [...state.staffs, staff],
    })),

  updateStaff: (updated) =>
    set((state) => ({
      staffs: state.staffs.map((s) => (s.id === updated.id ? updated : s)),
    })),

  deleteStaff: (id) =>
    set((state) => ({
      staffs: state.staffs.filter((s) => s.id !== id),
    })),
}));
