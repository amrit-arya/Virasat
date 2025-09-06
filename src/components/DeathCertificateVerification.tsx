import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield } from "lucide-react";

interface DeathCertificateVerificationProps {
  onVerify: (url: string) => void;
}

const DeathCertificateVerification = ({ onVerify }: DeathCertificateVerificationProps) => {
  const [certificateUrl, setCertificateUrl] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (certificateUrl.trim()) {
      onVerify(certificateUrl.trim());
      setCertificateUrl("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="certUrl">Government Death Certificate URL</Label>
        <Input
          id="certUrl"
          type="url"
          placeholder="https://example.gov.in/death-certificate/..."
          value={certificateUrl}
          onChange={(e) => setCertificateUrl(e.target.value)}
          required
        />
        <p className="text-sm text-muted-foreground">
          Enter the official URL from a .gov.in domain to verify the death certificate and grant nominee access.
        </p>
      </div>
      
      <Button type="submit" variant="hero" disabled={!certificateUrl.trim()}>
        <Shield className="h-4 w-4 mr-2" />
        Verify & Grant Access
      </Button>
    </form>
  );
};

export { DeathCertificateVerification };