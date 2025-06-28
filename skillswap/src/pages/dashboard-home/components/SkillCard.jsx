import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const SkillCard = ({ skill }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate('/skill-detail-view', { state: { skillId: skill.id } });
  };

  const handleUserClick = (e) => {
    e.stopPropagation();
    navigate('/user-profile', { state: { userId: skill.user.id } });
  };

  const handleBookmark = (e) => {
    e.stopPropagation();
    // Handle bookmark functionality
    console.log('Bookmark skill:', skill.id);
  };

  const handleContact = (e) => {
    e.stopPropagation();
    navigate('/messages-chat', { state: { userId: skill.user.id } });
  };

  return (
    <div
      onClick={handleCardClick}
      className="bg-surface border border-border rounded-xl overflow-hidden cursor-pointer hover:shadow-elevation-2 transition-all duration-200 animate-scale-hover group"
    >
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={skill.image}
          alt={skill.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Overlay Actions */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200">
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <Button
              variant="ghost"
              onClick={handleBookmark}
              className="w-8 h-8 p-0 bg-black/50 hover:bg-black/70 text-white rounded-full"
            >
              <Icon name="Bookmark" size={16} />
            </Button>
          </div>
        </div>

        {/* Price/Barter Badge */}
        <div className="absolute top-3 left-3">
          <span className={`text-xs px-2 py-1 rounded-full font-medium ${
            skill.isBarter 
              ? 'bg-accent text-white' :'bg-primary text-white'
          }`}>
            {skill.price}
          </span>
        </div>

        {/* New Badge */}
        {skill.isNew && (
          <div className="absolute bottom-3 left-3">
            <span className="bg-success text-white text-xs px-2 py-1 rounded-full font-medium">
              New
            </span>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4">
        {/* Category and Rating */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-accent font-medium bg-accent/10 px-2 py-1 rounded-full">
            {skill.category}
          </span>
          <div className="flex items-center space-x-1">
            <Icon name="Star" size={14} color="var(--color-warning)" />
            <span className="text-sm font-medium text-warning">
              {skill.rating}
            </span>
            <span className="text-xs text-secondary">
              ({skill.reviewCount})
            </span>
          </div>
        </div>

        {/* Title */}
        <h3 className="font-semibold text-primary mb-2 line-clamp-2 group-hover:text-secondary transition-colors">
          {skill.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-secondary mb-4 line-clamp-2">
          {skill.description}
        </p>

        {/* User Info */}
        <div className="flex items-center justify-between">
          <div 
            className="flex items-center space-x-2 cursor-pointer hover:opacity-80"
            onClick={handleUserClick}
          >
            <Image
              src={skill.user.avatar}
              alt={skill.user.name}
              className="w-8 h-8 rounded-full"
            />
            <div>
              <p className="text-sm font-medium text-primary">{skill.user.name}</p>
              <div className="flex items-center space-x-1">
                <Icon name="Award" size={12} color="var(--color-accent)" />
                <span className="text-xs text-accent">{skill.user.reputation} pts</span>
              </div>
            </div>
          </div>

          {/* Quick Contact */}
          <Button
            variant="ghost"
            onClick={handleContact}
            className="p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          >
            <Icon name="MessageCircle" size={16} />
          </Button>
        </div>

        {/* Tags */}
        {skill.tags && skill.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {skill.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="text-xs bg-surface-secondary text-secondary px-2 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
            {skill.tags.length > 3 && (
              <span className="text-xs text-secondary">
                +{skill.tags.length - 3} more
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SkillCard;