import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ActivityFeed = ({ activities }) => {
  const getActivityIcon = (type) => {
    switch (type) {
      case 'skill_posted': return 'Plus';
      case 'exchange_completed': return 'CheckCircle';
      case 'review_received': return 'Star';
      case 'achievement_earned': return 'Award';
      case 'profile_updated': return 'Edit3';
      default: return 'Activity';
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'skill_posted': return 'text-primary';
      case 'exchange_completed': return 'text-success';
      case 'review_received': return 'text-warning';
      case 'achievement_earned': return 'text-accent';
      case 'profile_updated': return 'text-secondary';
      default: return 'text-secondary';
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const activityTime = new Date(timestamp);
    const diffInHours = Math.floor((now - activityTime) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    return `${Math.floor(diffInHours / 168)}w ago`;
  };

  return (
    <div className="bg-surface border border-border rounded-xl p-6">
      <h2 className="text-lg font-semibold text-primary mb-4">Recent Activity</h2>
      
      {activities.length > 0 ? (
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-surface-secondary transition-colors duration-200">
              <div className={`w-8 h-8 rounded-full bg-surface-secondary flex items-center justify-center flex-shrink-0 ${getActivityColor(activity.type)}`}>
                <Icon name={getActivityIcon(activity.type)} size={16} />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm text-primary">{activity.description}</p>
                    {activity.metadata && (
                      <div className="mt-1">
                        {activity.metadata.skillTitle && (
                          <span className="text-xs text-accent bg-accent/10 px-2 py-1 rounded">
                            {activity.metadata.skillTitle}
                          </span>
                        )}
                        {activity.metadata.rating && (
                          <div className="flex items-center space-x-1 mt-1">
                            {[...Array(5)].map((_, i) => (
                              <Icon
                                key={i}
                                name="Star"
                                size={12}
                                className={i < activity.metadata.rating ? 'text-warning' : 'text-gray-600'}
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  <span className="text-xs text-secondary flex-shrink-0 ml-2">
                    {formatTimeAgo(activity.timestamp)}
                  </span>
                </div>
                
                {activity.relatedUser && (
                  <div className="flex items-center space-x-2 mt-2">
                    <div className="w-6 h-6 rounded-full overflow-hidden">
                      <Image
                        src={activity.relatedUser.avatar}
                        alt={activity.relatedUser.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-xs text-secondary">{activity.relatedUser.name}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <Icon name="Activity" size={48} className="mx-auto text-secondary mb-4" />
          <p className="text-secondary">No recent activity</p>
        </div>
      )}
    </div>
  );
};

export default ActivityFeed;