import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const SearchBar = ({ onSearch, initialQuery = '' }) => {
  const [query, setQuery] = useState(initialQuery);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [recentSearches, setRecentSearches] = useState([
    'React Development',
    'UI/UX Design',
    'Digital Marketing',
    'Spanish Tutoring'
  ]);
  const inputRef = useRef(null);
  const suggestionsRef = useRef(null);

  const suggestions = [
    { type: 'skill', text: 'JavaScript Programming', category: 'Programming' },
    { type: 'skill', text: 'Graphic Design', category: 'Design' },
    { type: 'skill', text: 'Social Media Marketing', category: 'Marketing' },
    { type: 'skill', text: 'French Language', category: 'Language' },
    { type: 'user', text: 'Sarah Chen', university: 'Stanford University' },
    { type: 'user', text: 'Mike Rodriguez', university: 'MIT' },
    { type: 'category', text: 'Programming', count: 245 },
    { type: 'category', text: 'Design', count: 189 }
  ];

  const filteredSuggestions = query.length > 0 
    ? suggestions.filter(suggestion => 
        suggestion.text.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 8)
    : [];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        suggestionsRef.current && 
        !suggestionsRef.current.contains(event.target) &&
        !inputRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    setShowSuggestions(value.length > 0 || recentSearches.length > 0);
  };

  const handleInputFocus = () => {
    setShowSuggestions(query.length > 0 || recentSearches.length > 0);
  };

  const handleSearch = (searchQuery = query) => {
    if (searchQuery.trim()) {
      // Add to recent searches if not already present
      if (!recentSearches.includes(searchQuery.trim())) {
        setRecentSearches(prev => [searchQuery.trim(), ...prev.slice(0, 3)]);
      }
      onSearch(searchQuery.trim());
      setShowSuggestions(false);
      inputRef.current?.blur();
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion.text);
    handleSearch(suggestion.text);
  };

  const handleRecentSearchClick = (search) => {
    setQuery(search);
    handleSearch(search);
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
  };

  const removeRecentSearch = (searchToRemove) => {
    setRecentSearches(prev => prev.filter(search => search !== searchToRemove));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
      inputRef.current?.blur();
    }
  };

  const getSuggestionIcon = (type) => {
    switch (type) {
      case 'skill':
        return 'Lightbulb';
      case 'user':
        return 'User';
      case 'category':
        return 'Tag';
      default:
        return 'Search';
    }
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* Search Input */}
      <div className="relative">
        <Input
          ref={inputRef}
          type="search"
          placeholder="Search skills, users, or categories..."
          value={query}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onKeyDown={handleKeyDown}
          className="w-full pl-12 pr-12 py-3 bg-surface border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent text-base"
        />
        
        {/* Search Icon */}
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Icon name="Search" size={20} color="var(--color-text-secondary)" />
        </div>

        {/* Clear Button */}
        {query && (
          <Button
            variant="ghost"
            onClick={() => {
              setQuery('');
              setShowSuggestions(false);
              inputRef.current?.focus();
            }}
            className="absolute inset-y-0 right-0 pr-4 flex items-center p-0 h-auto"
          >
            <Icon name="X" size={18} color="var(--color-text-secondary)" />
          </Button>
        )}
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && (
        <div 
          ref={suggestionsRef}
          className="absolute top-full left-0 right-0 mt-2 bg-surface border border-border rounded-xl shadow-elevation-3 z-50 max-h-96 overflow-y-auto"
        >
          {/* Recent Searches */}
          {query.length === 0 && recentSearches.length > 0 && (
            <div className="p-4 border-b border-border">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-secondary">Recent Searches</h3>
                <Button
                  variant="ghost"
                  onClick={clearRecentSearches}
                  className="text-xs text-secondary hover:text-primary p-0 h-auto"
                >
                  Clear All
                </Button>
              </div>
              <div className="space-y-1">
                {recentSearches.map((search, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between group hover:bg-surface-secondary rounded-lg px-3 py-2 cursor-pointer"
                    onClick={() => handleRecentSearchClick(search)}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon name="Clock" size={16} color="var(--color-text-secondary)" />
                      <span className="text-sm text-primary">{search}</span>
                    </div>
                    <Button
                      variant="ghost"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeRecentSearch(search);
                      }}
                      className="opacity-0 group-hover:opacity-100 p-1 h-auto"
                    >
                      <Icon name="X" size={14} color="var(--color-text-secondary)" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Suggestions */}
          {filteredSuggestions.length > 0 && (
            <div className="p-2">
              {query.length > 0 && (
                <div className="px-3 py-2 text-xs font-medium text-secondary uppercase tracking-wide">
                  Suggestions
                </div>
              )}
              {filteredSuggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 px-3 py-2 hover:bg-surface-secondary rounded-lg cursor-pointer"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  <Icon 
                    name={getSuggestionIcon(suggestion.type)} 
                    size={16} 
                    color="var(--color-text-secondary)" 
                  />
                  <div className="flex-1">
                    <span className="text-sm text-primary">{suggestion.text}</span>
                    {suggestion.category && (
                      <span className="text-xs text-secondary ml-2">in {suggestion.category}</span>
                    )}
                    {suggestion.university && (
                      <span className="text-xs text-secondary ml-2">at {suggestion.university}</span>
                    )}
                    {suggestion.count && (
                      <span className="text-xs text-secondary ml-2">({suggestion.count} skills)</span>
                    )}
                  </div>
                  <Icon name="ArrowUpRight" size={14} color="var(--color-text-secondary)" />
                </div>
              ))}
            </div>
          )}

          {/* No Results */}
          {query.length > 0 && filteredSuggestions.length === 0 && (
            <div className="p-8 text-center">
              <Icon name="Search" size={32} color="var(--color-text-secondary)" className="mx-auto mb-3" />
              <p className="text-sm text-secondary">No suggestions found for "{query}"</p>
              <Button
                variant="ghost"
                onClick={() => handleSearch()}
                className="mt-2 text-sm text-primary"
              >
                Search anyway
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;