
import React from "react";
import { motion } from "framer-motion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import Layout from "@/components/layout/Layout";

const Settings = () => {
  const { toast } = useToast();
  
  const handleSaveSettings = (e) => {
    e.preventDefault();
    
    toast({
      title: "Settings Saved",
      description: "Your settings have been saved successfully.",
      duration: 3000
    });
  };
  
  const handleExportData = () => {
    toast({
      title: "Data Exported",
      description: "Your data has been exported successfully.",
      duration: 3000
    });
  };
  
  const handleImportData = () => {
    toast({
      title: "Data Imported",
      description: "Your data has been imported successfully.",
      duration: 3000
    });
  };
  
  const handleClearData = () => {
    toast({
      title: "Data Cleared",
      description: "All data has been cleared successfully.",
      duration: 3000
    });
  };
  
  return (
    <Layout title="Settings">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="data">Data Management</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>
                  Manage your agency information and preferences.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSaveSettings} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="agencyName">Agency Name</Label>
                    <Input id="agencyName" defaultValue="Travel Agency" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Contact Email</Label>
                    <Input id="email" type="email" defaultValue="contact@travelagency.com" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Contact Phone</Label>
                    <Input id="phone" defaultValue="+1 (555) 123-4567" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" defaultValue="123 Travel Street, City, Country" />
                  </div>
                  
                  <Button type="submit">Save Settings</Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>
                  Manage your account information and security.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSaveSettings} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input id="username" defaultValue="admin" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input id="currentPassword" type="password" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input id="newPassword" type="password" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input id="confirmPassword" type="password" />
                  </div>
                  
                  <Button type="submit">Update Account</Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="data">
            <Card>
              <CardHeader>
                <CardTitle>Data Management</CardTitle>
                <CardDescription>
                  Export, import, or clear your CRM data.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Export Data</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-500 mb-4">
                        Export all your CRM data as a JSON file for backup or migration.
                      </p>
                      <Button onClick={handleExportData}>Export Data</Button>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Import Data</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-500 mb-4">
                        Import CRM data from a JSON file to restore or migrate.
                      </p>
                      <Button onClick={handleImportData}>Import Data</Button>
                    </CardContent>
                  </Card>
                </div>
                
                <Card className="border-red-200">
                  <CardHeader>
                    <CardTitle className="text-base text-red-600">Danger Zone</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500 mb-4">
                      Clear all CRM data. This action cannot be undone.
                    </p>
                    <Button variant="destructive" onClick={handleClearData}>
                      Clear All Data
                    </Button>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </Layout>
  );
};

export default Settings;
