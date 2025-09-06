import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Home, Plus, MapPin, FileText, IndianRupee, ArrowLeft, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface Property {
  id: number;
  type: string;
  address: string;
  area: string;
  value: string;
  registrationNumber: string;
  purchaseDate: string;
}

interface Vehicle {
  id: number;
  type: string;
  model: string;
  registrationNumber: string;
  purchaseValue: string;
  currentValue: string;
  insuranceExpiry: string;
}

const Properties = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showAddPropertyForm, setShowAddPropertyForm] = useState(false);
  const [showAddVehicleForm, setShowAddVehicleForm] = useState(false);
  const [propertyFormData, setPropertyFormData] = useState({
    type: "",
    address: "",
    area: "",
    value: "",
    registrationNumber: "",
    purchaseDate: ""
  });
  const [vehicleFormData, setVehicleFormData] = useState({
    type: "",
    model: "",
    registrationNumber: "",
    purchaseValue: "",
    currentValue: "",
    insuranceExpiry: ""
  });

  const [properties, setProperties] = useState<Property[]>([
    {
      id: 1,
      type: "Residential House",
      address: "123 Green Avenue, Mumbai, Maharashtra",
      area: "1,800 sq ft",
      value: "₹1,25,00,000",
      registrationNumber: "MH-REG-2019-45678",
      purchaseDate: "2019-03-15"
    },
    {
      id: 2,
      type: "Commercial Plot",
      address: "Plot No. 45, Sector 18, Gurgaon, Haryana",
      area: "2,400 sq ft",
      value: "₹85,00,000",
      registrationNumber: "HR-REG-2021-78901",
      purchaseDate: "2021-11-22"
    }
  ];

  const [vehicles, setVehicles] = useState<Vehicle[]>([
    {
      id: 1,
      type: "Car",
      model: "Honda City 2020",
      registrationNumber: "MH-01-AB-1234",
      purchaseValue: "₹12,50,000",
      currentValue: "₹8,75,000",
      insuranceExpiry: "2024-06-15"
    },
    {
      id: 2,
      type: "Motorcycle",
      model: "Royal Enfield Classic 350",
      registrationNumber: "MH-01-CD-5678",
      purchaseValue: "₹1,85,000",
      currentValue: "₹1,25,000",
      insuranceExpiry: "2024-09-10"
    }
  ]);

  const propertyTypes = [
    "Residential House", "Apartment", "Commercial Plot", "Office Space", 
    "Shop", "Warehouse", "Agricultural Land", "Other"
  ];

  const vehicleTypes = [
    "Car", "Motorcycle", "Scooter", "Bicycle", "Truck", "Bus", "Other"
  ];

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

  const handleAddProperty = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!propertyFormData.type || !propertyFormData.address || !propertyFormData.area || !propertyFormData.value) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const newProperty: Property = {
      id: Date.now(),
      ...propertyFormData
    };

    setProperties(prev => [...prev, newProperty]);
    setPropertyFormData({ type: "", address: "", area: "", value: "", registrationNumber: "", purchaseDate: "" });
    setShowAddPropertyForm(false);

    toast({
      title: "Property added successfully!",
      description: `${propertyFormData.type} has been added to your properties.`,
    });
  };

  const handleAddVehicle = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!vehicleFormData.type || !vehicleFormData.model || !vehicleFormData.registrationNumber) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const newVehicle: Vehicle = {
      id: Date.now(),
      ...vehicleFormData
    };

    setVehicles(prev => [...prev, newVehicle]);
    setVehicleFormData({ type: "", model: "", registrationNumber: "", purchaseValue: "", currentValue: "", insuranceExpiry: "" });
    setShowAddVehicleForm(false);

    toast({
      title: "Vehicle added successfully!",
      description: `${vehicleFormData.type} has been added to your vehicles.`,
    });
  };

  const handleDeleteProperty = (id: number) => {
    setProperties(prev => prev.filter(property => property.id !== id));
    toast({
      title: "Property removed",
      description: "The property has been removed from your list.",
    });
  };

  const handleDeleteVehicle = (id: number) => {
    setVehicles(prev => prev.filter(vehicle => vehicle.id !== id));
    toast({
      title: "Vehicle removed",
      description: "The vehicle has been removed from your list.",
    });
  };

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
                  <Label htmlFor="registrationNumber">Registration Number</Label>
                  <Input
                    id="registrationNumber"
                    name="registrationNumber"
                    placeholder="e.g., MH-REG-2019-45678"
                    value={propertyFormData.registrationNumber}
                    onChange={handlePropertyChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="purchaseDate">Purchase Date</Label>
                  <Input
                    id="purchaseDate"
                    name="purchaseDate"
                    type="date"
                    value={propertyFormData.purchaseDate}
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
                    name="registrationNumber"
                    placeholder="e.g., MH-01-AB-1234"
                    value={vehicleFormData.registrationNumber}
                    onChange={handleVehicleChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="purchaseValue">Purchase Value</Label>
                  <Input
                    id="purchaseValue"
                    name="purchaseValue"
                    placeholder="e.g., ₹12,50,000"
                    value={vehicleFormData.purchaseValue}
                    onChange={handleVehicleChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="currentValue">Current Value</Label>
                  <Input
                    id="currentValue"
                    name="currentValue"
                    placeholder="e.g., ₹8,75,000"
                    value={vehicleFormData.currentValue}
                    onChange={handleVehicleChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="insuranceExpiry">Insurance Expiry</Label>
                  <Input
                    id="insuranceExpiry"
                    name="insuranceExpiry"
                    type="date"
                    value={vehicleFormData.insuranceExpiry}
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
                    <span className="text-sm text-muted-foreground">{property.registrationNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Purchase Date:</span>
                    <span className="text-sm text-muted-foreground">{property.purchaseDate}</span>
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
                  <span className="text-sm text-muted-foreground">{vehicle.registrationNumber}</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm font-medium block">Purchase:</span>
                    <span className="text-sm text-muted-foreground">{vehicle.purchaseValue}</span>
                  </div>
                  <div>
                    <span className="text-sm font-medium block">Current:</span>
                    <span className="text-sm font-bold">{vehicle.currentValue}</span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Insurance Expiry:</span>
                  <span className="text-sm text-orange-600 font-medium">{vehicle.insuranceExpiry}</span>
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