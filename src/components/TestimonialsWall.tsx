import { useEffect, useState } from 'react';
import TestimonialCard from '@/components/TestimonialCard';
import { fetchApprovedTestimonials } from '@/lib/testimonials';
import type { Testimonial } from '@/types/testimonial';

type LoadStatus = 'loading' | 'ready' | 'error';

interface TestimonialsWallProps {
  onOpenForm: () => void;
}

export default function TestimonialsWall({ onOpenForm }: TestimonialsWallProps) {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [status, setStatus] = useState<LoadStatus>('loading');
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let cancelled = false;
    fetchApprovedTestimonials()
      .then((rows) => {
        if (cancelled) return;
        setItems(rows);
        setStatus('ready');
      })
      .catch(() => {
        if (!cancelled) setStatus('error');
      });
    return () => {
      cancelled = true;
    };
  }, [attempt]);

  function handleRetry() {
    setStatus('loading');
    setAttempt((value) => value + 1);
  }

  return (
    <section id="testimonials" className="bg-white px-6 py-32 text-black">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">Wall of Restoration</p>
            <h2 className="mt-5 text-4xl font-semibold leading-[1.15] tracking-tight sm:text-5xl">
              Verified Miracles & Shifts
            </h2>
            <p className="mt-5 leading-relaxed text-neutral-600">
              Direct accounts from individuals worldwide who underwent instantaneous healing.
            </p>
          </div>
          <button
            type="button"
            onClick={onOpenForm}
            className="self-start rounded-full border border-black px-6 py-3 text-sm font-medium transition duration-300 hover:bg-black hover:text-white sm:self-auto"
          >
            Submit testimonial
          </button>
        </div>

        <div className="mt-16">
          {status === 'loading' && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" aria-live="polite">
              {[0, 1, 2].map((key) => (
                <div key={key} className="h-56 animate-pulse rounded-3xl bg-neutral-100" />
              ))}
            </div>
          )}

          {status === 'error' && (
            <div className="rounded-3xl border border-neutral-200 p-10 text-center">
              <p className="text-neutral-700">We could not load the testimonials.</p>
              <button
                type="button"
                onClick={handleRetry}
                className="mt-6 rounded-full bg-black px-5 py-2.5 text-sm text-white transition duration-300 hover:bg-neutral-800"
              >
                Try again
              </button>
            </div>
          )}

          {status === 'ready' && items.length === 0 && (
            <div className="rounded-3xl border border-dashed border-neutral-300 p-12 text-center">
              <p className="text-neutral-600">No testimonials have been published yet.</p>
            </div>
          )}

          {status === 'ready' && items.length > 0 && (
            <div className="columns-1 gap-6 sm:columns-2 lg:columns-3">
              {items.map((testimonial) => (
                <TestimonialCard key={testimonial.id} testimonial={testimonial} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
