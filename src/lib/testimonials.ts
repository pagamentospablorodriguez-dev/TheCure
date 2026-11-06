import { supabase } from '@/lib/supabase';
import type { Testimonial, TestimonialDraft } from '@/types/testimonial';

const PHOTO_BUCKET = 'testimonial-photos';
const PHOTO_EXTENSIONS: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
};

export const ACCEPTED_PHOTO_TYPES = Object.keys(PHOTO_EXTENSIONS);
export const MAX_PHOTO_BYTES = 5 * 1024 * 1024;
export const MIN_BODY_LENGTH = 20;
export const MAX_BODY_LENGTH = 800;
export const MAX_NAME_LENGTH = 60;

export function getPhotoUrl(path: string): string {
  return supabase.storage.from(PHOTO_BUCKET).getPublicUrl(path).data.publicUrl;
}

export async function fetchApprovedTestimonials(): Promise<Testimonial[]> {
  const { data, error } = await supabase
    .from('testimonials')
    .select('id, display_name, is_anonymous, body, photo_path, created_at')
    .eq('status', 'approved')
    .order('created_at', { ascending: false })
    .limit(60);

  if (error) throw new Error(error.message);
  if (!Array.isArray(data)) throw new Error('Unexpected response while loading testimonials.');
  return data as Testimonial[];
}

export async function submitTestimonial(draft: TestimonialDraft): Promise<void> {
  let photoPath: string | null = null;

  if (draft.photo) {
    const extension = PHOTO_EXTENSIONS[draft.photo.type];
    if (!extension) throw new Error('This photo format is not supported.');

    const path = `${crypto.randomUUID()}.${extension}`;
    const { error: uploadError } = await supabase.storage
      .from(PHOTO_BUCKET)
      .upload(path, draft.photo, { contentType: draft.photo.type, cacheControl: '3600' });

    if (uploadError) throw new Error('We could not upload your photo.');
    photoPath = path;
  }

  const trimmedName = draft.name.trim();
  const { error } = await supabase.from('testimonials').insert({
    display_name: draft.isAnonymous ? null : trimmedName || null,
    is_anonymous: draft.isAnonymous,
    body: draft.body.trim(),
    photo_path: photoPath,
  });

  if (error) throw new Error('We could not submit your testimonial.');
}
