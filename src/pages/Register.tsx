
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, EyeOff, UserPlus, Mail, User, Check, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/Footer';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  
  const navigate = useNavigate();
  const { toast } = useToast();

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Email is invalid';
    
    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    
    if (!confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
    else if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    
    if (!fullName) newErrors.fullName = 'Full name is required';
    
    if (!username) newErrors.username = 'Username is required';
    else if (username.length < 3) newErrors.username = 'Username must be at least 3 characters';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    setErrors({});
    
    try {
      // Sign up with Supabase
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            username, // Ensure username is included in the user metadata
          },
        },
      });
      
      if (error) throw error;
      
      // If successful, also update the profiles table with the username
      // This is just an extra step to ensure username is set correctly
      if (data.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .update({ username })
          .eq('id', data.user.id);
          
        if (profileError) {
          console.error('Error updating profile:', profileError);
        }
      }
      
      toast({
        title: "Account created successfully!",
        description: "Please check your email for verification.",
        variant: "default",
      });
      
      // Redirect to login page after successful registration
      navigate('/login');
      
    } catch (error: any) {
      console.error('Registration error:', error);
      
      if (error.message.includes('email')) {
        setErrors({ ...errors, email: error.message });
      } else if (error.message.includes('password')) {
        setErrors({ ...errors, password: error.message });
      } else if (error.message.includes('username')) {
        setErrors({ ...errors, username: error.message });
      } else {
        toast({
          title: "Registration failed",
          description: error.message || "Something went wrong. Please try again.",
          variant: "destructive",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="min-h-screen bg-navy flex flex-col">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center px-4 py-32">
        <div className="w-full max-w-md">
          <Card className="bg-navy-300 border-gold/20 text-white shadow-gold/10">
            <CardHeader className="space-y-1 text-center">
              <CardTitle className="text-2xl font-bold text-gold">Create Account</CardTitle>
              <CardDescription className="text-white/60">
                Enter your details to create a new account
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-white">Full Name</Label>
                  <div className="relative">
                    <Input
                      id="fullName"
                      type="text"
                      placeholder="John Doe"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className={`bg-navy-200 border-navy-100 text-white pl-10 ${errors.fullName ? 'border-red-500' : ''}`}
                      required
                    />
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60" size={18} />
                  </div>
                  {errors.fullName && (
                    <p className="text-red-400 text-sm mt-1 flex items-center">
                      <AlertCircle size={14} className="mr-1" /> {errors.fullName}
                    </p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-white">Username</Label>
                  <div className="relative">
                    <Input
                      id="username"
                      type="text"
                      placeholder="johndoe"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className={`bg-navy-200 border-navy-100 text-white pl-10 ${errors.username ? 'border-red-500' : ''}`}
                      required
                    />
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60" size={18} />
                  </div>
                  {errors.username && (
                    <p className="text-red-400 text-sm mt-1 flex items-center">
                      <AlertCircle size={14} className="mr-1" /> {errors.username}
                    </p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">Email</Label>
                  <div className="relative">
                    <Input
                      id="email"
                      type="email" 
                      placeholder="your.email@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`bg-navy-200 border-navy-100 text-white pl-10 ${errors.email ? 'border-red-500' : ''}`}
                      required
                    />
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60" size={18} />
                  </div>
                  {errors.email && (
                    <p className="text-red-400 text-sm mt-1 flex items-center">
                      <AlertCircle size={14} className="mr-1" /> {errors.email}
                    </p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-white">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={`bg-navy-200 border-navy-100 text-white pr-10 ${errors.password ? 'border-red-500' : ''}`}
                      required
                    />
                    <button 
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-red-400 text-sm mt-1 flex items-center">
                      <AlertCircle size={14} className="mr-1" /> {errors.password}
                    </p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-white">Confirm Password</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className={`bg-navy-200 border-navy-100 text-white pr-10 ${errors.confirmPassword ? 'border-red-500' : ''}`}
                      required
                    />
                    <button 
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white"
                      onClick={toggleConfirmPasswordVisibility}
                    >
                      {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-red-400 text-sm mt-1 flex items-center">
                      <AlertCircle size={14} className="mr-1" /> {errors.confirmPassword}
                    </p>
                  )}
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-gold hover:bg-gold-400 text-navy-500 font-medium mt-6"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <span className="h-4 w-4 border-2 border-navy-500 border-t-transparent rounded-full animate-spin"></span>
                      Creating account...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <UserPlus size={18} />
                      Create Account
                    </span>
                  )}
                </Button>
              </form>
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
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Register;
