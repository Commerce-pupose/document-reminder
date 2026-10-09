import { getSupabaseClient } from '@/backend/supabase/client';

/**
 * Uploads a profile photo File to Supabase Storage bucket "avatars"
 * and returns the public URL, or null on failure.
 *
 * Falls back gracefully if Supabase isn't configured — returns a
 * local object URL so the UI still shows the preview.
 */
export async function uploadAvatar(file: File, employeeId?: string): Promise<string | null> {
  const supabase = getSupabaseClient();

  // No Supabase: return local preview URL (won't persist across refreshes)
  if (!supabase) {
    return URL.createObjectURL(file);
  }

  const ext = file.name.split('.').pop() ?? 'jpg';
  const fileName = `${employeeId ?? `tmp-${Date.now()}`}-${Date.now()}.${ext}`;
  const filePath = `avatars/${fileName}`;

  const { error } = await supabase.storage
    .from('avatars')
    .upload(filePath, file, { upsert: true, contentType: file.type });

  if (error) {
    console.error('Avatar upload failed:', error.message);
    // Fallback to object URL so user at least sees the photo locally
    return URL.createObjectURL(file);
  }

  const { data } = supabase.storage.from('avatars').getPublicUrl(filePath);
  return data?.publicUrl ?? null;
}
