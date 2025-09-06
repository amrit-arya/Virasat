import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, Plus, FileText, Calendar, ArrowLeft, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface InsurancePolicy {
  id: number;
  type: string;
  provider: string;
  policy_number: string;
  premium_amount: string;
  coverage_amount: string;
  start_date: string;
  end_date: string;
  status: string;
  created_at: string;
}

const Insurance = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    type: "",
    provider: "",
    policy_number: "",
    premium_amount: "",
    coverage_amount: "",
    start_date: "",
    end_date: "",
    status: "Active"
  });
  const [loading, setLoading] = useState(true);

  const [insurancePolicies, setInsurancePolicies] = useState<InsurancePolicy[]>([]);

  const insuranceTypes = [
    "Life Insurance", "Health Insurance", "Motor Insurance", 
    "Home Insurance", "Travel Insurance", "Term Insurance", "Other"
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

      // Load insurance policies
      const { data: policiesData, error: policiesError } = await supabase
        .from('insurance_policies')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (policiesError) {
        console.error('Error loading insurance policies:', policiesError);
        toast({
          title: "Error",
          description: "Failed to load insurance policies",
          variant: "destructive"
        });
      } else {
        setInsurancePolicies(policiesData || []);
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleAddPolicy = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.type || !formData.provider || !formData.policy_number || !formData.premium_amount || !formData.coverage_amount || !formData.start_date || !formData.end_date) {
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
          description: "Please log in to add policies",
          variant: "destructive"
        });
        return;
      }

      const { data, error } = await supabase
        .from('insurance_policies')
        .insert({
          user_id: user.id,
          type: formData.type,
          provider: formData.provider,
          policy_number: formData.policy_number,
          premium_amount: formData.premium_amount,
          coverage_amount: formData.coverage_amount,
          start_date: formData.start_date,
          end_date: formData.end_date,
          status: formData.status
        })
        .select()
        .single();

      if (error) {
        console.error('Error adding policy:', error);
        toast({
          title: "Error",
          description: "Failed to add policy",
          variant: "destructive"
        });
        return;
      }

      setInsurancePolicies(prev => [data, ...prev]);
      setFormData({ type: "", provider: "", policy_number: "", premium_amount: "", coverage_amount: "", start_date: "", end_date: "", status: "Active" });
      setShowAddForm(false);

      toast({
        title: "Policy added successfully!",
        description: `${formData.type} policy has been added.`,
      });
    } catch (error) {
      console.error('Error adding policy:', error);
      toast({
        title: "Error",
        description: "Failed to add policy",
        variant: "destructive"
      });
    }
  };

  const handleDeletePolicy = async (id: number) => {
    try {
      const { error } = await supabase
        .from('insurance_policies')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting policy:', error);
        toast({
          title: "Error",
          description: "Failed to delete policy",
          variant: "destructive"
        });
        return;
      }

      setInsurancePolicies(prev => prev.filter(policy => policy.id !== id));
      toast({
        title: "Policy removed",
        description: "The policy has been removed from your list.",
      });
    } catch (error) {
      console.error('Error deleting policy:', error);
      toast({
        title: "Error",
        description: "Failed to delete policy",
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your insurance policies...</p>
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
                  <Label htmlFor="policy_number">Policy Number</Label>
                  <Input
                    id="policy_number"
                    name="policy_number"
                    placeholder="Enter policy number"
                    value={formData.policy_number}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="premium_amount">Premium Amount</Label>
                  <Input
                    id="premium_amount"
                    name="premium_amount"
                    placeholder="e.g., ₹25,000/year"
                    value={formData.premium_amount}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="coverage_amount">Coverage Amount</Label>
                  <Input
                    id="coverage_amount"
                    name="coverage_amount"
                    placeholder="e.g., ₹10,00,000"
                    value={formData.coverage_amount}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="start_date">Start Date</Label>
                  <Input
                    id="start_date"
                    name="start_date"
                    type="date"
                    value={formData.start_date}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="end_date">End Date</Label>
                  <Input
                    id="end_date"
                    name="end_date"
                    type="date"
                    value={formData.end_date}
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
                  <span className="text-sm text-muted-foreground">{policy.policy_number}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Premium:</span>
                  <span className="text-sm text-muted-foreground">{policy.premium_amount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Coverage:</span>
                  <span className="text-sm text-muted-foreground">{policy.coverage_amount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Start Date:</span>
                  <span className="text-sm text-muted-foreground">{policy.start_date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">End Date:</span>
                  <span className="text-sm text-muted-foreground">{policy.end_date}</span>
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