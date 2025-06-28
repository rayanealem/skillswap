import React from 'react';
import Button from '../../../components/ui/Button';

const AuthToggle = ({ activeMode, onModeChange }) => {
  return (
    <div className="flex bg-surface-secondary rounded-lg p-1 mb-8">
      <Button
        variant={activeMode === 'login' ? 'primary' : 'ghost'}
        onClick={() => onModeChange('login')}
        className={`flex-1 py-3 text-sm font-medium transition-all duration-200 ${
          activeMode === 'login' ?'bg-primary text-white shadow-sm' :'text-secondary hover:text-primary'
        }`}
      >
        Sign In
      </Button>
      <Button
        variant={activeMode === 'register' ? 'primary' : 'ghost'}
        onClick={() => onModeChange('register')}
        className={`flex-1 py-3 text-sm font-medium transition-all duration-200 ${
          activeMode === 'register' ?'bg-primary text-white shadow-sm' :'text-secondary hover:text-primary'
        }`}
      >
        Sign Up
      </Button>
    </div>
  );
};

export default AuthToggle;