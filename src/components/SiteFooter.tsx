import { DISCLAIMER } from '@/lib/brand';
import Logo from '@/components/Logo';

export default function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-black px-6 py-16">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 md:flex-row md:items-start md:justify-between">
        <div className="space-y-4">
          <Logo variant="onBlack" />
          <p className="max-w-md text-xs leading-relaxed text-neutral-500">{DISCLAIMER}</p>
        </div>
        <p className="text-xs text-neutral-600">© {new Date().getFullYear()} TheCure.pro. All rights reserved.</p>
      </div>
    </footer>
  );
}
