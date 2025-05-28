
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getFromLocalStorage } from "@/lib/data";

const BookingsByType = () => {
  const bookings = getFromLocalStorage("bookings", []);
  
  // Count bookings by type
  const bookingsByType = bookings.reduce((acc, booking) => {
    const type = booking.bookingType || "other";
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {});
  
  // Convert to array for rendering
  const chartData = Object.entries(bookingsByType).map(([type, count]) => ({
    type: type.charAt(0).toUpperCase() + type.slice(1),
    count,
    color: getTypeColor(type)
  }));
  
  // Sort by count (highest first)
  chartData.sort((a, b) => b.count - a.count);
  
  // Calculate total bookings
  const totalBookings = chartData.reduce((sum, item) => sum + item.count, 0);
  
  // Get color for booking type
  function getTypeColor(type) {
    switch (type.toLowerCase()) {
      case "vacation":
        return "bg-blue-500";
      case "business":
        return "bg-purple-500";
      case "adventure":
        return "bg-green-500";
      case "family":
        return "bg-amber-500";
      case "cultural":
        return "bg-rose-500";
      default:
        return "bg-gray-500";
    }
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Bookings by Type</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold mb-4">
          {totalBookings} Bookings
        </div>
        
        <div className="space-y-4">
          {chartData.map((item, index) => {
            const percentage = totalBookings > 0 
              ? Math.round((item.count / totalBookings) * 100) 
              : 0;
              
            return (
              <div key={item.type} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{item.type}</span>
                  <span className="font-medium">{item.count} ({percentage}%)</span>
                </div>
                
                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full ${item.color}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  />
                </div>
              </div>
            );
          })}
          
          {chartData.length === 0 && (
            <p className="text-center text-gray-500 py-4">No booking data available</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingsByType;
