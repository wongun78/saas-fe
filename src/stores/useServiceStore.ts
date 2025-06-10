import { create } from "zustand";
import type { Service } from "@/types/service";
import { mockServices } from "@/mocks/servicesMock";

interface ServiceState {
  services: Service[];
  addService: (service: Service) => void;
  updateService: (service: Service) => void;
  deleteService: (id: string) => void;
}

export const useServiceStore = create<ServiceState>((set) => ({
  services: mockServices,

  addService: (service) =>
    set((state) => ({
      services: [...state.services, service],
    })),

  updateService: (updated) =>
    set((state) => ({
      services: state.services.map((s) => (s.id === updated.id ? updated : s)),
    })),

  deleteService: (id) =>
    set((state) => ({
      services: state.services.filter((s) => s.id !== id),
    })),
}));
