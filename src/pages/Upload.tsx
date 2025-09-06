import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { 
  Upload as UploadIcon, 
  FileText, 
  Image, 
  File,
  X,
  Shield,
  Eye,
  Download,
  Trash2,
  ArrowLeft
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  category: string;
  uploadDate: string;
}

const Upload = () => {
  const { toast } = useToast();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [category, setCategory] = useState("insurance");
  
  // Mock uploaded documents
  const [documents] = useState<Document[]>([
    {
      id: "1",
      name: "Life_Insurance_Policy.pdf",
      type: "PDF",
      size: "2.4 MB",
      category: "Insurance",
      uploadDate: "2024-01-15"
    },
    {
      id: "2", 
      name: "Bank_Statement_Jan2024.pdf",
      type: "PDF",
      size: "1.8 MB",
      category: "Banking",
      uploadDate: "2024-01-10"
    },
    {
      id: "3",
      name: "Property_Deed.pdf",
      type: "PDF", 
      size: "3.2 MB",
      category: "Properties",
      uploadDate: "2024-01-05"
    }
  ]);

  const categories = [
    { value: "insurance", label: "Insurance" },
    { value: "banking", label: "Banking & Investments" },
    { value: "medical", label: "Medical & Health" },
    { value: "properties", label: "Properties & Assets" },
    { value: "pins", label: "PINs & Passwords" },
    { value: "other", label: "Other" }
  ];

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setSelectedFiles(prev => [...prev, ...files]);
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleUpload = () => {
    if (selectedFiles.length === 0) {
      toast({
        title: "No files selected",
        description: "Please select files to upload",
        variant: "destructive"
      });
      return;
    }

    // Simulate upload
    toast({
      title: "Upload successful!",
      description: `${selectedFiles.length} file(s) uploaded successfully.`,
    });

    setSelectedFiles([]);
  };

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    if (extension === 'pdf') return <FileText className="h-5 w-5 text-red-500" />;
    if (['jpg', 'jpeg', 'png', 'gif'].includes(extension || '')) return <Image className="h-5 w-5 text-blue-500" />;
    return <File className="h-5 w-5 text-gray-500" />;
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          {/* Top Navbar */}
          <header className="h-16 border-b border-border bg-background px-4 flex items-center">
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
                <span className="text-lg font-semibold">Upload Documents</span>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 p-6">
            <div className="max-w-4xl mx-auto space-y-8">
              
              {/* Upload Section */}
              <Card variant="bordered">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <UploadIcon className="h-5 w-5" />
                    <span>Upload New Documents</span>
                  </CardTitle>
                  <CardDescription>
                    Securely upload your important documents to your digital locker
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  
                  {/* Category Selection */}
                  <div className="space-y-2">
                    <Label htmlFor="category">Document Category</Label>
                    <select
                      id="category"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="flex h-10 w-full rounded-md border border-input-border bg-input px-3 py-2 text-sm transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-input-border-focus"
                    >
                      {categories.map(cat => (
                        <option key={cat.value} value={cat.value}>
                          {cat.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* File Upload */}
                  <div className="space-y-2">
                    <Label htmlFor="file-upload">Select Files</Label>
                    <div className="border-2 border-dashed border-primary/30 rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
                      <UploadIcon className="h-12 w-12 text-primary mx-auto mb-4" />
                      <div className="space-y-2">
                        <p className="text-lg font-medium">Drop files here or click to browse</p>
                        <p className="text-sm text-muted-foreground">
                          Supports PDF, DOC, DOCX, JPG, PNG (Max 10MB per file)
                        </p>
                        <Input
                          id="file-upload"
                          type="file"
                          multiple
                          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                          onChange={handleFileSelect}
                          className="hidden"
                        />
                        <Button 
                          variant="soft" 
                          onClick={() => document.getElementById('file-upload')?.click()}
                        >
                          Choose Files
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Selected Files */}
                  {selectedFiles.length > 0 && (
                    <div className="space-y-2">
                      <Label>Selected Files ({selectedFiles.length})</Label>
                      <div className="space-y-2 max-h-40 overflow-y-auto">
                        {selectedFiles.map((file, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-accent rounded-lg">
                            <div className="flex items-center space-x-3">
                              {getFileIcon(file.name)}
                              <div>
                                <p className="font-medium text-sm">{file.name}</p>
                                <p className="text-xs text-muted-foreground">
                                  {(file.size / (1024 * 1024)).toFixed(2)} MB
                                </p>
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFile(index)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Upload Button */}
                  <div className="flex justify-end">
                    <Button 
                      variant="hero" 
                      onClick={handleUpload}
                      disabled={selectedFiles.length === 0}
                    >
                      <UploadIcon className="h-4 w-4 mr-2" />
                      Upload Documents
                    </Button>
                  </div>

                </CardContent>
              </Card>

              {/* Uploaded Documents */}
              <Card variant="bordered">
                <CardHeader>
                  <CardTitle>Recent Documents</CardTitle>
                  <CardDescription>
                    Your recently uploaded documents
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {documents.map((doc) => (
                      <div key={doc.id} className="flex items-center justify-between p-4 bg-accent/50 rounded-lg hover:bg-accent transition-colors">
                        <div className="flex items-center space-x-3">
                          {getFileIcon(doc.name)}
                          <div>
                            <p className="font-medium">{doc.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {doc.category} • {doc.size} • {doc.uploadDate}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
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

export default Upload;