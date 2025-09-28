import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const LoginForm = ({ onLogin }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    emailOrPhone: '',
    password: '',
    role: 'consumer'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showCredentials, setShowCredentials] = useState(false);

  const mockCredentials = {
    consumer: {
      email: 'consumer@ayurtrace.com',
      phone: '+1234567890',
      password: 'consumer123'
    },
    retailer: {
      email: 'retailer@ayurtrace.com',
      phone: '+0987654321',
      password: 'retailer123'
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.emailOrPhone?.trim()) {
      newErrors.emailOrPhone = 'Email or phone number is required';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
      
      if (!emailRegex?.test(formData?.emailOrPhone?.trim()) && !phoneRegex?.test(formData?.emailOrPhone?.trim())) {
        newErrors.emailOrPhone = 'Please enter a valid email or phone number';
      }
    }

    if (!formData?.password?.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData?.role) {
      newErrors.role = 'Please select your role';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulate authentication delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      const selectedRole = formData?.role;
      const credentials = mockCredentials?.[selectedRole];
      
      // Normalize input for comparison (trim and lowercase for email)
      const normalizedInput = formData?.emailOrPhone?.trim();
      const inputIsEmail = normalizedInput?.includes('@');
      const normalizedEmail = inputIsEmail ? normalizedInput?.toLowerCase() : normalizedInput;
      
      const isValidEmail = inputIsEmail && normalizedEmail === credentials?.email?.toLowerCase();
      const isValidPhone = !inputIsEmail && normalizedInput === credentials?.phone;
      const isValidPassword = formData?.password === credentials?.password;

      if ((isValidEmail || isValidPhone) && isValidPassword) {
        const userData = {
          id: selectedRole === 'consumer' ? 'user_001' : 'retailer_001',
          name: selectedRole === 'consumer' ? 'John Smith' : 'Sarah Johnson',
          email: credentials?.email,
          phone: credentials?.phone,
          role: selectedRole,
          verified: true,
          lastLogin: new Date()?.toISOString()
        };

        onLogin(userData);
        
        if (selectedRole === 'consumer') {
          navigate('/consumer-dashboard');
        } else {
          navigate('/retailer-dashboard');
        }
      } else {
        // Enhanced error messages with specific feedback
        let errorMessage = 'Invalid credentials. ';
        
        const userExists = mockCredentials?.[selectedRole];
        if (!userExists) {
          errorMessage += 'Invalid role selected.';
        } else {
          const credentialMatch = isValidEmail || isValidPhone;
          if (!credentialMatch && !isValidPassword) {
            errorMessage += 'Both email/phone and password are incorrect.';
          } else if (!credentialMatch) {
            errorMessage += inputIsEmail ? 
              'Email address not found for this role.' : 
              'Phone number not found for this role.';
          } else if (!isValidPassword) {
            errorMessage += 'Incorrect password.';
          }
        }
        
        setErrors({
          general: errorMessage
        });
      }
    } catch (error) {
      console.error('Authentication error:', error);
      setErrors({
        general: 'Login failed. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickFill = (role) => {
    const credentials = mockCredentials?.[role];
    if (credentials) {
      setFormData({
        emailOrPhone: credentials?.email,
        password: credentials?.password,
        role: role
      });
      setErrors({});
    }
  };

  const handleForgotPassword = () => {
    alert('Forgot password functionality would redirect to password recovery page');
  };

  const handleSignUp = () => {
    alert('Sign up functionality would redirect to registration page');
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-card rounded-2xl shadow-modal p-8 border border-border">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Icon name="Leaf" size={32} color="white" />
          </div>
          <h1 className="text-2xl font-heading font-bold text-foreground mb-2">
            Welcome to AyurTrace
          </h1>
          <p className="text-muted-foreground">
            Sign in to verify authentic Ayurvedic products
          </p>
        </div>

        {/* Development Helper */}
        <div className="mb-6 p-4 bg-muted/30 rounded-lg border border-border">
          <button
            type="button"
            onClick={() => setShowCredentials(!showCredentials)}
            className="flex items-center justify-between w-full text-sm font-medium text-foreground hover:text-primary transition-smooth"
          >
            <div className="flex items-center space-x-2">
              <Icon name="Info" size={16} />
              <span>Demo Credentials</span>
            </div>
            <Icon name={showCredentials ? "ChevronUp" : "ChevronDown"} size={16} />
          </button>
          
          {showCredentials && (
            <div className="mt-3 space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="xs"
                  onClick={() => handleQuickFill('consumer')}
                  disabled={isLoading}
                  className="text-xs"
                >
                  Fill Consumer
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="xs"
                  onClick={() => handleQuickFill('retailer')}
                  disabled={isLoading}
                  className="text-xs"
                >
                  Fill Retailer
                </Button>
              </div>
              
              <div className="text-xs space-y-2">
                <div className="p-2 bg-card rounded border">
                  <p className="font-medium text-foreground mb-1">Consumer:</p>
                  <p className="text-muted-foreground">Email: consumer@ayurtrace.com</p>
                  <p className="text-muted-foreground">Phone: +1234567890</p>
                  <p className="text-muted-foreground">Password: consumer123</p>
                </div>
                
                <div className="p-2 bg-card rounded border">
                  <p className="font-medium text-foreground mb-1">Retailer:</p>
                  <p className="text-muted-foreground">Email: retailer@ayurtrace.com</p>
                  <p className="text-muted-foreground">Phone: +0987654321</p>
                  <p className="text-muted-foreground">Password: retailer123</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* General Error */}
          {errors?.general && (
            <div className="bg-error/10 border border-error/20 rounded-lg p-3 flex items-start space-x-2">
              <Icon name="AlertCircle" size={16} className="text-error mt-0.5 flex-shrink-0" />
              <p className="text-sm text-error">{errors?.general}</p>
            </div>
          )}

          {/* Email/Phone Input */}
          <div>
            <Input
              label="Email or Phone Number"
              type="text"
              placeholder="Enter your email or phone number"
              value={formData?.emailOrPhone}
              onChange={(e) => handleInputChange('emailOrPhone', e?.target?.value)}
              error={errors?.emailOrPhone}
              required
              disabled={isLoading}
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <Input
              label="Password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={formData?.password}
              onChange={(e) => handleInputChange('password', e?.target?.value)}
              error={errors?.password}
              required
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-smooth"
              disabled={isLoading}
            >
              <Icon name={showPassword ? "EyeOff" : "Eye"} size={18} />
            </button>
          </div>

          {/* Role Selection */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-3">
              Select Your Role
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleInputChange('role', 'consumer')}
                disabled={isLoading}
                className={`p-4 rounded-lg border-2 transition-smooth text-left ${
                  formData?.role === 'consumer' ?'border-primary bg-primary/5 text-primary' :'border-border hover:border-primary/50 text-foreground'
                }`}
              >
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="User" size={18} />
                  <span className="font-medium">Consumer</span>
                </div>
                <p className="text-xs opacity-80">
                  Verify product authenticity
                </p>
              </button>

              <button
                type="button"
                onClick={() => handleInputChange('role', 'retailer')}
                disabled={isLoading}
                className={`p-4 rounded-lg border-2 transition-smooth text-left ${
                  formData?.role === 'retailer' ?'border-primary bg-primary/5 text-primary' :'border-border hover:border-primary/50 text-foreground'
                }`}
              >
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="Store" size={18} />
                  <span className="font-medium">Retailer</span>
                </div>
                <p className="text-xs opacity-80">
                  Manage inventory & compliance
                </p>
              </button>
            </div>
            {errors?.role && (
              <p className="text-sm text-error mt-2">{errors?.role}</p>
            )}
          </div>

          {/* Sign In Button */}
          <Button
            type="submit"
            variant="default"
            size="lg"
            fullWidth
            loading={isLoading}
            iconName="LogIn"
            iconPosition="right"
            iconSize={18}
            disabled={isLoading}
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </Button>

          {/* Forgot Password */}
          <div className="text-center">
            <button
              type="button"
              onClick={handleForgotPassword}
              disabled={isLoading}
              className="text-sm text-primary hover:text-primary/80 transition-smooth"
            >
              Forgot your password?
            </button>
          </div>

          {/* Sign Up */}
          <div className="text-center pt-4 border-t border-border">
            <p className="text-sm text-muted-foreground mb-2">
              Don't have an account?
            </p>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleSignUp}
              disabled={isLoading}
              iconName="UserPlus"
              iconPosition="left"
              iconSize={16}
            >
              Create Account
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;