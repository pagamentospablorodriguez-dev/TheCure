import { ImagePlus, X } from 'lucide-react';
import { ACCEPTED_PHOTO_TYPES } from '@/lib/testimonials';

interface PhotoPickerProps {
  previewUrl: string | null;
  onSelect: (file: File | null) => void;
}

export default function PhotoPicker({ previewUrl, onSelect }: PhotoPickerProps) {
  if (previewUrl) {
    return (
      <div className="relative overflow-hidden rounded-2xl">
        <img src={previewUrl} alt="Photo selected for your testimonial" className="aspect-[4/3] w-full object-cover" />
        <button
          type="button"
          onClick={() => onSelect(null)}
          aria-label="Remove photo"
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/70 text-white transition duration-300 hover:bg-black"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <label className="flex cursor-pointer flex-col items-center gap-2 rounded-2xl border border-dashed border-neutral-300 px-6 py-8 text-center transition duration-300 hover:border-black hover:bg-neutral-50">
      <ImagePlus className="h-6 w-6 text-neutral-500" strokeWidth={1.5} />
      <span className="text-sm font-medium">Add a photo (optional)</span>
      <span className="text-xs text-neutral-500">JPG, PNG or WEBP up to 5 MB</span>
      <input
        type="file"
        accept={ACCEPTED_PHOTO_TYPES.join(',')}
        className="sr-only"
        onChange={(event) => {
          const file = event.target.files?.[0] ?? null;
          event.target.value = '';
          onSelect(file);
        }}
      />
    </label>
  );
}
