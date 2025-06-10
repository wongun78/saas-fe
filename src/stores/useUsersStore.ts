// src/stores/usersStore.ts
import { create } from "zustand";
import type { User } from "@/types/user";
import { mockUsers } from "@/mocks/usersMock";

interface UserState {
  users: User[];
  addUser: (user: User) => void;
  editUser: (id: number, data: Partial<User>) => void;
  deleteUser: (id: number) => void;
  getUser: (id: number) => Promise<User | undefined>;
}

export const useUsersStore = create<UserState>((set, get) => ({
  users: mockUsers,

  addUser: (user) =>
    set((state) => ({
      users: [...state.users, user],
    })),

  editUser: (id, data) =>
    set((state) => ({
      users: state.users.map((u) => (u.id === id ? { ...u, ...data } : u)),
    })),

  deleteUser: (id) =>
    set((state) => ({
      users: state.users.filter((u) => u.id !== id),
    })),

  getUser: async (id) => {
    const user = get().users.find((u) => u.id === id);
    return Promise.resolve(user);
  },
}));
