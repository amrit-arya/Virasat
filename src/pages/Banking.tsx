import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Banknote, Plus, CreditCard, TrendingUp, PiggyBank, ArrowLeft, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface BankAccount {
  id: number;
  type: string;
  bank: string;
  accountNumber: string;
  balance: string;
  status: string;
}

interface Investment {
  id: number;
  type: string;
  scheme?: string;
  company?: string;
  units?: string;
  shares?: string;
  currentValue: string;
  gainLoss: string;
}

const Banking = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showAddAccountForm, setShowAddAccountForm] = useState(false);
  const [showAddInvestmentForm, setShowAddInvestmentForm] = useState(false);
  const [accountFormData, setAccountFormData] = useState({
    type: "",
    bank: "",
    accountNumber: "",
    balance: "",
    status: "Active"
  });
  const [investmentFormData, setInvestmentFormData] = useState({
    type: "",
    scheme: "",
    company: "",
    units: "",
    shares: "",
    currentValue: "",
    gainLoss: ""
  });

  const [accounts, setAccounts] = useState<BankAccount[]>([
    {
      id: 1,
      type: "Savings Account",
      bank: "State Bank of India",
      accountNumber: "****1234",
      balance: "₹2,50,000",
      status: "Active"
    },
    {
      id: 2,
      type: "Fixed Deposit",
      bank: "HDFC Bank",
      accountNumber: "****5678",
      balance: "₹5,00,000",
      status: "Active"
    }
  ];

  const [investments, setInvestments] = useState<Investment[]>([
    {
      id: 1,
      type: "Mutual Fund",
      scheme: "SBI Bluechip Fund",
      units: "1,250",
      currentValue: "₹75,000",
      gainLoss: "+₹15,000"
    },
    {
      id: 2,
      type: "Stocks",
      company: "Reliance Industries",
      shares: "50",
      currentValue: "₹1,25,000",
      gainLoss: "+₹25,000"
    }
  ]);

  const accountTypes = [
    "Savings Account", "Current Account", "Fixed Deposit", 
    "Recurring Deposit", "Credit Card", "Loan Account", "Other"
  ];

  const investmentTypes = [
    "Mutual Fund", "Stocks", "Bonds", "PPF", "NSC", "FD", "Other"
  ];

  const handleAccountChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setAccountFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleInvestmentChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setInvestmentFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleAddAccount = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!accountFormData.type || !accountFormData.bank || !accountFormData.accountNumber || !accountFormData.balance) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const newAccount: BankAccount = {
      id: Date.now(),
      ...accountFormData
    };

    setAccounts(prev => [...prev, newAccount]);
    setAccountFormData({ type: "", bank: "", accountNumber: "", balance: "", status: "Active" });
    setShowAddAccountForm(false);

    toast({
      title: "Account added successfully!",
      description: `${accountFormData.type} account has been added.`,
    });
  };

  const handleAddInvestment = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!investmentFormData.type || !investmentFormData.currentValue) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const newInvestment: Investment = {
      id: Date.now(),
      ...investmentFormData
    };

    setInvestments(prev => [...prev, newInvestment]);
    setInvestmentFormData({ type: "", scheme: "", company: "", units: "", shares: "", currentValue: "", gainLoss: "" });
    setShowAddInvestmentForm(false);

    toast({
      title: "Investment added successfully!",
      description: `${investmentFormData.type} investment has been added.`,
    });
  };

  const handleDeleteAccount = (id: number) => {
    setAccounts(prev => prev.filter(account => account.id !== id));
    toast({
      title: "Account removed",
      description: "The account has been removed from your list.",
    });
  };

  const handleDeleteInvestment = (id: number) => {
    setInvestments(prev => prev.filter(investment => investment.id !== id));
    toast({
      title: "Investment removed",
      description: "The investment has been removed from your list.",
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
            <h1 className="text-3xl font-bold">Banking & Investments</h1>
            <p className="text-muted-foreground">Track your financial assets and investments</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="hero" 
            className="flex items-center gap-2"
            onClick={() => setShowAddAccountForm(true)}
          >
            <Plus className="h-4 w-4" />
            Add Account
          </Button>
          <Button 
            variant="soft" 
            className="flex items-center gap-2"
            onClick={() => setShowAddInvestmentForm(true)}
          >
            <Plus className="h-4 w-4" />
            Add Investment
          </Button>
        </div>
      </div>

      {/* Add Account Form */}
      {showAddAccountForm && (
        <Card variant="bordered">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center space-x-2">
                  <Plus className="h-5 w-5" />
                  <span>Add New Bank Account</span>
                </CardTitle>
                <CardDescription>
                  Add a new bank account to your financial portfolio
                </CardDescription>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAddAccountForm(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddAccount} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="accountType">Account Type</Label>
                  <select
                    id="accountType"
                    name="type"
                    value={accountFormData.type}
                    onChange={handleAccountChange}
                    className="flex h-10 w-full rounded-md border border-input-border bg-input px-3 py-2 text-sm transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-input-border-focus"
                    required
                  >
                    <option value="">Select account type</option>
                    {accountTypes.map(type => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="bank">Bank Name</Label>
                  <Input
                    id="bank"
                    name="bank"
                    placeholder="e.g., State Bank of India"
                    value={accountFormData.bank}
                    onChange={handleAccountChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="accountNumber">Account Number</Label>
                  <Input
                    id="accountNumber"
                    name="accountNumber"
                    placeholder="Enter account number"
                    value={accountFormData.accountNumber}
                    onChange={handleAccountChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="balance">Current Balance</Label>
                  <Input
                    id="balance"
                    name="balance"
                    placeholder="e.g., ₹2,50,000"
                    value={accountFormData.balance}
                    onChange={handleAccountChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="accountStatus">Status</Label>
                  <select
                    id="accountStatus"
                    name="status"
                    value={accountFormData.status}
                    onChange={handleAccountChange}
                    className="flex h-10 w-full rounded-md border border-input-border bg-input px-3 py-2 text-sm transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-input-border-focus"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>
              </div>
              
              <div className="flex justify-end space-x-4">
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => setShowAddAccountForm(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" variant="hero">
                  Add Account
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Add Investment Form */}
      {showAddInvestmentForm && (
        <Card variant="bordered">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center space-x-2">
                  <Plus className="h-5 w-5" />
                  <span>Add New Investment</span>
                </CardTitle>
                <CardDescription>
                  Add a new investment to your portfolio
                </CardDescription>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAddInvestmentForm(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddInvestment} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="investmentType">Investment Type</Label>
                  <select
                    id="investmentType"
                    name="type"
                    value={investmentFormData.type}
                    onChange={handleInvestmentChange}
                    className="flex h-10 w-full rounded-md border border-input-border bg-input px-3 py-2 text-sm transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-input-border-focus"
                    required
                  >
                    <option value="">Select investment type</option>
                    {investmentTypes.map(type => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="scheme">Scheme/Company Name</Label>
                  <Input
                    id="scheme"
                    name="scheme"
                    placeholder="e.g., SBI Bluechip Fund"
                    value={investmentFormData.scheme}
                    onChange={handleInvestmentChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="units">Units/Shares</Label>
                  <Input
                    id="units"
                    name="units"
                    placeholder="e.g., 1,250"
                    value={investmentFormData.units}
                    onChange={handleInvestmentChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="currentValue">Current Value</Label>
                  <Input
                    id="currentValue"
                    name="currentValue"
                    placeholder="e.g., ₹75,000"
                    value={investmentFormData.currentValue}
                    onChange={handleInvestmentChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="gainLoss">Gain/Loss</Label>
                  <Input
                    id="gainLoss"
                    name="gainLoss"
                    placeholder="e.g., +₹15,000"
                    value={investmentFormData.gainLoss}
                    onChange={handleInvestmentChange}
                  />
                </div>
              </div>
              
              <div className="flex justify-end space-x-4">
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => setShowAddInvestmentForm(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" variant="hero">
                  Add Investment
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Banking Accounts */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          Bank Accounts
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          {accounts.map((account) => (
            <Card key={account.id} variant="bordered" className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Banknote className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">{account.type}</CardTitle>
                </div>
                <CardDescription>{account.bank}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Account:</span>
                  <span className="text-sm text-muted-foreground">{account.accountNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Balance:</span>
                  <span className="text-lg font-bold text-green-600">{account.balance}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Status:</span>
                  <span className="text-sm text-green-600 font-medium">{account.status}</span>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => handleDeleteAccount(account.id)}
                  className="w-full mt-3 text-destructive hover:text-destructive"
                >
                  <X className="h-4 w-4 mr-2" />
                  Remove Account
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Investments */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Investments
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          {investments.map((investment) => (
            <Card key={investment.id} variant="bordered" className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <PiggyBank className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">{investment.type}</CardTitle>
                </div>
                <CardDescription>{investment.scheme || investment.company}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Holdings:</span>
                  <span className="text-sm text-muted-foreground">{investment.units || investment.shares}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Current Value:</span>
                  <span className="text-lg font-bold">{investment.currentValue}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Gain/Loss:</span>
                  <span className="text-sm text-green-600 font-medium">{investment.gainLoss}</span>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => handleDeleteInvestment(investment.id)}
                  className="w-full mt-3 text-destructive hover:text-destructive"
                >
                  <X className="h-4 w-4 mr-2" />
                  Remove Investment
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Banking;