export interface Testimonial {
  id: string;
  display_name: string | null;
  is_anonymous: boolean;
  body: string;
  photo_path: string | null;
  created_at: string;
}

export interface TestimonialDraft {
  name: string;
  isAnonymous: boolean;
  body: string;
  photo: File | null;
}
