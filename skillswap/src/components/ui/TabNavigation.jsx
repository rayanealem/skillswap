import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const TabNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isAuthPage = location.pathname === '/login-register';
  
  if (isAuthPage) {
    return null;
  }

  const navigationItems = [
    {
      label: 'Home',
      path: '/dashboard-home',
      icon: 'Home',
      badge: null
    },
    {
      label: 'Browse',
      path: '/skill-marketplace-browse',
      icon: 'Search',
      badge: null
    },
    {
      label: 'Messages',
      path: '/messages-chat',
      icon: 'MessageCircle',
      badge: 3
    },
    {
      label: 'Profile',
      path: '/user-profile',
      icon: 'User',
      badge: null
    }
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  const isActive = (path) => {
    if (path === '/dashboard-home') {
      return location.pathname === '/' || location.pathname === '/dashboard-home';
    }
    return location.pathname === path;
  };

  return (
    <>
      {/* Desktop Navigation - Top */}
      <nav className="hidden md:block fixed top-16 left-0 right-0 z-90 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-8 h-14">
            {navigationItems.map((item) => (
              <Button
                key={item.path}
                variant="ghost"
                onClick={() => handleNavigation(item.path)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 relative ${
                  isActive(item.path)
                    ? 'bg-primary/10 text-primary border border-primary/20' :'text-secondary hover:text-primary hover:bg-surface-secondary'
                }`}
              >
                <Icon 
                  name={item.icon} 
                  size={18} 
                  color={isActive(item.path) ? 'var(--color-primary)' : 'currentColor'} 
                />
                <span className="font-medium">{item.label}</span>
                {item.badge && (
                  <span className="bg-error text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium ml-1">
                    {item.badge}
                  </span>
                )}
              </Button>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile Navigation - Bottom */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-90 bg-background/95 backdrop-blur-sm border-t border-border">
        <div className="flex items-center justify-around h-16 px-4">
          {navigationItems.map((item) => (
            <Button
              key={item.path}
              variant="ghost"
              onClick={() => handleNavigation(item.path)}
              className={`flex flex-col items-center justify-center space-y-1 px-3 py-2 rounded-lg transition-all duration-200 relative min-w-0 flex-1 ${
                isActive(item.path)
                  ? 'text-primary' :'text-secondary hover:text-primary'
              }`}
            >
              <div className="relative">
                <Icon 
                  name={item.icon} 
                  size={20} 
                  color={isActive(item.path) ? 'var(--color-primary)' : 'currentColor'} 
                />
                {item.badge && (
                  <span className="absolute -top-2 -right-2 bg-error text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-medium">
                    {item.badge > 9 ? '9+' : item.badge}
                  </span>
                )}
              </div>
              <span className={`text-xs font-medium truncate ${
                isActive(item.path) ? 'text-primary' : 'text-secondary'
              }`}>
                {item.label}
              </span>
              {isActive(item.path) && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full" />
              )}
            </Button>
          ))}
        </div>
      </nav>

      {/* Spacer for fixed navigation */}
      <div className="hidden md:block h-14" />
      <div className="md:hidden h-16" />
    </>
  );
};

export default TabNavigation;