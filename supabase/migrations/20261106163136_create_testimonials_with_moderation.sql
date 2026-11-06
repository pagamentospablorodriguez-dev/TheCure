/*
# Create testimonials (relatos) with moderation and photo storage

1. New Tables
- `testimonials`
  - `id` (uuid, primary key)
  - `display_name` (text, optional, up to 60 characters)
  - `is_anonymous` (boolean, when true the name is hidden on the wall)
  - `body` (text, 20 to 800 characters, the testimonial itself)
  - `photo_path` (text, optional, path of the photo in storage)
  - `status` (text: pending, approved or rejected; new rows start as pending)
  - `created_at` (timestamp)

2. Storage
- New public bucket `testimonial-photos`: JPG, PNG or WEBP only, up to 5 MB per file.

3. Security
- RLS enabled on `testimonials`.
- Visitors (anon) can READ only rows with status `approved`.
- Visitors (anon) can INSERT only new rows with status `pending`, and anonymous rows cannot carry a name.
- Visitors cannot update or delete rows. Moderation is done by the project owner in the database.
- Visitors can upload photos only to the `testimonial-photos` bucket.

4. Notes
- Approving a testimonial means setting its status to `approved` in the database table editor.
*/

CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  display_name text,
  is_anonymous boolean NOT NULL DEFAULT false,
  body text NOT NULL CHECK (char_length(body) BETWEEN 20 AND 800),
  photo_path text,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT testimonials_display_name_length CHECK (display_name IS NULL OR char_length(display_name) <= 60)
);

CREATE INDEX IF NOT EXISTS testimonials_status_created_idx ON testimonials (status, created_at DESC);

ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

GRANT SELECT, INSERT ON testimonials TO anon, authenticated;

DROP POLICY IF EXISTS "anon_select_approved_testimonials" ON testimonials;
CREATE POLICY "anon_select_approved_testimonials" ON testimonials FOR SELECT
  TO anon, authenticated
  USING (status = 'approved');

DROP POLICY IF EXISTS "anon_insert_pending_testimonials" ON testimonials;
CREATE POLICY "anon_insert_pending_testimonials" ON testimonials FOR INSERT
  TO anon, authenticated
  WITH CHECK (status = 'pending' AND (NOT is_anonymous OR display_name IS NULL));

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'testimonial-photos',
  'testimonial-photos',
  true,
  5242880,
  ARRAY['image/jpeg', 'image/png', 'image/webp']
)
ON CONFLICT (id) DO UPDATE SET
  public = EXCLUDED.public,
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

DROP POLICY IF EXISTS "anon_upload_testimonial_photos" ON storage.objects;
CREATE POLICY "anon_upload_testimonial_photos" ON storage.objects FOR INSERT
  TO anon, authenticated
  WITH CHECK (bucket_id = 'testimonial-photos');
