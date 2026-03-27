import { Link } from 'react-router';
import {
  ArrowRight,
  House,
  Clock3,
  Leaf,
  Shield,
} from 'lucide-react';
import { formatPhoneHref, useSiteContent } from '../context/SiteContentContext';

const benefits = [
  {
    title: 'Быстрое строительство',
    description: 'Возведение дома за 2-3 месяца благодаря заводской сборке модулей',
    icon: Clock3,
    iconBg: 'bg-[#fff5f3]',
    iconColor: 'text-[#ff563f]',
  },
  {
    title: 'Экологичность',
    description: 'Используем сертифицированные экологичные материалы и технологии',
    icon: Leaf,
    iconBg: 'bg-[#f0fdf4]',
    iconColor: 'text-[#22c55e]',
  },
  {
    title: 'Гарантия 15 лет',
    description: 'Расширенная гарантия на конструкцию, кровлю и инженерные системы',
    icon: Shield,
    iconBg: 'bg-[#eff6ff]',
    iconColor: 'text-[#3b82f6]',
  },
];

const processSteps = [
  {
    number: '1',
    title: 'Консультация',
    description: 'Бесплатная консультация и подбор оптимального проекта',
  },
  {
    number: '2',
    title: 'Проектирование',
    description: 'Разработка проекта с учётом ваших пожеланий и участка',
  },
  {
    number: '3',
    title: 'Производство',
    description: 'Заводская сборка модулей с контролем качества',
  },
  {
    number: '4',
    title: 'Монтаж и сдача',
    description: 'Доставка на участок, монтаж и подключение коммуникаций',
  },
];

const testimonials = [
  {
    quote:
      '"Дом собрали за 2.5 месяца. Качество отличное, все коммуникации работают безупречно. Очень довольны результатом!"',
    name: 'Алексей Петров',
    role: 'Москва, M-100',
  },
  {
    quote:
      '"Профессиональная команда, прозрачные цены. Дом получился тёплый и уютный. Рекомендую МодульДом всем друзьям!"',
    name: 'Мария Соколова',
    role: 'Санкт-Петербург, M-60',
  },
];

const Tag = ({ children }: { children: React.ReactNode }) => (
  <div className="inline-flex items-center rounded-full bg-[#fff5f3] px-4 py-1.5">
    <span className="text-[13px] font-semibold text-[#ff563f]">{children}</span>
  </div>
);

const ModelCard = ({
  image,
  name,
  specs,
  price,
}: {
  image: string;
  name: string;
  specs: string;
  price: string;
}) => (
  <article className="subblock-hover h-full overflow-hidden rounded-[22px] border border-[#ececf1] bg-white shadow-[0_10px_30px_rgba(17,24,39,0.04)]">
    <div className="subblock-media subblock-media-fade relative aspect-[4/3]">
      <img
        src={image}
        alt={name}
        className="subblock-media__image"
      />
      <div className="absolute left-3 top-3 inline-flex items-center rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-[#161b21]">
        Популярная модель
      </div>
    </div>

    <div className="flex h-[calc(100%-0px)] flex-col gap-4 p-5 sm:p-6">
      <div className="space-y-2">
        <h3 className="text-[22px] font-semibold leading-tight text-[#161b21]">{name}</h3>
        <p className="text-sm text-[#737a82]">{specs}</p>
      </div>

      <div className="mt-auto flex items-center justify-between gap-3 border-t border-[#f1f2f4] pt-4">
        <p className="text-[24px] font-bold leading-none text-[#ff563f]">{price}</p>
        <span className="inline-flex items-center gap-1 rounded-full bg-[#161b21] px-3 py-1.5 text-xs font-semibold text-white">
          Подробнее
          <ArrowRight size={14} />
        </span>
      </div>
    </div>
  </article>
);

