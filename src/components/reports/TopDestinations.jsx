
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import { getFromLocalStorage } from "@/lib/data";

const TopDestinations = () => {
  const bookings = getFromLocalStorage("bookings", []);
  
  // Count bookings per destination
  const destinationCounts = bookings.reduce((acc, booking) => {
    acc[booking.destination] = (acc[booking.destination] || 0) + 1;
    return acc;
  }, {});
  
  // Convert to array for rendering
  const topDestinations = Object.entries(destinationCounts)
    .map(([destination, count]) => ({ destination, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);
  
  // Calculate total bookings
  const totalBookings = bookings.length;
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Destinations</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {topDestinations.map((item, index) => {
            const percentage = totalBookings > 0 
              ? Math.round((item.count / totalBookings) * 100) 
              : 0;
              
            return (
              <motion.div
                key={item.destination}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <div className="bg-primary/10 text-primary p-2 rounded-full">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <span className="font-medium">{item.destination}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="text-sm text-gray-500">
                    {item.count} bookings
                  </div>
                  <div className="w-16 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-primary"
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    />
                  </div>
                  <div className="text-xs text-gray-500 w-8 text-right">
                    {percentage}%
                  </div>
                </div>
              </motion.div>
            );
          })}
          
          {topDestinations.length === 0 && (
            <p className="text-center text-gray-500 py-4">No destination data available</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TopDestinations;
