import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FloatingActionButton = () => {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);

  const quickActions = [
    {
      id: 'post-skill',
      label: 'Post Skill',
      icon: 'Plus',
      color: 'bg-primary',
      action: () => navigate('/skill-detail-view')
    },
    {
      id: 'browse-skills',
      label: 'Browse',
      icon: 'Search',
      color: 'bg-secondary',
      action: () => navigate('/skill-marketplace-browse')
    },
    {
      id: 'messages',
      label: 'Messages',
      icon: 'MessageCircle',
      color: 'bg-accent',
      action: () => navigate('/messages-chat')
    }
  ];

  const handleMainAction = () => {
    if (isExpanded) {
      setIsExpanded(false);
    } else {
      setIsExpanded(true);
    }
  };

  const handleActionClick = (action) => {
    action();
    setIsExpanded(false);
  };

  return (
    <>
      {/* Overlay */}
      {isExpanded && (
        <div
          className="fixed inset-0 bg-black/20 z-40 md:hidden"
          onClick={() => setIsExpanded(false)}
        />
      )}

      {/* Floating Action Button Container */}
      <div className="fixed bottom-20 right-4 z-50 md:hidden">
        {/* Quick Actions */}
        {isExpanded && (
          <div className="absolute bottom-16 right-0 space-y-3 animate-in slide-in-from-bottom-2 duration-200">
            {quickActions.map((action, index) => (
              <div
                key={action.id}
                className="flex items-center space-x-3"
                style={{
                  animationDelay: `${index * 50}ms`
                }}
              >
                <span className="bg-surface border border-border text-primary text-sm px-3 py-2 rounded-lg shadow-elevation-2 whitespace-nowrap">
                  {action.label}
                </span>
                <Button
                  variant="ghost"
                  onClick={() => handleActionClick(action.action)}
                  className={`w-12 h-12 rounded-full p-0 ${action.color} text-white shadow-elevation-3 hover:scale-110 transition-transform duration-200`}
                >
                  <Icon name={action.icon} size={20} />
                </Button>
              </div>
            ))}
          </div>
        )}

        {/* Main FAB */}
        <Button
          variant="primary"
          onClick={handleMainAction}
          className={`w-14 h-14 rounded-full p-0 shadow-elevation-4 transition-transform duration-200 ${
            isExpanded ? 'rotate-45 scale-110' : 'hover:scale-105'
          }`}
        >
          <Icon name={isExpanded ? 'X' : 'Plus'} size={24} />
        </Button>
      </div>

      {/* Desktop Quick Actions Bar */}
      <div className="hidden md:block fixed bottom-6 right-6 z-50">
        <div className="flex items-center space-x-3 bg-surface border border-border rounded-full p-2 shadow-elevation-3">
          {quickActions.map((action) => (
            <Button
              key={action.id}
              variant="ghost"
              onClick={() => handleActionClick(action.action)}
              className={`w-10 h-10 rounded-full p-0 ${action.color} text-white hover:scale-110 transition-transform duration-200`}
              title={action.label}
            >
              <Icon name={action.icon} size={18} />
            </Button>
          ))}
        </div>
      </div>
    </>
  );
};

export default FloatingActionButton;