import { Card } from './Card';
import { clsx } from 'clsx';
import { MapPin, Calendar, ArrowRight } from 'lucide-react';

export interface CompletedProjectCardProps {
  image: string;
  title: string;
  location: string;
  year: string;
  area: string;
  category: string;
  onClick?: () => void;
}

export const CompletedProjectCard = ({
  image,
  title,
  location,
  year,
  area,
  category,
  onClick,
}: CompletedProjectCardProps) => {
  return (
    <Card
      variant="default"
      padding="none"
      hover
      className="overflow-hidden flex flex-col group border border-[rgba(60,58,62,0.08)]"
    >
      {/* Image */}
      <div className="subblock-media subblock-media-fade relative aspect-[16/10]">
        <img
          src={image}
          alt={title}
          className="subblock-media__image"
        />
        <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/95 backdrop-blur-sm text-[#161b21] text-sm font-medium">
          {category}
        </span>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col gap-3">
        <h3 className="text-xl font-semibold text-[#161b21]">{title}</h3>
        <div className="flex flex-wrap items-center gap-4 text-sm text-[#737a82]">
          <span className="flex items-center gap-1.5">
            <MapPin size={14} />
            {location}
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar size={14} />
            {year}
          </span>
          <span>{area}</span>
        </div>
        {onClick && (
          <button
            onClick={onClick}
            className="inline-flex items-center gap-2 text-base font-medium text-[#161b21] transition-default group-hover:gap-3 mt-1"
          >
            Смотреть проект <ArrowRight size={16} />
          </button>
        )}
      </div>
    </Card>
  );
};
