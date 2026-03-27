import { useParams, Link, Navigate } from 'react-router';
import {
  ArrowRight, Download, ChevronDown, ChevronRight, Send,
  Maximize2, Home, Bed, Bath, Layers, Clock, Package, Shield, Zap,
  Leaf, Settings, Flame, Award, CircleCheck,
  Phone, Calculator, FileText,
} from 'lucide-react';
import { Section } from '../components/Section';
import { ProductCard } from '../components/ProductCard';
import { useState } from 'react';
import { clsx } from 'clsx';
import { useSiteContent } from '../context/SiteContentContext';

type GalleryTab = 'all' | 'exterior' | 'interior' | 'plan';

const galleryTabs: { key: GalleryTab; label: string }[] = [
  { key: 'all', label: 'Все фото' },
  { key: 'exterior', label: 'Экстерьер' },
  { key: 'interior', label: 'Интерьер' },
  { key: 'plan', label: 'Планировка' },
];

const specItems = (product: { area: number; rooms: number; bedrooms: number; bathrooms: number; floors: number; buildTime: string; materials: string; warranty: string }) => [
  { label: 'Общая площадь', value: `${product.area} м²`, icon: <Maximize2 size={22} />, bg: 'bg-red-50', iconColor: 'text-red-500' },
  { label: 'Комнат', value: `${product.rooms} комнат`, icon: <Home size={22} />, bg: 'bg-blue-50', iconColor: 'text-blue-500' },
  { label: 'Спален', value: `${product.bedrooms} спальни`, icon: <Bed size={22} />, bg: 'bg-purple-50', iconColor: 'text-purple-500' },
  { label: 'Санузлов', value: `${product.bathrooms} санузла`, icon: <Bath size={22} />, bg: 'bg-green-50', iconColor: 'text-green-500' },
  { label: 'Этажей', value: `${product.floors} этажа`, icon: <Layers size={22} />, bg: 'bg-amber-50', iconColor: 'text-amber-500' },
  { label: 'Срок сборки', value: product.buildTime, icon: <Clock size={22} />, bg: 'bg-pink-50', iconColor: 'text-pink-500' },
  { label: 'Материалы', value: product.materials, icon: <Package size={22} />, bg: 'bg-indigo-50', iconColor: 'text-indigo-500' },
  { label: 'Энергокласс', value: 'A+ класс', icon: <Zap size={22} />, bg: 'bg-teal-50', iconColor: 'text-teal-500' },
  { label: 'Гарантия', value: product.warranty, icon: <Shield size={22} />, bg: 'bg-orange-50', iconColor: 'text-orange-500' },
];

const featureCards = [
  { title: 'Экологичные материалы', desc: 'Натуральные и безопасные материалы для здоровья', icon: <Leaf size={22} />, bg: 'bg-green-50', iconColor: 'text-green-600' },
  { title: 'Быстрая сборка', desc: 'Монтаж дома за минимальные сроки', icon: <Zap size={22} />, bg: 'bg-blue-50', iconColor: 'text-blue-600' },
  { title: 'Индивидуальная планировка', desc: 'Адаптируем проект под ваши потребности', icon: <Settings size={22} />, bg: 'bg-purple-50', iconColor: 'text-purple-600' },
  { title: 'Энергосбережение A+', desc: 'Минимальные расходы на отопление', icon: <Flame size={22} />, bg: 'bg-red-50', iconColor: 'text-red-600' },
  { title: 'Гарантия качества', desc: 'Полная гарантия на конструкцию и системы', icon: <Award size={22} />, bg: 'bg-amber-50', iconColor: 'text-amber-600' },
];

const includedItems = [
  'Фундамент свайно-винтовой',
  'Каркас и стеновые панели',
  'Кровля с утеплением',
  'Окна и двери',
  'Внутренняя отделка',
  'Электропроводка',
  'Водоснабжение и канализация',
  'Отопление',
];

