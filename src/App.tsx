import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import ProtectedRoute from "@/routes/ProtectedRoute";

// admin
import Dashboard from "./pages/admin/Dashboard";
import UserListWithDetail from "@/pages/admin/UserListWithDetail";
import UserForm from "@/pages/admin/UserForm";
import UserEditForm from "@/pages/admin/UserEditForm";
import BookingListPage from "@/pages/admin/BookingListPage";
import BookingFormPage from "@/pages/admin/BookingFormPage";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route
          path="/users"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <UserListWithDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users/create"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <UserForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users/edit/:id"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <UserEditForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <div>Settings Page (Admin only)</div>
            </ProtectedRoute>
          }
        />
        <Route path="/logout" element={<div>Logout Page</div>} />
        <Route path="/bookings" element={<BookingListPage />} />
        <Route path="/bookings/create" element={<BookingFormPage />} />
        <Route path="/bookings/edit/:id" element={<BookingFormPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
