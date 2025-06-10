import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard Overview</h1>

      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold">Total Users</h2>
            <p className="text-2xl mt-2">1200</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold">Revenue</h2>
            <p className="text-2xl mt-2">$45,000</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold">Orders</h2>
            <p className="text-2xl mt-2">320</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
