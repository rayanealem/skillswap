import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const FilterPanel = ({ isOpen, onClose, filters, onFilterChange, onClearAll }) => {
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    universities: false,
    majors: false,
    priceRange: false,
    skillLevel: false,
    availability: false
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const categories = [
    { id: 'programming', name: 'Programming', count: 245 },
    { id: 'design', name: 'Design', count: 189 },
    { id: 'marketing', name: 'Marketing', count: 156 },
    { id: 'language', name: 'Language', count: 134 },
    { id: 'music', name: 'Music', count: 98 },
    { id: 'business', name: 'Business', count: 87 },
    { id: 'photography', name: 'Photography', count: 76 },
    { id: 'writing', name: 'Writing', count: 65 }
  ];

  const universities = [
    { id: 'stanford', name: 'Stanford University', count: 89 },
    { id: 'mit', name: 'MIT', count: 76 },
    { id: 'harvard', name: 'Harvard University', count: 65 },
    { id: 'berkeley', name: 'UC Berkeley', count: 54 },
    { id: 'caltech', name: 'Caltech', count: 43 }
  ];

  const majors = [
    { id: 'computer-science', name: 'Computer Science', count: 156 },
    { id: 'business', name: 'Business Administration', count: 98 },
    { id: 'engineering', name: 'Engineering', count: 87 },
    { id: 'design', name: 'Design', count: 76 },
    { id: 'marketing', name: 'Marketing', count: 65 }
  ];

  const skillLevels = [
    { id: 'beginner', name: 'Beginner', count: 234 },
    { id: 'intermediate', name: 'Intermediate', count: 189 },
    { id: 'advanced', name: 'Advanced', count: 156 },
    { id: 'expert', name: 'Expert', count: 98 }
  ];

  const handleCheckboxChange = (filterType, value) => {
    const currentValues = filters[filterType] || [];
    const newValues = currentValues.includes(value)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value];
    
    onFilterChange(filterType, newValues);
  };

  const handlePriceRangeChange = (field, value) => {
    onFilterChange('priceRange', {
      ...filters.priceRange,
      [field]: value
    });
  };

  const FilterSection = ({ title, sectionKey, children }) => (
    <div className="border-b border-border last:border-b-0">
      <Button
        variant="ghost"
        onClick={() => toggleSection(sectionKey)}
        className="w-full flex items-center justify-between p-4 hover:bg-surface-secondary"
      >
        <span className="font-medium text-primary">{title}</span>
        <Icon 
          name={expandedSections[sectionKey] ? "ChevronUp" : "ChevronDown"} 
          size={20} 
        />
      </Button>
      {expandedSections[sectionKey] && (
        <div className="px-4 pb-4">
          {children}
        </div>
      )}
    </div>
  );

  const CheckboxItem = ({ id, name, count, filterType }) => (
    <label className="flex items-center justify-between py-2 cursor-pointer hover:bg-surface-secondary rounded px-2 -mx-2">
      <div className="flex items-center space-x-3">
        <Input
          type="checkbox"
          checked={(filters[filterType] || []).includes(id)}
          onChange={() => handleCheckboxChange(filterType, id)}
          className="w-4 h-4"
        />
        <span className="text-sm text-primary">{name}</span>
      </div>
      <span className="text-xs text-secondary">{count}</span>
    </label>
  );

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Filter Panel */}
      <div className={`
        fixed md:static inset-y-0 left-0 z-50 w-full md:w-80 bg-surface border-r border-border
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        md:transform-none overflow-y-auto
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-lg font-semibold text-primary">Filters</h2>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              onClick={onClearAll}
              className="text-sm text-secondary hover:text-primary"
            >
              Clear All
            </Button>
            <Button
              variant="ghost"
              onClick={onClose}
              className="p-2 md:hidden"
            >
              <Icon name="X" size={20} />
            </Button>
          </div>
        </div>

        {/* Filter Sections */}
        <div className="flex-1">
          {/* Categories */}
          <FilterSection title="Categories" sectionKey="categories">
            <div className="space-y-1">
              {categories.map(category => (
                <CheckboxItem
                  key={category.id}
                  id={category.id}
                  name={category.name}
                  count={category.count}
                  filterType="categories"
                />
              ))}
            </div>
          </FilterSection>

          {/* Universities */}
          <FilterSection title="Universities" sectionKey="universities">
            <div className="space-y-1">
              {universities.map(university => (
                <CheckboxItem
                  key={university.id}
                  id={university.id}
                  name={university.name}
                  count={university.count}
                  filterType="universities"
                />
              ))}
            </div>
          </FilterSection>

          {/* Majors */}
          <FilterSection title="Majors" sectionKey="majors">
            <div className="space-y-1">
              {majors.map(major => (
                <CheckboxItem
                  key={major.id}
                  id={major.id}
                  name={major.name}
                  count={major.count}
                  filterType="majors"
                />
              ))}
            </div>
          </FilterSection>

          {/* Price Range */}
          <FilterSection title="Price Range" sectionKey="priceRange">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Input
                  type="number"
                  placeholder="Min"
                  value={filters.priceRange?.min || ''}
                  onChange={(e) => handlePriceRangeChange('min', e.target.value)}
                  className="flex-1"
                />
                <span className="text-secondary">to</span>
                <Input
                  type="number"
                  placeholder="Max"
                  value={filters.priceRange?.max || ''}
                  onChange={(e) => handlePriceRangeChange('max', e.target.value)}
                  className="flex-1"
                />
              </div>
              <label className="flex items-center space-x-3 cursor-pointer">
                <Input
                  type="checkbox"
                  checked={filters.barterOnly || false}
                  onChange={(e) => onFilterChange('barterOnly', e.target.checked)}
                  className="w-4 h-4"
                />
                <span className="text-sm text-primary">Barter Only</span>
              </label>
            </div>
          </FilterSection>

          {/* Skill Level */}
          <FilterSection title="Skill Level" sectionKey="skillLevel">
            <div className="space-y-1">
              {skillLevels.map(level => (
                <CheckboxItem
                  key={level.id}
                  id={level.id}
                  name={level.name}
                  count={level.count}
                  filterType="skillLevels"
                />
              ))}
            </div>
          </FilterSection>

          {/* Availability */}
          <FilterSection title="Availability" sectionKey="availability">
            <div className="space-y-1">
              <label className="flex items-center justify-between py-2 cursor-pointer hover:bg-surface-secondary rounded px-2 -mx-2">
                <div className="flex items-center space-x-3">
                  <Input
                    type="checkbox"
                    checked={filters.availableOnly || false}
                    onChange={(e) => onFilterChange('availableOnly', e.target.checked)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm text-primary">Available Now</span>
                </div>
                <span className="text-xs text-secondary">156</span>
              </label>
            </div>
          </FilterSection>
        </div>
      </div>
    </>
  );
};

export default FilterPanel;