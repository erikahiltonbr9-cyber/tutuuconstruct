import { Star } from 'lucide-react';
import { Card } from './Card';

export interface TestimonialCardProps {
  name: string;
  avatar?: string;
  rating: number;
  date: string;
  text: string;
  logo?: React.ReactNode;
}

export const TestimonialCard = ({
  name,
  avatar,
  rating,
  date,
  text,
  logo,
}: TestimonialCardProps) => {
  return (
    <Card variant="surface" padding="lg" className="flex flex-col gap-5 h-full card-hover-lift">
      <div className="flex flex-col gap-5">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-15 h-15 rounded-full bg-[#bbbebe] overflow-hidden">
            {avatar ? (
              <img src={avatar} alt={name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-white text-xl font-semibold">
                {name.charAt(0)}
              </div>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-xl font-semibold text-[#1a1e25]">{name}</p>
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star
                  key={index}
                  size={13}
                  className={index < rating ? 'fill-[#ffcd05] text-[#ffcd05]' : 'fill-[#bbbebe] text-[#bbbebe]'}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Review Text */}
        <p className="text-base leading-normal text-[#1a1e25]">{text}</p>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-auto">
        <p className="text-base text-[#1a1e25] opacity-50">{date}</p>
        {logo && <div className="w-6 h-6">{logo}</div>}
      </div>
    </Card>
  );
};
