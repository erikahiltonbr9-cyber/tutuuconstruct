import { 
  Home, 
  Ruler, 
  Cog, 
  Truck,
  Hammer,
  Zap,
  Leaf,
  Shield,
  Clock,
  CheckCircle,
  ArrowRight,
  Wrench
} from 'lucide-react';
import { Section, SectionHeader } from '../components/Section';
import { Card } from '../components/Card';
import { FeatureCard } from '../components/FeatureCard';
import { Button } from '../components/Button';
import { Link } from 'react-router';

import { formatPhoneHref, useSiteContent } from '../context/SiteContentContext';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const services = [
  {
    icon: <Home size={32} />,
    title: 'Строительство под ключ',
    description: 'Полный цикл строительства от проектирования до сдачи готового дома с мебелью',
    features: ['Проект и разрешения', 'Фундамент', 'Сборка модулей', 'Отделка и коммуникации'],
  },
  {
    icon: <Ruler size={32} />,
    title: 'Индивидуальное проектирование',
    description: 'Разработка уникального проекта дома с учётом всех ваших пожеланий и особенностей участка',
    features: ['3D визуализация', 'Архитектурный проект', 'Конструктивные решения', 'Дизайн интерьера'],
  },
  {
    icon: <Cog size={32} />,
    title: 'Адаптация проектов',
    description: 'Изменение готовых проектов из каталога под ваши требования и бюджет',
    features: ['Изменение планировки', 'Увеличение площади', 'Замена материалов', 'Дополнительные опции'],
  },
  {
    icon: <Hammer size={32} />,
    title: 'Производство модулей',
    description: 'Изготовление домокомплектов на собственном заводе с высокоточным оборудованием',
    features: ['Заводской контроль качества', 'Точность изготовления', 'Сертифицированные материалы', 'Гарантия 15 лет'],
  },
  {
    icon: <Zap size={32} />,
    title: 'Умный дом',
    description: 'Проектирование и установка систем автоматизации для полного контроля над домом',
    features: ['Управление освещением', 'Климат-контроль', 'Безопасность', 'Энергомониторинг'],
  },
  {
    icon: <Leaf size={32} />,
    title: 'Энергоэффективность',
    description: 'Интеграция солнечных панелей, рекуператоров и систем энергосбережения',
    features: ['Солнечные панели', 'Рекуператор', 'Тепловой насос', 'Энергонезависимость'],
  },
];

const additionalServices = [
  {
    icon: <Truck size={24} />,
    title: 'Доставка модулей',
    description: 'Безопасная транспортировка модулей на ваш участок спецтранспортом',
  },
  {
    icon: <Wrench size={24} />,
    title: 'Сервисное обслуживание',
    description: 'Регулярное техническое обслуживание дома и инженерных систем',
  },
  {
    icon: <Shield size={24} />,
    title: 'Гарантийная поддержка',
    description: 'Гарантия 15 лет на конструкцию и 5 лет на все инженерные системы',
  },
];