const faqItems = [
  {
    question: 'Сколько времени занимает строительство?',
    answer: 'Полный цикл строительства занимает 45 рабочих дней с момента начала работ на участке. Заводское производство модулей — дополнительные 30 дней. Итого от заказа до заселения — около 3 месяцев.',
  },
  {
    question: 'Можно ли изменить планировку?',
    answer: 'Да, мы можем адаптировать планировку под ваши требования. Вы можете изменить расположение комнат, добавить или убрать перегородки, изменить размеры помещений.',
  },
  {
    question: 'Какие гарантии вы предоставляете?',
    answer: 'Мы даём гарантию на несущую конструкцию и 5 лет на инженерные системы. Также предоставляем гарантийное обслуживание в течение всего срока гарантии.',
  },
  {
    question: 'Можно ли получить ипотеку на модульный дом?',
    answer: 'Да, наши дома подходят для ипотечного кредитования. Мы сотрудничаем с ведущими банками и поможем подобрать оптимальную программу.',
  },
  {
    question: 'Подходит ли дом для круглогодичного проживания?',
    answer: 'Безусловно. Все наши дома спроектированы для круглогодичного проживания с утеплением класса A+ и системой отопления.',
  },
];

const floorRooms = [
  { name: 'Гостиная', area: '28 м²', color: 'bg-blue-500' },
  { name: 'Кухня-столовая', area: '22 м²', color: 'bg-green-500' },
  { name: 'Прихожая', area: '10 м²', color: 'bg-amber-500' },
  { name: 'Санузел', area: '5 м²', color: 'bg-purple-500' },
  { name: 'Техническое помещение', area: '3 м²', color: 'bg-gray-500' },
];

