import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Heart, Plus, FileText, Calendar, Pill, Activity, ArrowLeft, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface HealthRecord {
  id: number;
  type: string;
  provider: string;
  date: string;
  status: string;
  notes: string;
}

interface Medication {
  id: number;
  name: string;
  dosage: string;
  frequency: string;
  prescribed_by: string;
  start_date: string | null;
}

const Medical = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showAddRecordForm, setShowAddRecordForm] = useState(false);
  const [showAddMedicationForm, setShowAddMedicationForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [recordFormData, setRecordFormData] = useState({
    type: "",
    provider: "",
    date: "",
    status: "Completed",
    notes: ""
  });
  const [medicationFormData, setMedicationFormData] = useState({
    name: "",
    dosage: "",
    frequency: "",
    prescribed_by: "",
    start_date: ""
  });

  const [healthRecords, setHealthRecords] = useState<HealthRecord[]>([]);
  const [medications, setMedications] = useState<Medication[]>([]);

  const recordTypes = [
    "Health Checkup", "Vaccination", "Blood Test", "X-Ray", 
    "MRI Scan", "Surgery", "Dental Checkup", "Eye Checkup", "Other"
  ];

  const medicationFrequencies = [
    "Once daily", "Twice daily", "Three times daily", 
    "Once weekly", "As needed", "Other"
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

      // Load health records
      const { data: recordsData, error: recordsError } = await supabase
        .from('health_records')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (recordsError) {
        console.error('Error loading health records:', recordsError);
        toast({
          title: "Error",
          description: "Failed to load health records",
          variant: "destructive"
        });
      } else {
        setHealthRecords(recordsData || []);
      }

      // Load medications
      const { data: medicationsData, error: medicationsError } = await supabase
        .from('medications')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (medicationsError) {
        console.error('Error loading medications:', medicationsError);
        toast({
          title: "Error",
          description: "Failed to load medications",
          variant: "destructive"
        });
      } else {
        setMedications(medicationsData || []);
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

  const handleRecordChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setRecordFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleMedicationChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setMedicationFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleAddRecord = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!recordFormData.type || !recordFormData.provider || !recordFormData.date) {
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
          description: "Please log in to add records",
          variant: "destructive"
        });
        return;
      }

      const { data, error } = await supabase
        .from('health_records')
        .insert({
          user_id: user.id,
          type: recordFormData.type,
          provider: recordFormData.provider,
          date: recordFormData.date,
          status: recordFormData.status,
          notes: recordFormData.notes || null
        })
        .select()
        .single();

      if (error) {
        console.error('Error adding record:', error);
        toast({
          title: "Error",
          description: "Failed to add health record",
          variant: "destructive"
        });
        return;
      }

      setHealthRecords(prev => [data, ...prev]);
      setRecordFormData({ type: "", provider: "", date: "", status: "Completed", notes: "" });
      setShowAddRecordForm(false);

      toast({
        title: "Record added successfully!",
        description: `${recordFormData.type} record has been added.`,
      });
    } catch (error) {
      console.error('Error adding record:', error);
      toast({
        title: "Error",
        description: "Failed to add health record",
        variant: "destructive"
      });
    }
  };

  const handleAddMedication = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!medicationFormData.name || !medicationFormData.dosage || !medicationFormData.frequency || !medicationFormData.prescribed_by) {
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
          description: "Please log in to add medications",
          variant: "destructive"
        });
        return;
      }

      const { data, error } = await supabase
        .from('medications')
        .insert({
          user_id: user.id,
          name: medicationFormData.name,
          dosage: medicationFormData.dosage,
          frequency: medicationFormData.frequency,
          prescribed_by: medicationFormData.prescribed_by,
          start_date: medicationFormData.start_date || null
        })
        .select()
        .single();

      if (error) {
        console.error('Error adding medication:', error);
        toast({
          title: "Error",
          description: "Failed to add medication",
          variant: "destructive"
        });
        return;
      }

      setMedications(prev => [data, ...prev]);
      setMedicationFormData({ name: "", dosage: "", frequency: "", prescribed_by: "", start_date: "" });
      setShowAddMedicationForm(false);

      toast({
        title: "Medication added successfully!",
        description: `${medicationFormData.name} has been added to your medications.`,
      });
    } catch (error) {
      console.error('Error adding medication:', error);
      toast({
        title: "Error",
        description: "Failed to add medication",
        variant: "destructive"
      });
    }
  };

  const handleDeleteRecord = async (id: number) => {
    try {
      const { error } = await supabase
        .from('health_records')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting record:', error);
        toast({
          title: "Error",
          description: "Failed to delete health record",
          variant: "destructive"
        });
        return;
      }

      setHealthRecords(prev => prev.filter(record => record.id !== id));
      toast({
        title: "Record removed",
        description: "The health record has been removed from your list.",
      });
    } catch (error) {
      console.error('Error deleting record:', error);
      toast({
        title: "Error",
        description: "Failed to delete health record",
        variant: "destructive"
      });
    }
  };

  const handleDeleteMedication = async (id: number) => {
    try {
      const { error } = await supabase
        .from('medications')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting medication:', error);
        toast({
          title: "Error",
          description: "Failed to delete medication",
          variant: "destructive"
        });
        return;
      }

      setMedications(prev => prev.filter(medication => medication.id !== id));
      toast({
        title: "Medication removed",
        description: "The medication has been removed from your list.",
      });
    } catch (error) {
      console.error('Error deleting medication:', error);
      toast({
        title: "Error",
        description: "Failed to delete medication",
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading your medical data...</p>
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
            <h1 className="text-3xl font-bold">Medical & Health</h1>
            <p className="text-muted-foreground">Manage your health records and medical documents</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="hero" 
            className="flex items-center gap-2"
            onClick={() => setShowAddRecordForm(true)}
          >
            <Plus className="h-4 w-4" />
            Add Record
          </Button>
          <Button 
            variant="soft" 
            className="flex items-center gap-2"
            onClick={() => setShowAddMedicationForm(true)}
          >
            <Plus className="h-4 w-4" />
            Add Medication
          </Button>
        </div>
      </div>

      {/* Add Record Form */}
      {showAddRecordForm && (
        <Card variant="bordered">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center space-x-2">
                  <Plus className="h-5 w-5" />
                  <span>Add New Health Record</span>
                </CardTitle>
                <CardDescription>
                  Add a new health record to your medical history
                </CardDescription>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAddRecordForm(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddRecord} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="recordType">Record Type</Label>
                  <select
                    id="recordType"
                    name="type"
                    value={recordFormData.type}
                    onChange={handleRecordChange}
                    className="flex h-10 w-full rounded-md border border-input-border bg-input px-3 py-2 text-sm transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-input-border-focus"
                    required
                  >
                    <option value="">Select record type</option>
                    {recordTypes.map(type => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="provider">Healthcare Provider</Label>
                  <Input
                    id="provider"
                    name="provider"
                    placeholder="e.g., Apollo Hospital"
                    value={recordFormData.provider}
                    onChange={handleRecordChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="recordDate">Date</Label>
                  <Input
                    id="recordDate"
                    name="date"
                    type="date"
                    value={recordFormData.date}
                    onChange={handleRecordChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="recordStatus">Status</Label>
                  <select
                    id="recordStatus"
                    name="status"
                    value={recordFormData.status}
                    onChange={handleRecordChange}
                    className="flex h-10 w-full rounded-md border border-input-border bg-input px-3 py-2 text-sm transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-input-border-focus"
                  >
                    <option value="Completed">Completed</option>
                    <option value="Pending">Pending</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <textarea
                  id="notes"
                  name="notes"
                  placeholder="Enter any additional notes or observations..."
                  value={recordFormData.notes}
                  onChange={handleRecordChange}
                  className="flex min-h-[80px] w-full rounded-md border border-input-border bg-input px-3 py-2 text-sm transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-input-border-focus"
                />
              </div>
              
              <div className="flex justify-end space-x-4">
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => setShowAddRecordForm(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" variant="hero">
                  Add Record
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Add Medication Form */}
      {showAddMedicationForm && (
        <Card variant="bordered">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center space-x-2">
                  <Plus className="h-5 w-5" />
                  <span>Add New Medication</span>
                </CardTitle>
                <CardDescription>
                  Add a new medication to your current prescriptions
                </CardDescription>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAddMedicationForm(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddMedication} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="medicationName">Medication Name</Label>
                  <Input
                    id="medicationName"
                    name="name"
                    placeholder="e.g., Vitamin D3"
                    value={medicationFormData.name}
                    onChange={handleMedicationChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="dosage">Dosage</Label>
                  <Input
                    id="dosage"
                    name="dosage"
                    placeholder="e.g., 1000 IU"
                    value={medicationFormData.dosage}
                    onChange={handleMedicationChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="frequency">Frequency</Label>
                  <select
                    id="frequency"
                    name="frequency"
                    value={medicationFormData.frequency}
                    onChange={handleMedicationChange}
                    className="flex h-10 w-full rounded-md border border-input-border bg-input px-3 py-2 text-sm transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-input-border-focus"
                    required
                  >
                    <option value="">Select frequency</option>
                    {medicationFrequencies.map(freq => (
                      <option key={freq} value={freq}>
                        {freq}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="prescribed_by">Prescribed By</Label>
                  <Input
                    id="prescribed_by"
                    name="prescribed_by"
                    placeholder="e.g., Dr. Kumar"
                    value={medicationFormData.prescribed_by}
                    onChange={handleMedicationChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="start_date">Start Date</Label>
                  <Input
                    id="start_date"
                    name="start_date"
                    type="date"
                    value={medicationFormData.start_date}
                    onChange={handleMedicationChange}
                  />
                </div>
              </div>
              
              <div className="flex justify-end space-x-4">
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => setShowAddMedicationForm(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" variant="hero">
                  Add Medication
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Health Records */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Activity className="h-5 w-5" />
          Health Records
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          {healthRecords.map((record) => (
            <Card key={record.id} variant="bordered" className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">{record.type}</CardTitle>
                </div>
                <CardDescription>{record.provider}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Date:</span>
                  <span className="text-sm text-muted-foreground">{record.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Status:</span>
                  <span className="text-sm text-green-600 font-medium">{record.status}</span>
                </div>
                <div className="mt-2">
                  <span className="text-sm font-medium">Notes:</span>
                  <p className="text-sm text-muted-foreground mt-1">{record.notes}</p>
                </div>
                <div className="flex gap-2 mt-3">
                  <Button variant="soft" size="sm" className="flex-1">
                    <FileText className="h-4 w-4 mr-2" />
                    View Report
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleDeleteRecord(record.id)}
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

      {/* Medications */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Pill className="h-5 w-5" />
          Current Medications
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          {medications.map((medication) => (
            <Card key={medication.id} variant="bordered" className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Pill className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">{medication.name}</CardTitle>
                </div>
                <CardDescription>Prescribed by {medication.prescribed_by}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Dosage:</span>
                  <span className="text-sm text-muted-foreground">{medication.dosage}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Frequency:</span>
                  <span className="text-sm text-muted-foreground">{medication.frequency}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Since:</span>
                  <span className="text-sm text-muted-foreground">{medication.start_date}</span>
                </div>
                <div className="flex gap-2 mt-3">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Calendar className="h-4 w-4 mr-2" />
                    Set Reminder
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleDeleteMedication(medication.id)}
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

export default Medical;