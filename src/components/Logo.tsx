import { SYMBOL_ON_BLACK, SYMBOL_ON_WHITE } from '@/lib/brand';

interface LogoProps {
  variant?: 'onBlack' | 'onWhite';
  className?: string;
}

export default function Logo({ variant = 'onBlack', className = '' }: LogoProps) {
  const isOnBlack = variant === 'onBlack';

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <img
        src={isOnBlack ? SYMBOL_ON_BLACK : SYMBOL_ON_WHITE}
        alt=""
        className={`h-7 w-7 object-contain ${isOnBlack ? 'mix-blend-screen' : 'mix-blend-multiply'}`}
      />
      <span className="text-lg leading-none tracking-tight">
        The<span className="font-semibold">Cure</span>
        <span className="text-sm">.pro</span>
      </span>
    </span>
  );
}
