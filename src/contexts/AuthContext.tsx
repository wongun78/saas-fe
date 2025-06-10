import React, { createContext, useContext, type ReactNode } from "react";

type Role = "admin" | "user";

interface AuthContextType {
  role: Role;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

// Provider component
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const role: Role = "admin";

  return (
    <AuthContext.Provider value={{ role }}>{children}</AuthContext.Provider>
  );
};
