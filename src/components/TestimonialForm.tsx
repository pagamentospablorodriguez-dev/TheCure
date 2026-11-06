import { useEffect, useState, type FormEvent } from 'react';
import { Check, X } from 'lucide-react';
import PhotoPicker from '@/components/PhotoPicker';
import {
  ACCEPTED_PHOTO_TYPES,
  MAX_BODY_LENGTH,
  MAX_NAME_LENGTH,
  MAX_PHOTO_BYTES,
  MIN_BODY_LENGTH,
  submitTestimonial,
} from '@/lib/testimonials';

type FormStatus = 'editing' | 'submitting' | 'sent';

interface TestimonialFormProps {
  onClose: () => void;
}

export default function TestimonialForm({ onClose }: TestimonialFormProps) {
  const [name, setName] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [body, setBody] = useState('');
  const [photo, setPhoto] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [status, setStatus] = useState<FormStatus>('editing');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!photo) {
      setPreviewUrl(null);
      return;
    }
    const url = URL.createObjectURL(photo);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [photo]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  function handlePhotoSelect(file: File | null) {
    setError(null);
    if (!file) {
      setPhoto(null);
      return;
    }
    if (!ACCEPTED_PHOTO_TYPES.includes(file.type) || file.size > MAX_PHOTO_BYTES) {
      setError('Please upload a JPG, PNG or WEBP image up to 5 MB.');
      return;
    }
    setPhoto(file);
  }

  function handleAnonymousToggle() {
    setIsAnonymous((value) => !value);
    setName('');
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedBody = body.trim();
    if (trimmedBody.length < MIN_BODY_LENGTH) {
      setError(`Please write at least ${MIN_BODY_LENGTH} characters in your testimonial.`);
      return;
    }

    setError(null);
    setStatus('submitting');
    try {
      await submitTestimonial({ name, isAnonymous, body: trimmedBody, photo });
      setStatus('sent');
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Something went wrong. Please try again.');
      setStatus('editing');
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/80 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="testimonial-form-title"
        className="relative max-h-[92vh] w-full overflow-y-auto rounded-t-3xl bg-white p-6 text-black shadow-2xl animate-modal-in sm:max-w-lg sm:rounded-3xl sm:p-8"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full text-neutral-500 transition duration-300 hover:bg-neutral-100 hover:text-black"
        >
          <X className="h-5 w-5" />
        </button>

        {status === 'sent' ? (
          <div className="flex flex-col items-center py-10 text-center animate-fade-up">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-black">
              <Check className="h-7 w-7 text-white" strokeWidth={1.5} />
            </div>
            <h2 id="testimonial-form-title" className="mt-8 text-2xl font-semibold tracking-tight">
              Testimonial sent.
            </h2>
            <p className="mt-3 max-w-sm leading-relaxed text-neutral-600">
              Thank you for sharing. Your testimonial will appear on the wall once it is approved.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-8 rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition duration-300 hover:bg-neutral-800"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="pr-10">
              <h2 id="testimonial-form-title" className="text-2xl font-semibold tracking-tight">
                Share your experience
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-neutral-500">
                Tell us about your session. Testimonials are reviewed before they are published.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="testimonial-name" className="text-sm font-medium">
                  Your name <span className="font-normal text-neutral-400">(optional)</span>
                </label>
                <button
                  type="button"
                  role="switch"
                  aria-checked={isAnonymous}
                  onClick={handleAnonymousToggle}
                  className="flex items-center gap-2 text-xs text-neutral-600"
                >
                  Keep anonymous
                  <span
                    className={`relative inline-flex h-5 w-9 items-center rounded-full transition duration-300 ${
                      isAnonymous ? 'bg-black' : 'bg-neutral-300'
                    }`}
                  >
                    <span
                      className={`h-4 w-4 rounded-full bg-white shadow transition duration-300 ${
                        isAnonymous ? 'translate-x-[18px]' : 'translate-x-0.5'
                      }`}
                    />
                  </span>
                </button>
              </div>
              <input
                id="testimonial-name"
                type="text"
                value={name}
                disabled={isAnonymous}
                maxLength={MAX_NAME_LENGTH}
                onChange={(event) => setName(event.target.value)}
                placeholder={isAnonymous ? 'Your testimonial will be published as anonymous' : 'How you would like to appear'}
                className="w-full rounded-xl border border-neutral-300 px-4 py-3 text-sm outline-none transition duration-300 placeholder:text-neutral-400 focus:border-black disabled:bg-neutral-50 disabled:text-neutral-400"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="testimonial-body" className="text-sm font-medium">
                Your testimonial
              </label>
              <textarea
                id="testimonial-body"
                rows={5}
                value={body}
                maxLength={MAX_BODY_LENGTH}
                onChange={(event) => setBody(event.target.value)}
                placeholder="Describe your session in your own words."
                className="w-full resize-none rounded-xl border border-neutral-300 px-4 py-3 text-sm leading-relaxed outline-none transition duration-300 placeholder:text-neutral-400 focus:border-black"
              />
              <p className="text-right text-xs text-neutral-400">
                {body.length}/{MAX_BODY_LENGTH}
              </p>
            </div>

            <PhotoPicker previewUrl={previewUrl} onSelect={handlePhotoSelect} />

            {error && (
              <p role="alert" className="rounded-xl bg-neutral-100 px-4 py-3 text-sm text-neutral-800">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="w-full rounded-full bg-black px-6 py-3.5 text-sm font-medium text-white transition duration-300 hover:bg-neutral-800 disabled:cursor-wait disabled:opacity-60"
            >
              {status === 'submitting' ? 'Sending...' : 'Submit for moderation'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
