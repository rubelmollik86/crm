
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
  MapPin,
  Globe,
  Calendar
} from "lucide-react";
import { getFromLocalStorage } from "@/lib/data";
import DestinationForm from "@/components/destinations/DestinationForm";

const DestinationList = ({ onAddDestination, onEditDestination, onDeleteDestination }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingDestination, setEditingDestination] = useState(null);
  
  const destinations = getFromLocalStorage("destinations", []);
  
  // Filter destinations based on search term
  const filteredDestinations = destinations.filter(
    (destination) =>
      destination.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      destination.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
      destination.category.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleAddClick = () => {
    setShowAddForm(true);
    setEditingDestination(null);
  };
  
  const handleEditClick = (destination) => {
    setEditingDestination(destination);
    setShowAddForm(true);
  };
  
  const handleFormClose = () => {
    setShowAddForm(false);
    setEditingDestination(null);
  };
  
  const handleFormSubmit = (destinationData) => {
    if (editingDestination) {
      onEditDestination(destinationData);
    } else {
      onAddDestination(destinationData);
    }
    handleFormClose();
  };
  
  // Get category badge color
  const getCategoryColor = (category) => {
    switch (category.toLowerCase()) {
      case "beach":
        return "bg-blue-100 text-blue-800";
      case "cultural":
        return "bg-purple-100 text-purple-800";
      case "urban":
        return "bg-gray-100 text-gray-800";
      case "adventure":
        return "bg-green-100 text-green-800";
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  };
  
  return (
    <>
      <Card className="shadow-md">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Destinations</CardTitle>
          <Button onClick={handleAddClick} className="gap-1">
            <MapPin className="h-4 w-4" />
            Add Destination
          </Button>
        </CardHeader>
        <CardContent>
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <Input
              type="search"
              placeholder="Search destinations..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredDestinations.map((destination, index) => (
              <motion.div
                key={destination.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="relative overflow-hidden rounded-lg border border-gray-100 group"
              >
                <div className="h-40 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70 z-10" />
                  
                  <img  
                    alt={`${destination.name}, ${destination.country}`}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                   src="https://images.unsplash.com/photo-1694388001616-1176f534d72f" />
                  
                  <div className="absolute top-2 right-2 z-20 flex gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/40 hover:text-white"
                      onClick={() => handleEditClick(destination)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/40 hover:text-white"
                      onClick={() => onDeleteDestination(destination.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="absolute bottom-2 left-2 z-20">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(
                        destination.category
                      )}`}
                    >
                      {destination.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="font-semibold text-lg flex items-center gap-1">
                    <MapPin className="h-4 w-4 text-primary" />
                    {destination.name}
                  </h3>
                  
                  <div className="flex items-center gap-1 mt-1 text-sm text-gray-500">
                    <Globe className="h-3 w-3" />
                    {destination.country}
                  </div>
                  
                  <p className="mt-2 text-sm line-clamp-2 text-gray-600">
                    {destination.description}
                  </p>
                  
                  <div className="mt-3 flex items-center gap-1 text-xs text-gray-500">
                    <Calendar className="h-3 w-3" />
                    Best time: {destination.bestTimeToVisit}
                  </div>
                </div>
              </motion.div>
            ))}
            
            {filteredDestinations.length === 0 && (
              <div className="text-center py-8 col-span-full">
                <p className="text-gray-500">No destinations found</p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={handleAddClick}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add your first destination
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      {showAddForm && (
        <DestinationForm
          destination={editingDestination}
          onSubmit={handleFormSubmit}
          onCancel={handleFormClose}
        />
      )}
    </>
  );
};

export default DestinationList;
