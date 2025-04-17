
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { UploadCloud, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ReportSection: React.FC = () => {
  const [issueDescription, setIssueDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!issueDescription.trim()) {
      toast({
        title: "Required field",
        description: "Please describe the issue before submitting",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // This would connect to your backend API in a real implementation
    setTimeout(() => {
      toast({
        title: "Issue reported",
        description: "We've received your report and will respond shortly",
      });
      setIssueDescription('');
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white mb-1">Report an Issue</h1>
        <p className="text-white/70">
          Let us know about any concerns with your project
        </p>
      </div>
      
      <Card className="bg-navy-300 border-gold/20 text-white shadow-gold/10">
        <CardHeader>
          <CardTitle>Submit an Issue Report</CardTitle>
          <CardDescription className="text-white/60">
            Your report will be sent directly to our production team
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="issue">Describe the issue</Label>
              <Textarea 
                id="issue"
                placeholder="Please provide details about the issue you're experiencing..." 
                value={issueDescription}
                onChange={(e) => setIssueDescription(e.target.value)}
                className="h-32 bg-navy-200 border-navy-100 text-white placeholder:text-white/40"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label>Upload Photos (Optional)</Label>
              <div className="border-2 border-dashed border-white/20 rounded-lg p-6 text-center">
                <UploadCloud size={36} className="mx-auto text-white/40 mb-3" />
                <p className="text-sm text-white/60 mb-3">
                  Drag and drop photos here, or click to select files
                </p>
                <Button 
                  type="button" 
                  variant="outline" 
                  className="text-white border-white/30 hover:bg-navy-100"
                >
                  Select Files
                </Button>
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-gold hover:bg-gold-400 text-navy-500"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="h-4 w-4 border-2 border-navy-500 border-t-transparent rounded-full animate-spin mr-2"></div>
                  Submitting...
                </>
              ) : (
                <>
                  <Send size={16} className="mr-2" />
                  Submit Report
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
      
      <Card className="bg-navy-300 border-gold/20 text-white shadow-gold/10">
        <CardHeader>
          <CardTitle>What to Expect</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p>
              After submitting your report:
            </p>
            <ol className="list-decimal list-inside space-y-2 text-white/80">
              <li>Our production manager will review your submission within 24 hours.</li>
              <li>You'll receive confirmation when your report has been received.</li>
              <li>Our team will contact you to discuss the next steps and possible solutions.</li>
              <li>Any necessary follow-up inspections or repairs will be scheduled promptly.</li>
            </ol>
            <p className="text-white/80">
              For urgent issues requiring immediate attention, please contact our customer service team directly at (555) 123-4567.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportSection;
