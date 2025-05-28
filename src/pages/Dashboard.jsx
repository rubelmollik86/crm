
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Users, Calendar, MapPin, DollarSign } from "lucide-react";
import Layout from "@/components/layout/Layout";
import StatCard from "@/components/dashboard/StatCard";
import RecentBookings from "@/components/dashboard/RecentBookings";
import PopularDestinations from "@/components/dashboard/PopularDestinations";
import { getFromLocalStorage, initializeData } from "@/lib/data";

const Dashboard = () => {
  // Initialize data if not already in localStorage
  useEffect(() => {
    initializeData();
  }, []);
  
  const clients = getFromLocalStorage("clients", []);
  const bookings = getFromLocalStorage("bookings", []);
  const destinations = getFromLocalStorage("destinations", []);
  
  // Calculate total revenue
  const totalRevenue = bookings.reduce((sum, booking) => sum + booking.totalAmount, 0);
  
  // Calculate stats
  const activeClients = clients.filter(client => client.status === "active").length;
  const pendingBookings = bookings.filter(booking => booking.status === "pending").length;
  const confirmedBookings = bookings.filter(booking => booking.status === "confirmed").length;
  
  return (
    <Layout title="Dashboard">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Clients"
            value={clients.length}
            icon={Users}
            color="blue"
            trend="up"
            trendValue="12%"
          />
          <StatCard
            title="Active Bookings"
            value={confirmedBookings}
            icon={Calendar}
            color="green"
            trend="up"
            trendValue="8%"
          />
          <StatCard
            title="Destinations"
            value={destinations.length}
            icon={MapPin}
            color="purple"
          />
          <StatCard
            title="Total Revenue"
            value={`$${totalRevenue.toFixed(2)}`}
            icon={DollarSign}
            color="amber"
            trend="up"
            trendValue="15%"
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RecentBookings />
          <PopularDestinations />
        </div>
        
        <div className="p-6 rounded-lg border border-dashed border-gray-300 bg-gray-50 text-center">
          <h3 className="text-lg font-medium text-gray-700 mb-2">Welcome to Travel Agency CRM</h3>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Manage your clients, bookings, and destinations all in one place. 
            Track revenue, monitor booking trends, and grow your travel business.
          </p>
        </div>
      </motion.div>
    </Layout>
  );
};

export default Dashboard;
