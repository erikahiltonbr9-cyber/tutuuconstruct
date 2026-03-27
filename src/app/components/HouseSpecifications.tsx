import { Maximize2, Home, Bed, Bath, Layers, Clock, Package, Shield } from 'lucide-react';
import { Card } from './Card';

export interface Specification {
  label: string;
  value: string;
  icon?: React.ReactNode;
}

export interface HouseSpecificationsProps {
  area: number;
  rooms: number;
  bedrooms: number;
  bathrooms: number;
  floors: number;
  buildTime: string;
  materials: string;
  warranty: string;
}

export const HouseSpecifications = ({
  area,
  rooms,
  bedrooms,
  bathrooms,
  floors,
  buildTime,
  materials,
  warranty,
}: HouseSpecificationsProps) => {
  const specs: Specification[] = [
    {
      label: 'Общая площадь',
      value: `${area} м²`,
      icon: <Maximize2 size={24} />,
    },
    {
      label: 'Количество комнат',
      value: rooms.toString(),
      icon: <Home size={24} />,
    },
    {
      label: 'Спален',
      value: bedrooms.toString(),
      icon: <Bed size={24} />,
    },
    {
      label: 'Санузлов',
      value: bathrooms.toString(),
      icon: <Bath size={24} />,
    },
    {
      label: 'Этажей',
      value: floors.toString(),
      icon: <Layers size={24} />,
    },
    {
      label: 'Срок строительства',
      value: buildTime,
      icon: <Clock size={24} />,
    },
    {
      label: 'Материалы',
      value: materials,
      icon: <Package size={24} />,
    },
    {
      label: 'Гарантия',
      value: warranty,
      icon: <Shield size={24} />,
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {specs.map((spec, index) => (
        <Card
          key={index}
          variant="surface"
          padding="lg"
          className="flex flex-col gap-3"
        >
          <div className="w-12 h-12 rounded-full bg-[#161b21] flex items-center justify-center">
            <div className="text-white">
              {spec.icon}
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-sm text-[#737a82]">{spec.label}</p>
            <p className="text-2xl font-semibold text-[#161b21]">{spec.value}</p>
          </div>
        </Card>
      ))}
    </div>
  );
};

export const SpecificationsTable = ({
  area,
  rooms,
  bedrooms,
  bathrooms,
  floors,
  buildTime,
  materials,
  warranty,
}: HouseSpecificationsProps) => {
  const specs = [
    { label: 'Общая площадь', value: `${area} м²` },
    { label: 'Жилая площадь', value: `${Math.round(area * 0.7)} м²` },
    { label: 'Количество комнат', value: rooms.toString() },
    { label: 'Спальни', value: bedrooms.toString() },
    { label: 'Санузлы', value: bathrooms.toString() },
    { label: 'Этажность', value: floors.toString() },
    { label: 'Высота потолков', value: '3.0 м' },
    { label: 'Срок строительства', value: buildTime },
    { label: 'Материал стен', value: materials },
    { label: 'Фундамент', value: 'Свайно-винтовой' },
    { label: 'Кровля', value: 'Гибкая черепица' },
    { label: 'Окна', value: 'Трёхкамерные ПВХ' },
    { label: 'Утепление', value: 'Минвата 200мм' },
    { label: 'Отопление', value: 'Электрический котёл + тёплый пол' },
    { label: 'Вентиляция', value: 'Приточно-вытяжная с рекуперацией' },
    { label: 'Гарантия', value: warranty },
  ];

  return (
    <Card variant="surface" padding="none" className="overflow-hidden">
      <div className="divide-y divide-[rgba(60,58,62,0.15)]">
        {specs.map((spec, index) => (
          <div
            key={index}
            className="grid grid-cols-2 gap-4 px-6 py-4 hover:bg-[#eaeeee] transition-colors"
          >
            <span className="text-base text-[#737a82]">{spec.label}</span>
            <span className="text-base font-semibold text-[#161b21]">{spec.value}</span>
          </div>
        ))}
      </div>
    </Card>
  );
};
