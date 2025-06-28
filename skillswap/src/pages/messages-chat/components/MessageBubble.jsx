import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const MessageBubble = ({ message, isOwn, participant }) => {
  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const renderMessageContent = () => {
    switch (message.type) {
      case 'text':
        return (
          <p className="text-sm whitespace-pre-wrap break-words">
            {message.content}
          </p>
        );

      case 'skill':
        return (
          <div className="bg-surface border border-border rounded-lg p-3 max-w-xs">
            <div className="flex items-start space-x-3">
              <Image
                src={message.skill.image}
                alt={message.skill.title}
                className="w-12 h-12 rounded-lg object-cover"
              />
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-primary text-sm truncate">
                  {message.skill.title}
                </h4>
                <p className="text-xs text-secondary mt-1">
                  {message.skill.category}
                </p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm font-medium text-accent">
                    {message.skill.price || 'Barter'}
                  </span>
                  <Button variant="primary" className="text-xs px-2 py-1">
                    View
                  </Button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'file':
        return (
          <div className="flex items-center space-x-3 bg-surface border border-border rounded-lg p-3 max-w-xs">
            <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
              <Icon name="File" size={20} color="var(--color-primary)" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-primary truncate">
                {message.fileName}
              </p>
              <p className="text-xs text-secondary">
                {message.fileSize}
              </p>
            </div>
            <Button variant="ghost" className="p-1">
              <Icon name="Download" size={16} />
            </Button>
          </div>
        );

      case 'meeting':
        return (
          <div className="bg-surface border border-border rounded-lg p-3 max-w-xs">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Calendar" size={16} color="var(--color-primary)" />
              <span className="text-sm font-medium text-primary">Meeting Scheduled</span>
            </div>
            <p className="text-sm text-secondary mb-2">{message.meeting.title}</p>
            <div className="text-xs text-secondary space-y-1">
              <div className="flex items-center space-x-2">
                <Icon name="Clock" size={12} />
                <span>{message.meeting.time}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="MapPin" size={12} />
                <span>{message.meeting.location}</span>
              </div>
            </div>
            <Button variant="primary" className="w-full mt-2 text-xs">
              Join Meeting
            </Button>
          </div>
        );

      default:
        return <p className="text-sm">{message.content}</p>;
    }
  };

  return (
    <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex items-end space-x-2 max-w-xs lg:max-w-md ${isOwn ? 'flex-row-reverse space-x-reverse' : ''}`}>
        {!isOwn && (
          <Image
            src={participant.avatar}
            alt={participant.name}
            className="w-8 h-8 rounded-full object-cover flex-shrink-0"
          />
        )}

        <div className={`relative ${isOwn ? 'bg-primary text-white' : 'bg-surface-secondary text-primary'} rounded-2xl px-4 py-2 shadow-sm`}>
          {renderMessageContent()}
          
          <div className={`flex items-center justify-end space-x-1 mt-1 ${isOwn ? 'text-white/70' : 'text-secondary'}`}>
            <span className="text-xs">
              {formatTime(message.timestamp)}
            </span>
            {isOwn && (
              <div className="flex items-center">
                {message.status === 'sent' && (
                  <Icon name="Check" size={12} />
                )}
                {message.status === 'delivered' && (
                  <div className="flex">
                    <Icon name="Check" size={12} />
                    <Icon name="Check" size={12} className="-ml-1" />
                  </div>
                )}
                {message.status === 'read' && (
                  <div className="flex text-accent">
                    <Icon name="Check" size={12} />
                    <Icon name="Check" size={12} className="-ml-1" />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;