export const ProductDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { products } = useSiteContent();
  const [galleryTab, setGalleryTab] = useState<GalleryTab>('all');
  const [activeFloor, setActiveFloor] = useState(0);
  const [openFaq, setOpenFaq] = useState(0);
  const [heroImageIndex, setHeroImageIndex] = useState(0);

  const product = slug ? products.find((item) => item.slug === slug) : undefined;

  if (!product || product.isActive === false) {
    return <Navigate to="/catalog" replace />;
  }

  const relatedProducts = products
    .filter((item) => item.id !== product.id && item.isActive !== false)
    .slice(0, 3);
  const filteredImages = galleryTab === 'all'
    ? product.images
    : product.images.filter(img => img.category === galleryTab);
  const downloadableFiles = product.downloadableFiles ?? [];

  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-[#f8f9fa]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-4">
          <div className="flex items-center gap-2 text-sm text-[#737a82]">
            <Link to="/" className="hover:text-[#161b21] transition-colors">Главная</Link>
            <span>/</span>
            <Link to="/catalog" className="hover:text-[#161b21] transition-colors">Каталог</Link>
            <span>/</span>
            <span className="text-[#161b21] font-medium">{product.name}</span>
          </div>
        </div>
      </div>

      {/* Hero Section — Image LEFT, Info RIGHT */}
      <section className="bg-[#fbfbfb] py-10 sm:py-16">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="flex flex-col lg:flex-row gap-10 items-stretch">
            {/* Image */}
            <div className="flex-1 min-w-0">
              <div className="relative w-full h-[360px] sm:h-[480px] lg:h-full min-h-[400px] rounded-[20px] overflow-hidden bg-gradient-to-br from-[#d4c4a8] to-[#c8b898]">
                <img
                  src={product.images[heroImageIndex]?.url}
                  alt={product.images[heroImageIndex]?.alt}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-4 left-4 px-3 py-1.5 rounded-lg bg-black/50 text-white text-sm font-medium backdrop-blur-sm">
                  {heroImageIndex + 1}/{product.images.length}
                </div>
              </div>
            </div>

            {/* Info */}
            <div className="lg:w-[480px] shrink-0 flex flex-col gap-6">
              {product.popular && (
                <span className="px-4 py-1.5 rounded-full bg-[#ff563f]/10 text-[#ff563f] text-sm font-semibold w-fit">
                  Бестселлер
                </span>
              )}
              <h1 className="text-[40px] sm:text-[44px] font-bold text-[#161b21] leading-[1.1]">
                {product.name}
              </h1>
              <p className="text-base text-[#737a82] leading-relaxed">
                {product.tagline}
              </p>

              {/* Price Block */}
              <div className="flex flex-col gap-1 pt-2">
                <span className="text-sm text-[#737a82]">Стоимость от</span>
                <span className="text-[36px] font-bold text-[#161b21] leading-tight">{product.price}</span>
                <span className="text-sm text-[#737a82]">
                  от {Math.round(product.priceValue / product.area).toLocaleString()} ₽/м² в рассрочку
                </span>
              </div>

              {/* CTA Buttons */}
              <div className="flex gap-3 pt-2">
                <Link to="/contact" className="flex-1">
                  <button className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#ff563f] to-[#e04030] text-white font-semibold text-[15px] hover:opacity-90 transition-opacity">
                    Запросить расчёт
                    <ArrowRight size={18} />
                  </button>
                </Link>
                <button className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border-2 border-[#e0e0e0] text-[#161b21] font-semibold text-[15px] hover:bg-[#f5f5f5] transition-colors">
                  Конфигуратор
                </button>
              </div>

              {/* Quick Stats */}
              <div className="flex gap-3 pt-2">
                <div className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#f0f0f0]">
                  <Maximize2 size={16} className="text-[#737a82]" />
                  <span className="text-sm font-medium text-[#161b21]">{product.area} м²</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#f0f0f0]">
                  <Bed size={16} className="text-[#737a82]" />
                  <span className="text-sm font-medium text-[#161b21]">{product.bedrooms} спальни</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#f0f0f0]">
                  <Layers size={16} className="text-[#737a82]" />
                  <span className="text-sm font-medium text-[#161b21]">{product.floors} этажа</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Image Gallery with Tabs */}
      <Section variant="default" padding="lg">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <h2 className="text-[32px] font-bold text-[#161b21]">Галерея проекта</h2>
            <div className="flex items-center bg-[#f0f0f0] rounded-full p-1">
              {galleryTabs.map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setGalleryTab(tab.key)}
                  className={clsx(
                    'px-4 py-2 rounded-full text-sm font-medium transition-all',
                    galleryTab === tab.key
                      ? 'bg-white text-[#161b21] shadow-sm'
                      : 'text-[#737a82] hover:text-[#161b21]'
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {filteredImages.slice(0, 9).map((image, index) => (
              <div
                key={index}
                className={clsx(
                  'relative rounded-2xl overflow-hidden bg-[#eaeeee] group cursor-pointer',
                  index < 3 ? 'aspect-[4/3]' : index < 6 ? 'aspect-[4/3]' : 'aspect-[3/2]'
                )}
                onClick={() => setHeroImageIndex(product.images.indexOf(image))}
              >
                <img
                  src={image.url}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-md bg-black/40 text-white text-xs font-medium backdrop-blur-sm">
                  {image.alt}
                </div>
              </div>
            ))}
          </div>

          {/* Gallery Footer */}
          {filteredImages.length > 9 && (
            <div className="flex items-center justify-center gap-4 mt-6">
              <span className="text-sm text-[#737a82]">
                Показано 9 из {filteredImages.length} фотографий
              </span>
              <button className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#e0e0e0] text-sm font-medium text-[#161b21] hover:bg-[#f5f5f5] transition-colors">
                Смотреть все
                <ArrowRight size={16} />
              </button>
            </div>
          )}
        </div>
      </Section>

      {/* Specifications — 3×3 Colored Cards */}
      <section className="bg-[#f8f9fa] py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          {/* Header */}
          <div className="flex flex-col gap-4 mb-12">
            <span className="text-xs font-bold tracking-[0.15em] uppercase text-[#ff563f]">Характеристики</span>
            <h2 className="text-[36px] sm:text-[40px] font-bold text-[#161b21] leading-tight">
              Технические характеристики
            </h2>
            <p className="text-base text-[#737a82] max-w-2xl">
              Все ключевые параметры проекта {product.name} в удобном формате
            </p>
          </div>

          {/* 3×3 Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {specItems(product).map((spec, i) => (
              <div key={i} className={clsx('flex items-start gap-4 rounded-2xl p-5', spec.bg)}>
                <div className={clsx('w-11 h-11 rounded-xl flex items-center justify-center shrink-0', spec.bg, spec.iconColor)}>
                  {spec.icon}
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-sm text-[#737a82]">{spec.label}</span>
                  <span className="text-xl font-bold text-[#161b21]">{spec.value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Description & Features */}
      <Section variant="default" padding="xl">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          {/* Two-column: Description + Feature Cards */}
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Left — Description */}
            <div className="flex-1 flex flex-col gap-6">
              <span className="text-xs font-bold tracking-[0.15em] uppercase text-[#ff563f]">О проекте</span>
              <h2 className="text-[36px] sm:text-[40px] font-bold text-[#161b21] leading-tight">
                Описание модели
              </h2>
              <p className="text-base text-[#737a82] leading-relaxed">
                {product.description}
              </p>
              <p className="text-base text-[#737a82] leading-relaxed">
                Каждый элемент тщательно продуман для максимального комфорта и функциональности. 
                Высококачественные материалы обеспечивают долговечность и энергоэффективность строения.
              </p>
            </div>

            {/* Right — Feature Cards */}
            <div className="lg:w-[480px] shrink-0 flex flex-col gap-3">
              <h3 className="text-xl font-bold text-[#161b21] mb-2">Ключевые преимущества</h3>
              {featureCards.map((fc, i) => (
                <div key={i} className={clsx('flex items-start gap-4 rounded-2xl p-4', fc.bg)}>
                  <div className={clsx('w-10 h-10 rounded-xl flex items-center justify-center shrink-0', fc.iconColor, fc.bg)}>
                    {fc.icon}
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[15px] font-semibold text-[#161b21]">{fc.title}</span>
                    <span className="text-sm text-[#737a82]">{fc.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* What's Included */}
          <div className="mt-16 flex flex-col gap-6">
            <h3 className="text-[28px] font-bold text-[#161b21]">Что входит в стоимость</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-4">
              {includedItems.map((item, i) => (
                <div key={i} className="flex items-center gap-3 py-2">
                  <CircleCheck size={20} className="text-[#ff563f] shrink-0" />
                  <span className="text-base text-[#161b21]">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Floor Plan */}
      <section className="bg-[#f8f9fa] py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          {/* Header with Floor Tabs */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
            <h2 className="text-[36px] sm:text-[40px] font-bold text-[#161b21]">Планы этажей</h2>
            <div className="flex items-center bg-white rounded-full p-1 shadow-sm">
              {Array.from({ length: product.floors }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveFloor(i)}
                  className={clsx(
                    'px-5 py-2 rounded-full text-sm font-medium transition-all',
                    activeFloor === i
                      ? 'bg-[#161b21] text-white'
                      : 'text-[#737a82] hover:text-[#161b21]'
                  )}
                >
                  {i + 1} этаж
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-10">
            {/* Plan Image Placeholder */}
            <div className="flex-1 bg-white rounded-2xl flex items-center justify-center min-h-[400px] border border-[#e5e7eb]">
              <div className="flex flex-col items-center gap-4 text-[#bbb]">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="3" y="3" width="18" height="18" rx="2"/>
                  <line x1="3" y1="9" x2="21" y2="9"/>
                  <line x1="9" y1="3" x2="9" y2="21"/>
                </svg>
                <span className="text-sm font-medium">План {activeFloor + 1}-го этажа</span>
              </div>
            </div>

            {/* Room Breakdown */}
            <div className="lg:w-[360px] shrink-0 flex flex-col gap-6">
              <h3 className="text-xl font-bold text-[#161b21]">Помещения {activeFloor + 1}-го этажа</h3>
              <div className="flex flex-col gap-3">
                {floorRooms.map((room, i) => (
                  <div key={i} className="flex items-center justify-between py-3 border-b border-[#e5e7eb] last:border-0">
                    <div className="flex items-center gap-3">
                      <div className={clsx('w-3 h-3 rounded-full', room.color)} />
                      <span className="text-[15px] text-[#161b21]">{room.name}</span>
                    </div>
                    <span className="text-[15px] font-semibold text-[#161b21]">{room.area}</span>
                  </div>
                ))}
              </div>
              {downloadableFiles.length > 0 ? (
                <a
                  href={downloadableFiles[0].url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 w-full px-5 py-3 rounded-xl border-2 border-[#e0e0e0] text-[15px] font-semibold text-[#161b21] hover:bg-white transition-colors"
                >
                  <Download size={18} />
                  Скачать: {downloadableFiles[0].name}
                </a>
              ) : (
                <button
                  type="button"
                  disabled
                  className="flex items-center justify-center gap-2 w-full cursor-not-allowed px-5 py-3 rounded-xl border-2 border-[#e5e7eb] text-[15px] font-semibold text-[#a0a7b0]"
                >
                  <Download size={18} />
                  Файл пока не добавлен
                </button>
              )}

              {downloadableFiles.length > 1 && (
                <div className="flex flex-col gap-2 rounded-xl bg-white p-3">
                  {downloadableFiles.slice(1).map((file) => (
                    <a
                      key={file.id}
                      href={file.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-[#161b21] hover:text-[#ff563f]"
                    >
                      <FileText size={16} />
                      {file.name}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Related Houses */}
      {relatedProducts.length > 0 && (
        <Section variant="default" padding="xl">
          <div className="max-w-7xl mx-auto px-5 sm:px-8">
            <div className="flex items-center justify-between mb-10">
              <div className="flex flex-col gap-2">
                <span className="text-xs font-bold tracking-[0.15em] uppercase text-[#ff563f]">Похожие проекты</span>
                <h2 className="text-[36px] font-bold text-[#161b21]">Вам также может понравиться</h2>
              </div>
              <Link to="/catalog" className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#e0e0e0] text-sm font-medium text-[#161b21] hover:bg-[#f5f5f5] transition-colors">
                Все проекты
                <ChevronRight size={16} />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map(rp => (
                <Link key={rp.id} to={`/catalog/${rp.slug}`}>
                  <ProductCard
                    {...rp}
                    image={rp.images[0].url}
                    title={rp.name}
                    description={rp.tagline}
                    onViewDetails={() => {}}
                  />
                </Link>
              ))}
            </div>
          </div>
        </Section>
      )}

      {/* FAQ */}
      <section className="bg-[#f8f9fa] py-16 sm:py-24">
        <div className="max-w-3xl mx-auto px-5 sm:px-8">
          <div className="flex flex-col items-center text-center gap-4 mb-12">
            <span className="text-xs font-bold tracking-[0.15em] uppercase text-[#ff563f]">Вопросы и ответы</span>
            <h2 className="text-[36px] sm:text-[40px] font-bold text-[#161b21] leading-tight">
              Частые вопросы о модели {product.name.split(' ')[0]}
            </h2>
            <p className="text-base text-[#737a82]">
              Ответы на самые популярные вопросы о проекте
            </p>
          </div>

          <div className="flex flex-col">
            {faqItems.map((item, i) => (
              <div key={i} className="border-b border-[#e0e0e0]">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                  className="w-full flex items-center justify-between py-5 text-left group"
                >
                  <span className={clsx(
                    'text-lg font-semibold pr-4 transition-colors',
                    openFaq === i ? 'text-[#161b21]' : 'text-[#161b21] group-hover:text-[#ff563f]'
                  )}>
                    {item.question}
                  </span>
                  <ChevronDown
                    size={20}
                    className={clsx(
                      'shrink-0 transition-transform duration-300',
                      openFaq === i ? 'rotate-180 text-[#ff563f]' : 'text-[#737a82]'
                    )}
                  />
                </button>
                <div className={clsx(
                  'overflow-hidden transition-all duration-300',
                  openFaq === i ? 'max-h-40 pb-5' : 'max-h-0'
                )}>
                  <p className="text-base text-[#737a82] leading-relaxed">{item.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact / Inquiry Form */}
      <Section variant="default" padding="xl">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Left Info */}
            <div className="flex-1 flex flex-col gap-6">
              <span className="text-xs font-bold tracking-[0.15em] uppercase text-[#ff563f]">Запрос</span>
              <h2 className="text-[36px] sm:text-[40px] font-bold text-[#161b21] leading-tight">
                Заинтересовал этот проект?
              </h2>
              <p className="text-base text-[#737a82] leading-relaxed">
                Оставьте заявку и наш менеджер свяжется с вами в течение 30 минут для подробной консультации по проекту {product.name}.
              </p>
              <div className="flex flex-col gap-4 mt-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#f0f0f0] flex items-center justify-center">
                    <Phone size={20} className="text-[#161b21]" />
                  </div>
                  <span className="text-[15px] text-[#161b21]">Бесплатная консультация</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#f0f0f0] flex items-center justify-center">
                    <Calculator size={20} className="text-[#161b21]" />
                  </div>
                  <span className="text-[15px] text-[#161b21]">Индивидуальный расчёт стоимости</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#f0f0f0] flex items-center justify-center">
                    <FileText size={20} className="text-[#161b21]" />
                  </div>
                  <span className="text-[15px] text-[#161b21]">3D-визуализация вашего дома</span>
                </div>
              </div>
            </div>

            {/* Right Form */}
            <div className="lg:w-[520px] shrink-0 rounded-2xl border border-[#ececf1] bg-white p-8">
              <h3 className="text-2xl font-bold text-[#161b21] mb-6">Запросить расчёт</h3>
              <form className="flex flex-col gap-4" onSubmit={e => e.preventDefault()}>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-[#161b21]">Ваше имя</label>
                  <input
                    type="text"
                    placeholder="Введите ваше имя"
                    className="px-4 py-3 rounded-xl border border-[#e0e0e0] bg-white text-[15px] text-[#161b21] placeholder:text-[#bbb] focus:outline-none focus:ring-2 focus:ring-[#ff563f]/30 focus:border-[#ff563f] transition-all"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-[#161b21]">Телефон</label>
                  <input
                    type="tel"
                    placeholder="+7 (___) ___-__-__"
                    className="px-4 py-3 rounded-xl border border-[#e0e0e0] bg-white text-[15px] text-[#161b21] placeholder:text-[#bbb] focus:outline-none focus:ring-2 focus:ring-[#ff563f]/30 focus:border-[#ff563f] transition-all"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-[#161b21]">Email</label>
                  <input
                    type="email"
                    placeholder="example@mail.ru"
                    className="px-4 py-3 rounded-xl border border-[#e0e0e0] bg-white text-[15px] text-[#161b21] placeholder:text-[#bbb] focus:outline-none focus:ring-2 focus:ring-[#ff563f]/30 focus:border-[#ff563f] transition-all"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-[#161b21]">Комментарий</label>
                  <textarea
                    rows={3}
                    placeholder="Расскажите о ваших пожеланиях..."
                    className="px-4 py-3 rounded-xl border border-[#e0e0e0] bg-white text-[15px] text-[#161b21] placeholder:text-[#bbb] focus:outline-none focus:ring-2 focus:ring-[#ff563f]/30 focus:border-[#ff563f] transition-all resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 w-full px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#ff563f] to-[#e04030] text-white font-semibold text-[15px] hover:opacity-90 transition-opacity mt-2"
                >
                  <Send size={18} />
                  Отправить заявку
                </button>
                <p className="text-xs text-[#999] text-center mt-1">
                  Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
                </p>
              </form>
            </div>
          </div>
        </div>
      </Section>

      {/* CTA Section — Full-width Dark Gradient */}
      <section className="bg-gradient-to-r from-[#ff563f] to-[#ff563f] py-20 sm:py-28">
        <div className="max-w-3xl mx-auto px-5 sm:px-8 text-center">
          <h2 className="text-[36px] sm:text-[44px] font-bold text-white leading-tight mb-5">
            Готовы начать строительство?
          </h2>
          <p className="text-lg text-[#a1a1aa] leading-relaxed mb-10 max-w-xl mx-auto">
            Оставьте заявку и получите бесплатную консультацию и расчёт стоимости
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link to="/contact">
              <button className="flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-[#ff563f] to-[#e04030] text-white font-semibold text-[15px] hover:opacity-90 transition-opacity">
                Оставить заявку
                <ArrowRight size={18} />
              </button>
            </Link>
            <a href="tel:+78005553523">
              <button className="flex items-center gap-2 px-8 py-4 rounded-xl border-2 border-white/20 text-white font-semibold text-[15px] hover:bg-white/10 transition-colors">
                Позвонить нам
              </button>
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

