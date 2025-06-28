import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const SkillContextCard = ({ skill }) => {
  return (
    <div className="mt-3 bg-surface border border-border rounded-lg p-3">
      <div className="flex items-center space-x-2 mb-2">
        <Icon name="BookOpen" size={16} color="var(--color-accent)" />
        <span className="text-sm font-medium text-accent">Discussing Skill</span>
      </div>
      
      <div className="flex items-start space-x-3">
        <Image
          src={skill.image}
          alt={skill.title}
          className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
        />
        
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-primary text-sm mb-1 truncate">
            {skill.title}
          </h4>
          <p className="text-xs text-secondary mb-2 line-clamp-2">
            {skill.description}
          </p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="text-xs text-secondary">
                {skill.category}
              </span>
              <span className="text-sm font-medium text-accent">
                {skill.price || 'Barter'}
              </span>
            </div>
            
            <Button variant="primary" className="text-xs px-3 py-1">
              View Details
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillContextCard;