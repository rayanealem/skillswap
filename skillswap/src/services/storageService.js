import supabase from '../lib/supabaseClient';

const storageService = {
  // Upload avatar image
  async uploadAvatar(userId, file) {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${userId}/avatar.${fileExt}`;
      
      const { data, error } = await supabase.storage
        .from('public-assets')
        .upload(`avatars/${fileName}`, file, {
          cacheControl: '3600',
          upsert: true
        });
      
      if (error) {
        return { success: false, error: error.message };
      }
      
      // Get public URL
      const { data: urlData } = supabase.storage
        .from('public-assets')
        .getPublicUrl(`avatars/${fileName}`);
      
      return { success: true, data: { path: data.path, url: urlData.publicUrl } };
    } catch (error) {
      if (error?.message?.includes('Failed to fetch') || 
          error?.message?.includes('NetworkError') ||
          error?.name === 'TypeError' && error?.message?.includes('fetch')) {
        return { 
          success: false, 
          error: 'Cannot connect to storage service. Your Supabase project may be paused or deleted. Please visit your Supabase dashboard to check project status.' 
        };
      }
      return { success: false, error: 'Failed to upload avatar' };
    }
  },

  // Upload skill image
  async uploadSkillImage(skillId, file, index = 0) {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${skillId}/image_${index}.${fileExt}`;
      
      const { data, error } = await supabase.storage
        .from('public-assets')
        .upload(`skill-images/${fileName}`, file, {
          cacheControl: '3600',
          upsert: true
        });
      
      if (error) {
        return { success: false, error: error.message };
      }
      
      // Get public URL
      const { data: urlData } = supabase.storage
        .from('public-assets')
        .getPublicUrl(`skill-images/${fileName}`);
      
      return { success: true, data: { path: data.path, url: urlData.publicUrl } };
    } catch (error) {
      if (error?.message?.includes('Failed to fetch') || 
          error?.message?.includes('NetworkError') ||
          error?.name === 'TypeError' && error?.message?.includes('fetch')) {
        return { 
          success: false, 
          error: 'Cannot connect to storage service. Your Supabase project may be paused or deleted. Please visit your Supabase dashboard to check project status.' 
        };
      }
      return { success: false, error: 'Failed to upload skill image' };
    }
  },

  // Delete file from storage
  async deleteFile(bucket, path) {
    try {
      const { error } = await supabase.storage
        .from(bucket)
        .remove([path]);
      
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
          error: 'Cannot connect to storage service. Your Supabase project may be paused or deleted. Please visit your Supabase dashboard to check project status.' 
        };
      }
      return { success: false, error: 'Failed to delete file' };
    }
  },

  // Get public URL for a file
  getPublicUrl(bucket, path) {
    const { data } = supabase.storage
      .from(bucket)
      .getPublicUrl(path);
    
    return data.publicUrl;
  }
};

export default storageService;