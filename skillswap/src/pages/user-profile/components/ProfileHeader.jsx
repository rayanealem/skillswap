import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProfileHeader = ({ user, isOwnProfile, onEditProfile, onMessageUser }) => {
  const [showImageUpload, setShowImageUpload] = useState(false);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Mock image upload functionality
      console.log('Uploading image:', file.name);
      setShowImageUpload(false);
    }
  };

  return (
    <div className="bg-surface border border-border rounded-xl p-6 mb-6">
      <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
        {/* Avatar Section */}
        <div className="relative">
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-primary/20">
            <Image
              src={user.avatar}
              alt={`${user.name}'s avatar`}
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Online Status Indicator */}
          <div className={`absolute bottom-2 right-2 w-4 h-4 rounded-full border-2 border-surface ${
            user.isOnline ? 'bg-success' : 'bg-gray-400'
          }`} />
          
          {/* Upload Button for Own Profile */}
          {isOwnProfile && (
            <Button
              variant="ghost"
              onClick={() => setShowImageUpload(true)}
              className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 p-2 bg-surface border border-border rounded-full"
            >
              <Icon name="Camera" size={16} />
            </Button>
          )}
        </div>

        {/* User Info */}
        <div className="flex-1">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <h1 className="text-2xl font-bold text-primary">{user.name}</h1>
                {user.isVerified && (
                  <div className="bg-success/20 text-success px-2 py-1 rounded-full flex items-center space-x-1">
                    <Icon name="CheckCircle" size={16} />
                    <span className="text-xs font-medium">Verified</span>
                  </div>
                )}
              </div>
              
              <div className="space-y-1 text-secondary">
                <div className="flex items-center space-x-2">
                  <Icon name="GraduationCap" size={16} />
                  <span>{user.university}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="BookOpen" size={16} />
                  <span>{user.major} • Class of {user.graduationYear}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="MapPin" size={16} />
                  <span>{user.location}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-3 mt-4 md:mt-0">
              {isOwnProfile ? (
                <Button
                  variant="primary"
                  onClick={onEditProfile}
                  iconName="Edit3"
                  iconPosition="left"
                >
                  Edit Profile
                </Button>
              ) : (
                <>
                  <Button
                    variant="primary"
                    onClick={onMessageUser}
                    iconName="MessageCircle"
                    iconPosition="left"
                  >
                    Message
                  </Button>
                  <Button
                    variant="secondary"
                    iconName="UserPlus"
                  >
                    Follow
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Image Upload Modal */}
      {showImageUpload && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-110 p-4">
          <div className="bg-surface border border-border rounded-xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-primary">Upload Profile Picture</h3>
              <Button
                variant="ghost"
                onClick={() => setShowImageUpload(false)}
                className="p-2"
              >
                <Icon name="X" size={20} />
              </Button>
            </div>
            
            <div className="space-y-4">
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                <Icon name="Upload" size={32} className="mx-auto mb-2 text-secondary" />
                <p className="text-secondary mb-2">Drop your image here or click to browse</p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="avatar-upload"
                />
                <label htmlFor="avatar-upload">
                  <Button variant="secondary" className="cursor-pointer">
                    Choose File
                  </Button>
                </label>
              </div>
              
              <div className="flex space-x-3">
                <Button
                  variant="ghost"
                  onClick={() => setShowImageUpload(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button variant="primary" className="flex-1">
                  Upload
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileHeader;