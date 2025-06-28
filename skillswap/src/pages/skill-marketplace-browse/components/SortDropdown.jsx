import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SortDropdown = ({ currentSort, onSortChange, resultsCount }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const sortOptions = [
    { id: 'relevance', label: 'Most Relevant', icon: 'Target' },
    { id: 'newest', label: 'Newest First', icon: 'Clock' },
    { id: 'price-low', label: 'Price: Low to High', icon: 'TrendingUp' },
    { id: 'price-high', label: 'Price: High to Low', icon: 'TrendingDown' },
    { id: 'rating', label: 'Highest Rated', icon: 'Star' },
    { id: 'popular', label: 'Most Popular', icon: 'Heart' }
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSortSelect = (sortId) => {
    onSortChange(sortId);
    setIsOpen(false);
  };

  const getCurrentSortLabel = () => {
    const currentOption = sortOptions.find(option => option.id === currentSort);
    return currentOption ? currentOption.label : 'Sort by';
  };

  const getCurrentSortIcon = () => {
    const currentOption = sortOptions.find(option => option.id === currentSort);
    return currentOption ? currentOption.icon : 'ArrowUpDown';
  };

  return (
    <div className="flex items-center space-x-4">
      {/* Results Count */}
      <span className="text-sm text-secondary hidden sm:block">
        {resultsCount.toLocaleString()} skills found
      </span>

      {/* Sort Dropdown */}
      <div className="relative" ref={dropdownRef}>
        <Button
          variant="ghost"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-2 px-4 py-2 border border-border rounded-lg hover:border-primary/30"
        >
          <Icon name={getCurrentSortIcon()} size={16} />
          <span className="text-sm font-medium">{getCurrentSortLabel()}</span>
          <Icon 
            name={isOpen ? "ChevronUp" : "ChevronDown"} 
            size={16} 
            className="transition-transform duration-200"
          />
        </Button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute top-full right-0 mt-2 w-56 bg-surface border border-border rounded-lg shadow-elevation-3 z-50">
            <div className="p-2">
              {sortOptions.map((option) => (
                <Button
                  key={option.id}
                  variant="ghost"
                  onClick={() => handleSortSelect(option.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left justify-start ${
                    currentSort === option.id 
                      ? 'bg-primary/10 text-primary' :'text-primary hover:bg-surface-secondary'
                  }`}
                >
                  <Icon 
                    name={option.icon} 
                    size={16} 
                    color={currentSort === option.id ? 'var(--color-primary)' : 'currentColor'}
                  />
                  <span className="text-sm">{option.label}</span>
                  {currentSort === option.id && (
                    <Icon name="Check" size={16} color="var(--color-primary)" className="ml-auto" />
                  )}
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SortDropdown;