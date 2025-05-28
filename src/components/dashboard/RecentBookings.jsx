
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDateRange, calculateDuration } from "@/lib/date-utils";
import { getFromLocalStorage } from "@/lib/data";

const RecentBookings = () => {
  const bookings = getFromLocalStorage("bookings", []);
  const clients = getFromLocalStorage("clients", []);
  
  // Sort bookings by creation date (newest first) and take the first 5
  const recentBookings = [...bookings]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);
  
  // Get client name by ID
  const getClientName = (clientId) => {
    const client = clients.find((c) => c.id === clientId);
    return client ? client.name : "Unknown Client";
  };
  
  // Get status badge color
  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Bookings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentBookings.map((booking, index) => (
            <motion.div
              key={booking.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex items-center justify-between p-4 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors"
            >
              <div>
                <h4 className="font-medium">{booking.destination}</h4>
                <p className="text-sm text-gray-500">
                  {getClientName(booking.clientId)}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-gray-500">
                    {formatDateRange(booking.startDate, booking.endDate)}
                  </span>
                  <span className="text-xs text-gray-400">•</span>
                  <span className="text-xs text-gray-500">
                    {calculateDuration(booking.startDate, booking.endDate)} days
                  </span>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                    booking.status
                  )}`}
                >
                  {booking.status}
                </span>
                <span className="font-medium">${booking.totalAmount.toFixed(2)}</span>
              </div>
            </motion.div>
          ))}
          
          {recentBookings.length === 0 && (
            <p className="text-center text-gray-500 py-4">No recent bookings found</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentBookings;
