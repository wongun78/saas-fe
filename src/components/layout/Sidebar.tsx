import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Users, Settings, LogOut, CalendarCheck2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";

type Role = "admin" | "user";

interface MenuItem {
  label: string;
  icon: React.ElementType;
  path: string;
  roles: Role[];
}

const menuItems: MenuItem[] = [
  { label: "Dashboard", icon: Home, path: "/dashboard", roles: ["admin"] },
  { label: "Users", icon: Users, path: "/users", roles: ["admin"] },
  {
    label: "Bookings",
    icon: CalendarCheck2,
    path: "/bookings",
    roles: ["admin"],
  },
  { label: "Settings", icon: Settings, path: "/settings", roles: ["admin"] },
  { label: "Logout", icon: LogOut, path: "/logout", roles: ["admin", "user"] },
];

function Sidebar() {
  const location = useLocation();
  const { role: currentRole } = useAuth();

  return (
    <aside className="flex flex-col w-64 h-screen bg-white border-r shadow-sm">
      <div className="p-6 text-2xl font-bold text-primary">Admin Panel</div>

      <nav className="flex-1 px-4">
        {menuItems
          .filter((item) => item.roles.includes(currentRole))
          .map(({ label, icon: Icon, path }) => {
            const isActive = location.pathname.startsWith(path);
            return (
              <Link to={path} key={path}>
                <div
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg transition hover:bg-gray-100 text-sm font-medium",
                    isActive ? "bg-gray-100 text-primary" : "text-gray-600"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  {label}
                </div>
              </Link>
            );
          })}
      </nav>
    </aside>
  );
}

export default Sidebar;
