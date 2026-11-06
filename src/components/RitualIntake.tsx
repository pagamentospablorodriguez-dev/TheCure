import { useState, type FormEvent } from 'react';
import { ArrowRight } from 'lucide-react';

const SUGGESTIONS = ['Calm', 'Sleep', 'Focus', 'Energy', 'Balance', 'Lightness'];
const MAX_INTENTION_LENGTH = 120;

interface RitualIntakeProps {
  onStart: (intention: string) => void;
}

export default function RitualIntake({ onStart }: RitualIntakeProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [custom, setCustom] = useState('');
  const intention = custom.trim() || selected || '';

  function handleSelect(option: string) {
    setSelected(option);
    setCustom('');
  }

  function handleCustomChange(value: string) {
    setCustom(value);
    if (value) setSelected(null);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (intention) onStart(intention);
  }

  return (
    <form onSubmit={handleSubmit} className="mt-12 space-y-8">
      <div className="flex flex-wrap justify-center gap-2">
        {SUGGESTIONS.map((option) => {
          const isActive = selected === option;
          return (
            <button
              key={option}
              type="button"
              aria-pressed={isActive}
              onClick={() => handleSelect(option)}
              className={`rounded-full border px-5 py-2.5 text-sm transition duration-300 ${
                isActive
                  ? 'border-white bg-white text-black'
                  : 'border-white/15 text-neutral-300 hover:border-white/50 hover:text-white'
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>

      <div>
        <label htmlFor="intention" className="sr-only">
          Describe your intention
        </label>
        <input
          id="intention"
          type="text"
          value={custom}
          maxLength={MAX_INTENTION_LENGTH}
          onChange={(event) => handleCustomChange(event.target.value)}
          placeholder="Or write it in your own words"
          className="w-full rounded-full border border-white/15 bg-neutral-950 px-6 py-4 text-center text-base text-white placeholder:text-neutral-500 outline-none transition duration-300 focus:border-white/60"
        />
      </div>

      <button
        type="submit"
        disabled={!intention}
        className="group inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-medium text-black transition duration-300 hover:bg-neutral-200 disabled:cursor-not-allowed disabled:opacity-30"
      >
        Start session
        <ArrowRight className="h-4 w-4 transition duration-300 group-hover:translate-x-1" />
      </button>
    </form>
  );
}
