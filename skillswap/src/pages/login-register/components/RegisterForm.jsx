import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import toast from 'react-hot-toast';
import { useAuth } from '../../../contexts/AuthContext';

const RegisterForm = ({ isLoading, setIsLoading }) => {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    university: '',
    major: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.university.trim()) {
      newErrors.university = 'University is required';
    }
    
    if (!formData.major.trim()) {
      newErrors.major = 'Major is required';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fix the errors below');
      return;
    }

    setIsLoading(true);

    try {
      const result = await signUp(formData.email, formData.password, {
        fullName: formData.fullName,
        username: formData.email.split('@')[0],
        university: formData.university,
        major: formData.major,
        role: 'student'
      });
      
      if (result.success) {
        toast.success('Account created successfully! Please check your email to verify your account.');
        navigate('/dashboard-home');
      } else {
        toast.error(result.error || 'Registration failed');
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
      console.log('Registration error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Full Name Field */}
      <div>
        <label htmlFor="fullName" className="block text-sm font-medium text-primary mb-2">
          Full Name
        </label>
        <div className="relative">
          <Input
            id="fullName"
            name="fullName"
            type="text"
            value={formData.fullName}
            onChange={handleInputChange}
            placeholder="Enter your full name"
            className={`w-full pl-10 ${errors.fullName ? 'border-error focus:ring-error' : ''}`}
            disabled={isLoading}
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon name="User" size={18} color={errors.fullName ? 'var(--color-error)' : 'var(--color-text-secondary)'} />
          </div>
        </div>
        {errors.fullName && (
          <p className="mt-1 text-sm text-error flex items-center">
            <Icon name="AlertCircle" size={14} className="mr-1" />
            {errors.fullName}
          </p>
        )}
      </div>

      {/* Email Field */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-primary mb-2">
          Email Address
        </label>
        <div className="relative">
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter your university email"
            className={`w-full pl-10 ${errors.email ? 'border-error focus:ring-error' : ''}`}
            disabled={isLoading}
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon name="Mail" size={18} color={errors.email ? 'var(--color-error)' : 'var(--color-text-secondary)'} />
          </div>
        </div>
        {errors.email && (
          <p className="mt-1 text-sm text-error flex items-center">
            <Icon name="AlertCircle" size={14} className="mr-1" />
            {errors.email}
          </p>
        )}
      </div>

      {/* University and Major Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="university" className="block text-sm font-medium text-primary mb-2">
            University
          </label>
          <div className="relative">
            <Input
              id="university"
              name="university"
              type="text"
              value={formData.university}
              onChange={handleInputChange}
              placeholder="Your university"
              className={`w-full pl-10 ${errors.university ? 'border-error focus:ring-error' : ''}`}
              disabled={isLoading}
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Icon name="GraduationCap" size={18} color={errors.university ? 'var(--color-error)' : 'var(--color-text-secondary)'} />
            </div>
          </div>
          {errors.university && (
            <p className="mt-1 text-sm text-error flex items-center">
              <Icon name="AlertCircle" size={14} className="mr-1" />
              {errors.university}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="major" className="block text-sm font-medium text-primary mb-2">
            Major
          </label>
          <div className="relative">
            <Input
              id="major"
              name="major"
              type="text"
              value={formData.major}
              onChange={handleInputChange}
              placeholder="Your major"
              className={`w-full pl-10 ${errors.major ? 'border-error focus:ring-error' : ''}`}
              disabled={isLoading}
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Icon name="BookOpen" size={18} color={errors.major ? 'var(--color-error)' : 'var(--color-text-secondary)'} />
            </div>
          </div>
          {errors.major && (
            <p className="mt-1 text-sm text-error flex items-center">
              <Icon name="AlertCircle" size={14} className="mr-1" />
              {errors.major}
            </p>
          )}
        </div>
      </div>

      {/* Password Field */}
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-primary mb-2">
          Password
        </label>
        <div className="relative">
          <Input
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Create a strong password"
            className={`w-full pl-10 pr-10 ${errors.password ? 'border-error focus:ring-error' : ''}`}
            disabled={isLoading}
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon name="Lock" size={18} color={errors.password ? 'var(--color-error)' : 'var(--color-text-secondary)'} />
          </div>
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            disabled={isLoading}
          >
            <Icon 
              name={showPassword ? 'EyeOff' : 'Eye'} 
              size={18} 
              color="var(--color-text-secondary)"
              className="hover:text-primary transition-colors"
            />
          </button>
        </div>
        {errors.password && (
          <p className="mt-1 text-sm text-error flex items-center">
            <Icon name="AlertCircle" size={14} className="mr-1" />
            {errors.password}
          </p>
        )}
      </div>

      {/* Confirm Password Field */}
      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-primary mb-2">
          Confirm Password
        </label>
        <div className="relative">
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type={showConfirmPassword ? 'text' : 'password'}
            value={formData.confirmPassword}
            onChange={handleInputChange}
            placeholder="Confirm your password"
            className={`w-full pl-10 pr-10 ${errors.confirmPassword ? 'border-error focus:ring-error' : ''}`}
            disabled={isLoading}
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon name="Lock" size={18} color={errors.confirmPassword ? 'var(--color-error)' : 'var(--color-text-secondary)'} />
          </div>
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            disabled={isLoading}
          >
            <Icon 
              name={showConfirmPassword ? 'EyeOff' : 'Eye'} 
              size={18} 
              color="var(--color-text-secondary)"
              className="hover:text-primary transition-colors"
            />
          </button>
        </div>
        {errors.confirmPassword && (
          <p className="mt-1 text-sm text-error flex items-center">
            <Icon name="AlertCircle" size={14} className="mr-1" />
            {errors.confirmPassword}
          </p>
        )}
      </div>

      {/* Terms Agreement */}
      <div>
        <label className="flex items-start">
          <Input
            type="checkbox"
            name="agreeToTerms"
            checked={formData.agreeToTerms}
            onChange={handleInputChange}
            className={`w-4 h-4 text-primary border-border rounded focus:ring-primary mt-1 ${errors.agreeToTerms ? 'border-error' : ''}`}
            disabled={isLoading}
          />
          <span className="ml-2 text-sm text-secondary">
            I agree to the{' '}
            <a href="#" className="text-primary hover:text-primary-400 transition-colors">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" className="text-primary hover:text-primary-400 transition-colors">
              Privacy Policy
            </a>
          </span>
        </label>
        {errors.agreeToTerms && (
          <p className="mt-1 text-sm text-error flex items-center">
            <Icon name="AlertCircle" size={14} className="mr-1" />
            {errors.agreeToTerms}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        variant="primary"
        loading={isLoading}
        className="w-full py-3 text-base font-medium"
        disabled={isLoading}
      >
        {isLoading ? 'Creating Account...' : 'Create Account'}
      </Button>
    </form>
  );
};

export default RegisterForm;