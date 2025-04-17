
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import ForgotPasswordForm from './ForgotPasswordForm';

const ForgotPasswordCard = () => {
  return (
    <Card className="bg-navy-300 border-gold/20 text-white shadow-gold/10">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl font-bold text-gold">Reset Password</CardTitle>
        <CardDescription className="text-white/60">
          Enter your email to receive a password reset link
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <ForgotPasswordForm />
      </CardContent>
      
      <CardFooter className="flex justify-center pt-0">
        <Link to="/login" className="text-gold hover:underline flex items-center gap-1 text-sm">
          <ArrowLeft size={16} />
          Back to login
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ForgotPasswordCard;
