
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getFromLocalStorage } from "@/lib/data";

const RevenueChart = () => {
  const bookings = getFromLocalStorage("bookings", []);
  
  // Group bookings by month
  const monthlyRevenue = bookings.reduce((acc, booking) => {
    const date = new Date(booking.createdAt);
    const month = date.toLocaleString('default', { month: 'short' });
    
    if (!acc[month]) {
      acc[month] = 0;
    }
    
    acc[month] += booking.totalAmount;
    return acc;
  }, {});
  
  // Convert to array and sort by month
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const chartData = months.map(month => ({
    month,
    amount: monthlyRevenue[month] || 0
  }));
  
  // Find the maximum value for scaling
  const maxRevenue = Math.max(...chartData.map(item => item.amount), 1000);
  
  // Calculate total revenue
  const totalRevenue = chartData.reduce((sum, item) => sum + item.amount, 0);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Revenue Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold mb-4">
          ${totalRevenue.toFixed(2)}
        </div>
        
        <div className="h-64 flex items-end gap-2">
          {chartData.map((item, index) => (
            <div key={item.month} className="flex-1 flex flex-col items-center">
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${(item.amount / maxRevenue) * 100}%` }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="w-full bg-primary/80 hover:bg-primary rounded-t-md relative group"
              >
                {item.amount > 0 && (
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    ${item.amount.toFixed(2)}
                  </div>
                )}
              </motion.div>
              <div className="text-xs mt-2 text-gray-500">{item.month}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RevenueChart;
