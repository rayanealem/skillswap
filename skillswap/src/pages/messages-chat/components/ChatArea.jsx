import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import MessageBubble from './MessageBubble';
import MessageComposer from './MessageComposer';
import SkillContextCard from './SkillContextCard';

const ChatArea = ({ 
  conversation, 
  messages, 
  onSendMessage, 
  onBackToList,
  isMobile 
}) => {
  const messagesEndRef = useRef(null);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (messageData) => {
    onSendMessage(messageData);
    
    // Simulate typing indicator
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
    }, 2000);
  };

  if (!conversation) {
    return (
      <div className="flex-1 flex items-center justify-center bg-surface">
        <div className="text-center">
          <Icon name="MessageCircle" size={64} color="var(--color-text-secondary)" className="mx-auto mb-4" />
          <h3 className="text-lg font-medium text-primary mb-2">Select a conversation</h3>
          <p className="text-secondary">Choose a conversation from the list to start messaging</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full bg-surface">
      {/* Chat Header */}
      <div className="p-4 border-b border-border bg-background">
        <div className="flex items-center space-x-3">
          {isMobile && (
            <Button
              variant="ghost"
              onClick={onBackToList}
              className="p-2 mr-2"
            >
              <Icon name="ArrowLeft" size={20} />
            </Button>
          )}
          
          <div className="relative">
            <Image
              src={conversation.participant.avatar}
              alt={conversation.participant.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            {conversation.participant.isOnline && (
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-success rounded-full border-2 border-background" />
            )}
          </div>

          <div className="flex-1">
            <h3 className="font-medium text-primary">{conversation.participant.name}</h3>
            <p className="text-sm text-secondary">
              {conversation.participant.isOnline ? 'Online' : `Last seen ${conversation.participant.lastSeen}`}
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="ghost" className="p-2">
              <Icon name="Phone" size={20} />
            </Button>
            <Button variant="ghost" className="p-2">
              <Icon name="Video" size={20} />
            </Button>
            <Button variant="ghost" className="p-2">
              <Icon name="MoreVertical" size={20} />
            </Button>
          </div>
        </div>

        {/* Skill Context */}
        {conversation.skillContext && (
          <SkillContextCard skill={conversation.skillContext} />
        )}
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            message={message}
            isOwn={message.senderId === 'current-user'}
            participant={conversation.participant}
          />
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex items-center space-x-3">
            <Image
              src={conversation.participant.avatar}
              alt={conversation.participant.name}
              className="w-8 h-8 rounded-full object-cover"
            />
            <div className="bg-surface-secondary rounded-2xl px-4 py-2">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-secondary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-secondary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-secondary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Message Composer */}
      <MessageComposer onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatArea;