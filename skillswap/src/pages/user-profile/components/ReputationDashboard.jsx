import React from 'react';
import Icon from '../../../components/AppIcon';

const ReputationDashboard = ({ reputation }) => {
  const achievements = [
    { id: 1, name: 'First Exchange', icon: 'Award', earned: true, description: 'Completed your first skill exchange' },
    { id: 2, name: 'Top Mentor', icon: 'Star', earned: true, description: 'Received 5+ five-star reviews' },
    { id: 3, name: 'Quick Responder', icon: 'Zap', earned: true, description: 'Average response time under 2 hours' },
    { id: 4, name: 'Skill Master', icon: 'Crown', earned: false, description: 'Offer 10+ different skills' },
    { id: 5, name: 'Community Helper', icon: 'Heart', earned: false, description: 'Help 50+ students' }
  ];

  const earnedAchievements = achievements.filter(a => a.earned);

  return (
    <div className="bg-surface border border-border rounded-xl p-6 mb-6">
      <h2 className="text-lg font-semibold text-primary mb-4">Reputation & Achievements</h2>
      
      {/* Reputation Score */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="text-center">
          <div className="text-2xl font-bold text-primary mb-1">{reputation.score}</div>
          <div className="text-sm text-secondary">Reputation</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-success mb-1">{reputation.completedExchanges}</div>
          <div className="text-sm text-secondary">Exchanges</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-warning mb-1">{reputation.averageRating}</div>
          <div className="text-sm text-secondary">Avg Rating</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-accent mb-1">{reputation.responseRate}%</div>
          <div className="text-sm text-secondary">Response Rate</div>
        </div>
      </div>

      {/* Progress Indicators */}
      <div className="space-y-3 mb-6">
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-secondary">Completion Rate</span>
            <span className="text-primary">{reputation.completionRate}%</span>
          </div>
          <div className="w-full bg-surface-secondary rounded-full h-2">
            <div 
              className="bg-success h-2 rounded-full transition-all duration-300"
              style={{ width: `${reputation.completionRate}%` }}
            />
          </div>
        </div>
        
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-secondary">Profile Completeness</span>
            <span className="text-primary">{reputation.profileCompleteness}%</span>
          </div>
          <div className="w-full bg-surface-secondary rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${reputation.profileCompleteness}%` }}
            />
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div>
        <h3 className="text-md font-medium text-primary mb-3">
          Achievements ({earnedAchievements.length}/{achievements.length})
        </h3>
        <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`flex flex-col items-center p-3 rounded-lg border transition-all duration-200 ${
                achievement.earned
                  ? 'bg-primary/10 border-primary/20 text-primary' :'bg-surface-secondary border-border text-secondary opacity-50'
              }`}
              title={achievement.description}
            >
              <Icon 
                name={achievement.icon} 
                size={24} 
                className={achievement.earned ? 'text-primary' : 'text-secondary'}
              />
              <span className="text-xs mt-2 text-center font-medium">
                {achievement.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReputationDashboard;