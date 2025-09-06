import { useState, useEffect } from "react";
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
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  category: string;
  upload_date: string;
  file_path: string;
}

const Upload = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [category, setCategory] = useState("insurance");
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  
  const [documents, setDocuments] = useState<Document[]>([]);

  // Load data from Supabase on component mount
  useEffect(() => {
    loadDocuments();
  }, []);

  const loadDocuments = async () => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Error",
          description: "Please log in to view your documents",
          variant: "destructive"
        });
        navigate('/login');
        return;
      }

      // List files from Supabase Storage
      const { data: files, error } = await supabase.storage
        .from('documents')
        .list(user.id, {
          limit: 100,
          offset: 0,
        });

      if (error) {
        console.error('Error loading documents:', error);
        toast({
          title: "Error",
          description: "Failed to load documents",
          variant: "destructive"
        });
      } else {
        // Convert storage files to document format
        const documentList = files?.map(file => ({
          id: file.id,
          name: file.name,
          type: file.name.split('.').pop()?.toUpperCase() || 'FILE',
          size: formatFileSize(file.metadata?.size || 0),
          category: getCategoryFromPath(file.name),
          upload_date: new Date(file.created_at).toISOString().split('T')[0],
          file_path: `${user.id}/${file.name}`
        })) || [];
        
        setDocuments(documentList);
      }
    } catch (error) {
      console.error('Error loading documents:', error);
      toast({
        title: "Error",
        description: "Failed to load documents",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getCategoryFromPath = (filename: string): string => {
    // Simple categorization based on filename
    if (filename.toLowerCase().includes('insurance')) return 'Insurance';
    if (filename.toLowerCase().includes('bank')) return 'Banking';
    if (filename.toLowerCase().includes('medical') || filename.toLowerCase().includes('health')) return 'Medical';
    if (filename.toLowerCase().includes('property')) return 'Property';
    return 'Other';
  };

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

  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      toast({
        title: "No files selected",
        description: "Please select files to upload",
        variant: "destructive"
      });
      return;
    }

    try {
      setUploading(true);
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Error",
          description: "Please log in to upload documents",
          variant: "destructive"
        });
        return;
      }

      // Upload each file to Supabase Storage
      const uploadPromises = selectedFiles.map(async (file) => {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${file.name}`;
        const filePath = `${user.id}/${fileName}`;

        console.log('Uploading file:', file.name, 'to path:', filePath);

        const { error } = await supabase.storage
          .from('documents')
          .upload(filePath, file);

        if (error) {
          console.error('Upload error for file:', file.name, error);
          throw error;
        }

        console.log('Successfully uploaded:', file.name);

        return {
          id: fileName,
          name: file.name,
          type: fileExt?.toUpperCase() || 'FILE',
          size: formatFileSize(file.size),
          category: getCategoryFromPath(file.name),
          upload_date: new Date().toISOString().split('T')[0],
          file_path: filePath
        };
      });

      const uploadedDocuments = await Promise.all(uploadPromises);
      
      // Update the documents list
      setDocuments(prev => [...uploadedDocuments, ...prev]);
      setSelectedFiles([]);

      toast({
        title: "Upload successful!",
        description: `${selectedFiles.length} file(s) uploaded successfully.`,
      });
    } catch (error: any) {
      console.error('Error uploading files:', error);
      toast({
        title: "Upload failed",
        description: error?.message || "Failed to upload files. Please try again.",
        variant: "destructive"
      });
    } finally {
      setUploading(false);
    }
  };

  const handleDownloadDocument = async (doc: Document) => {
    try {
      const { data, error } = await supabase.storage
        .from('documents')
        .download(doc.file_path);

      if (error) {
        console.error('Error downloading document:', error);
        toast({
          title: "Error",
          description: "Failed to download document",
          variant: "destructive"
        });
        return;
      }

      // Create download link
      const url = URL.createObjectURL(data);
      const link = document.createElement('a');
      link.href = url;
      link.download = doc.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast({
        title: "Download started",
        description: `${doc.name} is being downloaded.`,
      });
    } catch (error: any) {
      console.error('Error downloading document:', error);
      toast({
        title: "Error",
        description: "Failed to download document",
        variant: "destructive"
      });
    }
  };

  const handleViewDocument = async (doc: Document) => {
    try {
      const { data, error } = await supabase.storage
        .from('documents')
        .createSignedUrl(doc.file_path, 3600); // 1 hour expiry

      if (error) {
        console.error('Error creating signed URL:', error);
        toast({
          title: "Error",
          description: "Failed to open document",
          variant: "destructive"
        });
        return;
      }

      // Open document in new tab
      window.open(data.signedUrl, '_blank');

      toast({
        title: "Document opened",
        description: `${doc.name} is opening in a new tab.`,
      });
    } catch (error: any) {
      console.error('Error viewing document:', error);
      toast({
        title: "Error",
        description: "Failed to open document",
        variant: "destructive"
      });
    }
  };

  const handleDeleteDocument = async (doc: Document) => {
    try {
      const { error } = await supabase.storage
        .from('documents')
        .remove([doc.file_path]);

      if (error) {
        console.error('Error deleting document:', error);
        toast({
          title: "Error",
          description: "Failed to delete document",
          variant: "destructive"
        });
        return;
      }

      setDocuments(prev => prev.filter(d => d.id !== doc.id));
      toast({
        title: "Document deleted",
        description: `${doc.name} has been deleted.`,
      });
    } catch (error: any) {
      console.error('Error deleting document:', error);
      toast({
        title: "Error",
        description: "Failed to delete document",
        variant: "destructive"
      });
    }
  };

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    if (extension === 'pdf') return <FileText className="h-5 w-5 text-red-500" />;
    if (['jpg', 'jpeg', 'png', 'gif'].includes(extension || '')) return <Image className="h-5 w-5 text-blue-500" />;
    return <File className="h-5 w-5 text-gray-500" />;
  };

  if (loading) {
    return (
      <SidebarProvider>
        <div className="min-h-screen flex w-full">
          <AppSidebar />
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading your documents...</p>
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
                      disabled={selectedFiles.length === 0 || uploading}
                    >
                      <UploadIcon className="h-4 w-4 mr-2" />
                      {uploading ? 'Uploading...' : 'Upload Documents'}
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
                              {doc.category} • {doc.size} • {doc.upload_date}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleViewDocument(doc)}
                            title="View document"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleDownloadDocument(doc)}
                            title="Download document"
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleDeleteDocument(doc)}
                          >
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