import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, CheckCircle, XCircle, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AuthCallback = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          setStatus('error');
          setMessage('Authentication failed. Please try again.');
          toast({
            title: "Authentication Failed",
            description: error.message,
            variant: "destructive"
          });
          return;
        }

        if (data.session) {
          setStatus('success');
          setMessage('Email confirmed successfully! Redirecting to dashboard...');
          toast({
            title: "Email Confirmed!",
            description: "Your account has been verified. Welcome to Virasat!",
          });
          
          setTimeout(() => {
            navigate('/dashboard');
          }, 2000);
        } else {
          setStatus('error');
          setMessage('No active session found. Please try signing in again.');
        }
      } catch (error) {
        setStatus('error');
        setMessage('An unexpected error occurred. Please try again.');
        toast({
          title: "Error",
          description: "An unexpected error occurred. Please try again.",
          variant: "destructive"
        });
      }
    };

    handleAuthCallback();
  }, [navigate, toast]);

  const getStatusIcon = () => {
    switch (status) {
      case 'loading':
        return <Loader2 className="h-8 w-8 text-blue-600 animate-spin" />;
      case 'success':
        return <CheckCircle className="h-8 w-8 text-green-600" />;
      case 'error':
        return <XCircle className="h-8 w-8 text-red-600" />;
      default:
        return <Loader2 className="h-8 w-8 text-blue-600 animate-spin" />;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'loading':
        return 'bg-blue-100';
      case 'success':
        return 'bg-green-100';
      case 'error':
        return 'bg-red-100';
      default:
        return 'bg-blue-100';
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center px-4 py-8 relative"
      style={{
        backgroundImage: `url('/uploads/c63d55ff-44f6-4588-a4cd-f0df9ee47bc5.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
      
      {/* Content */}
      <div className="relative z-10 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Shield className="h-8 w-8 text-yellow-400" />
            <span className="text-2xl font-bold text-white">Virasat</span>
          </div>
        </div>

        {/* Status Card */}
        <Card variant="bordered" className="bg-white/95 backdrop-blur-sm border-white/20 shadow-2xl">
          <CardHeader className="text-center">
            <div className={`mx-auto mb-4 p-3 rounded-full w-fit ${getStatusColor()}`}>
              {getStatusIcon()}
            </div>
            <CardTitle className="text-2xl">
              {status === 'loading' && 'Verifying...'}
              {status === 'success' && 'Email Confirmed!'}
              {status === 'error' && 'Verification Failed'}
            </CardTitle>
            <CardDescription className="text-base">
              {message}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {status === 'error' && (
              <div className="space-y-3">
                <Button 
                  onClick={() => navigate('/login')}
                  variant="default" 
                  className="w-full"
                >
                  Go to Login
                </Button>
                
                <Button 
                  onClick={() => navigate('/signup')}
                  variant="outline" 
                  className="w-full"
                >
                  Try Signing Up Again
                </Button>
              </div>
            )}
            
            {status === 'loading' && (
              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  Please wait while we verify your email...
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AuthCallback;
