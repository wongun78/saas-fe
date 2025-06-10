import React from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormItem } from "@/components/ui/FormItem";
import { useUsersStore } from "@/stores/useUsersStore";
import type { User, Role } from "@/types/user";

const UserForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<User>({
    defaultValues: {
      id: Math.floor(Math.random() * 10000),
      name: "",
      email: "",
      role: "user",
    },
  });

  const navigate = useNavigate();
  const addUser = useUsersStore((state) => state.addUser);

  const onSubmit: SubmitHandler<User> = async (data) => {
    await addUser(data);
    navigate("/users");
  };

  return (
    <div className="px-8 py-10 max-w-xl">
      <h1 className="text-2xl font-bold mb-8">Create New User</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <FormItem label="Name" error={errors.name?.message}>
          <Input {...register("name", { required: "Name is required" })} />
        </FormItem>

        <FormItem label="Email" error={errors.email?.message}>
          <Input {...register("email", { required: "Email is required" })} />
        </FormItem>

        <FormItem label="Role" error={errors.role?.message}>
          <Select
            value={watch("role") || ""}
            onValueChange={(val) => setValue("role", val as Role)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="user">User</SelectItem>
            </SelectContent>
          </Select>
        </FormItem>

        <Button type="submit" className="w-40">
          Create User
        </Button>
      </form>
    </div>
  );
};

export default UserForm;
