import { useCallback, useState } from 'react';
import { Card } from './Card';
import { ChevronDown, X } from 'lucide-react';
import { clsx } from 'clsx';

export interface FilterOptions {
  priceRange: [number, number];
  areaRange: [number, number];
  rooms: number[];
  styles: string[];
}

export interface FilterPanelProps {
  onFilterChange: (filters: FilterOptions) => void;
  onReset: () => void;
}

export const FilterPanel = ({ onFilterChange, onReset }: FilterPanelProps) => {
  const [filters, setFilters] = useState<FilterOptions>({
    priceRange: [0, 10000000],
    areaRange: [0, 300],
    rooms: [],
    styles: [],
  });

  const [expandedSections, setExpandedSections] = useState({
    price: true,
    area: true,
    rooms: true,
    style: true,
  });

  const pricePresets = [
    { label: 'до 2 млн', range: [0, 2000000] as [number, number] },
    { label: '2-4 млн', range: [2000000, 4000000] as [number, number] },
    { label: '4-6 млн', range: [4000000, 6000000] as [number, number] },
    { label: '6+ млн', range: [6000000, 10000000] as [number, number] },
  ];

  const PRICE_MIN = 0;
  const PRICE_MAX = 10000000;
  const PRICE_STEP = 100000;
  const PRICE_GAP = 100000;

  const formatPrice = (value: number): string => {
    if (value >= 1000000) return `${(value / 1000000).toFixed(value % 1000000 === 0 ? 0 : 1)} млн`;
    if (value >= 1000) return `${Math.round(value / 1000)}т`;
    return String(value);
  };

  const handlePriceSliderMin = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = Number(e.target.value);

    setFilters((prev) => {
      const nextMin = Math.min(Math.max(inputValue, PRICE_MIN), prev.priceRange[1] - PRICE_GAP);
      const next = { ...prev, priceRange: [nextMin, prev.priceRange[1]] as [number, number] };
      onFilterChange(next);
      return next;
    });
  }, [onFilterChange]);

  const handlePriceSliderMax = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = Number(e.target.value);

    setFilters((prev) => {
      const nextMax = Math.max(Math.min(inputValue, PRICE_MAX), prev.priceRange[0] + PRICE_GAP);
      const next = { ...prev, priceRange: [prev.priceRange[0], nextMax] as [number, number] };
      onFilterChange(next);
      return next;
    });
  }, [onFilterChange]);

  const handlePricePreset = (range: [number, number]) => {
    const newFilters = { ...filters, priceRange: range };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const styleOptions = [
    'Современный',
    'Классический',
    'Скандинавский',
    'Минимализм',
    'Эко-дом',
    'Барнхаус',
  ];

  const roomOptions = [1, 2, 3, 4, 5];

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const toggleStyle = (style: string) => {
    const newStyles = filters.styles.includes(style)
      ? filters.styles.filter(s => s !== style)
      : [...filters.styles, style];
    
    const newFilters = { ...filters, styles: newStyles };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const toggleRooms = (rooms: number) => {
    const newRooms = filters.rooms.includes(rooms)
      ? filters.rooms.filter(r => r !== rooms)
      : [...filters.rooms, rooms];
    
    const newFilters = { ...filters, rooms: newRooms };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleReset = () => {
    const resetFilters = {
      priceRange: [0, 10000000] as [number, number],
      areaRange: [0, 300] as [number, number],
      rooms: [],
      styles: [],
    };
    setFilters(resetFilters);
    onFilterChange(resetFilters);
    onReset();
  };

  const FilterSection = ({ 
    title, 
    section, 
    children 
  }: { 
    title: string; 
    section: keyof typeof expandedSections;
    children: React.ReactNode;
  }) => (
    <div className="border-b border-[rgba(60,58,62,0.15)] last:border-0">
      <button
        onClick={() => toggleSection(section)}
        className="w-full flex items-center justify-between py-4 text-left"
      >
        <span className="text-lg font-semibold text-[#161b21]">{title}</span>
        <ChevronDown
          size={20}
          className={clsx(
            'text-[#161b21] transition-transform',
            expandedSections[section] && 'rotate-180'
          )}
        />
      </button>
      <div
        className={clsx(
          'overflow-hidden transition-all duration-200',
          expandedSections[section] ? 'max-h-96 pb-4' : 'max-h-0'
        )}
      >
        {children}
      </div>
    </div>
  );

  return (
    <Card variant="surface" padding="lg" className="flex flex-col gap-0">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-semibold text-[#161b21]">Фильтры</h3>
        <button
          onClick={handleReset}
          className="flex items-center gap-2 text-sm text-[#737a82] hover:text-[#161b21] transition-default"
        >
          <X size={16} />
          Сбросить
        </button>
      </div>

      {/* Price Range */}
      <FilterSection title="Цена" section="price">
        <div className="flex flex-col gap-4">
          {/* Price preset buttons */}
          <div className="flex flex-wrap gap-2">
            {pricePresets.map((preset) => {
              const isActive = filters.priceRange[0] === preset.range[0] && filters.priceRange[1] === preset.range[1];
              return (
                <button
                  key={preset.label}
                  onClick={() => handlePricePreset(preset.range)}
                  className={clsx(
                    'px-3 py-1.5 rounded-full text-sm font-medium transition-default btn-press',
                    isActive
                      ? 'bg-[#161b21] text-white'
                      : 'bg-white border border-[rgba(60,58,62,0.15)] text-[#737a82] hover:bg-[#eaeeee] hover:text-[#161b21]'
                  )}
                >
                  {preset.label}
                </button>
              );
            })}
          </div>

          {/* Dual range slider */}
          <div className="relative pt-2 pb-1">
            {/* Track background */}
            <div className="absolute top-[18px] left-0 right-0 h-[6px] rounded-full bg-[#eaeeee]" />
            {/* Active range highlight */}
            <div
              className="absolute top-[18px] h-[6px] rounded-full bg-gradient-to-r from-[#ff563f] to-[#ff563f]"
              style={{
                left: `${((filters.priceRange[0] - PRICE_MIN) / (PRICE_MAX - PRICE_MIN)) * 100}%`,
                right: `${100 - ((filters.priceRange[1] - PRICE_MIN) / (PRICE_MAX - PRICE_MIN)) * 100}%`,
              }}
            />
            {/* Min slider */}
            <input
              type="range"
              min={PRICE_MIN}
              max={PRICE_MAX}
              step={PRICE_STEP}
              value={filters.priceRange[0]}
              onChange={handlePriceSliderMin}
              aria-label="Минимальная цена"
              className={clsx(
                'range-slider-thumb absolute w-full pointer-events-none appearance-none bg-transparent',
                filters.priceRange[0] > PRICE_MAX - PRICE_GAP * 2 ? 'z-30' : 'z-10'
              )}
              style={{ top: '10px' }}
            />
            {/* Max slider */}
            <input
              type="range"
              min={PRICE_MIN}
              max={PRICE_MAX}
              step={PRICE_STEP}
              value={filters.priceRange[1]}
              onChange={handlePriceSliderMax}
              aria-label="Максимальная цена"
              className="range-slider-thumb absolute w-full pointer-events-none appearance-none bg-transparent z-20"
              style={{ top: '10px' }}
            />
          </div>

          {/* Min/Max labels */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-[#161b21] bg-[#eaeeee] px-3 py-1 rounded-full">
              {formatPrice(filters.priceRange[0])} ₽
            </span>
            <span className="text-xs text-[#737a82]">—</span>
            <span className="text-sm font-medium text-[#161b21] bg-[#eaeeee] px-3 py-1 rounded-full">
              {formatPrice(filters.priceRange[1])} ₽
            </span>
          </div>
        </div>
      </FilterSection>

      {/* Area Range */}
      <FilterSection title="Площадь (м²)" section="area">
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm text-[#737a82]">От</label>
              <input
                type="number"
                placeholder="0"
                className="px-4 py-2 rounded-lg bg-white border border-[rgba(60,58,62,0.15)] text-base text-[#161b21]"
                value={filters.areaRange[0] || ''}
                onChange={(e) => {
                  const newFilters = {
                    ...filters,
                    areaRange: [Number(e.target.value), filters.areaRange[1]] as [number, number],
                  };
                  setFilters(newFilters);
                  onFilterChange(newFilters);
                }}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm text-[#737a82]">До</label>
              <input
                type="number"
                placeholder="300"
                className="px-4 py-2 rounded-lg bg-white border border-[rgba(60,58,62,0.15)] text-base text-[#161b21]"
                value={filters.areaRange[1] || ''}
                onChange={(e) => {
                  const newFilters = {
                    ...filters,
                    areaRange: [filters.areaRange[0], Number(e.target.value)] as [number, number],
                  };
                  setFilters(newFilters);
                  onFilterChange(newFilters);
                }}
              />
            </div>
          </div>
        </div>
      </FilterSection>

      {/* Number of Rooms */}
      <FilterSection title="Количество комнат" section="rooms">
        <div className="flex flex-wrap gap-2">
          {roomOptions.map((room) => (
            <button
              key={room}
              onClick={() => toggleRooms(room)}
              className={clsx(
                'px-4 py-2 rounded-lg font-medium text-base transition-default',
                filters.rooms.includes(room)
                  ? 'bg-[#161b21] text-white'
                  : 'bg-white border border-[rgba(60,58,62,0.15)] text-[#161b21] hover:bg-[#eaeeee]'
              )}
            >
              {room}
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Style */}
      <FilterSection title="Стиль" section="style">
        <div className="flex flex-col gap-2">
          {styleOptions.map((style) => (
            <label
              key={style}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={filters.styles.includes(style)}
                onChange={() => toggleStyle(style)}
                className="w-5 h-5 rounded border-2 border-[#161b21] text-[#161b21] focus:ring-2 focus:ring-[#161b21]/20"
              />
              <span className="text-base text-[#161b21] group-hover:opacity-70 transition-default">
                {style}
              </span>
            </label>
          ))}
        </div>
      </FilterSection>
    </Card>
  );
};

