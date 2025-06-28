import React from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const ContextualActionBar = ({ 
  title, 
  actions = [], 
  showBackButton = false, 
  onBack,
  className = '' 
}) => {
  const location = useLocation();

  const getDefaultActions = () => {
    switch (location.pathname) {
      case '/skill-detail-view':
        return [
          {
            label: 'Contact',
            icon: 'MessageCircle',
            variant: 'primary',
            onClick: () => console.log('Contact creator')
          },
          {
            label: 'Bookmark',
            icon: 'Bookmark',
            variant: 'secondary',
            onClick: () => console.log('Bookmark skill')
          },
          {
            label: 'Share',
            icon: 'Share2',
            variant: 'ghost',
            onClick: () => console.log('Share skill')
          }
        ];
      case '/user-profile':
        return [
          {
            label: 'Edit Profile',
            icon: 'Edit3',
            variant: 'primary',
            onClick: () => console.log('Edit profile')
          },
          {
            label: 'Settings',
            icon: 'Settings',
            variant: 'ghost',
            onClick: () => console.log('Open settings')
          }
        ];
      default:
        return [];
    }
  };

  const contextualActions = actions.length > 0 ? actions : getDefaultActions();

  if (contextualActions.length === 0 && !title && !showBackButton) {
    return null;
  }

  return (
    <div className={`sticky top-16 md:top-30 z-80 bg-background/95 backdrop-blur-sm border-b border-border ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Left Side - Back Button and Title */}
          <div className="flex items-center space-x-4">
            {showBackButton && (
              <Button
                variant="ghost"
                onClick={onBack}
                className="p-2"
              >
                <Icon name="ArrowLeft" size={20} />
              </Button>
            )}
            {title && (
              <h1 className="text-lg font-semibold text-primary truncate">
                {title}
              </h1>
            )}
          </div>

          {/* Right Side - Actions */}
          <div className="flex items-center space-x-2">
            {/* Desktop Actions */}
            <div className="hidden sm:flex items-center space-x-2">
              {contextualActions.map((action, index) => (
                <Button
                  key={index}
                  variant={action.variant || 'ghost'}
                  onClick={action.onClick}
                  className="flex items-center space-x-2"
                  disabled={action.disabled}
                >
                  {action.icon && <Icon name={action.icon} size={16} />}
                  <span>{action.label}</span>
                </Button>
              ))}
            </div>

            {/* Mobile Actions - Floating Action Button */}
            <div className="sm:hidden">
              {contextualActions.length > 0 && (
                <div className="relative">
                  <Button
                    variant="primary"
                    className="w-12 h-12 rounded-full p-0 fixed bottom-20 right-4 shadow-elevation-3"
                    onClick={contextualActions[0]?.onClick}
                  >
                    <Icon name={contextualActions[0]?.icon || 'Plus'} size={20} />
                  </Button>
                  
                  {/* Additional actions as stacked FABs */}
                  {contextualActions.slice(1, 3).map((action, index) => (
                    <Button
                      key={index}
                      variant="secondary"
                      className={`w-10 h-10 rounded-full p-0 fixed right-4 shadow-elevation-2 ${
                        index === 0 ? 'bottom-36' : 'bottom-48'
                      }`}
                      onClick={action.onClick}
                      style={{
                        animationDelay: `${(index + 1) * 50}ms`
                      }}
                    >
                      <Icon name={action.icon} size={16} />
                    </Button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContextualActionBar;