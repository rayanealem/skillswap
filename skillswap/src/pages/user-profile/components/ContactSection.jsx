import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ContactSection = ({ user, isOwnProfile, onMessageUser, onScheduleCall }) => {
  const availabilityStatus = {
    online: { color: 'text-success', bg: 'bg-success/20', text: 'Available now' },
    busy: { color: 'text-warning', bg: 'bg-warning/20', text: 'Busy' },
    away: { color: 'text-error', bg: 'bg-error/20', text: 'Away' },
    offline: { color: 'text-secondary', bg: 'bg-secondary/20', text: 'Offline' }
  };

  const currentStatus = availabilityStatus[user.availabilityStatus] || availabilityStatus.offline;

  if (isOwnProfile) {
    return (
      <div className="bg-surface border border-border rounded-xl p-6">
        <h2 className="text-lg font-semibold text-primary mb-4">Availability Settings</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-primary mb-2">Current Status</label>
            <div className="flex items-center space-x-3">
              <div className={`px-3 py-2 rounded-lg ${currentStatus.bg} ${currentStatus.color} flex items-center space-x-2`}>
                <div className="w-2 h-2 rounded-full bg-current" />
                <span className="text-sm font-medium">{currentStatus.text}</span>
              </div>
              <Button variant="ghost" iconName="Edit3">
                Change
              </Button>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-primary mb-2">Response Time</label>
            <p className="text-sm text-secondary">
              Average response time: <span className="text-primary font-medium">{user.averageResponseTime}</span>
            </p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-primary mb-2">Preferred Contact Hours</label>
            <p className="text-sm text-secondary">{user.contactHours || 'Not specified'}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface border border-border rounded-xl p-6">
      <h2 className="text-lg font-semibold text-primary mb-4">Contact</h2>
      
      <div className="space-y-4">
        {/* Availability Status */}
        <div className="flex items-center justify-between p-3 bg-surface-secondary rounded-lg">
          <div className="flex items-center space-x-3">
            <div className={`w-3 h-3 rounded-full ${currentStatus.color.replace('text-', 'bg-')}`} />
            <div>
              <p className="text-sm font-medium text-primary">{currentStatus.text}</p>
              <p className="text-xs text-secondary">
                Avg response: {user.averageResponseTime}
              </p>
            </div>
          </div>
        </div>

        {/* Contact Actions */}
        <div className="space-y-3">
          <Button
            variant="primary"
            onClick={onMessageUser}
            iconName="MessageCircle"
            iconPosition="left"
            className="w-full"
          >
            Send Message
          </Button>
          
          <Button
            variant="secondary"
            onClick={onScheduleCall}
            iconName="Video"
            iconPosition="left"
            className="w-full"
          >
            Schedule Call
          </Button>
          
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="ghost"
              iconName="UserPlus"
              className="flex-1"
            >
              Follow
            </Button>
            <Button
              variant="ghost"
              iconName="Share2"
              className="flex-1"
            >
              Share
            </Button>
          </div>
        </div>

        {/* Contact Preferences */}
        {user.contactHours && (
          <div className="p-3 bg-surface-secondary rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Clock" size={16} className="text-secondary" />
              <span className="text-sm font-medium text-primary">Best time to contact</span>
            </div>
            <p className="text-sm text-secondary">{user.contactHours}</p>
          </div>
        )}

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
          <div className="text-center">
            <div className="text-lg font-bold text-primary">{user.totalExchanges}</div>
            <div className="text-xs text-secondary">Total Exchanges</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-success">{user.successRate}%</div>
            <div className="text-xs text-secondary">Success Rate</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;