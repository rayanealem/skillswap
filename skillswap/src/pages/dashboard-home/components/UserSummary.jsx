import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const UserSummary = () => {
  const navigate = useNavigate();

  const userStats = {
    name: "John Doe",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    university: "Stanford University",
    major: "Computer Science",
    reputation: 1247,
    level: "Expert",
    skillsPosted: 8,
    skillsLearned: 12,
    completedExchanges: 25,
    badges: [
      { id: 1, name: "Top Mentor", icon: "Award", color: "text-warning" },
      { id: 2, name: "Quick Responder", icon: "Zap", color: "text-accent" },
      { id: 3, name: "Skill Master", icon: "Star", color: "text-primary" }
    ]
  };

  const recentActivity = [
    {
      id: 1,
      type: "skill_posted",
      title: "Posted React Development skill",
      time: "2 hours ago",
      icon: "Plus"
    },
    {
      id: 2,
      type: "exchange_completed",
      title: "Completed Python tutoring with Sarah",
      time: "1 day ago",
      icon: "CheckCircle"
    },
    {
      id: 3,
      type: "review_received",
      title: "Received 5-star review from Mike",
      time: "2 days ago",
      icon: "Star"
    },
    {
      id: 4,
      type: "badge_earned",
      title: "Earned \'Quick Responder\' badge",
      time: "3 days ago",
      icon: "Award"
    }
  ];

  const handleProfileClick = () => {
    navigate('/user-profile');
  };

  const handlePostSkill = () => {
    navigate('/skill-detail-view');
  };

  return (
    <div className="space-y-6">
      {/* User Profile Summary */}
      <div className="bg-surface border border-border rounded-xl p-6">
        <div className="flex items-center space-x-4 mb-6">
          <div className="relative">
            <Image
              src={userStats.avatar}
              alt={userStats.name}
              className="w-16 h-16 rounded-full"
            />
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-accent rounded-full flex items-center justify-center">
              <Icon name="Award" size={14} color="white" />
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-primary">{userStats.name}</h3>
            <p className="text-sm text-secondary">{userStats.university}</p>
            <p className="text-xs text-secondary">{userStats.major}</p>
          </div>
        </div>

        {/* Reputation and Level */}
        <div className="bg-gradient-primary rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between text-white">
            <div>
              <p className="text-sm opacity-90">Reputation Points</p>
              <p className="text-2xl font-bold">{userStats.reputation.toLocaleString()}</p>
            </div>
            <div className="text-right">
              <p className="text-sm opacity-90">Level</p>
              <p className="text-lg font-semibold">{userStats.level}</p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">{userStats.skillsPosted}</p>
            <p className="text-xs text-secondary">Skills Posted</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-accent">{userStats.skillsLearned}</p>
            <p className="text-xs text-secondary">Skills Learned</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-success">{userStats.completedExchanges}</p>
            <p className="text-xs text-secondary">Exchanges</p>
          </div>
        </div>

        {/* Badges */}
        <div className="mb-4">
          <h4 className="text-sm font-medium text-primary mb-2">Recent Badges</h4>
          <div className="flex space-x-2">
            {userStats.badges.map((badge) => (
              <div
                key={badge.id}
                className="flex items-center space-x-1 bg-surface-secondary px-2 py-1 rounded-full"
                title={badge.name}
              >
                <Icon name={badge.icon} size={12} className={badge.color} />
                <span className="text-xs text-secondary">{badge.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          <Button
            variant="primary"
            onClick={handleProfileClick}
            className="w-full"
          >
            <Icon name="User" size={16} className="mr-2" />
            View Profile
          </Button>
          <Button
            variant="secondary"
            onClick={handlePostSkill}
            className="w-full"
          >
            <Icon name="Plus" size={16} className="mr-2" />
            Post New Skill
          </Button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-surface border border-border rounded-xl p-6">
        <h3 className="text-lg font-semibold text-primary mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {recentActivity.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Icon name={activity.icon} size={14} color="var(--color-primary)" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-primary">{activity.title}</p>
                <p className="text-xs text-secondary">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
        <Button
          variant="ghost"
          className="w-full mt-4 text-sm"
          onClick={() => navigate('/user-profile')}
        >
          View All Activity
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="bg-surface border border-border rounded-xl p-6">
        <h3 className="text-lg font-semibold text-primary mb-4">This Week</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="Eye" size={16} color="var(--color-secondary)" />
              <span className="text-sm text-secondary">Profile Views</span>
            </div>
            <span className="text-sm font-medium text-primary">24</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="MessageCircle" size={16} color="var(--color-accent)" />
              <span className="text-sm text-secondary">New Messages</span>
            </div>
            <span className="text-sm font-medium text-primary">7</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="TrendingUp" size={16} color="var(--color-success)" />
              <span className="text-sm text-secondary">Skill Inquiries</span>
            </div>
            <span className="text-sm font-medium text-primary">12</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSummary;