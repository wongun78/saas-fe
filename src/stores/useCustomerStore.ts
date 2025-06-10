import { create } from "zustand";
import type { Customer } from "@/types/customer";
import { mockCustomers } from "@/mocks/customersMock";

interface CustomerState {
  customers: Customer[];
  addCustomer: (customer: Customer) => void;
  removeCustomer: (id: string) => void;
}

export const useCustomerStore = create<CustomerState>((set) => ({
  customers: mockCustomers,

  addCustomer: (customer) =>
    set((state) => ({
      customers: [...state.customers, customer],
    })),

  removeCustomer: (id) =>
    set((state) => ({
      customers: state.customers.filter((c) => c.id !== id),
    })),
}));
