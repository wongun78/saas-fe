import React from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

function Navbar() {
  return (
    <header className="h-16 bg-white shadow-sm flex items-center justify-between px-4">
      {/* Left side */}
      <div className="flex items-center gap-2">
        <Menu className="h-6 w-6" />
        <span className="font-bold text-lg">My Dashboard</span>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        <Button variant="outline">Profile</Button>
        <Button variant="default">Logout</Button>
      </div>
    </header>
  );
}

export default Navbar;
