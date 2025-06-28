import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const ConversationList = ({ 
  conversations, 
  selectedConversation, 
  onSelectConversation, 
  onNewMessage,
  isMobile,
  isVisible 
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredConversations = conversations.filter(conv =>
    conv.participant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (conv.skillContext && conv.skillContext.title.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const formatTime = (timestamp) => {
    const now = new Date();
    const messageTime = new Date(timestamp);
    const diffInHours = (now - messageTime) / (1000 * 60 * 60);

    if (diffInHours < 1) {
      return `${Math.floor(diffInHours * 60)}m`;
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h`;
    } else {
      return messageTime.toLocaleDateString();
    }
  };

  if (isMobile && !isVisible) {
    return null;
  }

  return (
    <div className={`${
      isMobile 
        ? 'fixed inset-0 bg-background z-50' :'w-80 border-r border-border'
    } flex flex-col h-full`}>
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-primary">Messages</h2>
          <Button
            variant="ghost"
            onClick={onNewMessage}
            className="p-2"
          >
            <Icon name="Plus" size={20} />
          </Button>
        </div>

        {/* Search */}
        <div className="relative">
          <Input
            type="search"
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-surface border border-border rounded-lg"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon name="Search" size={16} color="var(--color-text-secondary)" />
          </div>
        </div>
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto">
        {filteredConversations.length === 0 ? (
          <div className="p-8 text-center">
            <Icon name="MessageCircle" size={48} color="var(--color-text-secondary)" className="mx-auto mb-4" />
            <p className="text-secondary">No conversations found</p>
          </div>
        ) : (
          filteredConversations.map((conversation) => (
            <div
              key={conversation.id}
              onClick={() => onSelectConversation(conversation)}
              className={`p-4 border-b border-border cursor-pointer hover:bg-surface-secondary transition-colors ${
                selectedConversation?.id === conversation.id ? 'bg-primary/10 border-r-2 border-r-primary' : ''
              }`}
            >
              <div className="flex items-start space-x-3">
                {/* Avatar */}
                <div className="relative flex-shrink-0">
                  <Image
                    src={conversation.participant.avatar}
                    alt={conversation.participant.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  {conversation.participant.isOnline && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-success rounded-full border-2 border-background" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-medium text-primary truncate">
                      {conversation.participant.name}
                    </h3>
                    <span className="text-xs text-secondary flex-shrink-0 ml-2">
                      {formatTime(conversation.timestamp)}
                    </span>
                  </div>

                  {/* Skill Context */}
                  {conversation.skillContext && (
                    <div className="flex items-center space-x-1 mb-1">
                      <Icon name="BookOpen" size={12} color="var(--color-accent)" />
                      <span className="text-xs text-accent truncate">
                        {conversation.skillContext.title}
                      </span>
                    </div>
                  )}

                  {/* Last Message */}
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-secondary truncate flex-1">
                      {conversation.isTyping ? (
                        <span className="text-primary italic">typing...</span>
                      ) : (
                        conversation.lastMessage
                      )}
                    </p>
                    
                    {/* Unread Badge */}
                    {conversation.unreadCount > 0 && (
                      <span className="bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium ml-2 flex-shrink-0">
                        {conversation.unreadCount > 9 ? '9+' : conversation.unreadCount}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ConversationList;