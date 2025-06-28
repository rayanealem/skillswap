import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const MessageComposer = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showAttachments, setShowAttachments] = useState(false);
  const fileInputRef = useRef(null);

  const emojis = ['😊', '😂', '❤️', '👍', '👎', '😢', '😮', '😡', '🎉', '🔥', '💯', '👏'];

  const quickTemplates = [
    "I\'m interested in learning this skill!",
    "When would be a good time to meet?",
    "What materials do I need to prepare?",
    "Can we schedule a practice session?",
    "Thank you for the lesson!"
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      onSendMessage({
        type: 'text',
        content: message.trim(),
        timestamp: new Date()
      });
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleEmojiClick = (emoji) => {
    setMessage(prev => prev + emoji);
    setShowEmojiPicker(false);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      onSendMessage({
        type: 'file',
        fileName: file.name,
        fileSize: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
        timestamp: new Date()
      });
    }
  };

  const handleTemplateClick = (template) => {
    setMessage(template);
    setShowAttachments(false);
  };

  const handleScheduleMeeting = () => {
    onSendMessage({
      type: 'meeting',
      meeting: {
        title: 'Skill Exchange Session',
        time: 'Tomorrow at 3:00 PM',
        location: 'Online via Video Call'
      },
      timestamp: new Date()
    });
    setShowAttachments(false);
  };

  const handleShareSkill = () => {
    onSendMessage({
      type: 'skill',
      skill: {
        title: 'React Development Basics',
        category: 'Programming',
        price: '$25/hour',
        image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400'
      },
      timestamp: new Date()
    });
    setShowAttachments(false);
  };

  return (
    <div className="border-t border-border bg-background">
      {/* Quick Templates */}
      {showAttachments && (
        <div className="p-4 border-b border-border">
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-primary mb-3">Quick Actions</h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <Button
                variant="ghost"
                onClick={handleScheduleMeeting}
                className="flex items-center space-x-2 justify-start p-3 h-auto"
              >
                <Icon name="Calendar" size={16} />
                <span className="text-sm">Schedule Meeting</span>
              </Button>
              
              <Button
                variant="ghost"
                onClick={handleShareSkill}
                className="flex items-center space-x-2 justify-start p-3 h-auto"
              >
                <Icon name="BookOpen" size={16} />
                <span className="text-sm">Share Skill</span>
              </Button>
            </div>

            <div className="mt-4">
              <h5 className="text-xs font-medium text-secondary mb-2">Quick Templates</h5>
              <div className="space-y-1">
                {quickTemplates.map((template, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    onClick={() => handleTemplateClick(template)}
                    className="w-full text-left justify-start p-2 h-auto text-sm text-secondary hover:text-primary"
                  >
                    {template}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Emoji Picker */}
      {showEmojiPicker && (
        <div className="p-4 border-b border-border">
          <div className="grid grid-cols-6 gap-2">
            {emojis.map((emoji, index) => (
              <Button
                key={index}
                variant="ghost"
                onClick={() => handleEmojiClick(emoji)}
                className="p-2 text-lg hover:bg-surface-secondary"
              >
                {emoji}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Message Input */}
      <div className="p-4">
        <div className="flex items-end space-x-2">
          {/* Attachment Button */}
          <Button
            variant="ghost"
            onClick={() => setShowAttachments(!showAttachments)}
            className={`p-2 ${showAttachments ? 'text-primary' : 'text-secondary'}`}
          >
            <Icon name="Plus" size={20} />
          </Button>

          {/* Message Input */}
          <div className="flex-1 relative">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              className="w-full bg-surface border border-border rounded-2xl px-4 py-3 pr-12 resize-none focus:ring-2 focus:ring-primary focus:border-transparent text-primary placeholder-secondary max-h-32 min-h-[44px]"
              rows={1}
              style={{
                height: 'auto',
                minHeight: '44px',
                maxHeight: '128px'
              }}
              onInput={(e) => {
                e.target.style.height = 'auto';
                e.target.style.height = Math.min(e.target.scrollHeight, 128) + 'px';
              }}
            />
            
            {/* Emoji Button */}
            <Button
              variant="ghost"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className="absolute right-2 bottom-2 p-1 text-secondary hover:text-primary"
            >
              <Icon name="Smile" size={16} />
            </Button>
          </div>

          {/* File Upload */}
          <input
            ref={fileInputRef}
            type="file"
            onChange={handleFileUpload}
            className="hidden"
            accept="image/*,application/pdf,.doc,.docx"
          />
          
          <Button
            variant="ghost"
            onClick={() => fileInputRef.current?.click()}
            className="p-2 text-secondary hover:text-primary"
          >
            <Icon name="Paperclip" size={20} />
          </Button>

          {/* Send Button */}
          <Button
            variant="primary"
            onClick={handleSendMessage}
            disabled={!message.trim()}
            className="p-2 rounded-full"
          >
            <Icon name="Send" size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MessageComposer;