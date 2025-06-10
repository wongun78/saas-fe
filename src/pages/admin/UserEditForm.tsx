import React, { useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUsersStore } from "@/stores/useUsersStore";
import type { User, Role } from "@/types/user";

const UserEditForm = () => {
  const { id } = useParams();
  const userId = parseInt(id || "0", 10);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<User>();
  const getUser = useUsersStore((state) => state.getUser);
  const editUser = useUsersStore((state) => state.editUser);

  useEffect(() => {
    getUser(userId).then((user) => {
      if (user) {
        setValue("name", user.name);
        setValue("email", user.email);
        setValue("role", user.role);
      }
    });
  }, [userId, getUser, setValue]);

  const onSubmit: SubmitHandler<User> = async (data) => {
    await editUser(userId, data);
    navigate("/users");
  };

  return (
    <div className="max-w-md mx-auto mt-10 space-y-6">
      <h1 className="text-3xl font-bold">Edit User</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label>Name</Label>
          <Input
            type="text"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label>Email</Label>
          <Input
            type="email"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label>Role</Label>
          <Select
            value={watch("role") || ""}
            onValueChange={(value: Role) => setValue("role", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="user">User</SelectItem>
            </SelectContent>
          </Select>
          {errors.role && (
            <p className="text-red-500 text-sm">{errors.role.message}</p>
          )}
        </div>

        <Button type="submit" className="w-full">
          Save Changes
        </Button>
      </form>
    </div>
  );
};

export default UserEditForm;
