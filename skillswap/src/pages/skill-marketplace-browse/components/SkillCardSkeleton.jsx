import React from 'react';

const SkillCardSkeleton = () => {
  return (
    <div className="bg-surface border border-border rounded-xl overflow-hidden animate-pulse">
      {/* Image Skeleton */}
      <div className="h-48 bg-surface-secondary" />
      
      {/* Content Skeleton */}
      <div className="p-4">
        {/* Title and Description */}
        <div className="mb-3">
          <div className="h-6 bg-surface-secondary rounded mb-2" />
          <div className="h-4 bg-surface-secondary rounded mb-1" />
          <div className="h-4 bg-surface-secondary rounded w-3/4" />
        </div>

        {/* Pricing */}
        <div className="mb-3">
          <div className="h-6 bg-surface-secondary rounded w-1/2" />
        </div>

        {/* Creator Info */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-surface-secondary rounded-full" />
            <div>
              <div className="h-4 bg-surface-secondary rounded w-20 mb-1" />
              <div className="h-3 bg-surface-secondary rounded w-16" />
            </div>
          </div>
          <div className="flex space-x-1">
            {Array.from({ length: 5 }, (_, i) => (
              <div key={i} className="w-3 h-3 bg-surface-secondary rounded" />
            ))}
          </div>
        </div>

        {/* Bottom Info */}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
          <div className="h-3 bg-surface-secondary rounded w-16" />
          <div className="h-3 bg-surface-secondary rounded w-20" />
        </div>
      </div>
    </div>
  );
};

export default SkillCardSkeleton;