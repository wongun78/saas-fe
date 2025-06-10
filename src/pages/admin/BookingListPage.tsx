import React, { useEffect, useState } from "react";
import { useBookingStore } from "@/stores/useBookingStore";
import { SaaSTable } from "@/components/ui/SaasTable";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import type { Booking, BookingStatus } from "@/types/booking";

const statusOptions: BookingStatus[] = [
  "pending",
  "confirmed",
  "cancelled",
  "done",
];

function BookingListPage() {
  const bookings = useBookingStore((state) => state.bookings);

  // local state filter
  const [search, setSearch] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [filtered, setFiltered] = useState(bookings);

  useEffect(() => {
    setFiltered(bookings);
  }, [bookings]);

  useEffect(() => {
    const lowerSearch = search.toLowerCase();
    let filteredList = bookings.filter(
      (b) =>
        b.customer.fullname.toLowerCase().includes(lowerSearch) ||
        b.customer.phone.includes(search)
    );

    if (selectedDate) {
      filteredList = filteredList.filter((b) => b.date === selectedDate);
    }

    if (selectedStatus) {
      filteredList = filteredList.filter((b) => b.status === selectedStatus);
    }

    setFiltered(filteredList);
  }, [search, selectedDate, selectedStatus, bookings]);

  const columns = [
    { header: "Date", accessor: "date" },
    { header: "Time", accessor: "startTime" },
    { header: "Customer", accessor: (b: Booking) => b.customer.fullname },
    { header: "Phone", accessor: (b: Booking) => b.customer.phone },
    { header: "Status", accessor: "status" },
    {
      header: "Actions",
      accessor: "id",
      render: (id: string) => (
        <div className="flex justify-end gap-2">
          <Link to={`/bookings/${id}`}>
            <Button size="sm" variant="outline">
              Detail
            </Button>
          </Link>
        </div>
      ),
    },
  ];

  return (
    <div className="p-8">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Booking Search</h1>
        <Link to="/bookings/create">
          <Button>+ New Booking</Button>
        </Link>
      </div>

      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by name or phone"
          className="border p-2 rounded w-80"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <input
          type="date"
          className="border p-2 rounded"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />

        <select
          className="border p-2 rounded"
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
        >
          <option value="">All Status</option>
          {statusOptions.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      <SaaSTable
        columns={columns}
        data={filtered}
        emptyMessage="No bookings found."
      />
    </div>
  );
}

export default BookingListPage;
