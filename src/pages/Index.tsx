import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Users, Archive, ArrowRight, FileText, Lock, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Shield,
      title: "Secure Storage",
      description: "Bank-level security for all your important documents and information"
    },
    {
      icon: Users,
      title: "Family Access", 
      description: "Seamless access for your designated family members when needed"
    },
    {
      icon: Archive,
      title: "Digital Legacy",
      description: "Centralized storage for all your valuable digital assets and memories"
    },
    {
      icon: FileText,
      title: "Document Management",
      description: "Organize and manage all your important documents in one place"
    },
    {
      icon: Lock,
      title: "Privacy Protection",
      description: "Your data remains private and secure with advanced encryption"
    },
    {
      icon: Heart,
      title: "Family Care",
      description: "Ensure your loved ones have access to what they need"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="px-4 lg:px-8 h-16 flex items-center border-b border-border">
        <div className="flex items-center space-x-2">
          <Shield className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold">Virasat</span>
        </div>
        <div className="ml-auto flex items-center space-x-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/login')}
          >
            Login
          </Button>
          <Button 
            onClick={() => navigate('/signup')}
          >
            Get Started
          </Button>
        </div>
      </header>

      {/* Hero Section with Family Image */}
      <section className="px-4 lg:px-8 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                Safeguard your legacy, empower your family
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                The ultimate digital legacy guardian that ensures your important documents, 
                assets, and information are secure and accessible to your loved ones.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg"
                  onClick={() => navigate('/signup')}
                  className="group"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => navigate('/login')}
                >
                  Login
                </Button>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <img 
                src="/lovable-uploads/c63d55ff-44f6-4588-a4cd-f0df9ee47bc5.png" 
                alt="Family legacy and care illustration showing a mother with children representing the importance of protecting family heritage"
                className="max-w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 lg:px-8 py-20 bg-muted/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Protect What Matters Most
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 lg:px-8 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to secure your legacy?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of families who trust Virasat to protect their most valuable information.
          </p>
          <Button 
            size="lg"
            onClick={() => navigate('/signup')}
            className="group"
          >
            Start Your Journey
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 lg:px-8 py-8 border-t border-border">
        <div className="max-w-6xl mx-auto text-center text-muted-foreground">
          <p>&copy; 2024 Virasat - The Legacy Guardian. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;