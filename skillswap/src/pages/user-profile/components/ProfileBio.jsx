import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProfileBio = ({ user }) => {
  const socialLinks = [
    { platform: 'GitHub', url: user.githubUrl, icon: 'Github' },
    { platform: 'LinkedIn', url: user.linkedinUrl, icon: 'Linkedin' },
    { platform: 'Portfolio', url: user.portfolioUrl, icon: 'Globe' }
  ].filter(link => link.url);

  return (
    <div className="bg-surface border border-border rounded-xl p-6 mb-6">
      <h2 className="text-lg font-semibold text-primary mb-4">About</h2>
      
      {/* Bio */}
      <div className="mb-6">
        <p className="text-secondary leading-relaxed">
          {user.bio || "This user hasn't added a bio yet."}
        </p>
      </div>

      {/* Specializations */}
      {user.specializations && user.specializations.length > 0 && (
        <div className="mb-6">
          <h3 className="text-md font-medium text-primary mb-3">Specializations</h3>
          <div className="flex flex-wrap gap-2">
            {user.specializations.map((spec, index) => (
              <span
                key={index}
                className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium"
              >
                {spec}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Social Links */}
      {socialLinks.length > 0 && (
        <div>
          <h3 className="text-md font-medium text-primary mb-3">Connect</h3>
          <div className="flex flex-wrap gap-3">
            {socialLinks.map((link, index) => (
              <Button
                key={index}
                variant="ghost"
                onClick={() => window.open(link.url, '_blank')}
                className="flex items-center space-x-2 px-3 py-2 border border-border rounded-lg hover:bg-surface-secondary"
              >
                <Icon name={link.icon} size={16} />
                <span className="text-sm">{link.platform}</span>
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileBio;