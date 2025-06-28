import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const SkillCard = ({ skill, onFavorite, onShare, onPreview }) => {
  const navigate = useNavigate();
  const [isFavorited, setIsFavorited] = useState(skill.isFavorited || false);

  const handleFavorite = (e) => {
    e.stopPropagation();
    setIsFavorited(!isFavorited);
    onFavorite?.(skill.id, !isFavorited);
  };

  const handleShare = (e) => {
    e.stopPropagation();
    onShare?.(skill);
  };

  const handlePreview = (e) => {
    e.stopPropagation();
    onPreview?.(skill);
  };

  const handleCardClick = () => {
    navigate('/skill-detail-view', { state: { skill } });
  };

  const handleCreatorClick = (e) => {
    e.stopPropagation();
    navigate('/user-profile', { state: { userId: skill.creator.id } });
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Programming': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
      'Design': 'bg-purple-500/10 text-purple-400 border-purple-500/20',
      'Marketing': 'bg-green-500/10 text-green-400 border-green-500/20',
      'Language': 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
      'Music': 'bg-pink-500/10 text-pink-400 border-pink-500/20',
      'Business': 'bg-orange-500/10 text-orange-400 border-orange-500/20'
    };
    return colors[category] || 'bg-gray-500/10 text-gray-400 border-gray-500/20';
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Icon
        key={i}
        name="Star"
        size={12}
        color={i < Math.floor(rating) ? '#F59E0B' : '#374151'}
        className={i < Math.floor(rating) ? 'fill-current' : ''}
      />
    ));
  };

  return (
    <div 
      className="bg-surface border border-border rounded-xl overflow-hidden hover:border-primary/30 transition-all duration-300 cursor-pointer group hover:shadow-elevation-2"
      onClick={handleCardClick}
    >
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={skill.image}
          alt={skill.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Quick Actions Overlay */}
        <div className="absolute top-3 right-3 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <Button
            variant="ghost"
            onClick={handleFavorite}
            className="w-8 h-8 p-0 bg-black/50 backdrop-blur-sm hover:bg-black/70 rounded-full"
          >
            <Icon 
              name={isFavorited ? "Heart" : "Heart"} 
              size={16} 
              color={isFavorited ? "#EF4444" : "white"}
              className={isFavorited ? 'fill-current' : ''}
            />
          </Button>
          <Button
            variant="ghost"
            onClick={handleShare}
            className="w-8 h-8 p-0 bg-black/50 backdrop-blur-sm hover:bg-black/70 rounded-full"
          >
            <Icon name="Share2" size={16} color="white" />
          </Button>
          <Button
            variant="ghost"
            onClick={handlePreview}
            className="w-8 h-8 p-0 bg-black/50 backdrop-blur-sm hover:bg-black/70 rounded-full"
          >
            <Icon name="Eye" size={16} color="white" />
          </Button>
        </div>

        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getCategoryColor(skill.category)}`}>
            {skill.category}
          </span>
        </div>

        {/* Barter Badge */}
        {skill.barterOnly && (
          <div className="absolute bottom-3 left-3">
            <span className="bg-warning/10 text-warning border border-warning/20 px-2 py-1 rounded-full text-xs font-medium">
              Barter Only
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Title and Description */}
        <div className="mb-3">
          <h3 className="text-lg font-semibold text-primary mb-1 line-clamp-1">
            {skill.title}
          </h3>
          <p className="text-sm text-secondary line-clamp-2">
            {skill.description}
          </p>
        </div>

        {/* Pricing */}
        <div className="mb-3">
          {skill.barterOnly ? (
            <div className="flex items-center space-x-2">
              <Icon name="ArrowLeftRight" size={16} color="var(--color-warning)" />
              <span className="text-warning font-medium">Barter Exchange</span>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-accent">
                ${skill.price}
                <span className="text-sm text-secondary font-normal">/{skill.priceUnit}</span>
              </span>
              {skill.acceptsBarter && (
                <span className="text-xs text-warning">+ Barter</span>
              )}
            </div>
          )}
        </div>

        {/* Creator Info */}
        <div className="flex items-center justify-between">
          <div 
            className="flex items-center space-x-2 cursor-pointer hover:opacity-80"
            onClick={handleCreatorClick}
          >
            <div className="w-8 h-8 rounded-full overflow-hidden">
              <Image
                src={skill.creator.avatar}
                alt={skill.creator.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="text-sm font-medium text-primary">{skill.creator.name}</p>
              <p className="text-xs text-secondary">{skill.creator.university}</p>
            </div>
          </div>

          {/* Rating */}
          <div className="flex items-center space-x-1">
            <div className="flex space-x-0.5">
              {renderStars(skill.rating)}
            </div>
            <span className="text-xs text-secondary ml-1">
              ({skill.reviewCount})
            </span>
          </div>
        </div>

        {/* Skill Level and Availability */}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
          <span className="text-xs text-secondary">
            Level: {skill.level}
          </span>
          <div className="flex items-center space-x-1">
            <div className={`w-2 h-2 rounded-full ${skill.available ? 'bg-success' : 'bg-error'}`} />
            <span className="text-xs text-secondary">
              {skill.available ? 'Available' : 'Busy'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillCard;