
import React from "react";
import { motion } from "framer-motion";
import { Bell, Search, User } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";

const Header = ({ title }) => {
  return (
    <header className="bg-white border-b border-gray-200 py-4 px-6 flex items-center justify-between">
      <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
      
      <div className="flex items-center space-x-4">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            type="search"
            placeholder="Search..."
            className="w-64 pl-9 rounded-full bg-gray-50 border-gray-200 focus:bg-white"
          />
        </div>
        
        <motion.button
          className="relative p-2 rounded-full bg-gray-50 text-gray-600 hover:bg-gray-100"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Bell className="h-5 w-5" />
          <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
        </motion.button>
        
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarFallback className="bg-primary text-primary-foreground">
              <User className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
          <div className="text-sm">
            <p className="font-medium">Admin User</p>
            <p className="text-gray-500 text-xs">Travel Agency</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
