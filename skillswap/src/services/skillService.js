import supabase from '../lib/supabaseClient';

const skillService = {
  // Get all active skills with owner profiles
  async getSkills(filters = {}) {
    try {
      let query = supabase
        .from('skills')
        .select(`
          *,
          owner:profiles!skills_owner_id_fkey(id, username, full_name, avatar_url, university, reputation_points)
        `)
        .eq('is_active', true);

      // Apply filters
      if (filters.category) {
        query = query.eq('category', filters.category);
      }
      
      if (filters.search) {
        query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
      }
      
      if (filters.tags && filters.tags.length > 0) {
        query = query.overlaps('tags', filters.tags);
      }
      
      if (filters.maxPrice) {
        query = query.lte('price', filters.maxPrice);
      }

      // Apply sorting
      if (filters.sortBy) {
        switch (filters.sortBy) {
          case 'price_low':
            query = query.order('price', { ascending: true });
            break;
          case 'price_high':
            query = query.order('price', { ascending: false });
            break;
          case 'newest':
            query = query.order('created_at', { ascending: false });
            break;
          case 'oldest':
            query = query.order('created_at', { ascending: true });
            break;
          default:
            query = query.order('created_at', { ascending: false });
        }
      } else {
        query = query.order('created_at', { ascending: false });
      }

      const { data, error } = await query;
      
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
      return { success: false, error: 'Failed to load skills' };
    }
  },

  // Get skill by ID with owner and reviews
  async getSkillById(skillId) {
    try {
      const { data, error } = await supabase
        .from('skills')
        .select(`
          *,
          owner:profiles!skills_owner_id_fkey(id, username, full_name, avatar_url, university, major, bio, reputation_points, social_links),
          reviews(
            id,
            rating,
            comment,
            created_at,
            reviewer:profiles!reviews_reviewer_id_fkey(id, username, full_name, avatar_url)
          )
        `)
        .eq('id', skillId)
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
      return { success: false, error: 'Failed to load skill details' };
    }
  },

  // Get skills by owner
  async getSkillsByOwner(ownerId) {
    try {
      const { data, error } = await supabase
        .from('skills')
        .select('*')
        .eq('owner_id', ownerId)
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
      return { success: false, error: 'Failed to load user skills' };
    }
  },

  // Create new skill
  async createSkill(skillData) {
    try {
      const { data, error } = await supabase
        .from('skills')
        .insert([skillData])
        .select()
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
      return { success: false, error: 'Failed to create skill' };
    }
  },

  // Update skill
  async updateSkill(skillId, updates) {
    try {
      const { data, error } = await supabase
        .from('skills')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', skillId)
        .select()
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
      return { success: false, error: 'Failed to update skill' };
    }
  },

  // Delete skill
  async deleteSkill(skillId) {
    try {
      const { error } = await supabase
        .from('skills')
        .delete()
        .eq('id', skillId);
      
      if (error) {
        return { success: false, error: error.message };
      }
      
      return { success: true };
    } catch (error) {
      if (error?.message?.includes('Failed to fetch') || 
          error?.message?.includes('NetworkError') ||
          error?.name === 'TypeError' && error?.message?.includes('fetch')) {
        return { 
          success: false, 
          error: 'Cannot connect to database. Your Supabase project may be paused or deleted. Please visit your Supabase dashboard to check project status.' 
        };
      }
      return { success: false, error: 'Failed to delete skill' };
    }
  },

  // Get skill categories
  getCategories() {
    return [
      { value: 'programming', label: 'Programming' },
      { value: 'design', label: 'Design' },
      { value: 'marketing', label: 'Marketing' },
      { value: 'writing', label: 'Writing' },
      { value: 'language', label: 'Language' },
      { value: 'music', label: 'Music' },
      { value: 'tutoring', label: 'Tutoring' },
      { value: 'business', label: 'Business' },
      { value: 'other', label: 'Other' }
    ];
  }
};

export default skillService;