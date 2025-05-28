
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";
import Layout from "@/components/layout/Layout";
import DestinationList from "@/components/destinations/DestinationList";
import { getFromLocalStorage, saveToLocalStorage, initializeData, generateId } from "@/lib/data";

const Destinations = () => {
  const { toast } = useToast();
  
  // Initialize data if not already in localStorage
  useEffect(() => {
    initializeData();
  }, []);
  
  const handleAddDestination = (destinationData) => {
    try {
      const destinations = getFromLocalStorage("destinations", []);
      
      // Add new destination with ID
      const newDestination = {
        ...destinationData,
        id: generateId("dest")
      };
      
      const updatedDestinations = [...destinations, newDestination];
      saveToLocalStorage("destinations", updatedDestinations);
      
      toast({
        title: "Destination Added",
        description: `${newDestination.name}, ${newDestination.country} has been added successfully.`,
        duration: 3000
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add destination. Please try again.",
        variant: "destructive",
        duration: 3000
      });
    }
  };
  
  const handleEditDestination = (destinationData) => {
    try {
      const destinations = getFromLocalStorage("destinations", []);
      
      // Find and update the destination
      const updatedDestinations = destinations.map(destination => 
        destination.id === destinationData.id ? { ...destination, ...destinationData } : destination
      );
      
      saveToLocalStorage("destinations", updatedDestinations);
      
      toast({
        title: "Destination Updated",
        description: `${destinationData.name}, ${destinationData.country} has been updated successfully.`,
        duration: 3000
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update destination. Please try again.",
        variant: "destructive",
        duration: 3000
      });
    }
  };
  
  const handleDeleteDestination = (destinationId) => {
    try {
      const destinations = getFromLocalStorage("destinations", []);
      const destinationToDelete = destinations.find(destination => destination.id === destinationId);
      
      // Remove the destination
      const updatedDestinations = destinations.filter(destination => destination.id !== destinationId);
      saveToLocalStorage("destinations", updatedDestinations);
      
      toast({
        title: "Destination Deleted",
        description: destinationToDelete 
          ? `${destinationToDelete.name}, ${destinationToDelete.country} has been deleted.` 
          : "Destination has been deleted.",
        duration: 3000
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete destination. Please try again.",
        variant: "destructive",
        duration: 3000
      });
    }
  };
  
  return (
    <Layout title="Destinations">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <DestinationList
          onAddDestination={handleAddDestination}
          onEditDestination={handleEditDestination}
          onDeleteDestination={handleDeleteDestination}
        />
      </motion.div>
    </Layout>
  );
};

export default Destinations;
