import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickFilters = ({ onFilterChange, activeFilters = {} }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const categories = [
    { id: 'programming', name: 'Programming', icon: 'Code', count: 156 },
    { id: 'design', name: 'Design', icon: 'Palette', count: 89 },
    { id: 'marketing', name: 'Marketing', icon: 'Megaphone', count: 67 },
    { id: 'writing', name: 'Writing', icon: 'PenTool', count: 45 },
    { id: 'music', name: 'Music', icon: 'Music', count: 34 },
    { id: 'language', name: 'Languages', icon: 'Globe', count: 78 },
    { id: 'business', name: 'Business', icon: 'Briefcase', count: 92 },
    { id: 'photography', name: 'Photography', icon: 'Camera', count: 56 }
  ];

  const priceRanges = [
    { id: 'free', name: 'Free', min: 0, max: 0 },
    { id: 'budget', name: '$1-$20', min: 1, max: 20 },
    { id: 'standard', name: '$21-$50', min: 21, max: 50 },
    { id: 'premium', name: '$51+', min: 51, max: 999 }
  ];

  const handleCategoryFilter = (categoryId) => {
    const newCategories = activeFilters.categories?.includes(categoryId)
      ? activeFilters.categories.filter(id => id !== categoryId)
      : [...(activeFilters.categories || []), categoryId];
    
    onFilterChange({ ...activeFilters, categories: newCategories });
  };

  const handlePriceFilter = (priceRange) => {
    onFilterChange({ 
      ...activeFilters, 
      priceRange: activeFilters.priceRange?.id === priceRange.id ? null : priceRange 
    });
  };

  const handleBarterToggle = () => {
    onFilterChange({ 
      ...activeFilters, 
      barterOnly: !activeFilters.barterOnly 
    });
  };

  const clearFilters = () => {
    onFilterChange({});
  };

  const hasActiveFilters = Object.keys(activeFilters).some(key => 
    activeFilters[key] && (Array.isArray(activeFilters[key]) ? activeFilters[key].length > 0 : true)
  );

  return (
    <div className="bg-surface border border-border rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-primary">Filters</h3>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            onClick={clearFilters}
            className="text-sm text-secondary hover:text-primary"
          >
            Clear All
          </Button>
        )}
      </div>

      {/* Categories */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-primary mb-3">Categories</h4>
        <div className="space-y-2">
          {categories.slice(0, isExpanded ? categories.length : 5).map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryFilter(category.id)}
              className={`w-full flex items-center justify-between p-2 rounded-lg transition-colors ${
                activeFilters.categories?.includes(category.id)
                  ? 'bg-primary/10 text-primary border border-primary/20' :'hover:bg-surface-secondary text-secondary hover:text-primary'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Icon name={category.icon} size={16} />
                <span className="text-sm">{category.name}</span>
              </div>
              <span className="text-xs bg-surface-secondary px-2 py-1 rounded-full">
                {category.count}
              </span>
            </button>
          ))}
        </div>
        
        {categories.length > 5 && (
          <Button
            variant="ghost"
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full mt-2 text-sm text-secondary hover:text-primary"
          >
            {isExpanded ? 'Show Less' : `Show ${categories.length - 5} More`}
            <Icon name={isExpanded ? 'ChevronUp' : 'ChevronDown'} size={16} className="ml-1" />
          </Button>
        )}
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-primary mb-3">Price Range</h4>
        <div className="space-y-2">
          {priceRanges.map((range) => (
            <button
              key={range.id}
              onClick={() => handlePriceFilter(range)}
              className={`w-full flex items-center justify-between p-2 rounded-lg transition-colors ${
                activeFilters.priceRange?.id === range.id
                  ? 'bg-primary/10 text-primary border border-primary/20' :'hover:bg-surface-secondary text-secondary hover:text-primary'
              }`}
            >
              <span className="text-sm">{range.name}</span>
              {activeFilters.priceRange?.id === range.id && (
                <Icon name="Check" size={16} />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Barter Only */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-primary mb-3">Exchange Type</h4>
        <button
          onClick={handleBarterToggle}
          className={`w-full flex items-center justify-between p-3 rounded-lg border transition-colors ${
            activeFilters.barterOnly
              ? 'bg-accent/10 text-accent border-accent/20' :'hover:bg-surface-secondary text-secondary hover:text-primary border-border'
          }`}
        >
          <div className="flex items-center space-x-2">
            <Icon name="ArrowLeftRight" size={16} />
            <span className="text-sm">Barter Only</span>
          </div>
          {activeFilters.barterOnly && (
            <Icon name="Check" size={16} />
          )}
        </button>
      </div>

      {/* Quick Actions */}
      <div className="space-y-2">
        <Button
          variant="primary"
          className="w-full"
          onClick={() => window.location.href = '/skill-marketplace-browse'}
        >
          <Icon name="Search" size={16} className="mr-2" />
          Browse All Skills
        </Button>
        <Button
          variant="secondary"
          className="w-full"
          onClick={() => window.location.href = '/skill-detail-view'}
        >
          <Icon name="Plus" size={16} className="mr-2" />
          Post a Skill
        </Button>
      </div>
    </div>
  );
};

export default QuickFilters;