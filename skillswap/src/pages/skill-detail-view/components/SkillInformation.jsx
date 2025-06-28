import React from 'react';
import Icon from '../../../components/AppIcon';

const SkillInformation = ({ skill }) => {
  const getDifficultyColor = (level) => {
    switch (level.toLowerCase()) {
      case 'beginner':
        return 'text-success bg-success/10 border-success/20';
      case 'intermediate':
        return 'text-warning bg-warning/10 border-warning/20';
      case 'advanced':
        return 'text-error bg-error/10 border-error/20';
      default:
        return 'text-secondary bg-secondary/10 border-secondary/20';
    }
  };

  const getPriceDisplay = () => {
    if (skill.isFree) {
      return (
        <span className="text-success font-semibold">Free</span>
      );
    }
    if (skill.isBarterOnly) {
      return (
        <span className="text-accent font-semibold">Barter Only</span>
      );
    }
    return (
      <span className="text-primary font-semibold">${skill.price}/hour</span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Title and Basic Info */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-primary mb-2">
          {skill.title}
        </h1>
        <div className="flex flex-wrap items-center gap-4 text-sm text-secondary">
          <div className="flex items-center space-x-1">
            <Icon name="Calendar" size={16} />
            <span>Posted {skill.postedDate}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Eye" size={16} />
            <span>{skill.views} views</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Heart" size={16} />
            <span>{skill.favorites} favorites</span>
          </div>
        </div>
      </div>

      {/* Category and Tags */}
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <Icon name="Folder" size={16} color="var(--color-secondary)" />
          <span className="text-secondary font-medium">{skill.category}</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {skill.tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-surface-secondary border border-border rounded-full text-sm text-secondary hover:text-primary transition-colors duration-200"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Pricing and Difficulty */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center space-x-2">
          <Icon name="DollarSign" size={16} color="var(--color-primary)" />
          {getPriceDisplay()}
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="BarChart3" size={16} />
          <span className={`px-2 py-1 rounded-md text-xs font-medium border ${getDifficultyColor(skill.difficulty)}`}>
            {skill.difficulty}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="Clock" size={16} color="var(--color-accent)" />
          <span className="text-accent font-medium">{skill.duration}</span>
        </div>
      </div>

      {/* Description */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-primary">Description</h3>
        <div className="prose prose-invert max-w-none">
          <p className="text-secondary leading-relaxed whitespace-pre-line">
            {skill.description}
          </p>
        </div>
      </div>

      {/* What You'll Learn */}
      {skill.learningOutcomes && skill.learningOutcomes.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-primary">What You'll Learn</h3>
          <ul className="space-y-2">
            {skill.learningOutcomes.map((outcome, index) => (
              <li key={index} className="flex items-start space-x-3">
                <Icon name="CheckCircle" size={16} color="var(--color-success)" className="mt-0.5 flex-shrink-0" />
                <span className="text-secondary">{outcome}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Prerequisites */}
      {skill.prerequisites && skill.prerequisites.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-primary">Prerequisites</h3>
          <ul className="space-y-2">
            {skill.prerequisites.map((prerequisite, index) => (
              <li key={index} className="flex items-start space-x-3">
                <Icon name="AlertCircle" size={16} color="var(--color-warning)" className="mt-0.5 flex-shrink-0" />
                <span className="text-secondary">{prerequisite}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SkillInformation;