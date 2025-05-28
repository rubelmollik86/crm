
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getFromLocalStorage } from "@/lib/data";

const PopularDestinations = () => {
  const destinations = getFromLocalStorage("destinations", []);
  const bookings = getFromLocalStorage("bookings", []);
  
  // Count bookings per destination
  const destinationCounts = bookings.reduce((acc, booking) => {
    acc[booking.destination] = (acc[booking.destination] || 0) + 1;
    return acc;
  }, {});
  
  // Sort destinations by booking count
  const popularDestinations = [...destinations]
    .map(dest => ({
      ...dest,
      bookingCount: destinationCounts[dest.name + ", " + dest.country] || 0
    }))
    .sort((a, b) => b.bookingCount - a.bookingCount)
    .slice(0, 3);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Popular Destinations</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4">
          {popularDestinations.map((destination, index) => (
            <motion.div
              key={destination.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="relative overflow-hidden rounded-lg h-40 group"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70 z-10" />
              
              <img  
                alt={`${destination.name}, ${destination.country}`}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
               src="https://images.unsplash.com/photo-1697256200022-f61abccad430" />
              
              <div className="absolute bottom-0 left-0 p-4 z-20 w-full">
                <h3 className="text-white font-bold text-lg">
                  {destination.name}, {destination.country}
                </h3>
                <div className="flex items-center justify-between mt-1">
                  <p className="text-white/80 text-sm">{destination.category}</p>
                  <span className="bg-white/20 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
                    {destination.bookingCount} bookings
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
          
          {popularDestinations.length === 0 && (
            <p className="text-center text-gray-500 py-4">No destinations found</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PopularDestinations;
