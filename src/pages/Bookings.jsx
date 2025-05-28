
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";
import Layout from "@/components/layout/Layout";
import BookingList from "@/components/bookings/BookingList";
import { getFromLocalStorage, saveToLocalStorage, initializeData, generateId } from "@/lib/data";

const Bookings = () => {
  const { toast } = useToast();
  
  // Initialize data if not already in localStorage
  useEffect(() => {
    initializeData();
  }, []);
  
  const handleAddBooking = (bookingData) => {
    try {
      const bookings = getFromLocalStorage("bookings", []);
      
      // Add new booking with ID and timestamp
      const newBooking = {
        ...bookingData,
        id: generateId("booking"),
        createdAt: new Date().toISOString()
      };
      
      const updatedBookings = [...bookings, newBooking];
      saveToLocalStorage("bookings", updatedBookings);
      
      toast({
        title: "Booking Added",
        description: `Booking for ${newBooking.destination} has been added successfully.`,
        duration: 3000
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add booking. Please try again.",
        variant: "destructive",
        duration: 3000
      });
    }
  };
  
  const handleEditBooking = (bookingData) => {
    try {
      const bookings = getFromLocalStorage("bookings", []);
      
      // Find and update the booking
      const updatedBookings = bookings.map(booking => 
        booking.id === bookingData.id ? { ...booking, ...bookingData } : booking
      );
      
      saveToLocalStorage("bookings", updatedBookings);
      
      toast({
        title: "Booking Updated",
        description: `Booking for ${bookingData.destination} has been updated successfully.`,
        duration: 3000
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update booking. Please try again.",
        variant: "destructive",
        duration: 3000
      });
    }
  };
  
  const handleDeleteBooking = (bookingId) => {
    try {
      const bookings = getFromLocalStorage("bookings", []);
      const bookingToDelete = bookings.find(booking => booking.id === bookingId);
      
      // Remove the booking
      const updatedBookings = bookings.filter(booking => booking.id !== bookingId);
      saveToLocalStorage("bookings", updatedBookings);
      
      toast({
        title: "Booking Deleted",
        description: bookingToDelete 
          ? `Booking for ${bookingToDelete.destination} has been deleted.` 
          : "Booking has been deleted.",
        duration: 3000
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete booking. Please try again.",
        variant: "destructive",
        duration: 3000
      });
    }
  };
  
  return (
    <Layout title="Bookings">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <BookingList
          onAddBooking={handleAddBooking}
          onEditBooking={handleEditBooking}
          onDeleteBooking={handleDeleteBooking}
        />
      </motion.div>
    </Layout>
  );
};

export default Bookings;
