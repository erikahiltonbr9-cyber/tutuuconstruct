import { Calendar, Clock, ArrowRight, Tag, BookOpen } from 'lucide-react';
import { Section, SectionHeader } from '../components/Section';
import { Card } from '../components/Card';
import { Link } from 'react-router';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const blogPosts = [
  {
    title: 'Модульные дома: будущее жилищного строительства',
    excerpt: 'Разбираем преимущества модульного строительства перед традиционным. Почему всё больше семей выбирают именно этот формат для своего дома.',
    date: '15 марта 2026',
    readTime: '7 мин',
    category: 'Технологии',
    featured: true,
  },
  {
    title: '10 трендов в строительстве загородных домов 2026',
    excerpt: 'От экологичности до smart-технологий. Узнайте, какие решения будут актуальны в этом году и как интегрировать их в ваш проект.',
    date: '10 марта 2026',
    readTime: '6 мин',
    category: 'Тренды',
    featured: false,
  },
  {
    title: 'Как выбрать участок для модульного дома',
    excerpt: 'Важные критерии выбора земельного участка: от геологии до инфраструктуры. Чек-лист для будущих застройщиков.',
    date: '5 марта 2026',
    readTime: '8 мин',
    category: 'Советы',
    featured: false,
  },
  {
    title: 'Кейс: семейный дом 150 м² за 3 месяца',
    excerpt: 'История строительства просторного дома для семьи из 5 человек. От выбора проекта до новоселья — полный путь с фото и расчётами.',
    date: '1 марта 2026',
    readTime: '12 мин',
    category: 'Кейсы',
    featured: false,
  },
  {
    title: 'Энергоэффективность: как экономить на отоплении',
    excerpt: 'Современные технологии позволяют снизить расходы на отопление на 60%. Разбираем решения для максимальной энергоэффективности.',
    date: '25 февраля 2026',
    readTime: '9 мин',
    category: 'Экономия',
    featured: false,
  },
  {
    title: 'Умный дом в модульной конструкции',
    excerpt: 'Как интегрировать системы автоматизации в модульный дом. Обзор решений и реальная экономия ресурсов.',
    date: '20 февраля 2026',
    readTime: '10 мин',
    category: 'Технологии',
    featured: false,
  },
];

const categories = ['Все', 'Технологии', 'Тренды', 'Советы', 'Кейсы', 'Экономия'];

export const BlogPage = () => {
  const postsRef = useScrollAnimation({ threshold: 0.1 });
  const featuredRef = useScrollAnimation({ threshold: 0.15 });
  const newsletterRef = useScrollAnimation({ threshold: 0.2 });

  return (
    <>
      {/* Hero Section */}
      <Section variant="default" padding="xl" className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-mesh" />
        <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#eaeeee] mb-6 hero-badge">
              <BookOpen size={16} className="text-[#ff563f]" />
              <span className="text-sm font-medium text-[#161b21]">Статьи и материалы</span>
            </div>
            <h1 className="text-5xl sm:text-6xl font-semibold text-[#161b21] leading-tight mb-6 hero-title">
              Блог
            </h1>
            <p className="text-xl text-[#737a82] leading-normal hero-subtitle">
              Полезные статьи о модульном строительстве, технологиях и тенденциях рынка загородной недвижимости.
            </p>
          </div>
        </div>
      </Section>

      {/* Categories */}
      <Section variant="gray" padding="md">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category, index) => (
              <button
                key={index}
                className={`px-6 py-3 rounded-full font-medium text-base transition-default btn-press ${
                  index === 0
                    ? 'bg-[#161b21] text-white'
                    : 'bg-white text-[#737a82] hover:bg-[#eaeeee]'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </Section>

      {/* Featured Post */}
      {blogPosts.filter(post => post.featured).map((post, index) => (
        <Section key={index} variant="default" padding="lg">
          <div
            ref={featuredRef.ref}
            className={`max-w-7xl mx-auto px-5 sm:px-8 scroll-fade-in ${featuredRef.isVisible ? 'is-visible' : ''}`}
          >
            <Card variant="surface" padding="none" className="overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="aspect-video lg:aspect-auto gradient-primary" />
                <div className="p-8 lg:p-12 flex flex-col gap-6">
                  <div className="flex items-center gap-4">
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#161b21] text-white text-sm font-medium">
                      <Tag size={14} />
                      {post.category}
                    </span>
                    <span className="text-sm text-[#737a82]">Рекомендуем</span>
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-semibold text-[#161b21] leading-tight">
                    {post.title}
                  </h2>
                  <p className="text-lg text-[#737a82] leading-normal line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-6 text-sm text-[#737a82]">
                    <span className="flex items-center gap-2">
                      <Calendar size={16} />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-2">
                      <Clock size={16} />
                      {post.readTime}
                    </span>
                  </div>
                  <button className="inline-flex items-center gap-2 text-lg font-medium text-[#161b21] hover:gap-3 transition-all">
                    Читать далее
                    <ArrowRight size={20} />
                  </button>
                </div>
              </div>
            </Card>
          </div>
        </Section>
      ))}

      {/* Blog Grid */}
      <Section variant="gray" padding="xl">
        <div
          ref={postsRef.ref}
          className={`max-w-7xl mx-auto px-5 sm:px-8 scroll-fade-in ${postsRef.isVisible ? 'is-visible' : ''}`}
        >
          <SectionHeader 
            title="Последние статьи"
            subtitle="Полезные материалы для организаторов мероприятий"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
            {blogPosts.filter(post => !post.featured).map((post, index) => (
              <Card 
                key={index}
                variant="surface" 
                padding="none"
                className="overflow-hidden flex flex-col card-hover-lift"
              >
                <div className="aspect-video gradient-primary" />
                <div className="p-6 flex flex-col gap-4 flex-1">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#161b21]/5 text-[#161b21] text-sm font-medium">
                      <Tag size={12} />
                      {post.category}
                    </span>
                  </div>
                  <h3 className="text-2xl font-semibold text-[#161b21] leading-tight line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-base text-[#737a82] leading-normal line-clamp-3 flex-1">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-[#737a82] pt-4 border-t border-[rgba(60,58,62,0.15)]">
                    <span className="flex items-center gap-1">
                      <Calendar size={14} />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={14} />
                      {post.readTime}
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Load More */}
          <div className="flex justify-center mt-12">
            <button className="px-8 py-4 rounded-full bg-[#161b21] text-white font-medium text-lg transition-default hover:opacity-90 btn-press">
              Загрузить ещё
            </button>
          </div>
        </div>
      </Section>

      {/* Newsletter */}
      <Section variant="default" padding="xl">
        <div
          ref={newsletterRef.ref}
          className={`max-w-4xl mx-auto px-5 sm:px-8 scroll-scale ${newsletterRef.isVisible ? 'is-visible' : ''}`}
        >
          <Card variant="gradient" padding="lg" className="text-white text-center">
            <div className="flex flex-col gap-6 items-center">
              <h2 className="text-4xl font-semibold leading-tight">
                Подпишитесь на рассылку
              </h2>
              <p className="text-xl text-white/90 leading-normal max-w-2xl">
                Получайте новые статьи, кейсы и эксклюзивные предложения на строительство модульных домов
              </p>
              <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
                <input
                  type="email"
                  placeholder="Ваш email"
                  className="flex-1 px-6 py-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/30"
                />
                <button className="px-8 py-4 rounded-full bg-white text-[#161b21] font-medium text-lg transition-default hover:bg-opacity-90 whitespace-nowrap btn-press">
                  Подписаться
                </button>
              </div>
            </div>
          </Card>
        </div>
      </Section>
    </>
  );
};