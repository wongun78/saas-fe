import React from "react";
import { Label } from "@/components/ui/label";

interface FormItemProps {
  label: string;
  error?: string;
  children: React.ReactNode;
}

export function FormItem({ label, error, children }: FormItemProps) {
  return (
    <div className="space-y-1">
      <Label className="font-medium text-sm">{label}</Label>
      {children}
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
