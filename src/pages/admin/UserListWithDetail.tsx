import React, { useState } from "react";
import { useUsersStore } from "@/stores/useUsersStore";
import { SaaSTable } from "@/components/ui/SaasTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { User, Role } from "@/types/user";
import { useForm, type SubmitHandler } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion, AnimatePresence } from "framer-motion";

const getAvatar = (name: string) =>
  `https://ui-avatars.com/api/?name=${encodeURIComponent(
    name
  )}&background=random`;

function UserListWithDetail() {
  const users = useUsersStore((state) => state.users);
  const addUser = useUsersStore((state) => state.addUser);
  const deleteUser = useUsersStore((state) => state.deleteUser);

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [panelMode, setPanelMode] = useState<"view" | "create" | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<User>({
    defaultValues: {
      id: Math.floor(Math.random() * 10000),
      name: "",
      email: "",
      phone: "",
      gender: "male",
      address: "",
      role: "user",
    },
  });

  const onCreate: SubmitHandler<User> = async (data) => {
    await addUser(data);
    reset(); // reset form
    setPanelMode(null); // close panel
  };

  const columns = [
    {
      header: "Name",
      accessor: "name",
      render: (value: string, row: User) => (
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => {
            setSelectedUser(row);
            setPanelMode("view");
          }}
        >
          <img src={getAvatar(row.name)} className="w-8 h-8 rounded-full" />
          <span>{value}</span>
        </div>
      ),
    },
    {
      header: "Email",
      accessor: "email",
      render: (value: string) => (
        <div className="flex items-center gap-2">
          <span>📧</span>
          <span>{value}</span>
        </div>
      ),
    },
    {
      header: "Role",
      accessor: "role",
      render: (role: string) => {
        const color =
          role === "admin"
            ? "bg-blue-100 text-blue-700"
            : "bg-yellow-100 text-yellow-700";
        return (
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${color}`}
          >
            {role}
          </span>
        );
      },
    },
    {
      header: "Actions",
      accessor: "id",
      render: (id: number) => (
        <div className="flex gap-2 justify-end">
          <Button
            size="sm"
            variant="outline"
            onClick={() => console.log("Edit", id)}
          >
            Edit
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={() => deleteUser(id)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="flex">
      <motion.div
        animate={{ width: panelMode ? "70%" : "100%" }}
        transition={{ duration: 0.3 }}
        className="p-6"
      >
        <div className="flex justify-between mb-4">
          <h1 className="text-2xl font-bold">User List</h1>
          <Button
            onClick={() => {
              setSelectedUser(null);
              setPanelMode("create");
              reset(); // clear form
            }}
          >
            + Add User
          </Button>
        </div>
        <SaaSTable
          columns={columns}
          data={users}
          emptyMessage="No users found."
        />
      </motion.div>

      <AnimatePresence>
        {panelMode && (
          <motion.div
            key={panelMode}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 100, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-[320px] bg-white p-6 shadow rounded-lg h-fit mr-6"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">
                {panelMode === "view" ? "User Detail" : "Create User"}
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setPanelMode(null)}
              >
                Close
              </Button>
            </div>

            {panelMode === "view" && selectedUser && (
              <>
                <div className="flex flex-col items-center mb-6">
                  <img
                    src={getAvatar(selectedUser.name)}
                    className="w-24 h-24 rounded-full"
                  />
                  <h3 className="text-xl font-semibold mt-4">
                    {selectedUser.name}
                  </h3>
                  <p className="text-gray-500 text-sm">
                    {selectedUser.role.toUpperCase()}
                  </p>
                </div>

                <div className="space-y-4 text-sm">
                  <div>
                    <p className="font-semibold">Email:</p>
                    <p>{selectedUser.email}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Phone:</p>
                    <p>{selectedUser.phone}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Gender:</p>
                    <p>{selectedUser.gender}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Address:</p>
                    <p>{selectedUser.address || "N/A"}</p>
                  </div>
                </div>
              </>
            )}

            {panelMode === "create" && (
              <form
                onSubmit={handleSubmit(onCreate)}
                className="space-y-4 text-sm"
              >
                <div>
                  <label>Name</label>
                  <Input {...register("name", { required: "Required" })} />
                </div>
                <div>
                  <label>Email</label>
                  <Input {...register("email", { required: "Required" })} />
                </div>
                <div>
                  <label>Phone</label>
                  <Input {...register("phone")} />
                </div>
                <div>
                  <label>Gender</label>
                  <Select
                    value={watch("gender")}
                    onValueChange={(val) =>
                      setValue("gender", val as User["gender"])
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label>Role</label>
                  <Select
                    value={watch("role")}
                    onValueChange={(val) => setValue("role", val as Role)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="user">User</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label>Address</label>
                  <Input {...register("address")} />
                </div>
                <Button type="submit" className="mt-2 w-full">
                  Create User
                </Button>
              </form>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default UserListWithDetail;
