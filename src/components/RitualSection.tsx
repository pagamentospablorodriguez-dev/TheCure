import { useCallback, useState } from 'react';
import RitualIntake from '@/components/RitualIntake';
import RitualSequence from '@/components/RitualSequence';
import RitualComplete from '@/components/RitualComplete';

type RitualPhase = 'intake' | 'running' | 'complete';

interface RitualSectionProps {
  onOpenForm: () => void;
}

export default function RitualSection({ onOpenForm }: RitualSectionProps) {
  const [phase, setPhase] = useState<RitualPhase>('intake');
  const [intention, setIntention] = useState('');

  const handleStart = useCallback((value: string) => {
    setIntention(value);
    setPhase('running');
  }, []);

  const handleComplete = useCallback(() => setPhase('complete'), []);

  const handleRestart = useCallback(() => {
    setIntention('');
    setPhase('intake');
  }, []);

  return (
    <section
      id="ritual"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pb-24 pt-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(255,255,255,0.07),transparent_60%)]"
      />

      <div className="relative w-full max-w-xl text-center">
        {phase === 'intake' && (
          <div className="animate-fade-up">
           
            <h1 className="mt-6 text-5xl font-semibold leading-[1.1] tracking-tight sm:text-6xl">
              The definitive state of complete restoration.
            </h1>
            <p className="mx-auto mt-6 max-w-sm leading-relaxed text-neutral-400">
              Enter your intention, select your condition or focus, and initiate the frequency transmission.
            </p>
            <RitualIntake onStart={handleStart} />
          </div>
        )}

        {phase === 'running' && <RitualSequence intention={intention} onComplete={handleComplete} />}

        {phase === 'complete' && (
          <RitualComplete intention={intention} onRestart={handleRestart} onOpenForm={onOpenForm} />
        )}
      </div>
    </section>
  );
}
