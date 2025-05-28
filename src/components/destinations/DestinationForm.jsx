
import React, { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { generateId } from "@/lib/data";

const DestinationForm = ({ destination, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    id: destination?.id || generateId("dest"),
    name: destination?.name || "",
    country: destination?.country || "",
    description: destination?.description || "",
    popularAttractions: destination?.popularAttractions || [],
    bestTimeToVisit: destination?.bestTimeToVisit || "",
    averageCost: destination?.averageCost || "Medium",
    category: destination?.category || "Beach",
    imageDescription: destination?.imageDescription || ""
  });
  
  const [attractionInput, setAttractionInput] = useState("");
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  
  const handleAddAttraction = () => {
    if (attractionInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        popularAttractions: [...prev.popularAttractions, attractionInput.trim()]
      }));
      setAttractionInput("");
    }
  };
  
  const handleRemoveAttraction = (index) => {
    setFormData((prev) => ({
      ...prev,
      popularAttractions: prev.popularAttractions.filter((_, i) => i !== index)
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };
  
  return (
    <Dialog open={true} onOpenChange={onCancel}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {destination ? "Edit Destination" : "Add New Destination"}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Destination Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Input
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="min-h-[80px]"
            />
          </div>
          
          <div className="space-y-2">
            <Label>Popular Attractions</Label>
            <div className="flex gap-2">
              <Input
                value={attractionInput}
                onChange={(e) => setAttractionInput(e.target.value)}
                placeholder="Add an attraction"
              />
              <Button
                type="button"
                onClick={handleAddAttraction}
                variant="outline"
              >
                Add
              </Button>
            </div>
            
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.popularAttractions.map((attraction, index) => (
                <div
                  key={index}
                  className="bg-gray-100 px-3 py-1 rounded-full flex items-center gap-1"
                >
                  <span className="text-sm">{attraction}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveAttraction(index)}
                    className="text-gray-500 hover:text-red-500"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="bestTimeToVisit">Best Time to Visit</Label>
              <Input
                id="bestTimeToVisit"
                name="bestTimeToVisit"
                value={formData.bestTimeToVisit}
                onChange={handleChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="averageCost">Average Cost</Label>
              <Select
                value={formData.averageCost}
                onValueChange={(value) => handleSelectChange("averageCost", value)}
              >
                <SelectTrigger id="averageCost">
                  <SelectValue placeholder="Select cost level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Low">Low</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="Very High">Very High</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => handleSelectChange("category", value)}
              >
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Beach">Beach</SelectItem>
                  <SelectItem value="Cultural">Cultural</SelectItem>
                  <SelectItem value="Urban">Urban</SelectItem>
                  <SelectItem value="Adventure">Adventure</SelectItem>
                  <SelectItem value="Relaxation">Relaxation</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="imageDescription">Image Description</Label>
              <Input
                id="imageDescription"
                name="imageDescription"
                value={formData.imageDescription}
                onChange={handleChange}
                placeholder="Describe the destination for image"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit">
              {destination ? "Update Destination" : "Add Destination"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DestinationForm;
