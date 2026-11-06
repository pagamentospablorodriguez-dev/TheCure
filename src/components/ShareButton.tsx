import { useState } from 'react';
import { Check, Share2 } from 'lucide-react';

type ShareStatus = 'idle' | 'copied' | 'failed';

interface ShareButtonProps {
  className?: string;
}

function isAbortError(error: unknown): boolean {
  return error instanceof DOMException && error.name === 'AbortError';
}

export default function ShareButton({ className = '' }: ShareButtonProps) {
  const [status, setStatus] = useState<ShareStatus>('idle');

  async function copyLink(url: string) {
    try {
      await navigator.clipboard.writeText(url);
      setStatus('copied');
    } catch {
      setStatus('failed');
    }
    setTimeout(() => setStatus('idle'), 2200);
  }

  async function handleShare() {
    const url = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({ title: 'TheCure.pro', text: 'Check out TheCure.pro', url });
        return;
      } catch (error) {
        if (isAbortError(error)) return;
      }
    }

    await copyLink(url);
  }

  const label = status === 'copied' ? 'Link copied' : status === 'failed' ? 'Could not copy' : 'Share';
  const Icon = status === 'copied' ? Check : Share2;

  return (
    <button
      type="button"
      onClick={handleShare}
      className={`inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm text-white transition duration-300 hover:border-white hover:bg-white hover:text-black ${className}`}
    >
      <Icon className="h-4 w-4" />
      <span>{label}</span>
    </button>
  );
}
