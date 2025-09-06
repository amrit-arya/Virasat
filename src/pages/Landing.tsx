import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Users, Archive, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Shield,
      title: "Secure Storage",
      description: "Bank-level security for all your important documents and information"
    },
    {
      icon: Users,
      title: "Nominee Access", 
      description: "Seamless access for your designated nominees when needed"
    },
    {
      icon: Archive,
      title: "Digital Locker",
      description: "Centralized storage for all your valuable digital assets"
    }
  ];

  return (
    <div 
      className="min-h-screen bg-background relative"
      style={{
        backgroundImage: "url('/lovable-uploads/548da3f2-3829-4105-83ff-232d937bd26c.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}
    >
      {/* Low opacity overlay */}
      <div className="absolute inset-0 bg-background/90"></div>
      
      {/* Content wrapper */}
      <div className="relative z-10">
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
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-4 lg:px-8 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            Safeguard your legacy, empower your family
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            The ultimate digital legacy guardian that ensures your important documents, 
            assets, and information are secure and accessible to your loved ones.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="hero" 
              size="xl"
              onClick={() => navigate('/signup')}
              className="group"
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              variant="soft" 
              size="xl"
              onClick={() => navigate('/login')}
            >
              Login
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 lg:px-8 py-20 bg-primary-soft">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Protect What Matters Most
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} variant="bordered" className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
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
            variant="hero" 
            size="xl"
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
    </div>
  );
};

export default Landing;