import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FilterChip = ({ label, count, onRemove, variant = 'default' }) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'category':
        return 'bg-primary/10 text-primary border-primary/20';
      case 'university':
        return 'bg-secondary/10 text-secondary border-secondary/20';
      case 'price':
        return 'bg-accent/10 text-accent border-accent/20';
      case 'barter':
        return 'bg-warning/10 text-warning border-warning/20';
      default:
        return 'bg-surface-secondary text-primary border-border';
    }
  };

  return (
    <div className={`inline-flex items-center space-x-2 px-3 py-1.5 rounded-full border text-sm font-medium ${getVariantStyles()}`}>
      <span>{label}</span>
      {count && (
        <span className="bg-white/20 text-xs px-1.5 py-0.5 rounded-full">
          {count}
        </span>
      )}
      <Button
        variant="ghost"
        onClick={onRemove}
        className="p-0.5 h-4 w-4 hover:bg-white/20 rounded-full"
      >
        <Icon name="X" size={12} />
      </Button>
    </div>
  );
};

export default FilterChip;