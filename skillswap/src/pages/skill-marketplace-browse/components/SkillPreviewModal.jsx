import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const SkillPreviewModal = ({ skill, isOpen, onClose }) => {
  const navigate = useNavigate();

  if (!isOpen || !skill) return null;

  const handleViewDetails = () => {
    navigate('/skill-detail-view', { state: { skill } });
    onClose();
  };

  const handleContactCreator = () => {
    navigate('/messages-chat', { state: { userId: skill.creator.id } });
    onClose();
  };

  const handleViewProfile = () => {
    navigate('/user-profile', { state: { userId: skill.creator.id } });
    onClose();
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Icon
        key={i}
        name="Star"
        size={16}
        color={i < Math.floor(rating) ? '#F59E0B' : '#374151'}
        className={i < Math.floor(rating) ? 'fill-current' : ''}
      />
    ));
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

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-surface border border-border rounded-2xl shadow-elevation-4 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-surface border-b border-border p-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-primary">Skill Preview</h2>
          <Button
            variant="ghost"
            onClick={onClose}
            className="p-2"
          >
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Skill Image */}
          <div className="relative h-48 rounded-xl overflow-hidden mb-6">
            <Image
              src={skill.image}
              alt={skill.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getCategoryColor(skill.category)}`}>
                {skill.category}
              </span>
            </div>
            {skill.barterOnly && (
              <div className="absolute top-4 right-4">
                <span className="bg-warning/10 text-warning border border-warning/20 px-3 py-1 rounded-full text-sm font-medium">
                  Barter Only
                </span>
              </div>
            )}
          </div>

          {/* Skill Info */}
          <div className="space-y-4">
            <div>
              <h3 className="text-2xl font-bold text-primary mb-2">{skill.title}</h3>
              <p className="text-secondary leading-relaxed">{skill.description}</p>
            </div>

            {/* Pricing */}
            <div className="flex items-center justify-between p-4 bg-surface-secondary rounded-xl">
              {skill.barterOnly ? (
                <div className="flex items-center space-x-2">
                  <Icon name="ArrowLeftRight" size={20} color="var(--color-warning)" />
                  <span className="text-lg font-semibold text-warning">Barter Exchange</span>
                </div>
              ) : (
                <div>
                  <span className="text-2xl font-bold text-accent">
                    ${skill.price}
                    <span className="text-base text-secondary font-normal">/{skill.priceUnit}</span>
                  </span>
                  {skill.acceptsBarter && (
                    <span className="block text-sm text-warning">+ Barter options available</span>
                  )}
                </div>
              )}
              <div className="text-right">
                <div className="flex items-center space-x-1 mb-1">
                  {renderStars(skill.rating)}
                </div>
                <span className="text-sm text-secondary">
                  {skill.rating} ({skill.reviewCount} reviews)
                </span>
              </div>
            </div>

            {/* Creator Info */}
            <div className="flex items-center justify-between p-4 bg-surface-secondary rounded-xl">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <Image
                    src={skill.creator.avatar}
                    alt={skill.creator.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-primary">{skill.creator.name}</h4>
                  <p className="text-sm text-secondary">{skill.creator.university}</p>
                  <p className="text-sm text-secondary">{skill.creator.major}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center space-x-1 mb-1">
                  <Icon name="Star" size={14} color="#F59E0B" className="fill-current" />
                  <span className="text-sm font-medium text-primary">{skill.creator.rating}</span>
                </div>
                <span className="text-xs text-secondary">{skill.creator.skillsOffered} skills</span>
              </div>
            </div>

            {/* Skill Details */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-surface-secondary rounded-lg">
                <span className="text-sm text-secondary">Skill Level</span>
                <p className="font-medium text-primary">{skill.level}</p>
              </div>
              <div className="p-3 bg-surface-secondary rounded-lg">
                <span className="text-sm text-secondary">Availability</span>
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${skill.available ? 'bg-success' : 'bg-error'}`} />
                  <span className="font-medium text-primary">
                    {skill.available ? 'Available' : 'Busy'}
                  </span>
                </div>
              </div>
            </div>

            {/* Tags */}
            {skill.tags && skill.tags.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-secondary mb-2">Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {skill.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="sticky bottom-0 bg-surface border-t border-border p-6">
          <div className="flex space-x-3">
            <Button
              variant="primary"
              onClick={handleViewDetails}
              className="flex-1"
            >
              View Full Details
            </Button>
            <Button
              variant="secondary"
              onClick={handleContactCreator}
              className="flex-1"
            >
              <Icon name="MessageCircle" size={16} className="mr-2" />
              Contact
            </Button>
            <Button
              variant="ghost"
              onClick={handleViewProfile}
              className="px-4"
            >
              <Icon name="User" size={16} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillPreviewModal;