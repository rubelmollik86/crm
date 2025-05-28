
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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  UserPlus,
  Phone,
  Mail
} from "lucide-react";
import { formatDate } from "@/lib/date-utils";
import { getFromLocalStorage } from "@/lib/data";
import ClientForm from "@/components/clients/ClientForm";

const ClientList = ({ onAddClient, onEditClient, onDeleteClient }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingClient, setEditingClient] = useState(null);
  
  const clients = getFromLocalStorage("clients", []);
  
  // Filter clients based on search term
  const filteredClients = clients.filter(
    (client) =>
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.phone.includes(searchTerm)
  );
  
  const handleAddClick = () => {
    setShowAddForm(true);
    setEditingClient(null);
  };
  
  const handleEditClick = (client) => {
    setEditingClient(client);
    setShowAddForm(true);
  };
  
  const handleFormClose = () => {
    setShowAddForm(false);
    setEditingClient(null);
  };
  
  const handleFormSubmit = (clientData) => {
    if (editingClient) {
      onEditClient(clientData);
    } else {
      onAddClient(clientData);
    }
    handleFormClose();
  };
  
  // Get initials for avatar
  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };
  
  // Get status badge color
  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-blue-100 text-blue-800";
    }
  };
  
  return (
    <>
      <Card className="shadow-md">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Clients</CardTitle>
          <Button onClick={handleAddClick} className="gap-1">
            <UserPlus className="h-4 w-4" />
            Add Client
          </Button>
        </CardHeader>
        <CardContent>
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <Input
              type="search"
              placeholder="Search clients..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="space-y-4">
            {filteredClients.map((client, index) => (
              <motion.div
                key={client.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="flex items-center justify-between p-4 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {getInitials(client.name)}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div>
                    <h4 className="font-medium">{client.name}</h4>
                    <div className="flex items-center gap-4 mt-1">
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Mail className="h-3 w-3" />
                        {client.email}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Phone className="h-3 w-3" />
                        {client.phone}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      client.status
                    )}`}
                  >
                    {client.status}
                  </span>
                  
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEditClick(client)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDeleteClient(client.id)}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
            
            {filteredClients.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">No clients found</p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={handleAddClick}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add your first client
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      {showAddForm && (
        <ClientForm
          client={editingClient}
          onSubmit={handleFormSubmit}
          onCancel={handleFormClose}
        />
      )}
    </>
  );
};

export default ClientList;
