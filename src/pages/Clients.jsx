
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";
import Layout from "@/components/layout/Layout";
import ClientList from "@/components/clients/ClientList";
import { getFromLocalStorage, saveToLocalStorage, initializeData, generateId } from "@/lib/data";

const Clients = () => {
  const { toast } = useToast();
  
  // Initialize data if not already in localStorage
  useEffect(() => {
    initializeData();
  }, []);
  
  const handleAddClient = (clientData) => {
    try {
      const clients = getFromLocalStorage("clients", []);
      
      // Add new client with ID and timestamps
      const newClient = {
        ...clientData,
        id: generateId("client"),
        createdAt: new Date().toISOString(),
        lastContact: new Date().toISOString()
      };
      
      const updatedClients = [...clients, newClient];
      saveToLocalStorage("clients", updatedClients);
      
      toast({
        title: "Client Added",
        description: `${newClient.name} has been added successfully.`,
        duration: 3000
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add client. Please try again.",
        variant: "destructive",
        duration: 3000
      });
    }
  };
  
  const handleEditClient = (clientData) => {
    try {
      const clients = getFromLocalStorage("clients", []);
      
      // Find and update the client
      const updatedClients = clients.map(client => 
        client.id === clientData.id ? { ...client, ...clientData } : client
      );
      
      saveToLocalStorage("clients", updatedClients);
      
      toast({
        title: "Client Updated",
        description: `${clientData.name} has been updated successfully.`,
        duration: 3000
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update client. Please try again.",
        variant: "destructive",
        duration: 3000
      });
    }
  };
  
  const handleDeleteClient = (clientId) => {
    try {
      const clients = getFromLocalStorage("clients", []);
      const clientToDelete = clients.find(client => client.id === clientId);
      
      // Remove the client
      const updatedClients = clients.filter(client => client.id !== clientId);
      saveToLocalStorage("clients", updatedClients);
      
      toast({
        title: "Client Deleted",
        description: clientToDelete 
          ? `${clientToDelete.name} has been deleted.` 
          : "Client has been deleted.",
        duration: 3000
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete client. Please try again.",
        variant: "destructive",
        duration: 3000
      });
    }
  };
  
  return (
    <Layout title="Clients">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <ClientList
          onAddClient={handleAddClient}
          onEditClient={handleEditClient}
          onDeleteClient={handleDeleteClient}
        />
      </motion.div>
    </Layout>
  );
};

export default Clients;
