// pages/admin/Users.tsx
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { SaaSTable } from "@/components/ui/SaasTable";
import { useUsersStore } from "@/stores/useUsersStore";
import { AnimatePresence, motion } from "framer-motion";
import UserDetailPanel from "@/components/UserDetailPanel";
import type { User } from "@/types/user";

function Users() {
  const users = useUsersStore((state) => state.users);
  const addUser = useUsersStore((state) => state.addUser);
  const deleteUser = useUsersStore((state) => state.deleteUser);

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [panelMode, setPanelMode] = useState<"view" | "create" | null>(null);

  const columns = [
    { header: "Name", accessor: "name" },
    { header: "Email", accessor: "email" },
    { header: "Role", accessor: "role" },
    {
      header: "Actions",
      accessor: "id",
      render: (id: number, row: User) => (
        <div className="flex justify-end items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => {
              setSelectedUser(row);
              setPanelMode("view");
            }}
          >
            View
          </Button>
          <Button
            variant="destructive"
            size="sm"
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
        animate={{ width: panelMode ? "calc(100% - 380px)" : "100%" }}
        transition={{ duration: 0.3 }}
        className="p-6"
      >
        <div className="flex justify-between mb-6">
          <h1 className="text-2xl font-bold">Users</h1>
          <Button
            onClick={() => {
              setSelectedUser(null);
              setPanelMode("create");
            }}
          >
            + New User
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
          <UserDetailPanel
            mode={panelMode}
            user={selectedUser || undefined}
            onClose={() => {
              setPanelMode(null);
              setSelectedUser(null);
            }}
            onSubmit={(data) => {
              addUser(data);
              setPanelMode(null);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default Users;
