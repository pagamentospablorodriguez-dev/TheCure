import { useEffect, useState } from 'react';
import Logo from '@/components/Logo';
import ShareButton from '@/components/ShareButton';

interface SiteHeaderProps {
  onOpenForm: () => void;
}

export default function SiteHeader({ onOpenForm }: SiteHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 24);
    }
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition duration-500 ${
        isScrolled ? 'border-b border-white/10 bg-black/80 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6">
        <a href="#ritual" aria-label="TheCure.pro, home">
          <Logo variant="onBlack" />
        </a>

        <nav className="flex items-center gap-2 sm:gap-6">
          <a
            href="#testimonials"
            className="hidden text-sm text-neutral-400 transition duration-300 hover:text-white sm:inline"
          >
            Testimonials
          </a>
          <ShareButton className="px-3 sm:px-4" />
          <button
            type="button"
            onClick={onOpenForm}
            className="rounded-full bg-white px-4 py-2 text-sm font-medium text-black transition duration-300 hover:bg-neutral-200"
          >
            Submit testimonial
          </button>
        </nav>
      </div>
    </header>
  );
}
