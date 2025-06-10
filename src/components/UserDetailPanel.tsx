import React from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { User } from "@/types/user";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  mode: "view" | "create";
  user?: User;
  onClose: () => void;
  onSubmit?: SubmitHandler<User>;
}

export const getAvatar = (name: string) =>
  `https://ui-avatars.com/api/?name=${encodeURIComponent(
    name
  )}&background=random`;

export default function UserDetailPanel({
  mode,
  user,
  onClose,
  onSubmit,
}: Props) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<User>({
    defaultValues: user || {
      id: Math.floor(Math.random() * 10000),
      name: "",
      email: "",
      phone: "",
      gender: "male",
      role: "user",
      address: "",
    },
  });

  return (
    <motion.div
      key={mode}
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 100, opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="w-[360px] bg-white rounded-2xl shadow-2xl border p-6 h-fit mr-6"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">
          {mode === "view" ? "👁️ User Detail" : "➕ Create User"}
        </h2>
        <Button variant="ghost" size="sm" onClick={onClose}>
          ✖
        </Button>
      </div>

      {mode === "view" && user && (
        <>
          <div className="flex flex-col items-center gap-2 mb-6">
            <img
              src={getAvatar(user.name)}
              className="w-24 h-24 rounded-full shadow-md ring-2 ring-gray-300"
            />
            <h3 className="text-lg font-semibold">{user.name}</h3>
            <span className="text-sm text-gray-500 capitalize">
              {user.role}
            </span>
          </div>

          <div className="space-y-4 text-sm text-gray-700">
            <div>
              <p className="text-gray-400 text-xs">📧 Email</p>
              <p>{user.email}</p>
            </div>
            <div>
              <p className="text-gray-400 text-xs">📱 Phone</p>
              <p>{user.phone}</p>
            </div>
            <div>
              <p className="text-gray-400 text-xs">⚥ Gender</p>
              <p>{user.gender}</p>
            </div>
            <div>
              <p className="text-gray-400 text-xs">🏠 Address</p>
              <p>{user.address || "N/A"}</p>
            </div>
          </div>
        </>
      )}

      {mode === "create" && onSubmit && (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-sm">
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Name</label>
            <Input {...register("name", { required: "Required" })} />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Email</label>
            <Input {...register("email", { required: "Required" })} />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Phone</label>
            <Input {...register("phone")} />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Gender</label>
            <Select
              value={watch("gender")}
              onValueChange={(val) => setValue("gender", val as User["gender"])}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Role</label>
            <Select
              value={watch("role")}
              onValueChange={(val) => setValue("role", val as User["role"])}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="user">User</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Address</label>
            <Input {...register("address")} />
          </div>
          <Button type="submit" className="w-full mt-2">
            ✅ Create User
          </Button>
        </form>
      )}
    </motion.div>
  );
}
