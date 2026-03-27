import { useState } from 'react';
import { Card } from './Card';
import { clsx } from 'clsx';
import { Home, Maximize2, Users, Bath, Heart } from 'lucide-react';

export interface ProductCardProps {
  id: string;
  image: string;
  title: string;
  description: string;
  price: string;
  area: number;
  rooms: number;
  bathrooms: number;
  style?: string;
  popular?: boolean;
  onViewDetails?: () => void;
  onFavorite?: () => void;
}

export const ProductCard = ({
  image,
  title,
  description,
  price,
  area,
  rooms,
  bathrooms,
  style,
  popular = false,
  onViewDetails,
  onFavorite,
}: ProductCardProps) => {
  const [isFavorited, setIsFavorited] = useState(false);

  const handleFavorite = () => {
    setIsFavorited(!isFavorited);
    onFavorite?.();
  };

  return (
    <Card 
      variant="surface" 
      padding="none"
      className="overflow-hidden flex flex-col group card-hover-glow"
    >
      {/* Image Container */}
      <div className="subblock-media subblock-media-fade relative aspect-[4/3]">
        <img 
          src={image} 
          alt={title}
          className="subblock-media__image"
        />
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {popular && (
            <span className="px-3 py-1 rounded-full bg-[#ff563f] text-white text-sm font-medium">
              Популярная
            </span>
          )}
          {style && (
            <span className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-sm text-[#161b21] text-sm font-medium">
              {style}
            </span>
          )}
        </div>

        {/* Favorite Button */}
        <button
          onClick={handleFavorite}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/95 backdrop-blur-sm flex items-center justify-center transition-default hover:bg-white"
          aria-label="Add to favorites"
        >
          <Heart 
            size={20} 
            className={clsx(
              'transition-colors',
              isFavorited ? 'fill-[#ff563f] text-[#ff563f]' : 'text-[#161b21]'
            )}
          />
        </button>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col gap-4 flex-1">
        {/* Title & Description */}
        <div className="flex flex-col gap-2">
          <h3 className="text-2xl font-semibold text-[#161b21] leading-tight">
            {title}
          </h3>
          <p className="text-base text-[#737a82] leading-normal line-clamp-2">
            {description}
          </p>
        </div>

        {/* Specs */}
        <div className="grid grid-cols-3 gap-3">
          <div className="flex items-center gap-2">
            <Maximize2 size={18} className="text-[#737a82]" />
            <div className="flex flex-col">
              <span className="text-sm text-[#737a82]">Площадь</span>
              <span className="text-base font-semibold text-[#161b21]">{area} м²</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Users size={18} className="text-[#737a82]" />
            <div className="flex flex-col">
              <span className="text-sm text-[#737a82]">Комнаты</span>
              <span className="text-base font-semibold text-[#161b21]">{rooms}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Bath size={18} className="text-[#737a82]" />
            <div className="flex flex-col">
              <span className="text-sm text-[#737a82]">Санузлы</span>
              <span className="text-base font-semibold text-[#161b21]">{bathrooms}</span>
            </div>
          </div>
        </div>

        {/* Price & CTA */}
        <div className="flex items-center justify-between pt-4 border-t border-[rgba(60,58,62,0.15)] mt-auto">
          <div className="flex flex-col">
            <span className="text-sm text-[#737a82]">Цена от</span>
            <span className="text-2xl font-bold text-[#161b21]">{price}</span>
          </div>
          <button
            onClick={onViewDetails}
            className="px-6 py-3 rounded-full bg-[#161b21] text-white font-medium text-base transition-default hover:opacity-90 btn-press"
          >
            Подробнее
          </button>
        </div>
      </div>
    </Card>
  );
};

export interface ProductCardCompactProps {
  image: string;
  title: string;
  area: number;
  price: string;
  onViewDetails?: () => void;
}

export const ProductCardCompact = ({
  image,
  title,
  area,
  price,
  onViewDetails,
}: ProductCardCompactProps) => {
  return (
    <Card 
      variant="surface" 
      padding="none"
      className="overflow-hidden flex items-center gap-4 group hover-lift cursor-pointer"
      onClick={onViewDetails}
    >
      <div className="subblock-media h-32 w-32 shrink-0">
        <img 
          src={image} 
          alt={title}
          className="subblock-media__image"
        />
      </div>
      <div className="flex-1 py-4 pr-6 flex flex-col gap-2">
        <h4 className="text-lg font-semibold text-[#161b21]">{title}</h4>
        <div className="flex items-center gap-4 text-sm text-[#737a82]">
          <span className="flex items-center gap-1">
            <Maximize2 size={14} />
            {area} м²
          </span>
          <span className="font-semibold text-[#161b21]">от {price}</span>
        </div>
      </div>
    </Card>
  );
};
