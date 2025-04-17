
import { useState } from 'react';
import { Mail, AlertCircle, Check } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  
  const { toast } = useToast();

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setError('Email is required');
      return;
    }
    
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Email is invalid');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      
      if (error) throw error;
      
      setIsSubmitted(true);
      toast({
        title: "Recovery email sent",
        description: "Check your email for the password reset link",
        variant: "default",
      });
      
    } catch (error: any) {
      console.error('Reset password error:', error);
      setError(error.message || "Failed to send recovery email. Please try again.");
      
      toast({
        title: "Reset failed",
        description: error.message || "Failed to send recovery email. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {!isSubmitted ? (
        <form onSubmit={handleResetPassword} className="space-y-4">
          {error && (
            <div className="p-3 bg-red-500/20 border border-red-500/40 rounded-md text-red-200 text-sm flex items-start">
              <AlertCircle size={16} className="mr-2 mt-0.5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="email" className="text-white">Email</Label>
            <div className="relative">
              <Input
                id="email"
                type="email" 
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-navy-200 border-navy-100 text-white pl-10"
                required
              />
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60" size={18} />
            </div>
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-gold hover:bg-gold-400 text-navy-500 font-medium mt-6"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 border-2 border-navy-500 border-t-transparent rounded-full animate-spin"></span>
                Sending...
              </span>
            ) : (
              "Send Reset Link"
            )}
          </Button>
        </form>
      ) : (
        <SuccessMessage email={email} onResend={() => setIsSubmitted(false)} />
      )}
    </>
  );
};

const SuccessMessage = ({ email, onResend }: { email: string, onResend: () => void }) => {
  return (
    <div className="text-center py-6">
      <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
        <Check size={32} className="text-gold" />
      </div>
      <h3 className="text-xl font-medium text-white mb-2">Email Sent</h3>
      <p className="text-white/70 mb-6">
        We've sent a password reset link to <span className="text-gold">{email}</span>. 
        Please check your inbox and spam folder.
      </p>
      <Button 
        type="button"
        variant="outline" 
        className="border-gold/30 text-gold hover:bg-gold/10"
        onClick={onResend}
      >
        Send again
      </Button>
    </div>
  );
};

export default ForgotPasswordForm;
