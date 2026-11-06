import { useCallback, useState } from 'react';
import SiteHeader from '@/components/SiteHeader';
import RitualSection from '@/components/RitualSection';
import TestimonialsWall from '@/components/TestimonialsWall';
import TestimonialForm from '@/components/TestimonialForm';
import SiteFooter from '@/components/SiteFooter';

export default function App() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const openForm = useCallback(() => setIsFormOpen(true), []);
  const closeForm = useCallback(() => setIsFormOpen(false), []);

  return (
    <div className="min-h-screen bg-black font-sans text-white">
      <SiteHeader onOpenForm={openForm} />
      <main>
        <RitualSection onOpenForm={openForm} />
        <TestimonialsWall onOpenForm={openForm} />
      </main>
      <SiteFooter />
      {isFormOpen && <TestimonialForm onClose={closeForm} />}
    </div>
  );
}
