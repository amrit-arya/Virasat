import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { DeathCertificateVerification } from "@/components/DeathCertificateVerification";
import { 
  Users, 
  Plus, 
  Shield,
  Edit,
  Trash2,
  Mail,
  Phone,
  User,
  ArrowLeft
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Nominee {
  id: string;
  name: string;
  relation: string;
  email: string;
  phone: string;
  addedDate: string;
}

const Nominees = () => {
  const { toast } = useToast();
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    relation: "",
    email: "",
    phone: "",
    deathCertificateUrl: ""
  });

  // Mock nominees data
  const [nominees, setNominees] = useState<Nominee[]>([
    {
      id: "1",
      name: "Sarah Johnson",
      relation: "Spouse",
      email: "sarah.johnson@email.com", 
      phone: "+1 (555) 123-4567",
      addedDate: "2024-01-15"
    },
    {
      id: "2",
      name: "Michael Johnson",
      relation: "Son",
      email: "michael.j@email.com",
      phone: "+1 (555) 765-4321", 
      addedDate: "2024-01-10"
    },
    {
      id: "3",
      name: "Emily Johnson",
      relation: "Daughter",
      email: "emily.johnson@email.com",
      phone: "+1 (555) 987-6543",
      addedDate: "2024-01-05"
    }
  ]);

  const relations = [
    "Spouse", "Son", "Daughter", "Father", "Mother", 
    "Brother", "Sister", "Friend", "Other"
  ];
  
  const [accessRequests, setAccessRequests] = useState<any[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleAddNominee = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.relation || !formData.email || !formData.phone) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const newNominee: Nominee = {
      id: Date.now().toString(),
      ...formData,
      addedDate: new Date().toISOString().split('T')[0]
    };

    setNominees(prev => [...prev, newNominee]);
    setFormData({ name: "", relation: "", email: "", phone: "", deathCertificateUrl: "" });
    setShowAddForm(false);

    toast({
      title: "Nominee added successfully!",
      description: `${formData.name} has been added as your nominee.`,
    });
  };

  const handleAccessRequest = (deathCertUrl: string) => {
    // Validate .gov.in domain
    try {
      const url = new URL(deathCertUrl);
      const domain = url.hostname.toLowerCase();
      
      if (!domain.endsWith('.gov.in')) {
        toast({
          title: "Invalid Certificate URL",
          description: "Death certificate must be from an official .gov.in domain",
          variant: "destructive"
        });
        return;
      }
      
      // Grant access
      toast({
        title: "Access Granted!",
        description: "Death certificate verified. Nominee access has been granted.",
      });
      
      // Add to access requests (mock)
      const newRequest = {
        id: Date.now().toString(),
        url: deathCertUrl,
        verified: true,
        timestamp: new Date().toISOString()
      };
      setAccessRequests(prev => [...prev, newRequest]);
      
    } catch (error) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid URL for the death certificate",
        variant: "destructive"
      });
    }
  };

  const handleDeleteNominee = (id: string) => {
    setNominees(prev => prev.filter(nominee => nominee.id !== id));
    toast({
      title: "Nominee removed",
      description: "The nominee has been removed from your list.",
    });
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          {/* Top Navbar */}
          <header className="h-16 border-b border-border bg-background px-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <SidebarTrigger />
              <Button
                variant="ghost"
                onClick={() => window.location.href = '/dashboard'}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Dashboard
              </Button>
              <div className="flex items-center space-x-2">
                <Shield className="h-6 w-6 text-primary" />
                <span className="text-lg font-semibold">Nominee Management</span>
              </div>
            </div>
            
            <Button 
              variant="hero" 
              onClick={() => setShowAddForm(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Nominee
            </Button>
          </header>

          {/* Main Content */}
          <main className="flex-1 p-6">
            <div className="max-w-4xl mx-auto space-y-8">
              
              {/* Header */}
              <div className="text-center">
                <h1 className="text-3xl font-bold mb-2">Nominee Management</h1>
                <p className="text-muted-foreground">
                  Manage your beneficiaries who will have access to your digital legacy
                </p>
              </div>

              {/* Death Certificate Verification Section */}
              <Card variant="bordered">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="h-5 w-5" />
                    <span>Access Request Verification</span>
                  </CardTitle>
                  <CardDescription>
                    Nominees can request access by providing a Government Death Certificate URL
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <DeathCertificateVerification onVerify={handleAccessRequest} />
                </CardContent>
              </Card>

              {/* Add Nominee Form */}
              {showAddForm && (
                <Card variant="bordered">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Plus className="h-5 w-5" />
                      <span>Add New Nominee</span>
                    </CardTitle>
                    <CardDescription>
                      Add a trusted person who will have access to your information
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleAddNominee} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input
                            id="name"
                            name="name"
                            placeholder="Enter full name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="relation">Relation</Label>
                          <select
                            id="relation"
                            name="relation"
                            value={formData.relation}
                            onChange={handleChange}
                            className="flex h-10 w-full rounded-md border border-input-border bg-input px-3 py-2 text-sm transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-input-border-focus"
                            required
                          >
                            <option value="">Select relation</option>
                            {relations.map(relation => (
                              <option key={relation} value={relation}>
                                {relation}
                              </option>
                            ))}
                          </select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="nominee@email.com"
                            value={formData.email}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            placeholder="+1 (555) 123-4567"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="deathCertificateUrl">Death Certificate URL (Optional)</Label>
                          <Input
                            id="deathCertificateUrl"
                            name="deathCertificateUrl"
                            type="url"
                            placeholder="https://example.gov.in/certificate/..."
                            value={formData.deathCertificateUrl}
                            onChange={handleChange}
                          />
                          <p className="text-xs text-muted-foreground">
                            URL to official government death certificate (.gov.in domain required for access)
                          </p>
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
                          Add Nominee
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              )}

              {/* Nominees List */}
              <Card variant="bordered">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="h-5 w-5" />
                    <span>Your Nominees ({nominees.length})</span>
                  </CardTitle>
                  <CardDescription>
                    People who will have access to your information
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {nominees.map((nominee, index) => (
                      <div 
                        key={nominee.id} 
                        className={`p-4 rounded-lg border transition-colors ${
                          index % 2 === 0 ? 'bg-primary-soft' : 'bg-background'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                              <User className="h-6 w-6 text-primary-foreground" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-lg">{nominee.name}</h3>
                              <p className="text-sm text-muted-foreground">{nominee.relation}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-4">
                            <div className="hidden sm:block text-right">
                              <div className="flex items-center text-sm text-muted-foreground mb-1">
                                <Mail className="h-4 w-4 mr-2" />
                                {nominee.email}
                              </div>
                              <div className="flex items-center text-sm text-muted-foreground">
                                <Phone className="h-4 w-4 mr-2" />
                                {nominee.phone}
                              </div>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              <Button variant="ghost" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => handleDeleteNominee(nominee.id)}
                              >
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            </div>
                          </div>
                        </div>
                        
                        {/* Mobile view contact info */}
                        <div className="sm:hidden mt-3 pt-3 border-t border-border space-y-1">
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Mail className="h-4 w-4 mr-2" />
                            {nominee.email}
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Phone className="h-4 w-4 mr-2" />
                            {nominee.phone}
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {nominees.length === 0 && (
                      <div className="text-center py-12">
                        <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-medium mb-2">No nominees added yet</h3>
                        <p className="text-muted-foreground mb-4">
                          Add your first nominee to start securing your digital legacy
                        </p>
                        <Button 
                          variant="hero"
                          onClick={() => setShowAddForm(true)}
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add Your First Nominee
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Nominees;