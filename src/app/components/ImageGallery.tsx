import { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { clsx } from 'clsx';

export interface GalleryImage {
  url: string;
  alt: string;
  category?: 'exterior' | 'interior' | 'plan';
}

export interface ImageGalleryProps {
  images: GalleryImage[];
}

export const ImageGallery = ({ images }: ImageGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
  };

  const nextImage = () => {
    setLightboxIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setLightboxIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
    if (e.key === 'Escape') closeLightbox();
  };

  return (
    <>
      {/* Main Gallery */}
      <div className="flex flex-col gap-4">
        {/* Main Image */}
        <div 
          className="relative aspect-[16/10] rounded-[30px] overflow-hidden bg-[#eaeeee] cursor-pointer group"
          onClick={() => openLightbox(selectedImage)}
        >
          <img
            src={images[selectedImage].url}
            alt={images[selectedImage].alt}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
            <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full text-[#161b21] font-medium">
              Открыть галерею
            </span>
          </div>
        </div>

        {/* Thumbnails */}
        <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-3">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={clsx(
                'aspect-square rounded-[15px] overflow-hidden bg-[#eaeeee] transition-all',
                selectedImage === index
                  ? 'ring-4 ring-[#161b21] opacity-100'
                  : 'opacity-60 hover:opacity-100'
              )}
            >
              <img
                src={image.url}
                alt={image.alt}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-default z-10"
            aria-label="Close gallery"
          >
            <X size={24} className="text-white" />
          </button>

          {/* Navigation */}
          <button
            onClick={prevImage}
            className="absolute left-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-default z-10"
            aria-label="Previous image"
          >
            <ChevronLeft size={24} className="text-white" />
          </button>

          <button
            onClick={nextImage}
            className="absolute right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-default z-10"
            aria-label="Next image"
          >
            <ChevronRight size={24} className="text-white" />
          </button>

          {/* Image Counter */}
          <div className="absolute top-6 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm">
            <span className="text-white text-sm font-medium">
              {lightboxIndex + 1} / {images.length}
            </span>
          </div>

          {/* Main Image */}
          <div className="max-w-7xl max-h-[90vh] mx-auto px-20">
            <img
              src={images[lightboxIndex].url}
              alt={images[lightboxIndex].alt}
              className="w-full h-full object-contain"
            />
          </div>

          {/* Thumbnail Strip */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 max-w-4xl w-full px-6">
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setLightboxIndex(index)}
                  className={clsx(
                    'shrink-0 w-20 h-20 rounded-lg overflow-hidden transition-all',
                    lightboxIndex === index
                      ? 'ring-2 ring-white opacity-100'
                      : 'opacity-50 hover:opacity-100'
                  )}
                >
                  <img
                    src={image.url}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export const GalleryGrid = ({ images }: ImageGalleryProps) => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setIsLightboxOpen(true);
  };

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <div
            key={index}
            className="relative aspect-[4/3] rounded-[20px] overflow-hidden bg-[#eaeeee] cursor-pointer group"
            onClick={() => openLightbox(index)}
          >
            <img
              src={image.url}
              alt={image.alt}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
          </div>
        ))}
      </div>

      {/* Lightbox (reuse from above) */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={() => setIsLightboxOpen(false)}
        >
          <button
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-default z-10"
          >
            <X size={24} className="text-white" />
          </button>
          <div className="max-w-7xl max-h-[90vh] mx-auto px-20">
            <img
              src={images[lightboxIndex].url}
              alt={images[lightboxIndex].alt}
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
};
