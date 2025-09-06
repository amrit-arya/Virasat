import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { 
  Shield, 
  Banknote, 
  Heart, 
  Home, 
  Lock, 
  Users,
  Upload,
  LogOut,
  User
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface DashboardCounts {
  insurance: number;
  banking: number;
  medical: number;
  properties: number;
  pins: number;
  nominees: number;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [counts, setCounts] = useState<DashboardCounts>({
    insurance: 0,
    banking: 0,
    medical: 0,
    properties: 0,
    pins: 0,
    nominees: 0
  });
  const [loading, setLoading] = useState(true);

  // Load counts from database
  useEffect(() => {
    loadCounts();
  }, []);

  const loadCounts = async () => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        navigate('/login');
        return;
      }

      // Fetch counts for all tables
      const [
        { count: insuranceCount },
        { count: bankingCount },
        { count: medicalCount },
        { count: propertiesCount },
        { count: pinsCount },
        { count: nomineesCount }
      ] = await Promise.all([
        supabase.from('insurance_policies').select('*', { count: 'exact', head: true }).eq('user_id', user.id),
        supabase.from('bank_accounts').select('*', { count: 'exact', head: true }).eq('user_id', user.id),
        supabase.from('health_records').select('*', { count: 'exact', head: true }).eq('user_id', user.id),
        supabase.from('properties').select('*', { count: 'exact', head: true }).eq('user_id', user.id),
        supabase.from('passwords').select('*', { count: 'exact', head: true }).eq('user_id', user.id),
        supabase.from('nominees').select('*', { count: 'exact', head: true }).eq('user_id', user.id)
      ]);

      setCounts({
        insurance: insuranceCount || 0,
        banking: bankingCount || 0,
        medical: medicalCount || 0,
        properties: propertiesCount || 0,
        pins: pinsCount || 0,
        nominees: nomineesCount || 0
      });
    } catch (error) {
      console.error('Error loading counts:', error);
      toast({
        title: "Error",
        description: "Failed to load dashboard data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const dashboardCards = [
    { 
      title: "Insurance", 
      description: "Life, health, and property insurance documents",
      icon: Shield, 
      count: `${counts.insurance} polic${counts.insurance === 1 ? 'y' : 'ies'}`,
      path: "/dashboard/insurance"
    },
    { 
      title: "Banking & Investments", 
      description: "Bank accounts, investments, and financial assets",
      icon: Banknote, 
      count: `${counts.banking} account${counts.banking === 1 ? '' : 's'}`,
      path: "/dashboard/banking"
    },
    { 
      title: "Medical & Health", 
      description: "Medical records, prescriptions, and health information",
      icon: Heart, 
      count: `${counts.medical} record${counts.medical === 1 ? '' : 's'}`,
      path: "/dashboard/medical"
    },
    { 
      title: "Properties & Assets", 
      description: "Real estate, vehicles, and valuable assets",
      icon: Home, 
      count: `${counts.properties} propert${counts.properties === 1 ? 'y' : 'ies'}`,
      path: "/dashboard/properties"
    },
    { 
      title: "PINs & Passwords", 
      description: "Secure storage for important passwords and PINs",
      icon: Lock, 
      count: `${counts.pins} entr${counts.pins === 1 ? 'y' : 'ies'}`,
      path: "/dashboard/pins"
    },
    { 
      title: "Nominee Details", 
      description: "Manage your beneficiaries and nominees",
      icon: Users, 
      count: `${counts.nominees} nomine${counts.nominees === 1 ? 'e' : 'es'}`,
      path: "/dashboard/nominees"
    },
  ];

  const handleLogout = () => {
    toast({
      title: "Logged out successfully",
      description: "You have been safely logged out.",
    });
    navigate('/');
  };

  const handleCardClick = (path: string) => {
    navigate(path);
  };

  if (loading) {
    return (
      <SidebarProvider>
        <div className="min-h-screen flex w-full">
          <AppSidebar />
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading your dashboard...</p>
            </div>
          </div>
        </div>
      </SidebarProvider>
    );
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          {/* Top Navbar */}
          <header className="h-16 border-b border-border bg-background px-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <SidebarTrigger />
              <div className="flex items-center space-x-2">
                <Shield className="h-6 w-6 text-primary" />
                <span className="text-lg font-semibold">Virasat Dashboard</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button 
                variant="soft" 
                onClick={() => navigate('/dashboard/upload')}
                className="hidden sm:flex"
              >
                <Upload className="h-4 w-4 mr-2" />
                Upload Documents
              </Button>
              
              <Button variant="ghost" size="icon">
                <User className="h-4 w-4" />
              </Button>
              
              <Button 
                variant="ghost"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 p-6">
            <div className="max-w-7xl mx-auto">
              <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Welcome back!</h1>
                <p className="text-muted-foreground">
                  Manage your digital legacy and keep your important information secure.
                </p>
              </div>

              {/* Quick Actions */}
              <div className="mb-8">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    variant="hero" 
                    onClick={() => navigate('/dashboard/upload')}
                    className="group"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Documents
                  </Button>
                  <Button 
                    variant="soft"
                    onClick={() => navigate('/dashboard/nominees')}
                  >
                    <Users className="h-4 w-4 mr-2" />
                    Manage Nominees
                  </Button>
                </div>
              </div>

              {/* Dashboard Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {dashboardCards.map((card, index) => (
                  <Card 
                    key={index} 
                    variant="bordered" 
                    className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                    onClick={() => handleCardClick(card.path)}
                  >
                    <CardHeader className="pb-3">
                      <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-3">
                        <card.icon className="h-6 w-6 text-primary-foreground" />
                      </div>
                      <CardTitle className="text-lg">{card.title}</CardTitle>
                      <CardDescription>{card.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-sm text-primary font-medium">
                        {card.count}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;