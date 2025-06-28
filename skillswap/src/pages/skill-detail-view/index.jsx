import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import TabNavigation from '../../components/ui/TabNavigation';
import ContextualActionBar from '../../components/ui/ContextualActionBar';
import SkillImageCarousel from './components/SkillImageCarousel';
import SkillInformation from './components/SkillInformation';
import CreatorProfile from './components/CreatorProfile';
import ReviewsSection from './components/ReviewsSection';
import AvailabilityCalendar from './components/AvailabilityCalendar';
import RelatedSkills from './components/RelatedSkills';
import ActionButtons from './components/ActionButtons';


const SkillDetailView = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Mock skill data
  const skillData = {
    id: "skill-001",
    title: "Advanced React Development with TypeScript",
    description: `Master modern React development with TypeScript in this comprehensive skill exchange. Learn advanced patterns, performance optimization, and best practices used in production applications.\n\nThis hands-on session covers:\n• Advanced React hooks and custom hook patterns\n• TypeScript integration with React components\n• State management with Context API and Redux Toolkit\n• Performance optimization techniques\n• Testing strategies for React applications\n• Modern build tools and deployment strategies\n\nPerfect for developers looking to level up their React skills and build scalable, maintainable applications.`,
    category: "Web Development",
    tags: ["React", "TypeScript", "JavaScript", "Frontend", "Hooks", "Performance"],
    price: 45,
    isFree: false,
    isBarterOnly: false,
    allowsBartering: true,
    difficulty: "Advanced",
    duration: "2-3 hours",
    postedDate: "2 days ago",
    views: 1247,
    favorites: 89,
    studentsCount: 156,
    availability: "Flexible",
    images: [
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=450&fit=crop",
      "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&h=450&fit=crop",
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=450&fit=crop"
    ],
    learningOutcomes: [
      "Build complex React applications with TypeScript",
      "Implement advanced state management patterns",
      "Optimize React app performance for production",
      "Write comprehensive tests for React components",
      "Deploy React applications to modern platforms"
    ],
    prerequisites: [
      "Basic knowledge of React and JavaScript",
      "Familiarity with ES6+ features",
      "Understanding of HTML and CSS",
      "Basic command line experience"
    ]
  };

  const creatorData = {
    id: "user-001",
    name: "Sarah Chen",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    university: "Stanford University",
    major: "Computer Science",
    bio: "Senior Frontend Developer at Google with 5+ years of experience building scalable React applications. Passionate about teaching and helping others grow their development skills.",
    reputation: 4.8,
    totalReviews: 127,
    skillsOffered: 8,
    completedExchanges: 89,
    responseTime: "< 2 hours",
    successRate: 98,
    isOnline: true,
    isEmailVerified: true,
    isUniversityVerified: true,
    isPhoneVerified: true,
    githubUrl: "https://github.com/sarahchen",
    linkedinUrl: "https://linkedin.com/in/sarahchen"
  };

  const reviewsData = [
    {
      id: "review-001",
      reviewer: {
        name: "Alex Rodriguez",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        university: "MIT"
      },
      rating: 5,
      comment: "Sarah is an exceptional teacher! Her React TypeScript session was incredibly detailed and practical. She provided real-world examples and helped me understand complex concepts that I've been struggling with for months. The hands-on approach and personalized feedback made all the difference.",
      date: "2024-01-15",
      tags: ["Helpful", "Expert", "Patient"],
      helpfulCount: 12,
      isVerifiedExchange: true
    },
    {
      id: "review-002",
      reviewer: {
        name: "Emily Johnson",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
        university: "UC Berkeley"
      },
      rating: 5,
      comment: "Amazing session! Sarah's expertise in React and TypeScript is evident. She explained complex topics in a way that was easy to understand and provided excellent resources for further learning.",
      date: "2024-01-10",
      tags: ["Clear Explanation", "Resourceful"],
      helpfulCount: 8,
      isVerifiedExchange: true
    },
    {
      id: "review-003",
      reviewer: {
        name: "Michael Park",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        university: "Harvard University"
      },
      rating: 4,
      comment: "Great learning experience. Sarah is very knowledgeable and patient. The only minor issue was that we ran a bit over time, but the content was so valuable that I didn\'t mind at all.",
      date: "2024-01-05",
      tags: ["Knowledgeable", "Patient"],
      helpfulCount: 5,
      isVerifiedExchange: true
    }
  ];

  const availabilityData = {
    "2024-01-20": [
      { startTime: "09:00", endTime: "11:00", isBooked: false },
      { startTime: "14:00", endTime: "16:00", isBooked: true },
      { startTime: "18:00", endTime: "20:00", isBooked: false }
    ],
    "2024-01-21": [
      { startTime: "10:00", endTime: "12:00", isBooked: false },
      { startTime: "15:00", endTime: "17:00", isBooked: false }
    ],
    "2024-01-22": [
      { startTime: "09:00", endTime: "11:00", isBooked: false },
      { startTime: "13:00", endTime: "15:00", isBooked: false },
      { startTime: "16:00", endTime: "18:00", isBooked: true }
    ],
    "2024-01-23": [
      { startTime: "11:00", endTime: "13:00", isBooked: false },
      { startTime: "19:00", endTime: "21:00", isBooked: false }
    ],
    "2024-01-24": [
      { startTime: "08:00", endTime: "10:00", isBooked: false },
      { startTime: "14:00", endTime: "16:00", isBooked: false }
    ]
  };

  const relatedSkillsData = [
    {
      id: "skill-002",
      title: "Node.js Backend Development",
      category: "Backend Development",
      image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=225&fit=crop",
      creator: {
        name: "David Kim",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
      },
      rating: 4.7,
      reviewCount: 89,
      price: 40,
      isFree: false,
      isBarterOnly: false,
      difficulty: "Intermediate",
      duration: "2 hours",
      studentsCount: 124,
      availability: "Weekends",
      tags: ["Node.js", "Express", "MongoDB"]
    },
    {
      id: "skill-003",
      title: "UI/UX Design Fundamentals",
      category: "Design",
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=225&fit=crop",
      creator: {
        name: "Lisa Wang",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face"
      },
      rating: 4.9,
      reviewCount: 156,
      price: 0,
      isFree: true,
      isBarterOnly: false,
      difficulty: "Beginner",
      duration: "1.5 hours",
      studentsCount: 203,
      availability: "Flexible",
      tags: ["Figma", "Design", "Prototyping"]
    },
    {
      id: "skill-004",
      title: "Python Data Science",
      category: "Data Science",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=225&fit=crop",
      creator: {
        name: "James Wilson",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
      },
      rating: 4.6,
      reviewCount: 78,
      price: 0,
      isFree: false,
      isBarterOnly: true,
      difficulty: "Advanced",
      duration: "3 hours",
      studentsCount: 67,
      availability: "Evenings",
      tags: ["Python", "Pandas", "Machine Learning"]
    }
  ];

  const contextualActions = [
    {
      label: 'Contact',
      icon: 'MessageCircle',
      variant: 'primary',
      onClick: () => navigate('/messages-chat')
    },
    {
      label: 'Bookmark',
      icon: 'Bookmark',
      variant: 'secondary',
      onClick: () => console.log('Bookmark skill')
    },
    {
      label: 'Share',
      icon: 'Share2',
      variant: 'ghost',
      onClick: () => console.log('Share skill')
    }
  ];

  const handleBack = () => {
    navigate('/skill-marketplace-browse');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <TabNavigation />
        <div className="pt-16 md:pt-30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Loading Skeleton */}
            <div className="animate-pulse space-y-8">
              <div className="h-8 bg-surface rounded w-1/4"></div>
              <div className="aspect-video bg-surface rounded-xl"></div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                  <div className="h-6 bg-surface rounded w-3/4"></div>
                  <div className="space-y-3">
                    <div className="h-4 bg-surface rounded"></div>
                    <div className="h-4 bg-surface rounded w-5/6"></div>
                    <div className="h-4 bg-surface rounded w-4/6"></div>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="h-64 bg-surface rounded-xl"></div>
                  <div className="h-48 bg-surface rounded-xl"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <TabNavigation />
      <ContextualActionBar
        title={skillData.title}
        actions={contextualActions}
        showBackButton={true}
        onBack={handleBack}
      />
      
      <main className="pt-16 md:pt-44 pb-20 md:pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Mobile Layout */}
          <div className="md:hidden space-y-8">
            <SkillImageCarousel images={skillData.images} skillTitle={skillData.title} />
            <SkillInformation skill={skillData} />
            <CreatorProfile creator={creatorData} />
            <div id="availability-calendar">
              <AvailabilityCalendar availability={availabilityData} timeZone="PST (UTC-8)" />
            </div>
            <ReviewsSection 
              reviews={reviewsData} 
              averageRating={creatorData.reputation} 
              totalReviews={creatorData.totalReviews} 
            />
            <RelatedSkills skills={relatedSkillsData} />
          </div>

          {/* Desktop Layout */}
          <div className="hidden md:block">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Main Content */}
              <div className="lg:col-span-2 space-y-8">
                <SkillImageCarousel images={skillData.images} skillTitle={skillData.title} />
                <SkillInformation skill={skillData} />
                <div id="availability-calendar">
                  <AvailabilityCalendar availability={availabilityData} timeZone="PST (UTC-8)" />
                </div>
                <ReviewsSection 
                  reviews={reviewsData} 
                  averageRating={creatorData.reputation} 
                  totalReviews={creatorData.totalReviews} 
                />
              </div>

              {/* Right Column - Sidebar */}
              <div className="space-y-6">
                <div className="sticky top-44 space-y-6">
                  <ActionButtons skill={skillData} creator={creatorData} isMobile={false} />
                  <CreatorProfile creator={creatorData} />
                </div>
              </div>
            </div>

            {/* Related Skills Section */}
            <div className="mt-16">
              <RelatedSkills skills={relatedSkillsData} />
            </div>
          </div>

          {/* Mobile Action Buttons */}
          <ActionButtons skill={skillData} creator={creatorData} isMobile={isMobile} />
        </div>
      </main>
    </div>
  );
};

export default SkillDetailView;