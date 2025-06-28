import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Header from '../../components/ui/Header';
import TabNavigation from '../../components/ui/TabNavigation';
import ContextualActionBar from '../../components/ui/ContextualActionBar';
import FilterChip from './components/FilterChip';
import SkillCard from './components/SkillCard';
import FilterPanel from './components/FilterPanel';
import SearchBar from './components/SearchBar';
import SortDropdown from './components/SortDropdown';
import SkillPreviewModal from './components/SkillPreviewModal';
import SkillCardSkeleton from './components/SkillCardSkeleton';

const SkillMarketplaceBrowse = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('relevance');
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [previewSkill, setPreviewSkill] = useState(null);
  const [filters, setFilters] = useState({
    categories: [],
    universities: [],
    majors: [],
    priceRange: { min: '', max: '' },
    skillLevels: [],
    barterOnly: false,
    availableOnly: false
  });

  // Mock skills data
  const mockSkills = [
    {
      id: 1,
      title: "React Development Bootcamp",
      description: "Learn modern React development with hooks, context, and best practices. Perfect for beginners to intermediate developers.",
      category: "Programming",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop",
      price: 25,
      priceUnit: "hour",
      barterOnly: false,
      acceptsBarter: true,
      level: "Intermediate",
      available: true,
      rating: 4.8,
      reviewCount: 24,
      isFavorited: false,
      tags: ["React", "JavaScript", "Frontend", "Web Development"],
      creator: {
        id: 1,
        name: "Sarah Chen",
        avatar: "https://randomuser.me/api/portraits/women/32.jpg",
        university: "Stanford University",
        major: "Computer Science",
        rating: 4.9,
        skillsOffered: 8
      }
    },
    {
      id: 2,
      title: "UI/UX Design Fundamentals",
      description: "Master the principles of user interface and user experience design. Learn Figma, prototyping, and design thinking.",
      category: "Design",
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop",
      price: 30,
      priceUnit: "hour",
      barterOnly: false,
      acceptsBarter: true,
      level: "Beginner",
      available: true,
      rating: 4.9,
      reviewCount: 18,
      isFavorited: true,
      tags: ["UI/UX", "Figma", "Design", "Prototyping"],
      creator: {
        id: 2,
        name: "Mike Rodriguez",
        avatar: "https://randomuser.me/api/portraits/men/45.jpg",
        university: "MIT",
        major: "Design",
        rating: 4.8,
        skillsOffered: 5
      }
    },
    {
      id: 3,
      title: "Spanish Conversation Practice",
      description: "Native Spanish speaker offering conversation practice sessions. Improve your fluency and confidence.",
      category: "Language",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=300&fit=crop",
      price: 0,
      priceUnit: "hour",
      barterOnly: true,
      acceptsBarter: false,
      level: "All Levels",
      available: false,
      rating: 4.7,
      reviewCount: 31,
      isFavorited: false,
      tags: ["Spanish", "Conversation", "Language Exchange"],
      creator: {
        id: 3,
        name: "Maria Garcia",
        avatar: "https://randomuser.me/api/portraits/women/28.jpg",
        university: "UC Berkeley",
        major: "International Studies",
        rating: 4.7,
        skillsOffered: 3
      }
    },
    {
      id: 4,
      title: "Digital Marketing Strategy",
      description: "Learn effective digital marketing strategies including SEO, social media marketing, and content creation.",
      category: "Marketing",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
      price: 35,
      priceUnit: "hour",
      barterOnly: false,
      acceptsBarter: true,
      level: "Intermediate",
      available: true,
      rating: 4.6,
      reviewCount: 22,
      isFavorited: false,
      tags: ["Marketing", "SEO", "Social Media", "Content"],
      creator: {
        id: 4,
        name: "Alex Johnson",
        avatar: "https://randomuser.me/api/portraits/men/33.jpg",
        university: "Harvard University",
        major: "Business Administration",
        rating: 4.6,
        skillsOffered: 6
      }
    },
    {
      id: 5,
      title: "Guitar Lessons for Beginners",
      description: "Learn to play guitar from scratch. Covers basic chords, strumming patterns, and popular songs.",
      category: "Music",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop",
      price: 20,
      priceUnit: "hour",
      barterOnly: false,
      acceptsBarter: true,
      level: "Beginner",
      available: true,
      rating: 4.8,
      reviewCount: 15,
      isFavorited: true,
      tags: ["Guitar", "Music", "Beginner", "Acoustic"],
      creator: {
        id: 5,
        name: "David Kim",
        avatar: "https://randomuser.me/api/portraits/men/29.jpg",
        university: "Caltech",
        major: "Music",
        rating: 4.8,
        skillsOffered: 4
      }
    },
    {
      id: 6,
      title: "Photography Basics",
      description: "Learn the fundamentals of photography including composition, lighting, and camera settings.",
      category: "Photography",
      image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=300&fit=crop",
      price: 28,
      priceUnit: "hour",
      barterOnly: false,
      acceptsBarter: false,
      level: "Beginner",
      available: true,
      rating: 4.5,
      reviewCount: 12,
      isFavorited: false,
      tags: ["Photography", "Camera", "Composition", "Lighting"],
      creator: {
        id: 6,
        name: "Emma Wilson",
        avatar: "https://randomuser.me/api/portraits/women/41.jpg",
        university: "NYU",
        major: "Visual Arts",
        rating: 4.5,
        skillsOffered: 7
      }
    }
  ];

  const [skills, setSkills] = useState(mockSkills);
  const [displayedSkills, setDisplayedSkills] = useState(mockSkills.slice(0, 12));

  // Get search query from URL params
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchParam = urlParams.get('search');
    if (searchParam) {
      setSearchQuery(searchParam);
    }
  }, [location.search]);

  // Filter and sort skills
  useEffect(() => {
    let filteredSkills = [...mockSkills];

    // Apply search filter
    if (searchQuery) {
      filteredSkills = filteredSkills.filter(skill =>
        skill.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        skill.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        skill.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        skill.creator.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        skill.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Apply category filter
    if (filters.categories.length > 0) {
      filteredSkills = filteredSkills.filter(skill =>
        filters.categories.includes(skill.category.toLowerCase().replace(/\s+/g, '-'))
      );
    }

    // Apply university filter
    if (filters.universities.length > 0) {
      filteredSkills = filteredSkills.filter(skill =>
        filters.universities.some(uni => 
          skill.creator.university.toLowerCase().includes(uni.replace('-', ' '))
        )
      );
    }

    // Apply price range filter
    if (filters.priceRange.min || filters.priceRange.max) {
      filteredSkills = filteredSkills.filter(skill => {
        if (skill.barterOnly) return false;
        const price = skill.price;
        const min = filters.priceRange.min ? parseFloat(filters.priceRange.min) : 0;
        const max = filters.priceRange.max ? parseFloat(filters.priceRange.max) : Infinity;
        return price >= min && price <= max;
      });
    }

    // Apply barter only filter
    if (filters.barterOnly) {
      filteredSkills = filteredSkills.filter(skill => skill.barterOnly);
    }

    // Apply availability filter
    if (filters.availableOnly) {
      filteredSkills = filteredSkills.filter(skill => skill.available);
    }

    // Apply skill level filter
    if (filters.skillLevels.length > 0) {
      filteredSkills = filteredSkills.filter(skill =>
        filters.skillLevels.includes(skill.level.toLowerCase())
      );
    }

    // Apply sorting
    switch (sortBy) {
      case 'newest':
        filteredSkills.sort((a, b) => b.id - a.id);
        break;
      case 'price-low':
        filteredSkills.sort((a, b) => {
          if (a.barterOnly && b.barterOnly) return 0;
          if (a.barterOnly) return 1;
          if (b.barterOnly) return -1;
          return a.price - b.price;
        });
        break;
      case 'price-high':
        filteredSkills.sort((a, b) => {
          if (a.barterOnly && b.barterOnly) return 0;
          if (a.barterOnly) return 1;
          if (b.barterOnly) return -1;
          return b.price - a.price;
        });
        break;
      case 'rating':
        filteredSkills.sort((a, b) => b.rating - a.rating);
        break;
      case 'popular':
        filteredSkills.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      default: // relevance
        break;
    }

    setSkills(filteredSkills);
    setDisplayedSkills(filteredSkills.slice(0, 12));
  }, [searchQuery, filters, sortBy]);

  // Load more skills (infinite scroll simulation)
  const loadMoreSkills = useCallback(() => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    setTimeout(() => {
      const currentLength = displayedSkills.length;
      const nextSkills = skills.slice(currentLength, currentLength + 12);
      
      if (nextSkills.length === 0) {
        setHasMore(false);
      } else {
        setDisplayedSkills(prev => [...prev, ...nextSkills]);
      }
      setIsLoading(false);
    }, 1000);
  }, [displayedSkills.length, skills, isLoading, hasMore]);

  // Infinite scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop
        >= document.documentElement.offsetHeight - 1000
      ) {
        loadMoreSkills();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadMoreSkills]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    navigate(`/skill-marketplace-browse${query ? `?search=${encodeURIComponent(query)}` : ''}`);
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handleClearAllFilters = () => {
    setFilters({
      categories: [],
      universities: [],
      majors: [],
      priceRange: { min: '', max: '' },
      skillLevels: [],
      barterOnly: false,
      availableOnly: false
    });
    setSearchQuery('');
    navigate('/skill-marketplace-browse');
  };

  const handleRemoveFilter = (filterType, value) => {
    if (filterType === 'search') {
      setSearchQuery('');
      navigate('/skill-marketplace-browse');
    } else if (filterType === 'barterOnly' || filterType === 'availableOnly') {
      setFilters(prev => ({
        ...prev,
        [filterType]: false
      }));
    } else if (filterType === 'priceRange') {
      setFilters(prev => ({
        ...prev,
        priceRange: { min: '', max: '' }
      }));
    } else {
      setFilters(prev => ({
        ...prev,
        [filterType]: prev[filterType].filter(item => item !== value)
      }));
    }
  };

  const handleSkillFavorite = (skillId, isFavorited) => {
    setSkills(prev => prev.map(skill =>
      skill.id === skillId ? { ...skill, isFavorited } : skill
    ));
    setDisplayedSkills(prev => prev.map(skill =>
      skill.id === skillId ? { ...skill, isFavorited } : skill
    ));
  };

  const handleSkillShare = (skill) => {
    if (navigator.share) {
      navigator.share({
        title: skill.title,
        text: skill.description,
        url: window.location.origin + '/skill-detail-view'
      });
    } else {
      navigator.clipboard.writeText(window.location.origin + '/skill-detail-view');
      // You could show a toast notification here
    }
  };

  const handleSkillPreview = (skill) => {
    setPreviewSkill(skill);
  };

  // Get active filter chips
  const getActiveFilterChips = () => {
    const chips = [];

    if (searchQuery) {
      chips.push({
        type: 'search',
        label: `"${searchQuery}"`,
        value: searchQuery,
        variant: 'default'
      });
    }

    filters.categories.forEach(category => {
      chips.push({
        type: 'categories',
        label: category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()),
        value: category,
        variant: 'category'
      });
    });

    filters.universities.forEach(university => {
      chips.push({
        type: 'universities',
        label: university.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()),
        value: university,
        variant: 'university'
      });
    });

    if (filters.priceRange.min || filters.priceRange.max) {
      const min = filters.priceRange.min || '0';
      const max = filters.priceRange.max || '∞';
      chips.push({
        type: 'priceRange',
        label: `$${min} - $${max}`,
        value: 'priceRange',
        variant: 'price'
      });
    }

    if (filters.barterOnly) {
      chips.push({
        type: 'barterOnly',
        label: 'Barter Only',
        value: 'barterOnly',
        variant: 'barter'
      });
    }

    if (filters.availableOnly) {
      chips.push({
        type: 'availableOnly',
        label: 'Available Now',
        value: 'availableOnly',
        variant: 'default'
      });
    }

    return chips;
  };

  const activeFilterChips = getActiveFilterChips();
  const hasActiveFilters = activeFilterChips.length > 0;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <TabNavigation />
      
      <ContextualActionBar
        title="Browse Skills"
        actions={[
          {
            label: 'Filters',
            icon: 'Filter',
            variant: 'ghost',
            onClick: () => setIsFilterPanelOpen(true)
          }
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Search Bar */}
        <div className="mb-6">
          <SearchBar onSearch={handleSearch} initialQuery={searchQuery} />
        </div>

        <div className="flex gap-6">
          {/* Filter Panel - Desktop */}
          <div className="hidden md:block">
            <FilterPanel
              isOpen={true}
              onClose={() => {}}
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearAll={handleClearAllFilters}
            />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Filter Chips and Sort */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              {/* Active Filter Chips */}
              <div className="flex-1">
                {hasActiveFilters && (
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm text-secondary mr-2">Active filters:</span>
                    {activeFilterChips.map((chip, index) => (
                      <FilterChip
                        key={index}
                        label={chip.label}
                        variant={chip.variant}
                        onRemove={() => handleRemoveFilter(chip.type, chip.value)}
                      />
                    ))}
                    {activeFilterChips.length > 1 && (
                      <Button
                        variant="ghost"
                        onClick={handleClearAllFilters}
                        className="text-sm text-secondary hover:text-primary ml-2"
                      >
                        Clear All
                      </Button>
                    )}
                  </div>
                )}
              </div>

              {/* Sort Dropdown */}
              <SortDropdown
                currentSort={sortBy}
                onSortChange={setSortBy}
                resultsCount={skills.length}
              />
            </div>

            {/* Mobile Filter Button */}
            <div className="md:hidden mb-4">
              <Button
                variant="ghost"
                onClick={() => setIsFilterPanelOpen(true)}
                className="w-full flex items-center justify-center space-x-2 py-3 border border-border rounded-lg"
              >
                <Icon name="Filter" size={20} />
                <span>Filters</span>
                {hasActiveFilters && (
                  <span className="bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {activeFilterChips.length}
                  </span>
                )}
              </Button>
            </div>

            {/* Skills Grid */}
            {displayedSkills.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {displayedSkills.map((skill) => (
                  <SkillCard
                    key={skill.id}
                    skill={skill}
                    onFavorite={handleSkillFavorite}
                    onShare={handleSkillShare}
                    onPreview={handleSkillPreview}
                  />
                ))}
                
                {/* Loading Skeletons */}
                {isLoading && Array.from({ length: 8 }, (_, i) => (
                  <SkillCardSkeleton key={`skeleton-${i}`} />
                ))}
              </div>
            ) : (
              /* No Results */
              <div className="text-center py-16">
                <Icon name="Search" size={64} color="var(--color-text-secondary)" className="mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-primary mb-2">No skills found</h3>
                <p className="text-secondary mb-6">
                  Try adjusting your search terms or filters to find what you're looking for.
                </p>
                <Button
                  variant="primary"
                  onClick={handleClearAllFilters}
                >
                  Clear all filters
                </Button>
              </div>
            )}

            {/* Load More Indicator */}
            {!hasMore && displayedSkills.length > 0 && (
              <div className="text-center py-8">
                <p className="text-secondary">You've reached the end of the results</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Panel */}
      <FilterPanel
        isOpen={isFilterPanelOpen}
        onClose={() => setIsFilterPanelOpen(false)}
        filters={filters}
        onFilterChange={handleFilterChange}
        onClearAll={handleClearAllFilters}
      />

      {/* Skill Preview Modal */}
      <SkillPreviewModal
        skill={previewSkill}
        isOpen={!!previewSkill}
        onClose={() => setPreviewSkill(null)}
      />
    </div>
  );
};

export default SkillMarketplaceBrowse;