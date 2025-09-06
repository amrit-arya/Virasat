import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, Plus, Eye, EyeOff, Shield, Key, ArrowLeft, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Password {
  id: number;
  service: string;
  username: string;
  password: string;
  category: string;
  last_updated: string;
}

interface SecurityQuestion {
  id: number;
  service: string;
  question: string;
  answer: string;
  category: string;
}

const Pins = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState<{[key: number]: boolean}>({});
  const [showAddPasswordForm, setShowAddPasswordForm] = useState(false);
  const [showAddQuestionForm, setShowAddQuestionForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [passwordFormData, setPasswordFormData] = useState({
    service: "",
    username: "",
    password: "",
    category: "Personal"
  });
  const [questionFormData, setQuestionFormData] = useState({
    service: "",
    question: "",
    answer: "",
    category: "Banking"
  });

  const [passwords, setPasswords] = useState<Password[]>([]);
  const [securityQuestions, setSecurityQuestions] = useState<SecurityQuestion[]>([]);

  const passwordCategories = [
    "Personal", "Financial", "Work", "Social Media", "Shopping", "Other"
  ];

  const questionCategories = [
    "Banking", "Insurance", "Social Media", "Email", "Other"
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

      // Load passwords
      const { data: passwordsData, error: passwordsError } = await supabase
        .from('passwords')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (passwordsError) {
        console.error('Error loading passwords:', passwordsError);
        toast({
          title: "Error",
          description: "Failed to load passwords",
          variant: "destructive"
        });
      } else {
        setPasswords(passwordsData || []);
      }

      // Load security questions
      const { data: questionsData, error: questionsError } = await supabase
        .from('security_questions')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (questionsError) {
        console.error('Error loading security questions:', questionsError);
        toast({
          title: "Error",
          description: "Failed to load security questions",
          variant: "destructive"
        });
      } else {
        setSecurityQuestions(questionsData || []);
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

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setPasswordFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setQuestionFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleAddPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!passwordFormData.service || !passwordFormData.username || !passwordFormData.password) {
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
          description: "Please log in to add passwords",
          variant: "destructive"
        });
        return;
      }

      const { data, error } = await supabase
        .from('passwords')
        .insert({
          user_id: user.id,
          service: passwordFormData.service,
          username: passwordFormData.username,
          password: passwordFormData.password,
          category: passwordFormData.category,
          last_updated: new Date().toISOString().split('T')[0]
        })
        .select()
        .single();

      if (error) {
        console.error('Error adding password:', error);
        toast({
          title: "Error",
          description: "Failed to add password",
          variant: "destructive"
        });
        return;
      }

      setPasswords(prev => [data, ...prev]);
      setPasswordFormData({ service: "", username: "", password: "", category: "Personal" });
      setShowAddPasswordForm(false);

      toast({
        title: "Credential added successfully!",
        description: `${passwordFormData.service} credential has been added.`,
      });
    } catch (error) {
      console.error('Error adding password:', error);
      toast({
        title: "Error",
        description: "Failed to add password",
        variant: "destructive"
      });
    }
  };

  const handleAddQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!questionFormData.service || !questionFormData.question || !questionFormData.answer) {
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
          description: "Please log in to add security questions",
          variant: "destructive"
        });
        return;
      }

      const { data, error } = await supabase
        .from('security_questions')
        .insert({
          user_id: user.id,
          service: questionFormData.service,
          question: questionFormData.question,
          answer: questionFormData.answer,
          category: questionFormData.category
        })
        .select()
        .single();

      if (error) {
        console.error('Error adding security question:', error);
        toast({
          title: "Error",
          description: "Failed to add security question",
          variant: "destructive"
        });
        return;
      }

      setSecurityQuestions(prev => [data, ...prev]);
      setQuestionFormData({ service: "", question: "", answer: "", category: "Banking" });
      setShowAddQuestionForm(false);

      toast({
        title: "Security question added successfully!",
        description: `${questionFormData.service} security question has been added.`,
      });
    } catch (error) {
      console.error('Error adding security question:', error);
      toast({
        title: "Error",
        description: "Failed to add security question",
        variant: "destructive"
      });
    }
  };

  const handleDeletePassword = async (id: number) => {
    try {
      const { error } = await supabase
        .from('passwords')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting password:', error);
        toast({
          title: "Error",
          description: "Failed to delete password",
          variant: "destructive"
        });
        return;
      }

      setPasswords(prev => prev.filter(password => password.id !== id));
      toast({
        title: "Credential removed",
        description: "The credential has been removed from your list.",
      });
    } catch (error) {
      console.error('Error deleting password:', error);
      toast({
        title: "Error",
        description: "Failed to delete password",
        variant: "destructive"
      });
    }
  };

  const handleDeleteQuestion = async (id: number) => {
    try {
      const { error } = await supabase
        .from('security_questions')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting security question:', error);
        toast({
          title: "Error",
          description: "Failed to delete security question",
          variant: "destructive"
        });
        return;
      }

      setSecurityQuestions(prev => prev.filter(question => question.id !== id));
      toast({
        title: "Security question removed",
        description: "The security question has been removed from your list.",
      });
    } catch (error) {
      console.error('Error deleting security question:', error);
      toast({
        title: "Error",
        description: "Failed to delete security question",
        variant: "destructive"
      });
    }
  };

  const togglePasswordVisibility = (id: number) => {
    setShowPassword(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const maskPassword = (password: string, show: boolean) => {
    return show ? password : '•'.repeat(password.length);
  };

  if (loading) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading your passwords and security questions...</p>
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
            <h1 className="text-3xl font-bold">PINs & Passwords</h1>
            <p className="text-muted-foreground">Securely store your important access credentials</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="hero" 
            className="flex items-center gap-2"
            onClick={() => setShowAddPasswordForm(true)}
          >
            <Plus className="h-4 w-4" />
            Add Password
          </Button>
          <Button 
            variant="soft" 
            className="flex items-center gap-2"
            onClick={() => setShowAddQuestionForm(true)}
          >
            <Plus className="h-4 w-4" />
            Add Security Question
          </Button>
        </div>
      </div>

      {/* Add Password Form */}
      {showAddPasswordForm && (
        <Card variant="bordered">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center space-x-2">
                  <Plus className="h-5 w-5" />
                  <span>Add New Password/PIN</span>
                </CardTitle>
                <CardDescription>
                  Securely store a new password or PIN
                </CardDescription>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAddPasswordForm(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddPassword} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="service">Service/Platform</Label>
                  <Input
                    id="service"
                    name="service"
                    placeholder="e.g., Online Banking"
                    value={passwordFormData.service}
                    onChange={handlePasswordChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="username">Username/Account</Label>
                  <Input
                    id="username"
                    name="username"
                    placeholder="e.g., john.doe@email.com"
                    value={passwordFormData.username}
                    onChange={handlePasswordChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Password/PIN</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter password or PIN"
                    value={passwordFormData.password}
                    onChange={handlePasswordChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <select
                    id="category"
                    name="category"
                    value={passwordFormData.category}
                    onChange={handlePasswordChange}
                    className="flex h-10 w-full rounded-md border border-input-border bg-input px-3 py-2 text-sm transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-input-border-focus"
                  >
                    {passwordCategories.map(category => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="flex justify-end space-x-4">
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => setShowAddPasswordForm(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" variant="hero">
                  Add Password
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Add Security Question Form */}
      {showAddQuestionForm && (
        <Card variant="bordered">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center space-x-2">
                  <Plus className="h-5 w-5" />
                  <span>Add New Security Question</span>
                </CardTitle>
                <CardDescription>
                  Store a security question and answer
                </CardDescription>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAddQuestionForm(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddQuestion} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="questionService">Service/Platform</Label>
                  <Input
                    id="questionService"
                    name="service"
                    placeholder="e.g., State Bank of India"
                    value={questionFormData.service}
                    onChange={handleQuestionChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="questionCategory">Category</Label>
                  <select
                    id="questionCategory"
                    name="category"
                    value={questionFormData.category}
                    onChange={handleQuestionChange}
                    className="flex h-10 w-full rounded-md border border-input-border bg-input px-3 py-2 text-sm transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-input-border-focus"
                  >
                    {questionCategories.map(category => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="question">Security Question</Label>
                <Input
                  id="question"
                  name="question"
                  placeholder="e.g., What is your mother's maiden name?"
                  value={questionFormData.question}
                  onChange={handleQuestionChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="answer">Answer</Label>
                <Input
                  id="answer"
                  name="answer"
                  type="password"
                  placeholder="Enter the answer"
                  value={questionFormData.answer}
                  onChange={handleQuestionChange}
                  required
                />
              </div>
              
              <div className="flex justify-end space-x-4">
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => setShowAddQuestionForm(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" variant="hero">
                  Add Security Question
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Passwords & PINs */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Lock className="h-5 w-5" />
          Passwords & PINs
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {passwords.map((password) => (
            <Card key={password.id} variant="bordered" className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Key className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">{password.service}</CardTitle>
                </div>
                <CardDescription>{password.category}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div>
                    <span className="text-sm font-medium block">Username/Account:</span>
                    <span className="text-sm text-muted-foreground">{password.username}</span>
                  </div>
                  <div>
                    <span className="text-sm font-medium block">Password/PIN:</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-mono bg-muted px-2 py-1 rounded flex-1">
                        {maskPassword(password.password, showPassword[password.id] || false)}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => togglePasswordVisibility(password.id)}
                        className="p-1 h-8 w-8"
                      >
                        {showPassword[password.id] ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Last Updated:</span>
                    <span className="text-sm text-muted-foreground">{password.last_updated}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="soft" size="sm" className="flex-1">
                    Edit Details
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleDeletePassword(password.id)}
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

      {/* Security Questions */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Security Questions
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          {securityQuestions.map((item) => (
            <Card key={item.id} variant="bordered" className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">{item.service}</CardTitle>
                </div>
                <CardDescription>{item.category}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <span className="text-sm font-medium block mb-1">Security Question:</span>
                  <p className="text-sm text-muted-foreground italic">{item.question}</p>
                </div>
                <div>
                  <span className="text-sm font-medium block mb-1">Answer:</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-mono bg-muted px-2 py-1 rounded flex-1">
                      {showPassword[item.id] ? item.answer : '•'.repeat(item.answer.length)}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => togglePasswordVisibility(item.id)}
                      className="p-1 h-8 w-8"
                    >
                      {showPassword[item.id] ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    Update Question
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleDeleteQuestion(item.id)}
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

export default Pins;