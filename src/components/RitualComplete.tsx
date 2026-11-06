import { Check, Heart } from 'lucide-react';
import ShareButton from '@/components/ShareButton';

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

      <h2 className="mt-10 text-4xl font-semibold leading-[1.15] tracking-tight sm:text-5xl">Cure Complete.</h2>
      <p className="mt-5 max-w-md leading-relaxed text-neutral-400">
        Take a deep breath. Your condition <span className="text-white">"{intention}"</span> has been successfully neutralized. Cellular alignment is now fully restored.
      </p>

      {/* Caixa de Doação por Gratidão via Stripe */}
      <div className="mt-8 w-full max-w-md rounded-3xl border border-white/15 bg-neutral-900/80 p-6 text-left backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-white">
            <Heart className="h-5 w-5 text-red-500 fill-red-500/20" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-white">Support via Gratitude</h3>
            <p className="text-xs text-neutral-400">Keep TheCure.pro active saving lives worldwide.</p>
          </div>
        </div>
        <p className="mt-4 text-xs leading-relaxed text-neutral-300">
          If your disease or affliction has been resolved and you wish to express gratitude for your new state of absolute health, consider contributing to our global infrastructure.
        </p>
        <a
          href="https://buy.stripe.com/your_link_here" 
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 flex w-full items-center justify-center rounded-full bg-white py-3 text-sm font-medium text-black transition duration-300 hover:bg-neutral-200"
        >
          Send Gratitude Donation (Stripe)
        </a>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <ShareButton label="Share this session" />
        <button
          type="button"
          onClick={onOpenForm}
          className="rounded-full border border-white/20 px-5 py-2.5 text-sm font-medium text-white transition duration-300 hover:bg-white hover:text-black"
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
