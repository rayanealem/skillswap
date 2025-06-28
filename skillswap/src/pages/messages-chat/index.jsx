import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import TabNavigation from '../../components/ui/TabNavigation';
import ConversationList from './components/ConversationList';
import ChatArea from './components/ChatArea';

const MessagesChat = () => {
  const navigate = useNavigate();
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [showConversationList, setShowConversationList] = useState(true);

  // Mock conversations data
  const mockConversations = [
    {
      id: 1,
      participant: {
        id: 'user1',
        name: 'Sarah Chen',
        avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
        isOnline: true,
        lastSeen: '2 minutes ago'
      },
      lastMessage: 'That sounds great! When can we start the React lessons?',
      timestamp: new Date(Date.now() - 300000),
      unreadCount: 2,
      isTyping: false,
      skillContext: {
        id: 'skill1',
        title: 'React Development Basics',
        description: 'Learn the fundamentals of React including components, hooks, and state management',
        category: 'Programming',
        price: '$25/hour',
        image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400'
      }
    },
    {
      id: 2,
      participant: {
        id: 'user2',
        name: 'Marcus Johnson',
        avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
        isOnline: false,
        lastSeen: '1 hour ago'
      },
      lastMessage: 'I can help you with guitar basics. Do you have your own guitar?',
      timestamp: new Date(Date.now() - 3600000),
      unreadCount: 0,
      isTyping: false,
      skillContext: {
        id: 'skill2',
        title: 'Guitar Fundamentals',
        description: 'Learn basic chords, strumming patterns, and simple songs',
        category: 'Music',
        price: 'Barter',
        image: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=400'
      }
    },
    {
      id: 3,
      participant: {
        id: 'user3',
        name: 'Elena Rodriguez',
        avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
        isOnline: true,
        lastSeen: 'now'
      },
      lastMessage: 'Perfect! I\'ll prepare some practice problems for our session.',
      timestamp: new Date(Date.now() - 7200000),
      unreadCount: 1,
      isTyping: true,
      skillContext: {
        id: 'skill3',
        title: 'Spanish Conversation Practice',
        description: 'Improve your Spanish speaking skills through conversation practice',
        category: 'Languages',
        price: '$15/hour',
        image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400'
      }
    },
    {
      id: 4,
      participant: {
        id: 'user4',
        name: 'David Kim',
        avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
        isOnline: false,
        lastSeen: '3 hours ago'
      },
      lastMessage: 'Thanks for the photography tips! The lighting techniques really helped.',
      timestamp: new Date(Date.now() - 86400000),
      unreadCount: 0,
      isTyping: false,
      skillContext: null
    },
    {
      id: 5,
      participant: {
        id: 'user5',
        name: 'Priya Patel',
        avatar: 'https://randomuser.me/api/portraits/women/5.jpg',
        isOnline: true,
        lastSeen: 'now'
      },
      lastMessage: 'I have some great resources for data science. Let me share them with you.',
      timestamp: new Date(Date.now() - 172800000),
      unreadCount: 0,
      isTyping: false,
      skillContext: {
        id: 'skill5',
        title: 'Data Science with Python',
        description: 'Learn data analysis, visualization, and machine learning with Python',
        category: 'Data Science',
        price: '$30/hour',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400'
      }
    }
  ];

  // Mock messages for selected conversation
  const mockMessages = {
    1: [
      {
        id: 1,
        senderId: 'user1',
        type: 'text',
        content: 'Hi! I saw your React development skill listing. I\'m really interested in learning!',
        timestamp: new Date(Date.now() - 3600000),
        status: 'read'
      },
      {
        id: 2,
        senderId: 'current-user',
        type: 'text',
        content: 'That\'s great! I\'d be happy to help you learn React. What\'s your current experience level?',
        timestamp: new Date(Date.now() - 3300000),
        status: 'read'
      },
      {
        id: 3,
        senderId: 'user1',
        type: 'text',
        content: 'I have some basic JavaScript knowledge but I\'m completely new to React. I\'ve heard it\'s really powerful for building user interfaces.',
        timestamp: new Date(Date.now() - 3000000),
        status: 'read'
      },
      {
        id: 4,
        senderId: 'current-user',
        type: 'skill',
        skill: {
          title: 'React Development Basics',
          category: 'Programming',
          price: '$25/hour',
          image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400'
        },
        timestamp: new Date(Date.now() - 2700000),
        status: 'read'
      },
      {
        id: 5,
        senderId: 'user1',
        type: 'text',
        content: 'Perfect! This looks exactly like what I need. When would be a good time to start?',
        timestamp: new Date(Date.now() - 1800000),
        status: 'read'
      },
      {
        id: 6,
        senderId: 'current-user',
        type: 'meeting',
        meeting: {
          title: 'React Basics - First Session',
          time: 'Tomorrow at 3:00 PM',
          location: 'Online via Video Call'
        },
        timestamp: new Date(Date.now() - 900000),
        status: 'delivered'
      },
      {
        id: 7,
        senderId: 'user1',
        type: 'text',
        content: 'That sounds great! When can we start the React lessons?',
        timestamp: new Date(Date.now() - 300000),
        status: 'sent'
      }
    ],
    2: [
      {
        id: 1,
        senderId: 'user2',
        type: 'text',
        content: 'Hey! I noticed you\'re looking for guitar lessons. I\'ve been playing for 8 years and would love to help!',
        timestamp: new Date(Date.now() - 7200000),
        status: 'read'
      },
      {
        id: 2,
        senderId: 'current-user',
        type: 'text',
        content: 'That would be amazing! I\'m a complete beginner. What should I know before we start?',
        timestamp: new Date(Date.now() - 6900000),
        status: 'read'
      },
      {
        id: 3,
        senderId: 'user2',
        type: 'text',
        content: 'I can help you with guitar basics. Do you have your own guitar?',
        timestamp: new Date(Date.now() - 3600000),
        status: 'read'
      }
    ]
  };

  useEffect(() => {
    setConversations(mockConversations);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) {
        setShowConversationList(true);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (selectedConversation) {
      setMessages(mockMessages[selectedConversation.id] || []);
      if (isMobile) {
        setShowConversationList(false);
      }
    }
  }, [selectedConversation, isMobile]);

  const handleSelectConversation = (conversation) => {
    setSelectedConversation(conversation);
    
    // Mark conversation as read
    setConversations(prev => 
      prev.map(conv => 
        conv.id === conversation.id 
          ? { ...conv, unreadCount: 0 }
          : conv
      )
    );
  };

  const handleSendMessage = (messageData) => {
    const newMessage = {
      id: Date.now(),
      senderId: 'current-user',
      ...messageData,
      status: 'sent'
    };

    setMessages(prev => [...prev, newMessage]);

    // Update conversation last message
    setConversations(prev =>
      prev.map(conv =>
        conv.id === selectedConversation.id
          ? {
              ...conv,
              lastMessage: messageData.type === 'text' 
                ? messageData.content 
                : `Sent a ${messageData.type}`,
              timestamp: messageData.timestamp
            }
          : conv
      )
    );
  };

  const handleNewMessage = () => {
    navigate('/skill-marketplace-browse');
  };

  const handleBackToList = () => {
    setShowConversationList(true);
    setSelectedConversation(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <TabNavigation />
      
      <main className="pt-16 md:pt-30 pb-16 md:pb-0">
        <div className="h-[calc(100vh-8rem)] md:h-[calc(100vh-7.5rem)] flex">
          {/* Conversation List */}
          <ConversationList
            conversations={conversations}
            selectedConversation={selectedConversation}
            onSelectConversation={handleSelectConversation}
            onNewMessage={handleNewMessage}
            isMobile={isMobile}
            isVisible={showConversationList}
          />

          {/* Chat Area */}
          {(!isMobile || !showConversationList) && (
            <ChatArea
              conversation={selectedConversation}
              messages={messages}
              onSendMessage={handleSendMessage}
              onBackToList={handleBackToList}
              isMobile={isMobile}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default MessagesChat;