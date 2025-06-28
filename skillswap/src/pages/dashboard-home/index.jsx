import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import TabNavigation from '../../components/ui/TabNavigation';
import HeroSection from './components/HeroSection';
import QuickFilters from './components/QuickFilters';

import UserSummary from './components/UserSummary';
import RecommendedSkills from './components/RecommendedSkills';
import RecentSkills from './components/RecentSkills';
import FloatingActionButton from './components/FloatingActionButton';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const DashboardHome = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  // Simulate loading state
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    // Apply filters to skills
    console.log('Filters applied:', newFilters);
  };

  const handlePullToRefresh = () => {
    setIsLoading(true);
    // Simulate refresh
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <TabNavigation />
        
        <main className="pt-4 pb-20 md:pb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Loading Skeleton */}
            <div className="animate-pulse">
              {/* Hero Skeleton */}
              <div className="bg-surface rounded-2xl p-6 mb-8">
                <div className="h-8 bg-surface-secondary rounded w-1/3 mb-4"></div>
                <div className="flex space-x-4 overflow-hidden">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex-shrink-0 w-72">
                      <div className="h-40 bg-surface-secondary rounded-xl mb-4"></div>
                      <div className="h-4 bg-surface-secondary rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-surface-secondary rounded w-1/2"></div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Content Skeleton */}
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <div className="lg:col-span-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <div key={i} className="bg-surface rounded-xl overflow-hidden">
                        <div className="h-48 bg-surface-secondary"></div>
                        <div className="p-4">
                          <div className="h-4 bg-surface-secondary rounded w-3/4 mb-2"></div>
                          <div className="h-3 bg-surface-secondary rounded w-1/2 mb-4"></div>
                          <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-surface-secondary rounded-full"></div>
                            <div className="h-3 bg-surface-secondary rounded w-1/3"></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="hidden lg:block">
                  <div className="bg-surface rounded-xl p-6">
                    <div className="h-6 bg-surface-secondary rounded w-1/2 mb-4"></div>
                    <div className="space-y-3">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="h-4 bg-surface-secondary rounded"></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <TabNavigation />
      
      <main className="pt-4 pb-20 md:pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Welcome Message */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-primary mb-2">
              Welcome back, John! 👋
            </h1>
            <p className="text-secondary">
              Discover new skills and connect with fellow learners at Stanford University
            </p>
          </div>

          {/* Hero Section */}
          <HeroSection />

          {/* Main Content Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Left Sidebar - Filters (Desktop) */}
            <div className="hidden lg:block">
              <div className="sticky top-32">
                <QuickFilters 
                  onFilterChange={handleFilterChange}
                  activeFilters={filters}
                />
              </div>
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-2">
              {/* Mobile Filter Toggle */}
              <div className="lg:hidden mb-6">
                <Button
                  variant="secondary"
                  onClick={() => setShowFilters(!showFilters)}
                  className="w-full flex items-center justify-center space-x-2"
                >
                  <Icon name="Filter" size={16} />
                  <span>Filters</span>
                  <Icon name={showFilters ? 'ChevronUp' : 'ChevronDown'} size={16} />
                </Button>
                
                {showFilters && (
                  <div className="mt-4">
                    <QuickFilters 
                      onFilterChange={handleFilterChange}
                      activeFilters={filters}
                    />
                  </div>
                )}
              </div>

              {/* Recommended Skills */}
              <RecommendedSkills />

              {/* Recent Skills */}
              <RecentSkills />

              {/* Pull to Refresh Indicator */}
              <div className="text-center py-8">
                <Button
                  variant="ghost"
                  onClick={handlePullToRefresh}
                  className="flex items-center space-x-2"
                >
                  <Icon name="RefreshCw" size={16} />
                  <span>Pull to refresh</span>
                </Button>
              </div>
            </div>

            {/* Right Sidebar - User Summary (Desktop) */}
            <div className="hidden lg:block">
              <div className="sticky top-32">
                <UserSummary />
              </div>
            </div>
          </div>

          {/* Mobile User Summary */}
          <div className="lg:hidden mt-8">
            <UserSummary />
          </div>
        </div>
      </main>

      {/* Floating Action Button */}
      <FloatingActionButton />
    </div>
  );
};

export default DashboardHome;