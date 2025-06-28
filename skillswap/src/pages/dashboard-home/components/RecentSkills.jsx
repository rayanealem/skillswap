import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import SkillCard from './SkillCard';
import Button from '../../../components/ui/Button';

const RecentSkills = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [sortBy, setSortBy] = useState('recent'); // 'recent', 'popular', 'price'

  const recentSkills = [
    {
      id: 9,
      title: "Web Development with React",
      description: "Build modern web applications using React, including hooks, state management, and component architecture.",
      category: "Programming",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop",
      price: "$40/hour",
      isBarter: false,
      rating: 4.8,
      reviewCount: 42,
      isNew: true,
      user: {
        id: 9,
        name: "Alex Chen",
        avatar: "https://randomuser.me/api/portraits/men/34.jpg",
        reputation: 1650
      },
      tags: ["React", "JavaScript", "Frontend", "Hooks"],
      postedAt: "2024-01-15T10:30:00Z"
    },
    {
      id: 10,
      title: "Digital Marketing Strategy",
      description: "Learn comprehensive digital marketing including SEO, social media, content marketing, and analytics.",
      category: "Marketing",
      image: "https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?w=400&h=300&fit=crop",
      price: "Barter",
      isBarter: true,
      rating: 4.7,
      reviewCount: 28,
      isNew: false,
      user: {
        id: 10,
        name: "Sophie Turner",
        avatar: "https://randomuser.me/api/portraits/women/56.jpg",
        reputation: 1320
      },
      tags: ["SEO", "Social Media", "Analytics", "Content"],
      postedAt: "2024-01-14T15:45:00Z"
    },
    {
      id: 11,
      title: "Music Production Basics",
      description: "Introduction to music production using DAW software, mixing, mastering, and sound design techniques.",
      category: "Music",
      image: "https://images.pixabay.com/photo/2016/11/23/15/48/audience-1853662_1280.jpg?w=400&h=300&fit=crop",
      price: "$25/hour",
      isBarter: false,
      rating: 4.9,
      reviewCount: 19,
      isNew: true,
      user: {
        id: 11,
        name: "Marcus Johnson",
        avatar: "https://randomuser.me/api/portraits/men/78.jpg",
        reputation: 890
      },
      tags: ["Music Production", "DAW", "Mixing", "Sound Design"],
      postedAt: "2024-01-14T09:20:00Z"
    },
    {
      id: 12,
      title: "Business Plan Writing",
      description: "Learn to create comprehensive business plans including market analysis, financial projections, and strategy.",
      category: "Business",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop",
      price: "$30/hour",
      isBarter: false,
      rating: 4.6,
      reviewCount: 22,
      isNew: false,
      user: {
        id: 12,
        name: "Rachel Green",
        avatar: "https://randomuser.me/api/portraits/women/42.jpg",
        reputation: 1540
      },
      tags: ["Business Plan", "Strategy", "Finance", "Market Analysis"],
      postedAt: "2024-01-13T14:10:00Z"
    },
    {
      id: 13,
      title: "Creative Writing Workshop",
      description: "Develop your creative writing skills through structured exercises, feedback, and storytelling techniques.",
      category: "Writing",
      image: "https://images.pexels.com/photos/261763/pexels-photo-261763.jpeg?w=400&h=300&fit=crop",
      price: "Barter",
      isBarter: true,
      rating: 4.8,
      reviewCount: 16,
      isNew: false,
      user: {
        id: 13,
        name: "David Kim",
        avatar: "https://randomuser.me/api/portraits/men/91.jpg",
        reputation: 1200
      },
      tags: ["Creative Writing", "Storytelling", "Fiction", "Poetry"],
      postedAt: "2024-01-13T11:30:00Z"
    },
    {
      id: 14,
      title: "Mobile App Design",
      description: "Design user-friendly mobile applications with focus on UX/UI principles and modern design trends.",
      category: "Design",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop",
      price: "$35/hour",
      isBarter: false,
      rating: 4.7,
      reviewCount: 25,
      isNew: true,
      user: {
        id: 14,
        name: "Emma Davis",
        avatar: "https://randomuser.me/api/portraits/women/73.jpg",
        reputation: 1780
      },
      tags: ["Mobile Design", "UX/UI", "Figma", "Prototyping"],
      postedAt: "2024-01-12T16:45:00Z"
    }
  ];

  const sortOptions = [
    { value: 'recent', label: 'Most Recent', icon: 'Clock' },
    { value: 'popular', label: 'Most Popular', icon: 'TrendingUp' },
    { value: 'price', label: 'Price: Low to High', icon: 'DollarSign' }
  ];

  const getSortedSkills = () => {
    const sorted = [...recentSkills];
    switch (sortBy) {
      case 'popular':
        return sorted.sort((a, b) => b.rating - a.rating);
      case 'price':
        return sorted.sort((a, b) => {
          const priceA = a.isBarter ? 0 : parseInt(a.price.replace(/\D/g, ''));
          const priceB = b.isBarter ? 0 : parseInt(b.price.replace(/\D/g, ''));
          return priceA - priceB;
        });
      default:
        return sorted.sort((a, b) => new Date(b.postedAt) - new Date(a.postedAt));
    }
  };

  const handleViewAll = () => {
    navigate('/skill-marketplace-browse');
  };

  const handleRefresh = () => {
    // Simulate refresh
    window.location.reload();
  };

  return (
    <section className="mb-8">
      {/* Header with Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-xl font-bold text-primary mb-1">Recently Posted Skills</h2>
          <p className="text-sm text-secondary">Fresh opportunities from your community</p>
        </div>

        <div className="flex items-center space-x-4">
          {/* Sort Dropdown */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-surface border border-border rounded-lg px-3 py-2 text-sm text-primary focus:ring-2 focus:ring-primary focus:border-transparent appearance-none pr-8"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <Icon 
              name="ChevronDown" 
              size={16} 
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-secondary pointer-events-none" 
            />
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center bg-surface border border-border rounded-lg p-1">
            <Button
              variant={viewMode === 'grid' ? 'primary' : 'ghost'}
              onClick={() => setViewMode('grid')}
              className="p-2"
            >
              <Icon name="Grid3X3" size={16} />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'primary' : 'ghost'}
              onClick={() => setViewMode('list')}
              className="p-2"
            >
              <Icon name="List" size={16} />
            </Button>
          </div>

          {/* Refresh Button */}
          <Button
            variant="ghost"
            onClick={handleRefresh}
            className="p-2"
          >
            <Icon name="RefreshCw" size={16} />
          </Button>
        </div>
      </div>

      {/* Skills Grid/List */}
      <div className={`${
        viewMode === 'grid' ?'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' :'space-y-4'
      }`}>
        {getSortedSkills().map((skill) => (
          <SkillCard key={skill.id} skill={skill} />
        ))}
      </div>

      {/* Load More / View All */}
      <div className="flex items-center justify-center mt-8 space-x-4">
        <Button
          variant="secondary"
          onClick={handleViewAll}
          className="flex items-center space-x-2"
        >
          <Icon name="Search" size={16} />
          <span>Browse All Skills</span>
        </Button>
        <Button
          variant="ghost"
          onClick={() => {
            // Load more functionality
            console.log('Load more skills');
          }}
          className="flex items-center space-x-2"
        >
          <Icon name="Plus" size={16} />
          <span>Load More</span>
        </Button>
      </div>

      {/* Stats Bar */}
      <div className="mt-6 bg-surface border border-border rounded-lg p-4">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Icon name="Users" size={16} color="var(--color-primary)" />
              <span className="text-secondary">156 active learners</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="BookOpen" size={16} color="var(--color-accent)" />
              <span className="text-secondary">89 skills posted today</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="TrendingUp" size={16} color="var(--color-success)" />
            <span className="text-success">+12% this week</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecentSkills;