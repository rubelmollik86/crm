
import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  CalendarPlus,
  MapPin,
  Calendar,
  DollarSign
} from "lucide-react";
import { formatDateRange, calculateDuration } from "@/lib/date-utils";
import { getFromLocalStorage } from "@/lib/data";
import BookingForm from "@/components/bookings/BookingForm";

const BookingList = ({ onAddBooking, onEditBooking, onDeleteBooking }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingBooking, setEditingBooking] = useState(null);
  
  const bookings = getFromLocalStorage("bookings", []);
  const clients = getFromLocalStorage("clients", []);
  
  // Filter bookings based on search term
  const filteredBookings = bookings.filter(
    (booking) =>
      booking.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
      getClientName(booking.clientId).toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Get client name by ID
  const getClientName = (clientId) => {
    const client = clients.find((c) => c.id === clientId);
    return client ? client.name : "Unknown Client";
  };
  
  const handleAddClick = () => {
    setShowAddForm(true);
    setEditingBooking(null);
  };
  
  const handleEditClick = (booking) => {
    setEditingBooking(booking);
    setShowAddForm(true);
  };
  
  const handleFormClose = () => {
    setShowAddForm(false);
    setEditingBooking(null);
  };
  
  const handleFormSubmit = (bookingData) => {
    if (editingBooking) {
      onEditBooking(bookingData);
    } else {
      onAddBooking(bookingData);
    }
    handleFormClose();
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
  
  // Get payment status badge color
  const getPaymentStatusColor = (status) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800";
      case "partial":
        return "bg-blue-100 text-blue-800";
      case "unpaid":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  
  return (
    <>
      <Card className="shadow-md">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Bookings</CardTitle>
          <Button onClick={handleAddClick} className="gap-1">
            <CalendarPlus className="h-4 w-4" />
            Add Booking
          </Button>
        </CardHeader>
        <CardContent>
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <Input
              type="search"
              placeholder="Search bookings..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="space-y-4">
            {filteredBookings.map((booking, index) => (
              <motion.div
                key={booking.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="flex items-center justify-between p-4 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    <h4 className="font-medium">{booking.destination}</h4>
                  </div>
                  
                  <p className="text-sm text-gray-500 mt-1">
                    {getClientName(booking.clientId)}
                  </p>
                  
                  <div className="flex items-center gap-2 mt-1">
                    <Calendar className="h-3 w-3 text-gray-400" />
                    <span className="text-xs text-gray-500">
                      {formatDateRange(booking.startDate, booking.endDate)} ({calculateDuration(booking.startDate, booking.endDate)} days)
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="flex flex-col items-end gap-1">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        booking.status
                      )}`}
                    >
                      {booking.status}
                    </span>
                    
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(
                        booking.paymentStatus
                      )}`}
                    >
                      {booking.paymentStatus}
                    </span>
                  </div>
                  
                  <div className="flex flex-col items-end">
                    <div className="flex items-center">
                      <DollarSign className="h-3 w-3 text-gray-400" />
                      <span className="font-medium">{booking.totalAmount.toFixed(2)}</span>
                    </div>
                    
                    <div className="flex gap-1 mt-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditClick(booking)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDeleteBooking(booking.id)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
            
            {filteredBookings.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">No bookings found</p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={handleAddClick}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add your first booking
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      {showAddForm && (
        <BookingForm
          booking={editingBooking}
          onSubmit={handleFormSubmit}
          onCancel={handleFormClose}
        />
      )}
    </>
  );
};

export default BookingList;
