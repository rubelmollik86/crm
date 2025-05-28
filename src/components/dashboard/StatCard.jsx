
import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

const StatCard = ({ title, value, icon: Icon, color, trend, trendValue }) => {
  const isPositiveTrend = trend === "up";
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="stats-card">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <h3 className="text-2xl font-bold mt-1">{value}</h3>
            
            {trend && (
              <div className="flex items-center mt-2">
                <span
                  className={`text-xs font-medium ${
                    isPositiveTrend ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {isPositiveTrend ? "↑" : "↓"} {trendValue}
                </span>
                <span className="text-xs text-gray-500 ml-1">vs last month</span>
              </div>
            )}
          </div>
          
          <div
            className={`p-3 rounded-full ${
              color === "blue"
                ? "bg-blue-100 text-blue-600"
                : color === "green"
                ? "bg-green-100 text-green-600"
                : color === "purple"
                ? "bg-purple-100 text-purple-600"
                : color === "amber"
                ? "bg-amber-100 text-amber-600"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            <Icon className="h-5 w-5" />
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default StatCard;
