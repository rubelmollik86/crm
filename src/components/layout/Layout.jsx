
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";

const Layout = ({ children, title }) => {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title={title} />
        
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
      
      <Toaster />
    </div>
  );
};

export default Layout;
