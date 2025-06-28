import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const AuthLayout = ({ children }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Auth Header */}
      <header className="flex items-center justify-between p-6 lg:p-8">
        <div className="flex items-center cursor-pointer" onClick={() => navigate('/dashboard-home')}>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
              <Icon name="Zap" size={24} color="white" />
            </div>
            <span className="text-2xl font-bold text-gradient">SkillSwap</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="bg-surface border border-border rounded-2xl shadow-elevation-3 p-8">
            {children}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-6 text-center">
        <p className="text-sm text-secondary">
          © 2024 SkillSwap. Empowering peer-to-peer learning.
        </p>
      </footer>
    </div>
  );
};

export default AuthLayout;