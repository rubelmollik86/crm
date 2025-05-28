
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import RevenueChart from "@/components/reports/RevenueChart";
import BookingsByType from "@/components/reports/BookingsByType";
import TopDestinations from "@/components/reports/TopDestinations";
import { initializeData } from "@/lib/data";

const Reports = () => {
  // Initialize data if not already in localStorage
  useEffect(() => {
    initializeData();
  }, []);
  
  return (
    <Layout title="Reports">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RevenueChart />
          <BookingsByType />
        </div>
        
        <TopDestinations />
        
        <div className="p-6 rounded-lg border border-dashed border-gray-300 bg-gray-50 text-center">
          <h3 className="text-lg font-medium text-gray-700 mb-2">Analytics Insights</h3>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Track your business performance with detailed analytics. 
            Monitor revenue trends, popular destinations, and booking patterns to make data-driven decisions.
          </p>
        </div>
      </motion.div>
    </Layout>
  );
};

export default Reports;
