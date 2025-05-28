
import React from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { 
  Home, 
  Users, 
  Calendar, 
  Map, 
  BarChart2, 
  Settings, 
  LogOut,
  Plane
} from "lucide-react";

const Sidebar = () => {
  const location = useLocation();
  
  const menuItems = [
    { icon: Home, label: "Dashboard", path: "/" },
    { icon: Users, label: "Clients", path: "/clients" },
    { icon: Calendar, label: "Bookings", path: "/bookings" },
    { icon: Map, label: "Destinations", path: "/destinations" },
    { icon: BarChart2, label: "Reports", path: "/reports" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

  return (
    <div className="h-screen w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-4 border-b">
        <div className="flex items-center gap-2">
          <Plane className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-bold text-primary">TravelCRM</h1>
        </div>
      </div>
      
      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          
          return (
            <Link to={item.path} key={item.path}>
              <motion.div
                className={`sidebar-item ${isActive ? "sidebar-item-active" : ""}`}
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
                {isActive && (
                  <motion.div
                    className="absolute inset-y-0 left-0 w-1 bg-primary rounded-r-md"
                    layoutId="sidebar-indicator"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                )}
              </motion.div>
            </Link>
          );
        })}
      </nav>
      
      <div className="p-4 border-t">
        <motion.button
          className="sidebar-item text-red-500 hover:bg-red-50 hover:text-red-600 w-full"
          whileHover={{ x: 5 }}
          whileTap={{ scale: 0.95 }}
        >
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </motion.button>
      </div>
    </div>
  );
};

export default Sidebar;
