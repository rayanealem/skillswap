import supabase from '../lib/supabaseClient';

const reviewService = {
  // Get reviews for a skill
  async getReviewsBySkill(skillId) {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select(`
          *,
          reviewer:profiles!reviews_reviewer_id_fkey(id, username, full_name, avatar_url)
        `)
        .eq('skill_id', skillId)
        .order('created_at', { ascending: false });
      
      if (error) {
        return { success: false, error: error.message };
      }
      
      return { success: true, data };
    } catch (error) {
      if (error?.message?.includes('Failed to fetch') || 
          error?.message?.includes('NetworkError') ||
          error?.name === 'TypeError' && error?.message?.includes('fetch')) {
        return { 
          success: false, 
          error: 'Cannot connect to database. Your Supabase project may be paused or deleted. Please visit your Supabase dashboard to check project status.' 
        };
      }
      return { success: false, error: 'Failed to load reviews' };
    }
  },

  // Create new review
  async createReview(reviewData) {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .insert([reviewData])
        .select(`
          *,
          reviewer:profiles!reviews_reviewer_id_fkey(id, username, full_name, avatar_url)
        `)
        .single();
      
      if (error) {
        return { success: false, error: error.message };
      }
      
      return { success: true, data };
    } catch (error) {
      if (error?.message?.includes('Failed to fetch') || 
          error?.message?.includes('NetworkError') ||
          error?.name === 'TypeError' && error?.message?.includes('fetch')) {
        return { 
          success: false, 
          error: 'Cannot connect to database. Your Supabase project may be paused or deleted. Please visit your Supabase dashboard to check project status.' 
        };
      }
      return { success: false, error: 'Failed to create review' };
    }
  },

  // Get reviews by user (as reviewer)
  async getReviewsByUser(userId) {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select(`
          *,
          skill:skills!reviews_skill_id_fkey(id, title, owner_id),
          reviewee:profiles!reviews_reviewee_id_fkey(id, username, full_name, avatar_url)
        `)
        .eq('reviewer_id', userId)
        .order('created_at', { ascending: false });
      
      if (error) {
        return { success: false, error: error.message };
      }
      
      return { success: true, data };
    } catch (error) {
      if (error?.message?.includes('Failed to fetch') || 
          error?.message?.includes('NetworkError') ||
          error?.name === 'TypeError' && error?.message?.includes('fetch')) {
        return { 
          success: false, 
          error: 'Cannot connect to database. Your Supabase project may be paused or deleted. Please visit your Supabase dashboard to check project status.' 
        };
      }
      return { success: false, error: 'Failed to load user reviews' };
    }
  },

  // Get reviews received by user
  async getReviewsForUser(userId) {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select(`
          *,
          skill:skills!reviews_skill_id_fkey(id, title),
          reviewer:profiles!reviews_reviewer_id_fkey(id, username, full_name, avatar_url)
        `)
        .eq('reviewee_id', userId)
        .order('created_at', { ascending: false });
      
      if (error) {
        return { success: false, error: error.message };
      }
      
      return { success: true, data };
    } catch (error) {
      if (error?.message?.includes('Failed to fetch') || 
          error?.message?.includes('NetworkError') ||
          error?.name === 'TypeError' && error?.message?.includes('fetch')) {
        return { 
          success: false, 
          error: 'Cannot connect to database. Your Supabase project may be paused or deleted. Please visit your Supabase dashboard to check project status.' 
        };
      }
      return { success: false, error: 'Failed to load received reviews' };
    }
  },

  // Calculate average rating for a skill
  async getSkillRating(skillId) {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select('rating')
        .eq('skill_id', skillId);
      
      if (error) {
        return { success: false, error: error.message };
      }
      
      const ratings = data || [];
      const averageRating = ratings.length > 0 
        ? ratings.reduce((sum, review) => sum + review.rating, 0) / ratings.length
        : 0;
      
      return { 
        success: true, 
        data: {
          averageRating: Math.round(averageRating * 10) / 10,
          totalReviews: ratings.length
        }
      };
    } catch (error) {
      if (error?.message?.includes('Failed to fetch') || 
          error?.message?.includes('NetworkError') ||
          error?.name === 'TypeError' && error?.message?.includes('fetch')) {
        return { 
          success: false, 
          error: 'Cannot connect to database. Your Supabase project may be paused or deleted. Please visit your Supabase dashboard to check project status.' 
        };
      }
      return { success: false, error: 'Failed to calculate rating' };
    }
  }
};

export default reviewService;