export const ServicesPage = () => {
  const { siteSettings, mainPagesContent } = useSiteContent();
  const pageContent = mainPagesContent.services;
  const getBlock = (id: string) => pageContent.blocks.find((block) => block.id === id);
  const isBlockVisible = (id: string) => getBlock(id)?.isVisible !== false;
  const mainRef = useScrollAnimation({ threshold: 0.15 });
  const additionalRef = useScrollAnimation({ threshold: 0.2 });
  const processRef = useScrollAnimation({ threshold: 0.15 });
  const techRef = useScrollAnimation({ threshold: 0.15 });
  const benefitsRef = useScrollAnimation({ threshold: 0.15 });

  return (
    <>
      {/* Hero Section */}
      <Section variant="default" padding="xl" className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-mesh" />
        <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#eaeeee] mb-6 hero-badge">
              <Wrench size={16} className="text-[#ff563f]" />
              <span className="text-sm font-medium text-[#161b21]">{pageContent.badge}</span>
            </div>
            <h1 className="text-5xl sm:text-6xl font-semibold text-[#161b21] leading-tight mb-6 hero-title">
              {pageContent.heroTitle}
            </h1>
            <p className="text-xl text-[#737a82] leading-normal hero-subtitle">
              {pageContent.heroDescription}
            </p>
          </div>
        </div>
      </Section>

      {/* Main Services */}
      {isBlockVisible('main-services') && (
      <Section variant="gray" padding="xl">
        <div
          ref={mainRef.ref}
          className={`max-w-7xl mx-auto px-5 sm:px-8 scroll-fade-in ${mainRef.isVisible ? 'is-visible' : ''}`}
        >
          <SectionHeader 
            title={getBlock('main-services')?.title ?? 'Основные услуги'}
            subtitle={getBlock('main-services')?.description ?? 'Комплексные решения для строительства вашего дома'}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <Card
                key={index}
                variant={index === 4 ? 'gradient' : 'surface'}
                padding="lg"
                className="flex flex-col gap-5 card-hover-lift"
              >
                <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                  index === 4 ? 'bg-white/20' : 'bg-[#161b21]'
                }`}>
                  <div className="text-white">
                    {service.icon}
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <h3 className={`text-2xl font-semibold ${
                    index === 4 ? 'text-white' : 'text-[#161b21]'
                  }`}>
                    {service.title}
                  </h3>
                  <p className={`text-base leading-normal ${
                    index === 4 ? 'text-white/90' : 'text-[#737a82]'
                  }`}>
                    {service.description}
                  </p>
                </div>
                <ul className="flex flex-col gap-2 flex-1">
                  {service.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-center gap-2">
                      <CheckCircle 
                        size={16} 
                        className={index === 4 ? 'text-white' : 'text-[#161b21]'} 
                      />
                      <span className={`text-sm ${
                        index === 4 ? 'text-white/90' : 'text-[#737a82]'
                      }`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </Section>
      )}

      {/* Additional Services */}
      {isBlockVisible('additional-services') && (
      <Section variant="default" padding="xl">
        <div
          ref={additionalRef.ref}
          className={`max-w-7xl mx-auto px-5 sm:px-8 scroll-fade-in ${additionalRef.isVisible ? 'is-visible' : ''}`}
        >
          <SectionHeader 
            title={getBlock('additional-services')?.title ?? 'Дополнительные услуги'}
            subtitle={getBlock('additional-services')?.description ?? 'Полное сопровождение на всех этапах'}
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {additionalServices.map((service, index) => (
              <FeatureCard
                key={index}
                icon={service.icon}
                title={service.title}
                description={service.description}
              />
            ))}
          </div>
        </div>
      </Section>
      )}

      {/* Process */}
      {isBlockVisible('process') && (
      <Section variant="gray" padding="xl">
        <div
          ref={processRef.ref}
          className={`max-w-7xl mx-auto px-5 sm:px-8 scroll-fade-in ${processRef.isVisible ? 'is-visible' : ''}`}
        >
          <SectionHeader 
            title={getBlock('process')?.title ?? 'Процесс строительства'}
            subtitle={getBlock('process')?.description ?? 'От первой встречи до въезда в готовый дом'}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-8">
              {[
                {
                  number: '01',
                  title: 'Консультация и выбор проекта',
                  description: 'Встречаемся, обсуждаем ваши пожелания, показываем каталог и подбираем оптимальное решение',
                  time: '1-2 дня',
                },
                {
                  number: '02',
                  title: 'Проектирование и договор',
                  description: 'Создаём или адаптируем проект, делаем смету, заключаем договор с фиксированной ценой',
                  time: '5-10 дней',
                },
                {
                  number: '03',
                  title: 'Подготовка участка',
                  description: 'Проводим геодезическую съёмку, готовим площадку и возводим фундамент',
                  time: '2-3 недели',
                },
              ].map((step, index) => (
                <div key={index} className="flex gap-6">
                  <div className="shrink-0">
                    <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center">
                      <span className="text-xl font-bold text-white">{step.number}</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-3">
                      <h4 className="text-2xl font-semibold text-[#161b21]">{step.title}</h4>
                      <span className="px-3 py-1 rounded-full bg-[#eaeeee] text-xs font-medium text-[#737a82]">
                        {step.time}
                      </span>
                    </div>
                    <p className="text-base text-[#737a82] leading-normal">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="space-y-8">
              {[
                {
                  number: '04',
                  title: 'Производство модулей',
                  description: 'Изготавливаем модули на заводе с контролем качества на каждом этапе производства',
                  time: '4-6 недель',
                },
                {
                  number: '05',
                  title: 'Сборка на участке',
                  description: 'Доставляем модули и собираем дом на подготовленном фундаменте. Монтаж кровли и фасада',
                  time: '1-2 недели',
                },
                {
                  number: '06',
                  title: 'Финальные работы и сдача',
                  description: 'Подключаем коммуникации, проводим отделку, устанавливаем мебель. Сдаём готовый дом',
                  time: '2-4 недели',
                },
              ].map((step, index) => (
                <div key={index} className="flex gap-6">
                  <div className="shrink-0">
                    <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center">
                      <span className="text-xl font-bold text-white">{step.number}</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-3">
                      <h4 className="text-2xl font-semibold text-[#161b21]">{step.title}</h4>
                      <span className="px-3 py-1 rounded-full bg-[#eaeeee] text-xs font-medium text-[#737a82]">
                        {step.time}
                      </span>
                    </div>
                    <p className="text-base text-[#737a82] leading-normal">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-12 rounded-[30px] border border-[#ececf1] bg-white p-8 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Clock size={32} className="text-[#ff563f]" />
              <h3 className="text-3xl font-semibold text-[#161b21]">Итого: 3-4 месяца</h3>
            </div>
            <p className="text-lg text-[#737a82]">
              От подписания договора до въезда в готовый дом
            </p>
          </div>
        </div>
      </Section>
      )}

      {/* Technologies */}
      {isBlockVisible('technologies') && (
      <Section variant="default" padding="xl">
        <div
          ref={techRef.ref}
          className={`max-w-7xl mx-auto px-5 sm:px-8 scroll-fade-in ${techRef.isVisible ? 'is-visible' : ''}`}
        >
          <SectionHeader 
            title={getBlock('technologies')?.title ?? 'Технологии строительства'}
            subtitle={getBlock('technologies')?.description ?? 'Мы используем только проверенные решения'}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'SIP-панели', desc: 'Прочные энергоэффективные панели' },
              { title: 'Каркасная технология', desc: 'Быстрый монтаж и гибкость планировки' },
              { title: 'Немецкие окна', desc: 'Тройное остекление, низкая теплопотеря' },
              { title: 'Вентилируемый фасад', desc: 'Долговечность и защита от влаги' },
              { title: 'Умный дом', desc: 'Автоматизация всех систем' },
              { title: 'Рекуперация', desc: 'Энергосбережение до 40%' },
              { title: 'Тёплые полы', desc: 'Равномерный комфортный обогрев' },
              { title: 'Солнечные панели', desc: 'Автономное энергообеспечение' },
            ].map((tech, index) => (
              <Card 
                key={index} 
                variant="surface" 
                padding="lg"
                className="text-center card-hover-lift"
              >
                <h4 className="text-lg font-semibold text-[#161b21] mb-2">{tech.title}</h4>
                <p className="text-sm text-[#737a82]">{tech.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </Section>
      )}

      {/* Benefits */}
      {isBlockVisible('benefits') && (
      <Section variant="gray" padding="xl">
        <div
          ref={benefitsRef.ref}
          className={`max-w-7xl mx-auto px-5 sm:px-8 scroll-fade-in ${benefitsRef.isVisible ? 'is-visible' : ''}`}
        >
          <SectionHeader 
            title={getBlock('benefits')?.title ?? 'Почему выбирают нас'}
            subtitle={getBlock('benefits')?.description ?? 'Преимущества работы с нашей компанией'}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              'Собственное производство полного цикла',
              'Гарантия 15 лет на конструкцию',
              'Фиксированная цена в договоре',
              'Энергоэффективность класса A+',
              'Контроль качества на каждом этапе',
              'Готовые проекты и индивидуальное проектирование',
              'Прозрачная смета и поэтапная оплата',
              'Сдача дома точно в срок',
            ].map((benefit, index) => (
              <div key={index} className="flex items-center gap-4 p-6 bg-white rounded-[15px]">
                <CheckCircle size={24} className="text-[#ff563f] shrink-0" />
                <span className="text-lg text-[#161b21]">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>
      )}

      {/* CTA */}
      <Section variant="default" padding="xl">
        <div className="max-w-4xl mx-auto px-5 sm:px-8">
          <Card variant="gradient" padding="lg" className="text-white text-center">
            <div className="flex flex-col gap-6 items-center">
              <h2 className="text-4xl font-semibold leading-tight">
                Готовы обсудить ваш проект?
              </h2>
              <p className="text-xl text-white/90 leading-normal max-w-2xl">
                Оставьте заявку, и наш специалист свяжется с вами для консультации и расчёта стоимости
              </p>
              <div className="flex flex-wrap items-center gap-4 justify-center">
                <Link to="/contact">
                  <Button variant="secondary" size="lg" icon={<ArrowRight size={18} />}>
                    Получить консультацию
                  </Button>
                </Link>
                <a href={formatPhoneHref(siteSettings.phone)}>
                  <Button variant="ghost" size="lg" className="text-white border-2 border-white/30 hover:bg-white/10">
                    {siteSettings.phone}
                  </Button>
                </a>
              </div>
            </div>
          </Card>
        </div>
      </Section>
    </>
  );
};
