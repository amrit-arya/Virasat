import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, Plus, FileText, Calendar, ArrowLeft, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface InsurancePolicy {
  id: number;
  type: string;
  provider: string;
  policyNumber: string;
  premium: string;
  maturityDate: string;
  status: string;
}

const Insurance = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    type: "",
    provider: "",
    policyNumber: "",
    premium: "",
    maturityDate: "",
    status: "Active"
  });

  const [insurancePolicies, setInsurancePolicies] = useState<InsurancePolicy[]>([
    {
      id: 1,
      type: "Life Insurance",
      provider: "LIC India",
      policyNumber: "LIC-789456123",
      premium: "₹25,000/year",
      maturityDate: "2045-12-31",
      status: "Active"
    },
    {
      id: 2,
      type: "Health Insurance",
      provider: "Star Health",
      policyNumber: "SH-456789123",
      premium: "₹18,500/year",
      maturityDate: "2024-03-15",
      status: "Active"
    }
  ]);

  const insuranceTypes = [
    "Life Insurance", "Health Insurance", "Motor Insurance", 
    "Home Insurance", "Travel Insurance", "Term Insurance", "Other"
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleAddPolicy = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.type || !formData.provider || !formData.policyNumber || !formData.premium || !formData.maturityDate) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const newPolicy: InsurancePolicy = {
      id: Date.now(),
      ...formData
    };

    setInsurancePolicies(prev => [...prev, newPolicy]);
    setFormData({ type: "", provider: "", policyNumber: "", premium: "", maturityDate: "", status: "Active" });
    setShowAddForm(false);

    toast({
      title: "Policy added successfully!",
      description: `${formData.type} policy has been added.`,
    });
  };

  const handleDeletePolicy = (id: number) => {
    setInsurancePolicies(prev => prev.filter(policy => policy.id !== id));
    toast({
      title: "Policy removed",
      description: "The policy has been removed from your list.",
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
            <h1 className="text-3xl font-bold">Insurance Policies</h1>
            <p className="text-muted-foreground">Manage your insurance documents and policies</p>
          </div>
        </div>
        <Button 
          variant="hero" 
          className="flex items-center gap-2"
          onClick={() => setShowAddForm(true)}
        >
          <Plus className="h-4 w-4" />
          Add Policy
        </Button>
      </div>

      {/* Add Policy Form */}
      {showAddForm && (
        <Card variant="bordered">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center space-x-2">
                  <Plus className="h-5 w-5" />
                  <span>Add New Insurance Policy</span>
                </CardTitle>
                <CardDescription>
                  Add a new insurance policy to your digital locker
                </CardDescription>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAddForm(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddPolicy} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Insurance Type</Label>
                  <select
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="flex h-10 w-full rounded-md border border-input-border bg-input px-3 py-2 text-sm transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-input-border-focus"
                    required
                  >
                    <option value="">Select insurance type</option>
                    {insuranceTypes.map(type => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="provider">Insurance Provider</Label>
                  <Input
                    id="provider"
                    name="provider"
                    placeholder="e.g., LIC India, HDFC Life"
                    value={formData.provider}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="policyNumber">Policy Number</Label>
                  <Input
                    id="policyNumber"
                    name="policyNumber"
                    placeholder="Enter policy number"
                    value={formData.policyNumber}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="premium">Premium Amount</Label>
                  <Input
                    id="premium"
                    name="premium"
                    placeholder="e.g., ₹25,000/year"
                    value={formData.premium}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="maturityDate">Maturity Date</Label>
                  <Input
                    id="maturityDate"
                    name="maturityDate"
                    type="date"
                    value={formData.maturityDate}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="flex h-10 w-full rounded-md border border-input-border bg-input px-3 py-2 text-sm transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-input-border-focus"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Expired">Expired</option>
                  </select>
                </div>
              </div>
              
              <div className="flex justify-end space-x-4">
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => setShowAddForm(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" variant="hero">
                  Add Policy
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {insurancePolicies.map((policy) => (
          <Card key={policy.id} variant="bordered" className="hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg">{policy.type}</CardTitle>
              </div>
              <CardDescription>{policy.provider}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Policy Number:</span>
                  <span className="text-sm text-muted-foreground">{policy.policyNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Premium:</span>
                  <span className="text-sm text-muted-foreground">{policy.premium}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Maturity:</span>
                  <span className="text-sm text-muted-foreground">{policy.maturityDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Status:</span>
                  <span className="text-sm text-green-600 font-medium">{policy.status}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="soft" size="sm" className="flex-1">
                  <FileText className="h-4 w-4 mr-2" />
                  View
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Calendar className="h-4 w-4 mr-2" />
                  Renewal
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => handleDeletePolicy(policy.id)}
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
  );
};

export default Insurance;