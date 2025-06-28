import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../components/ui/Header';
import TabNavigation from '../../components/ui/TabNavigation';
import ContextualActionBar from '../../components/ui/ContextualActionBar';
import ProfileHeader from './components/ProfileHeader';
import ProfileBio from './components/ProfileBio';
import ReputationDashboard from './components/ReputationDashboard';
import SkillsSection from './components/SkillsSection';
import ActivityFeed from './components/ActivityFeed';
import ContactSection from './components/ContactSection';

const UserProfile = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [isOwnProfile, setIsOwnProfile] = useState(false);

  // Mock current user ID for demonstration
  const currentUserId = "user123";

  useEffect(() => {
    // Simulate loading user data
    const loadUserData = async () => {
      setLoading(true);
      
      // Mock API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Determine if this is the current user's profile
      const profileUserId = userId || currentUserId;
      const isOwn = !userId || userId === currentUserId;
      setIsOwnProfile(isOwn);
      
      // Mock user data
      const mockUser = {
        id: profileUserId,
        name: isOwn ? "Alex Johnson" : "Sarah Chen",
        email: isOwn ? "alex.johnson@university.edu" : "sarah.chen@university.edu",
        avatar: isOwn 
          ? "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
          : "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
        university: "Stanford University",
        major: isOwn ? "Computer Science" : "Data Science",
        graduationYear: 2025,
        location: "Palo Alto, CA",
        isVerified: true,
        isOnline: isOwn ? true : Math.random() > 0.5,
        availabilityStatus: isOwn ? "online" : ["online", "busy", "away", "offline"][Math.floor(Math.random() * 4)],
        bio: isOwn 
          ? `Passionate full-stack developer with expertise in React, Node.js, and cloud technologies. I love helping fellow students learn programming concepts and build amazing projects. Currently working on my senior capstone project involving machine learning and web development.\n\nAlways excited to collaborate on innovative projects and share knowledge with the community!`
          : `Data science enthusiast specializing in machine learning and statistical analysis. I enjoy teaching Python, R, and data visualization techniques. Currently researching natural language processing applications.\n\nLooking forward to connecting with fellow students and sharing insights about data science!`,
        specializations: isOwn 
          ? ["React Development", "Node.js", "Cloud Computing", "UI/UX Design", "Database Design"]
          : ["Python Programming", "Machine Learning", "Data Visualization", "Statistical Analysis", "R Programming"],
        githubUrl: isOwn ? "https://github.com/alexjohnson" : "https://github.com/sarahchen",
        linkedinUrl: isOwn ? "https://linkedin.com/in/alexjohnson" : "https://linkedin.com/in/sarahchen",
        portfolioUrl: isOwn ? "https://alexjohnson.dev" : "https://sarahchen.dev",
        averageResponseTime: isOwn ? "2 hours" : "4 hours",
        contactHours: isOwn ? "9 AM - 6 PM PST" : "10 AM - 8 PM PST",
        totalExchanges: isOwn ? 24 : 18,
        successRate: isOwn ? 96 : 94
      };

      const mockReputation = {
        score: isOwn ? 4.8 : 4.6,
        completedExchanges: isOwn ? 24 : 18,
        averageRating: isOwn ? 4.8 : 4.6,
        responseRate: isOwn ? 96 : 94,
        completionRate: isOwn ? 98 : 89,
        profileCompleteness: isOwn ? 95 : 87
      };

      const mockSkills = {
        active: isOwn ? [
          {
            id: 1,
            title: "React.js Development Tutoring",
            description: "Learn modern React development with hooks, context, and best practices. Perfect for beginners to intermediate developers.",
            category: "Programming",
            price: 25,
            rating: 4.9,
            reviews: 12,
            image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=100&h=100&fit=crop"
          },
          {
            id: 2,
            title: "UI/UX Design Consultation",
            description: "Get feedback on your designs and learn modern UI/UX principles. Includes wireframing and prototyping guidance.",
            category: "Design",
            price: null,
            rating: 4.8,
            reviews: 8,
            image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=100&h=100&fit=crop"
          },
          {
            id: 3,
            title: "Database Design & SQL",
            description: "Learn database design principles, SQL queries, and optimization techniques for web applications.",
            category: "Database",
            price: 20,
            rating: 4.7,
            reviews: 15,
            image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=100&h=100&fit=crop"
          }
        ] : [
          {
            id: 4,
            title: "Python Data Analysis",
            description: "Learn Python for data analysis using pandas, numpy, and matplotlib. Perfect for data science beginners.",
            category: "Data Science",
            price: 30,
            rating: 4.9,
            reviews: 14,
            image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=100&h=100&fit=crop"
          },
          {
            id: 5,
            title: "Machine Learning Basics",
            description: "Introduction to machine learning concepts and practical implementation using scikit-learn.",
            category: "AI/ML",
            price: null,
            rating: 4.7,
            reviews: 9,
            image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=100&h=100&fit=crop"
          }
        ],
        completed: isOwn ? [
          {
            id: 6,
            title: "JavaScript Fundamentals",
            description: "Completed teaching JavaScript basics to 5 students",
            category: "Programming",
            price: 15,
            rating: 4.8,
            reviews: 5,
            completedDate: "Dec 15, 2024",
            image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=100&h=100&fit=crop"
          }
        ] : [
          {
            id: 7,
            title: "Statistics for Beginners",
            description: "Completed teaching basic statistics concepts",
            category: "Mathematics",
            price: 20,
            rating: 4.6,
            reviews: 3,
            completedDate: "Dec 10, 2024",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&h=100&fit=crop"
          }
        ]
      };

      const mockReviews = isOwn ? [
        {
          id: 1,
          reviewer: {
            name: "Emily Rodriguez",
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face"
          },
          rating: 5,
          comment: "Alex is an amazing tutor! Explained React concepts clearly and patiently. Highly recommend for anyone learning web development.",
          skillTitle: "React.js Development Tutoring",
          date: "Dec 18, 2024"
        },
        {
          id: 2,
          reviewer: {
            name: "Michael Kim",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face"
          },
          rating: 5,
          comment: "Great design feedback and very helpful suggestions. Alex helped me improve my portfolio significantly.",
          skillTitle: "UI/UX Design Consultation",
          date: "Dec 12, 2024"
        },
        {
          id: 3,
          reviewer: {
            name: "Lisa Wang",
            avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=50&h=50&fit=crop&crop=face"
          },
          rating: 4,
          comment: "Very knowledgeable about databases. The session was informative and well-structured.",
          skillTitle: "Database Design & SQL",
          date: "Dec 8, 2024"
        }
      ] : [
        {
          id: 4,
          reviewer: {
            name: "David Park",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face"
          },
          rating: 5,
          comment: "Sarah's Python tutorials are excellent! Clear explanations and practical examples made learning enjoyable.",
          skillTitle: "Python Data Analysis",
          date: "Dec 16, 2024"
        },
        {
          id: 5,
          reviewer: {
            name: "Jennifer Liu",
            avatar: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=50&h=50&fit=crop&crop=face"
          },
          rating: 4,
          comment: "Great introduction to machine learning concepts. Sarah made complex topics easy to understand.",
          skillTitle: "Machine Learning Basics",
          date: "Dec 14, 2024"
        }
      ];

      const mockActivities = isOwn ? [
        {
          id: 1,
          type: "exchange_completed",
          description: "Completed a React tutoring session",
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
          metadata: { skillTitle: "React.js Development Tutoring" },
          relatedUser: {
            name: "Emily Rodriguez",
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=30&h=30&fit=crop&crop=face"
          }
        },
        {
          id: 2,
          type: "review_received",
          description: "Received a 5-star review",
          timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
          metadata: { rating: 5, skillTitle: "UI/UX Design Consultation" },
          relatedUser: {
            name: "Michael Kim",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=30&h=30&fit=crop&crop=face"
          }
        },
        {
          id: 3,
          type: "skill_posted",
          description: "Posted a new skill offering",
          timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
          metadata: { skillTitle: "Advanced React Patterns" }
        },
        {
          id: 4,
          type: "achievement_earned",
          description: "Earned 'Top Mentor' achievement",
          timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
        }
      ] : [
        {
          id: 5,
          type: "exchange_completed",
          description: "Completed a Python data analysis session",
          timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
          metadata: { skillTitle: "Python Data Analysis" },
          relatedUser: {
            name: "David Park",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=30&h=30&fit=crop&crop=face"
          }
        },
        {
          id: 6,
          type: "review_received",
          description: "Received a 4-star review",
          timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
          metadata: { rating: 4, skillTitle: "Machine Learning Basics" },
          relatedUser: {
            name: "Jennifer Liu",
            avatar: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=30&h=30&fit=crop&crop=face"
          }
        }
      ];

      setUser({
        ...mockUser,
        reputation: mockReputation,
        skills: mockSkills,
        reviews: mockReviews,
        activities: mockActivities
      });
      
      setLoading(false);
    };

    loadUserData();
  }, [userId, currentUserId]);

  const handleEditProfile = () => {
    console.log('Edit profile clicked');
    // Navigate to edit profile page or open modal
  };

  const handleMessageUser = () => {
    navigate('/messages-chat', { state: { userId: user.id, userName: user.name } });
  };

  const handleScheduleCall = () => {
    console.log('Schedule call clicked');
    // Open scheduling modal or navigate to scheduling page
  };

  const contextualActions = isOwnProfile ? [
    {
      label: 'Edit Profile',
      icon: 'Edit3',
      variant: 'primary',
      onClick: handleEditProfile
    },
    {
      label: 'Settings',
      icon: 'Settings',
      variant: 'ghost',
      onClick: () => console.log('Settings clicked')
    }
  ] : [
    {
      label: 'Message',
      icon: 'MessageCircle',
      variant: 'primary',
      onClick: handleMessageUser
    },
    {
      label: 'Follow',
      icon: 'UserPlus',
      variant: 'secondary',
      onClick: () => console.log('Follow clicked')
    },
    {
      label: 'Share',
      icon: 'Share2',
      variant: 'ghost',
      onClick: () => console.log('Share clicked')
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <TabNavigation />
        <ContextualActionBar 
          title="Profile"
          showBackButton={!!userId}
          onBack={() => navigate(-1)}
        />
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="animate-pulse space-y-6">
            {/* Profile Header Skeleton */}
            <div className="bg-surface border border-border rounded-xl p-6">
              <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
                <div className="w-24 h-24 md:w-32 md:h-32 bg-surface-secondary rounded-full" />
                <div className="flex-1 space-y-3">
                  <div className="h-8 bg-surface-secondary rounded w-48" />
                  <div className="h-4 bg-surface-secondary rounded w-64" />
                  <div className="h-4 bg-surface-secondary rounded w-56" />
                </div>
              </div>
            </div>
            
            {/* Content Skeletons */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-surface border border-border rounded-xl p-6">
                  <div className="h-6 bg-surface-secondary rounded w-32 mb-4" />
                  <div className="space-y-3">
                    <div className="h-4 bg-surface-secondary rounded" />
                    <div className="h-4 bg-surface-secondary rounded w-3/4" />
                  </div>
                </div>
                
                <div className="bg-surface border border-border rounded-xl p-6">
                  <div className="h-6 bg-surface-secondary rounded w-48 mb-4" />
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="text-center">
                        <div className="h-8 bg-surface-secondary rounded w-12 mx-auto mb-2" />
                        <div className="h-3 bg-surface-secondary rounded w-16 mx-auto" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="bg-surface border border-border rounded-xl p-6">
                  <div className="h-6 bg-surface-secondary rounded w-24 mb-4" />
                  <div className="space-y-4">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="h-12 bg-surface-secondary rounded" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <TabNavigation />
        <ContextualActionBar 
          title="Profile"
          showBackButton={!!userId}
          onBack={() => navigate(-1)}
        />
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h2 className="text-2xl font-bold text-primary mb-2">User Not Found</h2>
            <p className="text-secondary mb-6">The profile you're looking for doesn't exist or has been removed.</p>
            <button
              onClick={() => navigate('/dashboard-home')}
              className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
            >
              Go Back Home
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <TabNavigation />
      <ContextualActionBar 
        title={isOwnProfile ? "My Profile" : user.name}
        actions={contextualActions}
        showBackButton={!!userId}
        onBack={() => navigate(-1)}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <ProfileHeader
              user={user}
              isOwnProfile={isOwnProfile}
              onEditProfile={handleEditProfile}
              onMessageUser={handleMessageUser}
            />
            
            <ProfileBio user={user} />
            
            <ReputationDashboard reputation={user.reputation} />
            
            <SkillsSection
              skills={user.skills}
              reviews={user.reviews}
              isOwnProfile={isOwnProfile}
            />
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            <ContactSection
              user={user}
              isOwnProfile={isOwnProfile}
              onMessageUser={handleMessageUser}
              onScheduleCall={handleScheduleCall}
            />
            
            <ActivityFeed activities={user.activities} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserProfile;