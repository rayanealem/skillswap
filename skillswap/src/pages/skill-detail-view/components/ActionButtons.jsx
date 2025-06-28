import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ActionButtons = ({ skill, creator, isMobile = false }) => {
  const navigate = useNavigate();
  const [isFavorited, setIsFavorited] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);

  const handleContactCreator = () => {
    navigate('/messages-chat');
  };

  const handleToggleFavorite = () => {
    setIsFavorited(!isFavorited);
    // Handle favorite logic here
  };

  const handleShare = (platform) => {
    const url = window.location.href;
    const title = `Check out this skill: ${skill.title}`;
    
    switch (platform) {
      case 'copy':
        navigator.clipboard.writeText(url);
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`);
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`);
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`);
        break;
      default:
        break;
    }
    setShowShareMenu(false);
  };

  const handleBookSession = () => {
    // Scroll to availability calendar
    const calendarElement = document.getElementById('availability-calendar');
    if (calendarElement) {
      calendarElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleRequestSkill = () => {
    // Handle skill request logic
    console.log('Requesting skill exchange');
  };

  if (isMobile) {
    return (
      <>
        {/* Mobile Sticky Action Bar */}
        <div className="fixed bottom-16 left-0 right-0 z-90 bg-background/95 backdrop-blur-sm border-t border-border p-4">
          <div className="flex space-x-3">
            <Button
              variant="primary"
              onClick={handleContactCreator}
              className="flex-1"
            >
              <Icon name="MessageCircle" size={18} />
              Contact
            </Button>
            <Button
              variant="secondary"
              onClick={handleBookSession}
              className="flex-1"
            >
              <Icon name="Calendar" size={18} />
              Book
            </Button>
            <Button
              variant="ghost"
              onClick={handleToggleFavorite}
              className="p-3"
            >
              <Icon 
                name={isFavorited ? "Heart" : "Heart"} 
                size={20} 
                color={isFavorited ? "var(--color-error)" : "currentColor"}
              />
            </Button>
          </div>
        </div>

        {/* Mobile Floating Action Buttons */}
        <div className="fixed bottom-32 right-4 z-90 space-y-3">
          {/* Share Button */}
          <div className="relative">
            <Button
              variant="secondary"
              onClick={() => setShowShareMenu(!showShareMenu)}
              className="w-12 h-12 rounded-full p-0 shadow-elevation-3"
            >
              <Icon name="Share2" size={20} />
            </Button>
            
            {/* Share Menu */}
            {showShareMenu && (
              <div className="absolute bottom-full right-0 mb-2 bg-surface border border-border rounded-lg shadow-elevation-3 p-2 space-y-1">
                <button
                  onClick={() => handleShare('copy')}
                  className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-secondary hover:text-primary hover:bg-surface-secondary rounded-md transition-colors duration-200"
                >
                  <Icon name="Copy" size={16} />
                  <span>Copy Link</span>
                </button>
                <button
                  onClick={() => handleShare('twitter')}
                  className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-secondary hover:text-primary hover:bg-surface-secondary rounded-md transition-colors duration-200"
                >
                  <Icon name="Twitter" size={16} />
                  <span>Twitter</span>
                </button>
                <button
                  onClick={() => handleShare('facebook')}
                  className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-secondary hover:text-primary hover:bg-surface-secondary rounded-md transition-colors duration-200"
                >
                  <Icon name="Facebook" size={16} />
                  <span>Facebook</span>
                </button>
                <button
                  onClick={() => handleShare('linkedin')}
                  className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-secondary hover:text-primary hover:bg-surface-secondary rounded-md transition-colors duration-200"
                >
                  <Icon name="Linkedin" size={16} />
                  <span>LinkedIn</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Overlay for share menu */}
        {showShareMenu && (
          <div
            className="fixed inset-0 z-80"
            onClick={() => setShowShareMenu(false)}
          />
        )}
      </>
    );
  }

  // Desktop Action Buttons
  return (
    <div className="space-y-4">
      {/* Primary Actions */}
      <div className="space-y-3">
        <Button
          variant="primary"
          onClick={handleContactCreator}
          className="w-full"
        >
          <Icon name="MessageCircle" size={18} />
          Contact Creator
        </Button>
        
        <Button
          variant="secondary"
          onClick={handleBookSession}
          className="w-full"
        >
          <Icon name="Calendar" size={18} />
          Book Session
        </Button>

        {skill.allowsBartering && (
          <Button
            variant="outline"
            onClick={handleRequestSkill}
            className="w-full"
          >
            <Icon name="RefreshCw" size={18} />
            Request Exchange
          </Button>
        )}
      </div>

      {/* Secondary Actions */}
      <div className="flex space-x-2">
        <Button
          variant="ghost"
          onClick={handleToggleFavorite}
          className="flex-1"
        >
          <Icon 
            name={isFavorited ? "Heart" : "Heart"} 
            size={16} 
            color={isFavorited ? "var(--color-error)" : "currentColor"}
          />
          {isFavorited ? 'Favorited' : 'Add to Favorites'}
        </Button>
        
        <div className="relative">
          <Button
            variant="ghost"
            onClick={() => setShowShareMenu(!showShareMenu)}
            className="p-3"
          >
            <Icon name="Share2" size={16} />
          </Button>
          
          {/* Share Dropdown */}
          {showShareMenu && (
            <div className="absolute top-full right-0 mt-2 bg-surface border border-border rounded-lg shadow-elevation-3 p-2 space-y-1 min-w-40">
              <button
                onClick={() => handleShare('copy')}
                className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-secondary hover:text-primary hover:bg-surface-secondary rounded-md transition-colors duration-200"
              >
                <Icon name="Copy" size={16} />
                <span>Copy Link</span>
              </button>
              <button
                onClick={() => handleShare('twitter')}
                className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-secondary hover:text-primary hover:bg-surface-secondary rounded-md transition-colors duration-200"
              >
                <Icon name="Twitter" size={16} />
                <span>Twitter</span>
              </button>
              <button
                onClick={() => handleShare('facebook')}
                className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-secondary hover:text-primary hover:bg-surface-secondary rounded-md transition-colors duration-200"
              >
                <Icon name="Facebook" size={16} />
                <span>Facebook</span>
              </button>
              <button
                onClick={() => handleShare('linkedin')}
                className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-secondary hover:text-primary hover:bg-surface-secondary rounded-md transition-colors duration-200"
              >
                <Icon name="Linkedin" size={16} />
                <span>LinkedIn</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Skill Stats */}
      <div className="bg-surface-secondary rounded-lg p-4 space-y-3">
        <h4 className="text-sm font-medium text-primary">Quick Stats</h4>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-secondary">Response Time</span>
            <span className="text-primary font-medium">{creator.responseTime}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-secondary">Success Rate</span>
            <span className="text-success font-medium">{creator.successRate}%</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-secondary">Total Students</span>
            <span className="text-primary font-medium">{skill.studentsCount}</span>
          </div>
        </div>
      </div>

      {/* Overlay for share menu */}
      {showShareMenu && (
        <div
          className="fixed inset-0 z-80"
          onClick={() => setShowShareMenu(false)}
        />
      )}
    </div>
  );
};

export default ActionButtons;