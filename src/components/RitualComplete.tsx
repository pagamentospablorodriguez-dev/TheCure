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

      <h2 className="mt-10 text-4xl font-semibold leading-[1.15] tracking-tight sm:text-5xl">Restoration Complete.</h2>
      <p className="mt-5 max-w-md leading-relaxed text-neutral-400">
        Your condition <span className="text-white font-medium">"{intention}"</span> has been completely neutralized. Your biology is now successfully restored.
      </p>

      {/* Bloco de Conversão de Doação por Gratidão (Otimizado) */}
      <div className="mt-8 w-full max-w-md rounded-3xl border border-white/20 bg-neutral-900/95 p-6 text-left backdrop-blur-md shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-white">
            <Heart className="h-5 w-5 text-red-500 fill-red-500/30" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-white">Honor Your Restoration</h3>
            <p className="text-xs text-neutral-400">Keep the frequency active for millions worldwide.</p>
          </div>
        </div>
        <p className="mt-4 text-xs leading-relaxed text-neutral-300">
          This session was delivered to you instantly and free of charge. If your affliction has been dissolved and you wish to express gratitude, your contribution directly maintains our global servers active 24/7.
        </p>
        <a
          href="https://donate.stripe.com/aFa9AT2R343g9R9bUzb7y0k"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 flex w-full items-center justify-center rounded-full bg-white py-3.5 text-sm font-medium text-black transition duration-300 hover:bg-neutral-200 shadow-lg tracking-wide"
        >
          Send Gratitude Contribution ($25)
        </a>
      </div>

      {/* Botões de Ação Final Organizados */}
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-md">
        <button
          type="button"
          onClick={onOpenForm}
          className="w-full sm:w-auto flex-1 rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition duration-300 hover:bg-neutral-200"
        >
          Share Your Breakthrough
        </button>
        <button
          type="button"
          onClick={onRestart}
          className="w-full sm:w-auto rounded-full border border-white/20 px-6 py-3 text-sm text-neutral-300 transition duration-300 hover:border-white hover:text-white"
        >
          New Session
        </button>
      </div>
      
      <div className="mt-4">
        <ShareButton label="Share platform link" />
      </div>
    </div>
  );
}
