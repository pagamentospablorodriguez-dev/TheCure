import { EyeOff, Quote } from 'lucide-react';
import { getPhotoUrl } from '@/lib/testimonials';
import type { Testimonial } from '@/types/testimonial';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const isAnonymous = testimonial.is_anonymous || !testimonial.display_name;
  const name = isAnonymous ? 'Anonymous' : testimonial.display_name ?? '';
  const date = new Date(testimonial.created_at).toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  return (
    <article className="mb-6 break-inside-avoid rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm transition duration-500 hover:-translate-y-1 hover:shadow-xl sm:p-7">
      {testimonial.photo_path && (
        <img
          src={getPhotoUrl(testimonial.photo_path)}
          alt={`Photo shared by ${name}`}
          loading="lazy"
          className="mb-6 aspect-[4/3] w-full rounded-2xl object-cover grayscale transition duration-700 hover:grayscale-0"
        />
      )}

      <Quote className="h-6 w-6 text-neutral-300" strokeWidth={1.5} />
      <p className="mt-4 whitespace-pre-line leading-relaxed text-neutral-800">{testimonial.body}</p>

      <footer className="mt-6 flex items-center gap-3 border-t border-neutral-100 pt-5">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-black text-sm font-medium text-white">
          {isAnonymous ? <EyeOff className="h-4 w-4" /> : name.charAt(0).toUpperCase()}
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-black">{name}</p>
          <p className="text-xs text-neutral-500">{date}</p>
        </div>
      </footer>
    </article>
  );
}
