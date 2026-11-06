import { Check } from 'lucide-react';
import ShareButton from '@/components/ShareButton';
import { DISCLAIMER } from '@/lib/brand';

interface RitualCompleteProps {
  intention: string;
  onRestart: () => void;
  onOpenForm: () => void;
}

export default function RitualComplete({ intention, onRestart, onOpenForm }: RitualCompleteProps) {
  return (
    <div className="flex flex-col items-center text-center animate-fade-up">
      <div className="flex h-20 w-20 items-center justify-center rounded-full border border-white/30">
        <Check className="h-8 w-8 text-white" strokeWidth={1.5} />
      </div>

      <h2 className="mt-10 text-4xl font-semibold leading-[1.15] tracking-tight sm:text-5xl">Session Complete.</h2>
      <p className="mt-5 max-w-md leading-relaxed text-neutral-400">
        Take a deep breath. Your intention <span className="text-white">"{intention}"</span> has been fully processed, and your condition has met its absolute resolution.
      </p>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
        <ShareButton label="Share this session" />
        <button
          type="button"
          onClick={onOpenForm}
          className="rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black transition duration-300 hover:bg-neutral-200"
        >
          Share Your Breakthrough
        </button>
        <button
          type="button"
          onClick={onRestart}
          className="rounded-full px-5 py-2.5 text-sm text-neutral-400 transition duration-300 hover:text-white"
        >
          Begin New Session
        </button>
      </div>

    </div>
  );
}
