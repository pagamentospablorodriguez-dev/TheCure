import { useEffect, useState } from 'react';
import { SYMBOL_ON_BLACK } from '@/lib/brand';

const PHASES = ['Tuning in', 'Active frequency', 'Wrapping up'];
const PHASE_STARTS_MS = [0, 2600, 5600];
const COMPLETE_AT_MS = 7800;
const RING_DELAYS_S = [0, 1, 2, 3];

interface RitualSequenceProps {
  intention: string;
  onComplete: () => void;
}

export default function RitualSequence({ intention, onComplete }: RitualSequenceProps) {
  const [phaseIndex, setPhaseIndex] = useState(0);

  useEffect(() => {
    const timers = PHASE_STARTS_MS.slice(1).map((startAt, index) =>
      window.setTimeout(() => setPhaseIndex(index + 1), startAt)
    );
    timers.push(window.setTimeout(onComplete, COMPLETE_AT_MS));
    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [onComplete]);

  return (
    <div className="flex flex-col items-center gap-12 animate-fade-up">
      <div className="relative flex h-72 w-72 items-center justify-center">
        {RING_DELAYS_S.map((delay) => (
          <span
            key={delay}
            className="absolute inset-0 rounded-full border border-white/40 animate-ring-expand"
            style={{ animationDelay: `${delay}s` }}
          />
        ))}
        <div className="relative flex h-28 w-28 items-center justify-center rounded-full border border-white/20 bg-black animate-breathe">
          <img src={SYMBOL_ON_BLACK} alt="" className="h-12 w-12 object-contain mix-blend-screen" />
        </div>
      </div>

      <div className="h-16 w-full max-w-md overflow-hidden" aria-hidden="true">
        <div className="flex h-full w-[200%] animate-wave-flow">
          {[0, 1].map((copy) => (
            <svg key={copy} viewBox="0 0 400 64" preserveAspectRatio="none" className="h-full w-1/2">
              <path
                d="M0 32 Q 25 0 50 32 T 100 32 T 150 32 T 200 32 T 250 32 T 300 32 T 350 32 T 400 32"
                fill="none"
                stroke="white"
                strokeOpacity="0.6"
                strokeWidth="1.25"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <p
          key={phaseIndex}
          className="text-sm uppercase tracking-[0.3em] text-neutral-200 animate-fade-up"
          role="status"
        >
          {PHASES[phaseIndex]}
        </p>
        <p className="text-sm text-neutral-500">{intention}</p>
      </div>
    </div>
  );
}
