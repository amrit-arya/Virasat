import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Heart, Plus, FileText, Calendar, Pill, Activity, ArrowLeft, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

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
  prescribedBy: string;
  startDate: string;
}

const Medical = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showAddRecordForm, setShowAddRecordForm] = useState(false);
  const [showAddMedicationForm, setShowAddMedicationForm] = useState(false);
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
    prescribedBy: "",
    startDate: ""
  });

  const [healthRecords, setHealthRecords] = useState<HealthRecord[]>([
    {
      id: 1,
      type: "Health Checkup",
      provider: "Apollo Hospital",
      date: "2024-01-15",
      status: "Completed",
      notes: "Annual health screening - All normal"
    },
    {
      id: 2,
      type: "Vaccination",
      provider: "City Health Center",
      date: "2023-12-10",
      status: "Completed",
      notes: "COVID-19 Booster Shot"
    }
  ];

  const [medications, setMedications] = useState<Medication[]>([
    {
      id: 1,
      name: "Vitamin D3",
      dosage: "1000 IU",
      frequency: "Once daily",
      prescribedBy: "Dr. Kumar",
      startDate: "2024-01-01"
    },
    {
      id: 2,
      name: "Omega-3",
      dosage: "500mg",
      frequency: "Twice daily",
      prescribedBy: "Dr. Sharma",
      startDate: "2023-11-15"
    }
  ]);

  const recordTypes = [
    "Health Checkup", "Vaccination", "Blood Test", "X-Ray", 
    "MRI Scan", "Surgery", "Dental Checkup", "Eye Checkup", "Other"
  ];

  const medicationFrequencies = [
    "Once daily", "Twice daily", "Three times daily", 
    "Once weekly", "As needed", "Other"
  ];

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

  const handleAddRecord = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!recordFormData.type || !recordFormData.provider || !recordFormData.date) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const newRecord: HealthRecord = {
      id: Date.now(),
      ...recordFormData
    };

    setHealthRecords(prev => [...prev, newRecord]);
    setRecordFormData({ type: "", provider: "", date: "", status: "Completed", notes: "" });
    setShowAddRecordForm(false);

    toast({
      title: "Record added successfully!",
      description: `${recordFormData.type} record has been added.`,
    });
  };

  const handleAddMedication = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!medicationFormData.name || !medicationFormData.dosage || !medicationFormData.frequency || !medicationFormData.prescribedBy) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const newMedication: Medication = {
      id: Date.now(),
      ...medicationFormData
    };

    setMedications(prev => [...prev, newMedication]);
    setMedicationFormData({ name: "", dosage: "", frequency: "", prescribedBy: "", startDate: "" });
    setShowAddMedicationForm(false);

    toast({
      title: "Medication added successfully!",
      description: `${medicationFormData.name} has been added to your medications.`,
    });
  };

  const handleDeleteRecord = (id: number) => {
    setHealthRecords(prev => prev.filter(record => record.id !== id));
    toast({
      title: "Record removed",
      description: "The health record has been removed from your list.",
    });
  };

  const handleDeleteMedication = (id: number) => {
    setMedications(prev => prev.filter(medication => medication.id !== id));
    toast({
      title: "Medication removed",
      description: "The medication has been removed from your list.",
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
                  <Label htmlFor="prescribedBy">Prescribed By</Label>
                  <Input
                    id="prescribedBy"
                    name="prescribedBy"
                    placeholder="e.g., Dr. Kumar"
                    value={medicationFormData.prescribedBy}
                    onChange={handleMedicationChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    id="startDate"
                    name="startDate"
                    type="date"
                    value={medicationFormData.startDate}
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
                <CardDescription>Prescribed by {medication.prescribedBy}</CardDescription>
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
                  <span className="text-sm text-muted-foreground">{medication.startDate}</span>
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