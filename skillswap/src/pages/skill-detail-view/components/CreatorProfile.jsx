import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const CreatorProfile = ({ creator }) => {
  const navigate = useNavigate();

  const handleViewProfile = () => {
    navigate('/user-profile');
  };

  const getReputationColor = (score) => {
    if (score >= 4.5) return 'text-success';
    if (score >= 3.5) return 'text-warning';
    return 'text-error';
  };

  const getVerificationBadges = () => {
    const badges = [];
    if (creator.isEmailVerified) badges.push({ icon: 'Mail', label: 'Email Verified', color: 'text-success' });
    if (creator.isUniversityVerified) badges.push({ icon: 'GraduationCap', label: 'University Verified', color: 'text-primary' });
    if (creator.isPhoneVerified) badges.push({ icon: 'Phone', label: 'Phone Verified', color: 'text-accent' });
    return badges;
  };

  return (
    <div className="bg-surface border border-border rounded-xl p-6 space-y-6">
      {/* Creator Header */}
      <div className="flex items-start space-x-4">
        <div className="relative">
          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary/20">
            <Image
              src={creator.avatar}
              alt={creator.name}
              className="w-full h-full object-cover"
            />
          </div>
          {creator.isOnline && (
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-success border-2 border-surface rounded-full"></div>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-primary truncate">{creator.name}</h3>
          <p className="text-sm text-secondary">{creator.university}</p>
          <p className="text-sm text-secondary">{creator.major}</p>
          
          {/* Reputation */}
          <div className="flex items-center space-x-2 mt-2">
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Icon
                  key={i}
                  name="Star"
                  size={14}
                  color={i < Math.floor(creator.reputation) ? 'var(--color-warning)' : 'var(--color-border)'}
                />
              ))}
            </div>
            <span className={`text-sm font-medium ${getReputationColor(creator.reputation)}`}>
              {creator.reputation.toFixed(1)}
            </span>
            <span className="text-xs text-secondary">({creator.totalReviews} reviews)</span>
          </div>
        </div>
      </div>

      {/* Verification Badges */}
      <div className="space-y-2">
        <h4 className="text-sm font-medium text-primary">Verifications</h4>
        <div className="flex flex-wrap gap-2">
          {getVerificationBadges().map((badge, index) => (
            <div key={index} className="flex items-center space-x-1 px-2 py-1 bg-surface-secondary rounded-md">
              <Icon name={badge.icon} size={12} color={`var(--color-${badge.color.split('-')[1]})`} />
              <span className="text-xs text-secondary">{badge.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="text-lg font-semibold text-primary">{creator.skillsOffered}</div>
          <div className="text-xs text-secondary">Skills</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-primary">{creator.completedExchanges}</div>
          <div className="text-xs text-secondary">Exchanges</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-primary">{creator.responseTime}</div>
          <div className="text-xs text-secondary">Response</div>
        </div>
      </div>

      {/* Bio */}
      {creator.bio && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-primary">About</h4>
          <p className="text-sm text-secondary leading-relaxed">{creator.bio}</p>
        </div>
      )}

      {/* Social Links */}
      {(creator.githubUrl || creator.linkedinUrl) && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-primary">Connect</h4>
          <div className="flex space-x-2">
            {creator.githubUrl && (
              <a
                href={creator.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-surface-secondary hover:bg-primary/10 rounded-lg transition-colors duration-200"
              >
                <Icon name="Github" size={16} />
              </a>
            )}
            {creator.linkedinUrl && (
              <a
                href={creator.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-surface-secondary hover:bg-primary/10 rounded-lg transition-colors duration-200"
              >
                <Icon name="Linkedin" size={16} />
              </a>
            )}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="space-y-2">
        <Button
          variant="primary"
          onClick={handleViewProfile}
          className="w-full"
        >
          <Icon name="User" size={16} />
          View Full Profile
        </Button>
        <Button
          variant="secondary"
          onClick={() => navigate('/messages-chat')}
          className="w-full"
        >
          <Icon name="MessageCircle" size={16} />
          Send Message
        </Button>
      </div>
    </div>
  );
};

export default CreatorProfile;