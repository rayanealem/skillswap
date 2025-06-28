import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../AppIcon';
import Button from './Button';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';

const Header = () => {
  const { user, userProfile, signOut, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleSignOut = async () => {
    try {
      const result = await signOut();
      if (result.success) {
        toast.success('Signed out successfully');
        navigate('/login-register');
      } else {
        toast.error(result.error || 'Sign out failed');
      }
    } catch (error) {
      toast.error('Something went wrong during sign out');
      console.log('Sign out error:', error);
    }
    setShowUserMenu(false);
  };

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  const navigationItems = [
    { path: '/dashboard-home', label: 'Home', icon: 'Home' },
    { path: '/skill-marketplace-browse', label: 'Browse Skills', icon: 'Search' },
    { path: '/messages-chat', label: 'Messages', icon: 'MessageSquare' },
  ];

  if (loading) {
    return (
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="h-8 w-32 bg-surface animate-pulse rounded"></div>
          <div className="h-8 w-24 bg-surface animate-pulse rounded"></div>
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link 
          to={user ? "/dashboard-home" : "/login-register"}
          className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
        >
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
            <Icon name="Users" size={20} color="white" />
          </div>
          <span className="text-xl font-bold text-primary">SkillSwap</span>
        </Link>

        {/* Navigation - Desktop */}
        {user && (
          <nav className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActiveRoute(item.path)
                    ? 'bg-primary/10 text-primary' :'text-secondary hover:text-primary hover:bg-surface'
                }`}
              >
                <Icon name={item.icon} size={16} />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        )}

        {/* User Menu or Auth Buttons */}
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              {/* User Menu - Desktop */}
              <div className="hidden md:block relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-surface transition-colors"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                    {userProfile?.avatar_url ? (
                      <img 
                        src={userProfile.avatar_url} 
                        alt="Avatar" 
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <Icon name="User" size={18} color="white" />
                    )}
                  </div>
                  <span className="text-sm font-medium text-primary">
                    {userProfile?.full_name || userProfile?.username || 'User'}
                  </span>
                  <Icon name="ChevronDown" size={16} className="text-secondary" />
                </button>

                {/* User Dropdown */}
                <AnimatePresence>
                  {showUserMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-48 bg-surface border border-border rounded-lg shadow-elevation-3 py-1"
                    >
                      <Link
                        to="/user-profile"
                        onClick={() => setShowUserMenu(false)}
                        className="flex items-center space-x-2 px-4 py-2 text-sm text-secondary hover:text-primary hover:bg-background transition-colors"
                      >
                        <Icon name="User" size={16} />
                        <span>Profile</span>
                      </Link>
                      <Link
                        to="/dashboard-home"
                        onClick={() => setShowUserMenu(false)}
                        className="flex items-center space-x-2 px-4 py-2 text-sm text-secondary hover:text-primary hover:bg-background transition-colors"
                      >
                        <Icon name="Settings" size={16} />
                        <span>Settings</span>
                      </Link>
                      <hr className="my-1 border-border" />
                      <button
                        onClick={handleSignOut}
                        className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-error hover:bg-background transition-colors"
                      >
                        <Icon name="LogOut" size={16} />
                        <span>Sign Out</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="md:hidden p-2 rounded-lg hover:bg-surface transition-colors"
              >
                <Icon name="Menu" size={20} className="text-secondary" />
              </button>
            </>
          ) : (
            /* Auth Buttons for Non-authenticated Users */
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/login-register')}
              >
                Sign In
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => navigate('/login-register')}
              >
                Get Started
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {showMobileMenu && user && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-border bg-background"
          >
            <div className="container mx-auto px-4 py-4 space-y-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setShowMobileMenu(false)}
                  className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                    isActiveRoute(item.path)
                      ? 'bg-primary/10 text-primary' :'text-secondary hover:text-primary hover:bg-surface'
                  }`}
                >
                  <Icon name={item.icon} size={20} />
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}
              
              <hr className="my-2 border-border" />
              
              <Link
                to="/user-profile"
                onClick={() => setShowMobileMenu(false)}
                className="flex items-center space-x-3 p-3 rounded-lg text-secondary hover:text-primary hover:bg-surface transition-colors"
              >
                <Icon name="User" size={20} />
                <span className="font-medium">Profile</span>
              </Link>
              
              <button
                onClick={handleSignOut}
                className="flex items-center space-x-3 w-full p-3 rounded-lg text-error hover:bg-surface transition-colors"
              >
                <Icon name="LogOut" size={20} />
                <span className="font-medium">Sign Out</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Click outside to close dropdowns */}
      {(showUserMenu || showMobileMenu) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setShowUserMenu(false);
            setShowMobileMenu(false);
          }}
        />
      )}
    </header>
  );
};

export default Header;