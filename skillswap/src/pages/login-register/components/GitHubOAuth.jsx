import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import toast from 'react-hot-toast';

import authService from '../../../services/authService';

const GitHubOAuth = ({ isLoading, setIsLoading }) => {
  const handleGitHubSignIn = async () => {
    if (isLoading) return;
    
    setIsLoading(true);
    
    try {
      const result = await authService.signInWithOAuth('github');
      
      if (!result.success) {
        toast.error(result.error || 'GitHub sign-in failed');
      }
      // Success will be handled by the auth state change listener
    } catch (error) {
      toast.error('Something went wrong with GitHub sign-in');
      console.log('GitHub OAuth error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-6">
      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-background text-secondary">Or continue with</span>
        </div>
      </div>

      {/* GitHub OAuth Button */}
      <div className="mt-6">
        <Button
          variant="outline"
          onClick={handleGitHubSignIn}
          disabled={isLoading}
          className="w-full py-3 text-base font-medium"
        >
          <Icon name="Github" size={20} className="mr-3" />
          {isLoading ? 'Connecting...' : 'Continue with GitHub'}
        </Button>
      </div>

      {/* Info Text */}
      <p className="mt-4 text-xs text-center text-secondary">
        By signing in, you agree to our{' '}
        <a href="#" className="text-primary hover:text-primary-400 transition-colors">
          Terms of Service
        </a>{' '}
        and{' '}
        <a href="#" className="text-primary hover:text-primary-400 transition-colors">
          Privacy Policy
        </a>
      </p>
    </div>
  );
};

export default GitHubOAuth;