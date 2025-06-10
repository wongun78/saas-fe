import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useBookingStore } from "@/stores/useBookingStore";
import { Button } from "@/components/ui/button";

function BookingDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const bookings = useBookingStore((state) => state.bookings);
  const [booking, setBooking] = useState<any>(null);

  useEffect(() => {
    const found = bookings.find((b) => b.id === id);
    if (!found) {
      navigate("/bookings"); // fallback if not found
    } else {
      setBooking(found);
    }
  }, [bookings, id, navigate]);

  if (!booking) return null;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Booking Details</h1>
      <div className="space-y-4">
        <div>
          <strong>Customer:</strong> {booking.customer.fullname}
        </div>
        <div>
          <strong>Phone:</strong> {booking.customer.phone}
        </div>
        <div>
          <strong>Date:</strong> {booking.date}
        </div>
        <div>
          <strong>Time:</strong> {booking.startTime}
        </div>
        <div>
          <strong>Status:</strong> {booking.status}
        </div>
        <div>
          <strong>Staff:</strong> {booking.staff}
        </div>
        <div>
          <strong>Services:</strong> {booking.services.join(", ")}
        </div>
        {booking.notes && (
          <div>
            <strong>Notes:</strong> {booking.notes}
          </div>
        )}
      </div>

      <div className="mt-8">
        <Button variant="outline" onClick={() => navigate("/bookings")}>
          Back to List
        </Button>
      </div>
    </div>
  );
}

export default BookingDetailPage;
