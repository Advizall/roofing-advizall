
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import RegisterForm from './RegisterForm';

const RegisterCard = () => {
  return (
    <Card className="bg-navy-300 border-gold/20 text-white shadow-gold/10">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl font-bold text-gold">Create Account</CardTitle>
        <CardDescription className="text-white/60">
          Enter your details to create a new account
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <RegisterForm />
      </CardContent>
      
      <CardFooter className="flex justify-center pt-0">
        <p className="text-center text-white/70 text-sm">
          Already have an account?{' '}
          <Link to="/login" className="text-gold hover:underline">
            Sign in
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};

export default RegisterCard;
