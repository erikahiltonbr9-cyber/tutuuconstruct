import { Card } from './Card';
import { clsx } from 'clsx';

export interface MaterialCardProps {
  name: string;
  image?: string;
  description: string;
  properties: { label: string; value: string }[];
  eco?: boolean;
}

export const MaterialCard = ({
  name,
  image,
  description,
  properties,
  eco = false,
}: MaterialCardProps) => {
  return (
    <Card variant="surface" padding="none" className="overflow-hidden flex flex-col">
      {/* Image */}
      <div className="subblock-media relative aspect-[3/2] bg-[#d5d9d9]">
        {image ? (
          <img src={image} alt={name} className="subblock-media__image" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[#737a82] text-4xl font-light">
            {name.charAt(0)}
          </div>
        )}
        {eco && (
          <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#4caf50] text-white text-sm font-medium">
            Эко
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col gap-3 flex-1">
        <h4 className="text-xl font-semibold text-[#161b21]">{name}</h4>
        <p className="text-sm text-[#737a82] leading-normal">{description}</p>

        {/* Properties */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-auto pt-3 border-t border-[rgba(60,58,62,0.1)]">
          {properties.map((prop, index) => (
            <div key={index} className="flex flex-col">
              <span className="text-xs text-[#737a82]">{prop.label}</span>
              <span className="text-sm font-medium text-[#161b21]">{prop.value}</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};
