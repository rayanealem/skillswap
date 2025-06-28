import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const SkillsSection = ({ skills, reviews, isOwnProfile }) => {
  const [activeTab, setActiveTab] = useState('active');

  const tabs = [
    { id: 'active', label: 'Active Skills', count: skills.active.length },
    { id: 'completed', label: 'Completed', count: skills.completed.length },
    { id: 'reviews', label: 'Reviews', count: reviews.length }
  ];

  const SkillCard = ({ skill, isCompleted = false }) => (
    <div className="bg-surface-secondary border border-border rounded-lg p-4 hover:border-primary/30 transition-all duration-200">
      <div className="flex items-start space-x-3">
        <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
          <Image
            src={skill.image}
            alt={skill.title}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-primary truncate">{skill.title}</h4>
          <p className="text-sm text-secondary mt-1 line-clamp-2">{skill.description}</p>
          
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center space-x-2">
              <span className="bg-accent/20 text-accent px-2 py-1 rounded text-xs font-medium">
                {skill.category}
              </span>
              {skill.price ? (
                <span className="text-primary font-medium">${skill.price}</span>
              ) : (
                <span className="text-warning font-medium">Barter</span>
              )}
            </div>
            
            <div className="flex items-center space-x-1 text-xs text-secondary">
              <Icon name="Star" size={12} className="text-warning" />
              <span>{skill.rating}</span>
              <span>({skill.reviews})</span>
            </div>
          </div>
          
          {isCompleted && (
            <div className="flex items-center space-x-2 mt-2">
              <Icon name="CheckCircle" size={14} className="text-success" />
              <span className="text-xs text-success">Completed on {skill.completedDate}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const ReviewCard = ({ review }) => (
    <div className="bg-surface-secondary border border-border rounded-lg p-4">
      <div className="flex items-start space-x-3">
        <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
          <Image
            src={review.reviewer.avatar}
            alt={review.reviewer.name}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium text-primary">{review.reviewer.name}</h4>
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Icon
                  key={i}
                  name="Star"
                  size={14}
                  className={i < review.rating ? 'text-warning' : 'text-gray-600'}
                />
              ))}
            </div>
          </div>
          
          <p className="text-sm text-secondary mb-2">{review.comment}</p>
          <div className="text-xs text-secondary">
            For: {review.skillTitle} • {review.date}
          </div>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'active':
        return (
          <div className="space-y-4">
            {skills.active.length > 0 ? (
              skills.active.map((skill) => (
                <SkillCard key={skill.id} skill={skill} />
              ))
            ) : (
              <div className="text-center py-8">
                <Icon name="BookOpen" size={48} className="mx-auto text-secondary mb-4" />
                <p className="text-secondary">No active skills yet</p>
                {isOwnProfile && (
                  <Button variant="primary" className="mt-4">
                    Add Your First Skill
                  </Button>
                )}
              </div>
            )}
          </div>
        );
      
      case 'completed':
        return (
          <div className="space-y-4">
            {skills.completed.length > 0 ? (
              skills.completed.map((skill) => (
                <SkillCard key={skill.id} skill={skill} isCompleted={true} />
              ))
            ) : (
              <div className="text-center py-8">
                <Icon name="CheckCircle" size={48} className="mx-auto text-secondary mb-4" />
                <p className="text-secondary">No completed exchanges yet</p>
              </div>
            )}
          </div>
        );
      
      case 'reviews':
        return (
          <div className="space-y-4">
            {reviews.length > 0 ? (
              reviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))
            ) : (
              <div className="text-center py-8">
                <Icon name="MessageSquare" size={48} className="mx-auto text-secondary mb-4" />
                <p className="text-secondary">No reviews yet</p>
              </div>
            )}
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="bg-surface border border-border rounded-xl p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-primary">Skills & Activity</h2>
        {isOwnProfile && (
          <Button variant="primary" iconName="Plus" iconPosition="left">
            Add Skill
          </Button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 mb-6 bg-surface-secondary rounded-lg p-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
              activeTab === tab.id
                ? 'bg-primary text-white' :'text-secondary hover:text-primary'
            }`}
          >
            {tab.label}
            {tab.count > 0 && (
              <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                activeTab === tab.id
                  ? 'bg-white/20 text-white' :'bg-surface text-secondary'
              }`}>
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {renderTabContent()}
    </div>
  );
};

export default SkillsSection;