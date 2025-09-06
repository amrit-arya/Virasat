import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Home, Plus, MapPin, FileText, IndianRupee, ArrowLeft, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Property {
  id: number;
  type: string;
  address: string;
  area: string;
  value: string;
  registration_number: string | null;
  purchase_date: string | null;
}

interface Vehicle {
  id: number;
  type: string;
  model: string;
  registration_number: string;
  purchase_value: string | null;
  current_value: string | null;
  insurance_expiry: string | null;
}

const Properties = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showAddPropertyForm, setShowAddPropertyForm] = useState(false);
  const [showAddVehicleForm, setShowAddVehicleForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [propertyFormData, setPropertyFormData] = useState({
    type: "",
    address: "",
    area: "",
    value: "",
    registration_number: "",
    purchase_date: ""
  });
  const [vehicleFormData, setVehicleFormData] = useState({
    type: "",
    model: "",
    registration_number: "",
    purchase_value: "",
    current_value: "",
    insurance_expiry: ""
  });

  const [properties, setProperties] = useState<Property[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  const propertyTypes = [
    "Residential House", "Apartment", "Commercial Plot", "Office Space", 
    "Shop", "Warehouse", "Agricultural Land", "Other"
  ];

  const vehicleTypes = [
    "Car", "Motorcycle", "Scooter", "Bicycle", "Truck", "Bus", "Other"
  ];

  // Load data from Supabase on component mount
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Error",
          description: "Please log in to view your data",
          variant: "destructive"
        });
        navigate('/login');
        return;
      }

      // Load properties
      const { data: propertiesData, error: propertiesError } = await supabase
        .from('properties')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (propertiesError) {
        console.error('Error loading properties:', propertiesError);
        toast({
          title: "Error",
          description: "Failed to load properties",
          variant: "destructive"
        });
      } else {
        setProperties(propertiesData || []);
      }

      // Load vehicles
      const { data: vehiclesData, error: vehiclesError } = await supabase
        .from('vehicles')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (vehiclesError) {
        console.error('Error loading vehicles:', vehiclesError);
        toast({
          title: "Error",
          description: "Failed to load vehicles",
          variant: "destructive"
        });
      } else {
        setVehicles(vehiclesData || []);
      }
    } catch (error) {
      console.error('Error loading data:', error);
      toast({
        title: "Error",
        description: "Failed to load data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePropertyChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setPropertyFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleVehicleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setVehicleFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleAddProperty = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!propertyFormData.type || !propertyFormData.address || !propertyFormData.area || !propertyFormData.value) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Error",
          description: "Please log in to add properties",
          variant: "destructive"
        });
        return;
      }

      const { data, error } = await supabase
        .from('properties')
        .insert({
          user_id: user.id,
          type: propertyFormData.type,
          address: propertyFormData.address,
          area: propertyFormData.area,
          value: propertyFormData.value,
          registration_number: propertyFormData.registration_number || null,
          purchase_date: propertyFormData.purchase_date || null
        })
        .select()
        .single();

      if (error) {
        console.error('Error adding property:', error);
        toast({
          title: "Error",
          description: "Failed to add property",
          variant: "destructive"
        });
        return;
      }

      setProperties(prev => [data, ...prev]);
      setPropertyFormData({ type: "", address: "", area: "", value: "", registration_number: "", purchase_date: "" });
      setShowAddPropertyForm(false);

      toast({
        title: "Property added successfully!",
        description: `${propertyFormData.type} has been added to your properties.`,
      });
    } catch (error) {
      console.error('Error adding property:', error);
      toast({
        title: "Error",
        description: "Failed to add property",
        variant: "destructive"
      });
    }
  };

  const handleAddVehicle = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!vehicleFormData.type || !vehicleFormData.model || !vehicleFormData.registration_number) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Error",
          description: "Please log in to add vehicles",
          variant: "destructive"
        });
        return;
      }

      const { data, error } = await supabase
        .from('vehicles')
        .insert({
          user_id: user.id,
          type: vehicleFormData.type,
          model: vehicleFormData.model,
          registration_number: vehicleFormData.registration_number,
          purchase_value: vehicleFormData.purchase_value || null,
          current_value: vehicleFormData.current_value || null,
          insurance_expiry: vehicleFormData.insurance_expiry || null
        })
        .select()
        .single();

      if (error) {
        console.error('Error adding vehicle:', error);
        toast({
          title: "Error",
          description: "Failed to add vehicle",
          variant: "destructive"
        });
        return;
      }

      setVehicles(prev => [data, ...prev]);
      setVehicleFormData({ type: "", model: "", registration_number: "", purchase_value: "", current_value: "", insurance_expiry: "" });
      setShowAddVehicleForm(false);

      toast({
        title: "Vehicle added successfully!",
        description: `${vehicleFormData.type} has been added to your vehicles.`,
      });
    } catch (error) {
      console.error('Error adding vehicle:', error);
      toast({
        title: "Error",
        description: "Failed to add vehicle",
        variant: "destructive"
      });
    }
  };

  const handleDeleteProperty = async (id: number) => {
    try {
      const { error } = await supabase
        .from('properties')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting property:', error);
        toast({
          title: "Error",
          description: "Failed to delete property",
          variant: "destructive"
        });
        return;
      }

      setProperties(prev => prev.filter(property => property.id !== id));
      toast({
        title: "Property removed",
        description: "The property has been removed from your list.",
      });
    } catch (error) {
      console.error('Error deleting property:', error);
      toast({
        title: "Error",
        description: "Failed to delete property",
        variant: "destructive"
      });
    }
  };

  const handleDeleteVehicle = async (id: number) => {
    try {
      const { error } = await supabase
        .from('vehicles')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting vehicle:', error);
        toast({
          title: "Error",
          description: "Failed to delete vehicle",
          variant: "destructive"
        });
        return;
      }

      setVehicles(prev => prev.filter(vehicle => vehicle.id !== id));
      toast({
        title: "Vehicle removed",
        description: "The vehicle has been removed from your list.",
      });
    } catch (error) {
      console.error('Error deleting vehicle:', error);
      toast({
        title: "Error",
        description: "Failed to delete vehicle",
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading your properties and vehicles...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Properties & Assets</h1>
            <p className="text-muted-foreground">Manage your real estate and valuable assets</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="hero" 
            className="flex items-center gap-2"
            onClick={() => setShowAddPropertyForm(true)}
          >
            <Plus className="h-4 w-4" />
            Add Property
          </Button>
          <Button 
            variant="soft" 
            className="flex items-center gap-2"
            onClick={() => setShowAddVehicleForm(true)}
          >
            <Plus className="h-4 w-4" />
            Add Vehicle
          </Button>
        </div>
      </div>

      {/* Add Property Form */}
      {showAddPropertyForm && (
        <Card variant="bordered">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center space-x-2">
                  <Plus className="h-5 w-5" />
                  <span>Add New Property</span>
                </CardTitle>
                <CardDescription>
                  Add a new property to your real estate portfolio
                </CardDescription>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAddPropertyForm(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddProperty} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="propertyType">Property Type</Label>
                  <select
                    id="propertyType"
                    name="type"
                    value={propertyFormData.type}
                    onChange={handlePropertyChange}
                    className="flex h-10 w-full rounded-md border border-input-border bg-input px-3 py-2 text-sm transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-input-border-focus"
                    required
                  >
                    <option value="">Select property type</option>
                    {propertyTypes.map(type => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="area">Area</Label>
                  <Input
                    id="area"
                    name="area"
                    placeholder="e.g., 1,800 sq ft"
                    value={propertyFormData.area}
                    onChange={handlePropertyChange}
                    required
                  />
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    name="address"
                    placeholder="Enter complete address"
                    value={propertyFormData.address}
                    onChange={handlePropertyChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="value">Current Value</Label>
                  <Input
                    id="value"
                    name="value"
                    placeholder="e.g., ₹1,25,00,000"
                    value={propertyFormData.value}
                    onChange={handlePropertyChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="registration_number">Registration Number</Label>
                  <Input
                    id="registration_number"
                    name="registration_number"
                    placeholder="e.g., MH-REG-2019-45678"
                    value={propertyFormData.registration_number}
                    onChange={handlePropertyChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="purchase_date">Purchase Date</Label>
                  <Input
                    id="purchase_date"
                    name="purchase_date"
                    type="date"
                    value={propertyFormData.purchase_date}
                    onChange={handlePropertyChange}
                  />
                </div>
              </div>
              
              <div className="flex justify-end space-x-4">
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => setShowAddPropertyForm(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" variant="hero">
                  Add Property
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Add Vehicle Form */}
      {showAddVehicleForm && (
        <Card variant="bordered">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center space-x-2">
                  <Plus className="h-5 w-5" />
                  <span>Add New Vehicle</span>
                </CardTitle>
                <CardDescription>
                  Add a new vehicle to your assets
                </CardDescription>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAddVehicleForm(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddVehicle} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="vehicleType">Vehicle Type</Label>
                  <select
                    id="vehicleType"
                    name="type"
                    value={vehicleFormData.type}
                    onChange={handleVehicleChange}
                    className="flex h-10 w-full rounded-md border border-input-border bg-input px-3 py-2 text-sm transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-input-border-focus"
                    required
                  >
                    <option value="">Select vehicle type</option>
                    {vehicleTypes.map(type => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="model">Model</Label>
                  <Input
                    id="model"
                    name="model"
                    placeholder="e.g., Honda City 2020"
                    value={vehicleFormData.model}
                    onChange={handleVehicleChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="vehicleRegistrationNumber">Registration Number</Label>
                  <Input
                    id="vehicleRegistrationNumber"
                    name="registration_number"
                    placeholder="e.g., MH-01-AB-1234"
                    value={vehicleFormData.registration_number}
                    onChange={handleVehicleChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="purchaseValue">Purchase Value</Label>
                  <Input
                    id="purchaseValue"
                    name="purchase_value"
                    placeholder="e.g., ₹12,50,000"
                    value={vehicleFormData.purchase_value}
                    onChange={handleVehicleChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="currentValue">Current Value</Label>
                  <Input
                    id="currentValue"
                    name="current_value"
                    placeholder="e.g., ₹8,75,000"
                    value={vehicleFormData.current_value}
                    onChange={handleVehicleChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="insuranceExpiry">Insurance Expiry</Label>
                  <Input
                    id="insuranceExpiry"
                    name="insurance_expiry"
                    type="date"
                    value={vehicleFormData.insurance_expiry}
                    onChange={handleVehicleChange}
                  />
                </div>
              </div>
              
              <div className="flex justify-end space-x-4">
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => setShowAddVehicleForm(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" variant="hero">
                  Add Vehicle
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Real Estate Properties */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Home className="h-5 w-5" />
          Real Estate
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {properties.map((property) => (
            <Card key={property.id} variant="bordered" className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Home className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">{property.type}</CardTitle>
                </div>
                <CardDescription className="flex items-start gap-1">
                  <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  {property.address}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm font-medium block">Area:</span>
                    <span className="text-sm text-muted-foreground">{property.area}</span>
                  </div>
                  <div>
                    <span className="text-sm font-medium block">Value:</span>
                    <span className="text-lg font-bold text-green-600">{property.value}</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Registration:</span>
                    <span className="text-sm text-muted-foreground">{property.registration_number}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Purchase Date:</span>
                    <span className="text-sm text-muted-foreground">{property.purchase_date}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="soft" size="sm" className="flex-1">
                    <FileText className="h-4 w-4 mr-2" />
                    View Documents
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleDeleteProperty(property.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Vehicles */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <IndianRupee className="h-5 w-5" />
          Vehicles
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          {vehicles.map((vehicle) => (
            <Card key={vehicle.id} variant="bordered" className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <IndianRupee className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">{vehicle.type}</CardTitle>
                </div>
                <CardDescription>{vehicle.model}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Registration:</span>
                  <span className="text-sm text-muted-foreground">{vehicle.registration_number}</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm font-medium block">Purchase:</span>
                    <span className="text-sm text-muted-foreground">{vehicle.purchase_value}</span>
                  </div>
                  <div>
                    <span className="text-sm font-medium block">Current:</span>
                    <span className="text-sm font-bold">{vehicle.current_value}</span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Insurance Expiry:</span>
                  <span className="text-sm text-orange-600 font-medium">{vehicle.insurance_expiry}</span>
                </div>
                <div className="flex gap-2 mt-3">
                  <Button variant="outline" size="sm" className="flex-1">
                    <FileText className="h-4 w-4 mr-2" />
                    Manage Documents
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleDeleteVehicle(vehicle.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Properties;