export const LandingPage = () => {
  const { landingContent, products, siteSettings } = useSiteContent();
  const activeProducts = products.filter((product) => product.isActive !== false);
  const featuredModels = activeProducts.filter((product) => product.featured).slice(0, 3);
  const modelsForShowcase = featuredModels.length > 0 ? featuredModels : activeProducts.slice(0, 3);

  return (
    <div className="bg-[#fbfbfb]">
      <section className="px-5 py-12 sm:px-8 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_540px] lg:items-center lg:gap-[60px]">
          <div className="flex flex-col gap-8">
            <div className="inline-flex w-fit items-center gap-2 rounded-full bg-[#eaeeee] px-4 py-2">
              <House size={16} className="text-[#ff563f]" />
              <span className="text-[13px] font-medium text-[#161b21]">{landingContent.badge}</span>
            </div>

            <h1 className="whitespace-pre-line text-[42px] font-semibold leading-[1.1] text-[#161b21] sm:text-[56px]">
              {landingContent.heroTitle}
            </h1>

            <p className="max-w-[520px] text-base leading-[1.6] text-[#737a82] sm:text-[18px]">
              {landingContent.heroDescription}
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                to="/catalog"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#ff563f] to-[#ff563f] px-8 py-4 text-base font-semibold text-white"
              >
                {landingContent.primaryCtaLabel}
                <ArrowRight size={18} />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center rounded-xl border border-[#e0e0e0] bg-white px-8 py-4 text-base font-medium text-[#161b21]"
              >
                {landingContent.secondaryCtaLabel}
              </Link>
            </div>

            <div className="flex flex-wrap gap-8 sm:gap-12">
              <div>
                <p className="text-[32px] font-bold text-[#161b21]">{landingContent.statHomes}</p>
                <p className="text-[13px] text-[#737a82]">Построенных домов</p>
              </div>
              <div>
                <p className="text-[32px] font-bold text-[#161b21]">{landingContent.statBuildTime}</p>
                <p className="text-[13px] text-[#737a82]">Срок строительства</p>
              </div>
              <div>
                <p className="text-[32px] font-bold text-[#161b21]">{landingContent.statWarranty}</p>
                <p className="text-[13px] text-[#737a82]">Гарантия</p>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-[24px]">
            <img
              src="https://images.unsplash.com/photo-1768637087224-cffa17561c53?w=1080"
              alt="Модульный дом"
              className="h-[360px] w-full object-cover sm:h-[480px]"
            />
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-12">
          <div className="flex flex-col items-center gap-4 text-center">
            <Tag>Преимущества</Tag>
            <h2 className="text-[32px] font-semibold leading-tight text-[#161b21] sm:text-[40px]">
              Почему выбирают нас
            </h2>
            <p className="max-w-[500px] text-[17px] text-[#737a82]">
              Современные технологии и отлаженные процессы для вашего идеального дома
            </p>
          </div>

          <div className="grid w-full gap-6 md:grid-cols-3">
            {benefits.map((item) => {
              const Icon = item.icon;
              return (
                <article
                  key={item.title}
                  className="rounded-[20px] border border-[#f0f0f0] bg-white p-8"
                >
                  <div className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl ${item.iconBg}`}>
                    <Icon size={22} className={item.iconColor} />
                  </div>
                  <h3 className="mb-3 text-[20px] font-semibold text-[#161b21]">{item.title}</h3>
                  <p className="text-[15px] leading-[1.5] text-[#737a82]">{item.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#f8f9fa] px-5 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto flex max-w-7xl flex-col gap-12">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex flex-col gap-4">
              <Tag>Каталог</Tag>
              <h2 className="text-[32px] font-semibold leading-tight text-[#161b21] sm:text-[40px]">
                {landingContent.featuredTitle}
              </h2>
            </div>
            <Link
              to="/catalog"
              className="inline-flex w-fit items-center gap-2 rounded-xl border border-[#e0e0e0] bg-white px-5 py-3 text-sm font-medium text-[#161b21]"
            >
              Весь каталог
              <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {modelsForShowcase.map((model) => (
              <Link key={model.id} to={`/catalog/${model.slug}`} className="group block h-full">
                <ModelCard
                  image={model.images[0]?.url ?? 'https://images.unsplash.com/photo-1768637087224-cffa17561c53?w=900'}
                  name={model.name}
                  specs={`${model.area} м² · ${model.bedrooms} спальни · ${model.bathrooms} санузла`}
                  price={`от ${model.price}`}
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#161b21] px-5 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-12">
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="inline-flex rounded-full bg-[#2a3240] px-4 py-1.5">
              <span className="text-[13px] font-semibold text-[#ff563f]">Как мы работаем</span>
            </div>
            <h2 className="text-[32px] font-semibold leading-tight text-white sm:text-[40px]">
              {landingContent.processTitle}
            </h2>
          </div>

          <div className="grid w-full gap-8 md:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step) => (
              <article key={step.number} className="flex flex-col items-center gap-4 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#ff563f] to-[#ff563f] text-lg font-semibold text-white">
                  {step.number}
                </div>
                <h3 className="text-[18px] font-semibold text-white">{step.title}</h3>
                <p className="max-w-[220px] text-sm text-[#737a82]">{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-12">
          <div className="flex flex-col items-center gap-4 text-center">
            <Tag>Отзывы</Tag>
            <h2 className="text-[32px] font-semibold leading-tight text-[#161b21] sm:text-[40px]">
              {landingContent.testimonialsTitle}
            </h2>
          </div>

          <div className="flex w-full gap-6 overflow-x-auto pb-2">
            {testimonials.map((item, index) => (
              <article
                key={item.name}
                className="min-w-[320px] flex-1 rounded-[20px] border border-[#f0f0f0] bg-white p-8"
              >
                <p className="mb-5 text-lg text-[#f59e0b]">★★★★★</p>
                <p className="mb-6 text-[15px] leading-[1.6] text-[#161b21]">{item.quote}</p>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-[#eaeeee]" />
                  <div>
                    <p className="text-sm font-semibold text-[#161b21]">{item.name}</p>
                    <p className="text-[13px] text-[#737a82]">{item.role}</p>
                  </div>
                </div>
                {index === 0 && <span className="sr-only">Первый отзыв</span>}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-[#ff563f] to-[#ff563f] px-5 py-20 sm:px-8">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-8 text-center">
          <h2 className="text-[36px] font-semibold leading-tight text-white sm:text-[44px]">
            {landingContent.ctaTitle}
          </h2>
          <p className="max-w-[500px] text-[18px] text-[#a1a1aa]">
            {landingContent.ctaDescription}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#ff563f] to-[#ff563f] px-10 py-4 text-base font-semibold text-white"
            >
              {landingContent.ctaButtonLabel}
              <ArrowRight size={18} />
            </Link>
            <a
              href={formatPhoneHref(siteSettings.phone)}
              className="inline-flex items-center rounded-xl border border-white/25 px-10 py-4 text-base font-medium text-white"
            >
              {siteSettings.phone}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

