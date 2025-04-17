
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, UserPlus, Mail, User, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

type RegisterFormProps = {
  redirectTo?: string;
};

const RegisterForm = ({ redirectTo = '/login' }: RegisterFormProps) => {
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
      navigate(redirectTo);
      
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
    <form onSubmit={handleRegister} className="space-y-4">
      <FormField
        id="fullName"
        label="Full Name"
        placeholder="John Doe"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        error={errors.fullName}
        icon={<User size={18} />}
        required
      />
      
      <FormField
        id="username"
        label="Username"
        placeholder="johndoe"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        error={errors.username}
        icon={<User size={18} />}
        required
      />
      
      <FormField
        id="email"
        label="Email"
        type="email"
        placeholder="your.email@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={errors.email}
        icon={<Mail size={18} />}
        required
      />
      
      <PasswordField
        id="password"
        label="Password"
        placeholder="••••••••"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={errors.password}
        showPassword={showPassword}
        toggleVisibility={togglePasswordVisibility}
        required
      />
      
      <PasswordField
        id="confirmPassword"
        label="Confirm Password"
        placeholder="••••••••"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        error={errors.confirmPassword}
        showPassword={showConfirmPassword}
        toggleVisibility={toggleConfirmPasswordVisibility}
        required
      />
      
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
  );
};

type FormFieldProps = {
  id: string;
  label: string;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  icon?: React.ReactNode;
  required?: boolean;
};

const FormField = ({ 
  id, 
  label, 
  type = "text", 
  placeholder, 
  value, 
  onChange, 
  error, 
  icon,
  required 
}: FormFieldProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-white">{label}</Label>
      <div className="relative">
        <Input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`bg-navy-200 border-navy-100 text-white pl-10 ${error ? 'border-red-500' : ''}`}
          required={required}
        />
        {icon && (
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60">
            {icon}
          </span>
        )}
      </div>
      {error && (
        <p className="text-red-400 text-sm mt-1 flex items-center">
          <AlertCircle size={14} className="mr-1" /> {error}
        </p>
      )}
    </div>
  );
};

type PasswordFieldProps = {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  showPassword: boolean;
  toggleVisibility: () => void;
  required?: boolean;
};

const PasswordField = ({
  id,
  label,
  placeholder,
  value,
  onChange,
  error,
  showPassword,
  toggleVisibility,
  required
}: PasswordFieldProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-white">{label}</Label>
      <div className="relative">
        <Input
          id={id}
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`bg-navy-200 border-navy-100 text-white pr-10 ${error ? 'border-red-500' : ''}`}
          required={required}
        />
        <button 
          type="button"
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white"
          onClick={toggleVisibility}
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
      {error && (
        <p className="text-red-400 text-sm mt-1 flex items-center">
          <AlertCircle size={14} className="mr-1" /> {error}
        </p>
      )}
    </div>
  );
};

export default RegisterForm;
