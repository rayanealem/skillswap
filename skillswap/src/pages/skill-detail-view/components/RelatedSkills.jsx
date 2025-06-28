import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const RelatedSkills = ({ skills, title = "Related Skills" }) => {
  const navigate = useNavigate();

  const handleSkillClick = (skillId) => {
    // In a real app, this would navigate to the specific skill
    navigate('/skill-detail-view');
  };

  const getPriceDisplay = (skill) => {
    if (skill.isFree) {
      return <span className="text-success font-medium">Free</span>;
    }
    if (skill.isBarterOnly) {
      return <span className="text-accent font-medium">Barter</span>;
    }
    return <span className="text-primary font-medium">${skill.price}/hr</span>;
  };

  const getDifficultyColor = (level) => {
    switch (level.toLowerCase()) {
      case 'beginner':
        return 'text-success';
      case 'intermediate':
        return 'text-warning';
      case 'advanced':
        return 'text-error';
      default:
        return 'text-secondary';
    }
  };

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-primary">{title}</h3>
        <Button
          variant="ghost"
          onClick={() => navigate('/skill-marketplace-browse')}
          className="text-sm"
        >
          View All
          <Icon name="ArrowRight" size={16} />
        </Button>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skills.map((skill) => (
          <div
            key={skill.id}
            className="bg-surface border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-all duration-200 cursor-pointer group"
            onClick={() => handleSkillClick(skill.id)}
          >
            {/* Skill Image */}
            <div className="aspect-video relative overflow-hidden">
              <Image
                src={skill.image}
                alt={skill.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-3 left-3">
                <span className={`px-2 py-1 rounded-md text-xs font-medium bg-background/80 backdrop-blur-sm ${getDifficultyColor(skill.difficulty)}`}>
                  {skill.difficulty}
                </span>
              </div>
              <div className="absolute top-3 right-3">
                <button className="p-1.5 bg-background/80 backdrop-blur-sm rounded-full hover:bg-background transition-colors duration-200">
                  <Icon name="Heart" size={14} />
                </button>
              </div>
            </div>

            {/* Skill Content */}
            <div className="p-4 space-y-3">
              {/* Title and Category */}
              <div>
                <h4 className="font-semibold text-primary group-hover:text-primary/80 transition-colors duration-200 line-clamp-2">
                  {skill.title}
                </h4>
                <p className="text-sm text-secondary mt-1">{skill.category}</p>
              </div>

              {/* Creator Info */}
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 rounded-full overflow-hidden">
                  <Image
                    src={skill.creator.avatar}
                    alt={skill.creator.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-sm text-secondary truncate">{skill.creator.name}</span>
              </div>

              {/* Rating and Stats */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  <Icon name="Star" size={14} color="var(--color-warning)" />
                  <span className="text-sm font-medium text-primary">{skill.rating.toFixed(1)}</span>
                  <span className="text-sm text-secondary">({skill.reviewCount})</span>
                </div>
                {getPriceDisplay(skill)}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1">
                {skill.tags.slice(0, 3).map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-surface-secondary text-xs text-secondary rounded-md"
                  >
                    #{tag}
                  </span>
                ))}
                {skill.tags.length > 3 && (
                  <span className="px-2 py-1 bg-surface-secondary text-xs text-secondary rounded-md">
                    +{skill.tags.length - 3}
                  </span>
                )}
              </div>

              {/* Quick Stats */}
              <div className="flex items-center justify-between text-xs text-secondary pt-2 border-t border-border">
                <div className="flex items-center space-x-1">
                  <Icon name="Clock" size={12} />
                  <span>{skill.duration}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Users" size={12} />
                  <span>{skill.studentsCount} students</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Calendar" size={12} />
                  <span>{skill.availability}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {skills.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Search" size={48} color="var(--color-secondary)" className="mx-auto mb-4" />
          <h4 className="text-lg font-medium text-primary mb-2">No Related Skills Found</h4>
          <p className="text-secondary mb-4">
            We couldn't find any related skills at the moment.
          </p>
          <Button
            variant="primary"
            onClick={() => navigate('/skill-marketplace-browse')}
          >
            Browse All Skills
          </Button>
        </div>
      )}
    </div>
  );
};

export default RelatedSkills;