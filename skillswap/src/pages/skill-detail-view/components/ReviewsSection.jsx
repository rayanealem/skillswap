import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ReviewsSection = ({ reviews, averageRating, totalReviews }) => {
  const [expandedReviews, setExpandedReviews] = useState(new Set());
  const [showAllReviews, setShowAllReviews] = useState(false);

  const toggleReviewExpansion = (reviewId) => {
    const newExpanded = new Set(expandedReviews);
    if (newExpanded.has(reviewId)) {
      newExpanded.delete(reviewId);
    } else {
      newExpanded.add(reviewId);
    }
    setExpandedReviews(newExpanded);
  };

  const getRatingDistribution = () => {
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach(review => {
      distribution[review.rating]++;
    });
    return distribution;
  };

  const ratingDistribution = getRatingDistribution();
  const displayedReviews = showAllReviews ? reviews : reviews.slice(0, 3);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* Reviews Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-primary">Reviews & Ratings</h3>
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <Icon
                key={i}
                name="Star"
                size={16}
                color={i < Math.floor(averageRating) ? 'var(--color-warning)' : 'var(--color-border)'}
              />
            ))}
          </div>
          <span className="text-lg font-semibold text-primary">{averageRating.toFixed(1)}</span>
          <span className="text-sm text-secondary">({totalReviews} reviews)</span>
        </div>
      </div>

      {/* Rating Distribution */}
      <div className="bg-surface-secondary rounded-lg p-4 space-y-3">
        <h4 className="text-sm font-medium text-primary">Rating Distribution</h4>
        {[5, 4, 3, 2, 1].map((rating) => (
          <div key={rating} className="flex items-center space-x-3">
            <span className="text-sm text-secondary w-8">{rating}★</span>
            <div className="flex-1 bg-background rounded-full h-2">
              <div
                className="bg-warning h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${totalReviews > 0 ? (ratingDistribution[rating] / totalReviews) * 100 : 0}%`
                }}
              />
            </div>
            <span className="text-sm text-secondary w-8 text-right">
              {ratingDistribution[rating]}
            </span>
          </div>
        ))}
      </div>

      {/* Individual Reviews */}
      <div className="space-y-4">
        {displayedReviews.map((review) => (
          <div key={review.id} className="bg-surface border border-border rounded-lg p-4 space-y-3">
            {/* Reviewer Info */}
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <Image
                    src={review.reviewer.avatar}
                    alt={review.reviewer.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h5 className="font-medium text-primary">{review.reviewer.name}</h5>
                  <p className="text-sm text-secondary">{review.reviewer.university}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Icon
                      key={i}
                      name="Star"
                      size={14}
                      color={i < review.rating ? 'var(--color-warning)' : 'var(--color-border)'}
                    />
                  ))}
                </div>
                <p className="text-xs text-secondary mt-1">{formatDate(review.date)}</p>
              </div>
            </div>

            {/* Review Content */}
            <div className="space-y-2">
              <p className="text-secondary leading-relaxed">
                {expandedReviews.has(review.id) || review.comment.length <= 150
                  ? review.comment
                  : `${review.comment.substring(0, 150)}...`}
              </p>
              
              {review.comment.length > 150 && (
                <Button
                  variant="ghost"
                  onClick={() => toggleReviewExpansion(review.id)}
                  className="text-sm p-0 h-auto"
                >
                  {expandedReviews.has(review.id) ? 'Show less' : 'Read more'}
                </Button>
              )}
            </div>

            {/* Review Tags */}
            {review.tags && review.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {review.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-md"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Helpful Actions */}
            <div className="flex items-center justify-between pt-2 border-t border-border">
              <div className="flex items-center space-x-4">
                <button className="flex items-center space-x-1 text-sm text-secondary hover:text-primary transition-colors duration-200">
                  <Icon name="ThumbsUp" size={14} />
                  <span>Helpful ({review.helpfulCount})</span>
                </button>
                <button className="flex items-center space-x-1 text-sm text-secondary hover:text-primary transition-colors duration-200">
                  <Icon name="Flag" size={14} />
                  <span>Report</span>
                </button>
              </div>
              {review.isVerifiedExchange && (
                <div className="flex items-center space-x-1 text-xs text-success">
                  <Icon name="CheckCircle" size={12} />
                  <span>Verified Exchange</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Show More/Less Button */}
      {reviews.length > 3 && (
        <div className="text-center">
          <Button
            variant="outline"
            onClick={() => setShowAllReviews(!showAllReviews)}
          >
            {showAllReviews ? 'Show Less Reviews' : `Show All ${reviews.length} Reviews`}
          </Button>
        </div>
      )}
    </div>
  );
};

export default ReviewsSection;