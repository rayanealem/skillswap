import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import AuthLayout from '../../components/ui/AuthLayout';
import AuthToggle from './components/AuthToggle';
import AuthHeader from './components/AuthHeader';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import GitHubOAuth from './components/GitHubOAuth';

const LoginRegister = () => {
  const [activeMode, setActiveMode] = useState('login');
  const [isLoading, setIsLoading] = useState(false);

  // Handle mode change with smooth transition
  const handleModeChange = (mode) => {
    if (mode !== activeMode && !isLoading) {
      setActiveMode(mode);
    }
  };

  // Prevent scrolling when loading
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isLoading]);

  const formVariants = {
    hidden: { 
      opacity: 0, 
      x: activeMode === 'login' ? -50 : 50,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      x: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    },
    exit: { 
      opacity: 0, 
      x: activeMode === 'login' ? 50 : -50,
      scale: 0.95,
      transition: {
        duration: 0.3,
        ease: "easeIn"
      }
    }
  };

  return (
    <AuthLayout>
      <div className="w-full max-w-md mx-auto">
        {/* Auth Toggle */}
        <AuthToggle 
          activeMode={activeMode} 
          onModeChange={handleModeChange} 
        />

        {/* Auth Header */}
        <AuthHeader activeMode={activeMode} />

        {/* Form Container */}
        <div className="relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeMode}
              variants={formVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="w-full"
            >
              {activeMode === 'login' ? (
                <LoginForm 
                  isLoading={isLoading} 
                  setIsLoading={setIsLoading} 
                />
              ) : (
                <RegisterForm 
                  isLoading={isLoading} 
                  setIsLoading={setIsLoading} 
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* GitHub OAuth */}
        <GitHubOAuth 
          isLoading={isLoading} 
          setIsLoading={setIsLoading} 
        />

        {/* Loading Overlay */}
        <AnimatePresence>
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50"
            >
              <div className="bg-surface border border-border rounded-lg p-6 shadow-elevation-3">
                <div className="flex items-center space-x-3">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                  <span className="text-primary font-medium">
                    {activeMode === 'login' ? 'Signing you in...' : 'Creating your account...'}
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Toast Notifications */}
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 4000,
          style: {
            background: 'var(--color-surface)',
            color: 'var(--color-text-primary)',
            border: '1px solid var(--color-border)',
            borderRadius: '8px',
            fontSize: '14px',
          },
          success: {
            iconTheme: {
              primary: 'var(--color-success)',
              secondary: 'var(--color-surface)',
            },
          },
          error: {
            iconTheme: {
              primary: 'var(--color-error)',
              secondary: 'var(--color-surface)',
            },
          },
        }}
      />
    </AuthLayout>
  );
};

export default LoginRegister;