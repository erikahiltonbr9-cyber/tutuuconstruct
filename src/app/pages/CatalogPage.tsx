import { useState } from 'react';
import { Link } from 'react-router';
import { Section, SectionHeader } from '../components/Section';
import { ProductCard } from '../components/ProductCard';
import { FilterPanel, FilterOptions } from '../components/FilterPanel';
import { SortDropdown, SortOption } from '../components/SortDropdown';
import { Grid, List } from 'lucide-react';
import { clsx } from 'clsx';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useSiteContent } from '../context/SiteContentContext';

const categories = [
  { id: 'all', label: 'Все модели' },
  { id: 'small', label: 'Компактные (до 70 м²)' },
  { id: 'family', label: 'Семейные (70-120 м²)' },
  { id: 'premium', label: 'Премиум (120+ м²)' },
];

export const CatalogPage = () => {
  const { products: allProducts } = useSiteContent();
  const visibleProducts = allProducts.filter((product) => product.isActive !== false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortOption, setSortOption] = useState<SortOption>('popular');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filters, setFilters] = useState<FilterOptions>({
    priceRange: [0, 10000000],
    areaRange: [0, 300],
    rooms: [],
    styles: [],
  });

  const filterProducts = (products: typeof allProducts) => {
    return products.filter(product => {
      // Category filter
      if (activeCategory === 'small' && product.area > 70) return false;
      if (activeCategory === 'family' && (product.area < 70 || product.area > 120)) return false;
      if (activeCategory === 'premium' && product.area < 120) return false;

      // Price filter
      if (product.priceValue < filters.priceRange[0] || product.priceValue > filters.priceRange[1]) {
        return false;
      }

      // Area filter
      if (product.area < filters.areaRange[0] || product.area > filters.areaRange[1]) {
        return false;
      }

      // Rooms filter
      if (filters.rooms.length > 0 && !filters.rooms.includes(product.rooms)) {
        return false;
      }

      // Style filter
      if (filters.styles.length > 0 && !filters.styles.includes(product.style)) {
        return false;
      }

      return true;
    });
  };

  const sortProducts = (products: typeof allProducts) => {
    const sorted = [...products];
    switch (sortOption) {
      case 'price-low':
        return sorted.sort((a, b) => a.priceValue - b.priceValue);
      case 'price-high':
        return sorted.sort((a, b) => b.priceValue - a.priceValue);
      case 'area-low':
        return sorted.sort((a, b) => a.area - b.area);
      case 'area-high':
        return sorted.sort((a, b) => b.area - a.area);
      case 'popular':
        return sorted.sort((a, b) => (b.popular ? 1 : 0) - (a.popular ? 1 : 0));
      default:
        return sorted;
    }
  };

  const filteredProducts = sortProducts(filterProducts(visibleProducts));

  return (
    <>
      {/* Hero Section */}
      <Section variant="default" padding="lg">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <SectionHeader 
            title="Каталог модульных домов"
            subtitle="Выберите идеальный дом из нашей коллекции готовых проектов"
          />
        </div>
      </Section>

      {/* Category Tabs */}
      <Section variant="gray" padding="sm">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={clsx(
                  'px-6 py-3 rounded-full font-medium text-base transition-default',
                  activeCategory === category.id
                    ? 'bg-[#161b21] text-white'
                    : 'bg-white text-[#737a82] hover:bg-[#eaeeee]'
                )}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </Section>

      {/* Main Catalog Section */}
      <Section variant="default" padding="xl">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <FilterPanel
                  onFilterChange={setFilters}
                  onReset={() => {
                    setFilters({
                      priceRange: [0, 10000000],
                      areaRange: [0, 300],
                      rooms: [],
                      styles: [],
                    });
                  }}
                />
              </div>
            </div>

            {/* Products Grid */}
            <div className="lg:col-span-3">
              {/* Toolbar */}
              <div className="flex items-center justify-between mb-8">
                <p className="text-lg text-[#737a82]">
                  Найдено: <span className="font-semibold text-[#161b21]">{filteredProducts.length}</span> {filteredProducts.length === 1 ? 'дом' : 'домов'}
                </p>
                <div className="flex items-center gap-4">
                  {/* View Toggle */}
                  <div className="flex items-center gap-2 bg-[#eaeeee] rounded-full p-1">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={clsx(
                        'p-2 rounded-full transition-default',
                        viewMode === 'grid' ? 'bg-white' : 'hover:bg-white/50'
                      )}
                      aria-label="Grid view"
                    >
                      <Grid size={18} className="text-[#161b21]" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={clsx(
                        'p-2 rounded-full transition-default',
                        viewMode === 'list' ? 'bg-white' : 'hover:bg-white/50'
                      )}
                      aria-label="List view"
                    >
                      <List size={18} className="text-[#161b21]" />
                    </button>
                  </div>

                  {/* Sort Dropdown */}
                  <SortDropdown value={sortOption} onChange={setSortOption} />
                </div>
              </div>

              {/* Products */}
              {filteredProducts.length > 0 ? (
                <div className={clsx(
                  viewMode === 'grid' 
                    ? 'grid grid-cols-1 md:grid-cols-2 gap-6'
                    : 'flex flex-col gap-4'
                )}>
                  {filteredProducts.map(product => (
                    <Link key={product.id} to={`/catalog/${product.slug}`} className="block">
                      <ProductCard
                        id={product.id}
                        image={product.images[0].url}
                        title={product.name}
                        description={product.tagline}
                        price={product.price}
                        area={product.area}
                        rooms={product.rooms}
                        bathrooms={product.bathrooms}
                        style={product.style}
                        popular={product.popular}
                        onViewDetails={() => {}}
                        onFavorite={() => console.log('Favorite:', product.id)}
                      />
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <p className="text-xl text-[#737a82]">
                    По вашему запросу ничего не найдено. Попробуйте изменить фильтры.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <Section variant="gray" padding="xl">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 text-center">
          <div className="flex flex-col gap-6 items-center">
            <h2 className="text-4xl font-semibold text-[#161b21] leading-tight heading-animate">
              Не нашли подходящий проект?
            </h2>
            <p className="text-xl text-[#737a82] leading-normal max-w-2xl paragraph-animate">
              Мы разработаем индивидуальный проект модульного дома под ваши требования и бюджет
            </p>
            <button className="px-8 py-4 rounded-full bg-[#161b21] text-white font-medium text-xl transition-default hover:opacity-90 button-lift-hover animate-delay-400">
              Заказать индивидуальный проект
            </button>
          </div>
        </div>
      </Section>
    </>
  );
};