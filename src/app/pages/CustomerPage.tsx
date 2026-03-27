import { useState } from 'react';
import { Link } from 'react-router';
import {
  Users,
  Handshake,
  Package,
  Truck,
  CreditCard,
  Shield,
  Clock,
  Wrench,
  ChevronDown,
  ArrowRight,
  Calendar,
  Star,
  CheckCircle,
  Box,
  Zap,
  Home,
  Paintbrush,
  Thermometer,
  Tag,
  Newspaper,
} from 'lucide-react';
import { Section, SectionHeader } from '../components/Section';
import { Card } from '../components/Card';
import { useSiteContent } from '../context/SiteContentContext';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { clsx } from 'clsx';

/* ─── Partners Data ─── */

const partners = [
  { name: 'Т-Банк', description: 'Ипотечное кредитование с онлайн-одобрением', color: '#FFDD2D' },
  { name: 'МТС Банк', description: 'Выгодные условия для модульного строительства', color: '#E30611' },
  { name: 'Rockwool', description: 'Теплоизоляционные материалы премиум-класса', color: '#E1001A' },
  { name: 'Технониколь', description: 'Кровельные и гидроизоляционные системы', color: '#ED1C24' },
  { name: 'Rehau', description: 'Оконные системы и инженерные решения', color: '#003DA5' },
  { name: 'Knauf', description: 'Отделочные материалы и сухие смеси', color: '#003882' },
];

/* ─── Equipment / Комплектация ─── */

const equipmentCategories = [
  {
    title: 'Базовая комплектация',
    icon: <Home size={24} />,
    items: [
      'Несущий каркас из клеёного бруса',
      'Утепление стен 200 мм (минеральная вата)',
      'Кровельное покрытие (металлочерепица)',
      'Окна ПВХ двухкамерные',
      'Входная металлическая дверь',
      'Черновая отделка стен и пола',
    ],
  },
  {
    title: 'Инженерные системы',
    icon: <Zap size={24} />,
    items: [
      'Электропроводка с автоматами',
      'Водоснабжение (холодное и горячее)',
      'Канализация (внутренняя разводка)',
      'Отопление (радиаторы + котёл)',
      'Вентиляция приточно-вытяжная',
      'Точки подключения интернета',
    ],
  },
  {
    title: 'Чистовая отделка',
    icon: <Paintbrush size={24} />,
    items: [
      'Стены — гипсокартон под покраску',
      'Полы — ламинат 33 класса',
      'Потолки — натяжные матовые',
      'Санузел — керамическая плитка',
      'Межкомнатные двери',
      'Сантехника и смесители',
    ],
  },
  {
    title: 'Энергоэффективность',
    icon: <Thermometer size={24} />,
    items: [
      'Утепление класса A+',
      'Энергосберегающие стеклопакеты',
      'Рекуператор воздуха',
      'Тёплый пол (санузлы)',
      'LED-освещение',
      'Система «Умный дом» (опция)',
    ],
  },
];

/* ─── Delivery & Payment ─── */

const deliverySteps = [
  { number: '01', title: 'Заключение договора', description: 'Подписание договора и внесение предоплаты 30% от стоимости дома' },
  { number: '02', title: 'Производство', description: 'Заводское изготовление модулей — 30 рабочих дней с контролем качества' },
  { number: '03', title: 'Доставка на участок', description: 'Транспортировка спецтехникой до вашего участка по всей России' },
  { number: '04', title: 'Монтаж на фундамент', description: 'Установка модулей, подключение коммуникаций — 15 рабочих дней' },
  { number: '05', title: 'Финальный расчёт', description: 'Оплата оставшихся 70% после приёмки и подписания акта' },
];

const paymentMethods = [
  { title: 'Наличные / перевод', description: 'Оплата по договору на расчётный счёт компании' },
  { title: 'Ипотека', description: 'Через банки-партнёры со ставкой от 5.3%' },
  { title: 'Рассрочка', description: 'Беспроцентная рассрочка на срок строительства' },
  { title: 'Материнский капитал', description: 'Принимаем маткапитал как часть оплаты' },
];

/* ─── Warranty ─── */

const warrantyItems = [
  {
    title: '15 лет на конструкцию',
    description: 'Полная гарантия на несущий каркас, стены, кровлю и фундаментные узлы',
    icon: <Shield size={24} />,
    iconBg: 'bg-[#eff6ff]',
    iconColor: 'text-[#3b82f6]',
  },
  {
    title: '5 лет на инженерные системы',
    description: 'Гарантия на электрику, водоснабжение, отопление и канализацию',
    icon: <Wrench size={24} />,
    iconBg: 'bg-[#fff5f3]',
    iconColor: 'text-[#ff563f]',
  },
  {
    title: '2 года на отделку',
    description: 'Гарантия на чистовую отделку, напольные покрытия и окна',
    icon: <Paintbrush size={24} />,
    iconBg: 'bg-[#f0fdf4]',
    iconColor: 'text-[#22c55e]',
  },
  {
    title: 'Сервисное обслуживание',
    description: 'Бесплатное техническое обслуживание в течение первого года после сдачи',
    icon: <Clock size={24} />,
    iconBg: 'bg-[#fefce8]',
    iconColor: 'text-[#eab308]',
  },
];

/* ─── FAQ ─── */

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
    answer: 'Мы даём гарантию 15 лет на несущую конструкцию и 5 лет на инженерные системы. Также предоставляем бесплатное гарантийное обслуживание в течение первого года.',
  },
  {
    question: 'Можно ли получить ипотеку на модульный дом?',
    answer: 'Да, наши дома подходят для ипотечного кредитования. Мы сотрудничаем с ведущими банками и поможем подобрать оптимальную программу.',
  },
  {
    question: 'Подходит ли дом для круглогодичного проживания?',
    answer: 'Безусловно. Все наши дома спроектированы для круглогодичного проживания с утеплением класса A+ и системой отопления.',
  },
  {
    question: 'Какие способы оплаты доступны?',
    answer: 'Мы принимаем оплату наличными, безналичным переводом, ипотеку через банки-партнёры, беспроцентную рассрочку и материнский капитал.',
  },
  {
    question: 'Выполняете ли вы доставку в регионы?',
    answer: 'Да, мы доставляем модули по всей России. Стоимость доставки рассчитывается индивидуально в зависимости от удалённости участка.',
  },
];

/* ─── News ─── */

const newsItems = [
  {
    title: 'Модульные дома: будущее жилищного строительства',
    excerpt: 'Разбираем преимущества модульного строительства перед традиционным. Почему всё больше семей выбирают именно этот формат.',
    date: '15 марта 2026',
    readTime: '7 мин',
    category: 'Технологии',
  },
  {
    title: '10 трендов в строительстве загородных домов 2026',
    excerpt: 'От экологичности до smart-технологий. Узнайте, какие решения будут актуальны в этом году.',
    date: '10 марта 2026',
    readTime: '6 мин',
    category: 'Тренды',
  },
  {
    title: 'Кейс: семейный дом 150 м² за 3 месяца',
    excerpt: 'История строительства просторного дома для семьи из 5 человек — полный путь с фото и расчётами.',
    date: '1 марта 2026',
    readTime: '12 мин',
    category: 'Кейсы',
  },
];

/* ─── Testimonials ─── */

const testimonials = [
  {
    quote: '"Дом собрали за 2.5 месяца. Качество отличное, все коммуникации работают безупречно. Очень довольны результатом!"',
    name: 'Алексей Петров',
    role: 'Москва, M-100',
  },
  {
    quote: '"Профессиональная команда, прозрачные цены. Дом получился тёплый и уютный. Рекомендую МодульДом всем друзьям!"',
    name: 'Мария Соколова',
    role: 'Санкт-Петербург, M-60',
  },
  {
    quote: '"Переживали за качество, но были приятно удивлены. Всё сделано аккуратно и в срок. Дети в восторге от нового дома!"',
    name: 'Дмитрий Козлов',
    role: 'Казань, M-120',
  },
  {
    quote: '"Отличное соотношение цены и качества. Дом получился энергоэффективным — расходы на отопление минимальные."',
    name: 'Елена Новикова',
    role: 'Екатеринбург, M-80',
  },
];

/* ─── Component ─── */

export const CustomerPage = () => {
  const { landingContent } = useSiteContent();
  const [openFaq, setOpenFaq] = useState(0);

  const partnersRef = useScrollAnimation({ threshold: 0.15 });
  const equipRef = useScrollAnimation({ threshold: 0.1 });
  const deliveryRef = useScrollAnimation({ threshold: 0.15 });
  const warrantyRef = useScrollAnimation({ threshold: 0.15 });
  const faqRef = useScrollAnimation({ threshold: 0.15 });
  const newsRef = useScrollAnimation({ threshold: 0.1 });
  const reviewsRef = useScrollAnimation({ threshold: 0.15 });

  return (
    <>
      {/* ═══ HERO ═══ */}
      <Section variant="default" padding="xl" className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-mesh" />
        <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#eaeeee] mb-6 hero-badge">
              <Users size={16} className="text-[#ff563f]" />
              <span className="text-sm font-medium text-[#161b21]">Для заказчика</span>
            </div>
            <h1 className="text-5xl sm:text-6xl font-semibold text-[#161b21] leading-tight mb-6 hero-title">
              Всё для вашего удобства
            </h1>
            <p className="text-xl text-[#737a82] leading-normal max-w-2xl mx-auto mb-10 hero-subtitle">
              Полная информация о комплектации, доставке, гарантии и условиях работы. Прозрачные процессы на каждом этапе.
            </p>
          </div>
        </div>
      </Section>

      {/* ═══ 1. PARTNERS ═══ */}
      <Section variant="gray" padding="xl">
        <div
          ref={partnersRef.ref}
          className={`max-w-7xl mx-auto px-5 sm:px-8 scroll-fade-in ${partnersRef.isVisible ? 'is-visible' : ''}`}
        >
          <SectionHeader
            title="Наши партнёры"
            subtitle="Мы работаем с ведущими производителями и финансовыми организациями"
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5 stagger-children">
            {partners.map((partner) => (
              <Card key={partner.name} variant="surface" padding="lg" className="flex flex-col items-center text-center gap-4 card-hover-lift">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-lg"
                  style={{ backgroundColor: partner.color }}
                >
                  {partner.name.charAt(0)}
                </div>
                <div>
                  <p className="text-base font-semibold text-[#161b21] mb-1">{partner.name}</p>
                  <p className="text-xs text-[#737a82] leading-snug">{partner.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      {/* ═══ 2. EQUIPMENT / Комплектация ═══ */}
      <Section variant="default" padding="xl">
        <div
          ref={equipRef.ref}
          className={`max-w-7xl mx-auto px-5 sm:px-8 scroll-fade-in ${equipRef.isVisible ? 'is-visible' : ''}`}
        >
          <SectionHeader
            title="Комплектация"
            subtitle="Каждый дом включает всё необходимое для комфортного проживания"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 stagger-children">
            {equipmentCategories.map((cat) => (
              <Card key={cat.title} variant="surface" padding="lg" className="flex flex-col gap-5 card-hover-lift">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#161b21] flex items-center justify-center text-white card-icon icon-spin-hover">
                    {cat.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-[#161b21]">{cat.title}</h3>
                </div>
                <ul className="flex flex-col gap-2.5">
                  {cat.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <CheckCircle size={16} className="text-[#ff563f] shrink-0 mt-0.5" />
                      <span className="text-sm text-[#161b21]">{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      {/* ═══ 3. DELIVERY & PAYMENT ═══ */}
      <Section variant="gray" padding="xl">
        <div
          ref={deliveryRef.ref}
          className={`max-w-7xl mx-auto px-5 sm:px-8 scroll-fade-in ${deliveryRef.isVisible ? 'is-visible' : ''}`}
        >
          <SectionHeader
            title="Доставка и оплата"
            subtitle="Прозрачная схема работы от заключения договора до заселения"
          />

          {/* Steps */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-16">
            {deliverySteps.map((step, i) => (
              <div key={step.number} className="relative flex flex-col items-center text-center gap-3">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#ff563f] to-[#ff563f] flex items-center justify-center text-white font-bold text-lg">
                  {step.number}
                </div>
                <h4 className="text-base font-semibold text-[#161b21]">{step.title}</h4>
                <p className="text-sm text-[#737a82] leading-relaxed">{step.description}</p>
                {i < deliverySteps.length - 1 && (
                  <ArrowRight size={18} className="hidden lg:block absolute top-5 -right-3 text-[#737a82]" />
                )}
              </div>
            ))}
          </div>

          {/* Payment Methods */}
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl font-semibold text-[#161b21] text-center mb-8">Способы оплаты</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {paymentMethods.map((m) => (
                <Card key={m.title} variant="surface" padding="lg" className="flex items-start gap-4 card-hover-lift">
                  <div className="w-10 h-10 rounded-full bg-[#161b21] flex items-center justify-center text-white shrink-0">
                    <CreditCard size={18} />
                  </div>
                  <div>
                    <p className="text-base font-semibold text-[#161b21] mb-1">{m.title}</p>
                    <p className="text-sm text-[#737a82]">{m.description}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ═══ 4. WARRANTY ═══ */}
      <Section variant="default" padding="xl">
        <div
          ref={warrantyRef.ref}
          className={`max-w-7xl mx-auto px-5 sm:px-8 scroll-fade-in ${warrantyRef.isVisible ? 'is-visible' : ''}`}
        >
          <SectionHeader
            title="Гарантия"
            subtitle="Расширенная гарантия на все элементы конструкции и инженерные системы"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 stagger-children">
            {warrantyItems.map((item) => (
              <Card key={item.title} variant="surface" padding="lg" className="flex flex-col gap-4 card-hover-lift">
                <div className={clsx('w-12 h-12 rounded-xl flex items-center justify-center', item.iconBg)}>
                  <div className={item.iconColor}>{item.icon}</div>
                </div>
                <h3 className="text-lg font-semibold text-[#161b21]">{item.title}</h3>
                <p className="text-sm text-[#737a82] leading-relaxed">{item.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      {/* ═══ 5. FAQ ═══ */}
      <Section variant="gray" padding="xl">
        <div
          ref={faqRef.ref}
          className={`max-w-3xl mx-auto px-5 sm:px-8 scroll-fade-in ${faqRef.isVisible ? 'is-visible' : ''}`}
        >
          <SectionHeader
            title="Вопросы и ответы"
            subtitle="Ответы на самые популярные вопросы от наших заказчиков"
          />
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
      </Section>

      {/* ═══ 6. NEWS ═══ */}
      <Section variant="default" padding="xl">
        <div
          ref={newsRef.ref}
          className={`max-w-7xl mx-auto px-5 sm:px-8 scroll-fade-in ${newsRef.isVisible ? 'is-visible' : ''}`}
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-12 sm:mb-16">
            <div className="flex flex-col gap-5 max-w-2xl">
              <h2 className="text-[44px] font-semibold text-[#161b21] leading-none section-title">
                Новости
              </h2>
              <p className="text-xl text-[#737a82] leading-normal section-subtitle">
                Последние статьи и кейсы из нашего блога
              </p>
            </div>
            <Link
              to="/blog"
              className="inline-flex w-fit items-center gap-2 rounded-xl border border-[#e0e0e0] bg-white px-5 py-3 text-sm font-medium text-[#161b21]"
            >
              Все статьи
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 stagger-children">
            {newsItems.map((post) => (
              <Card
                key={post.title}
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
                  <h3 className="text-xl font-semibold text-[#161b21] leading-tight line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-[#737a82] leading-normal line-clamp-3 flex-1">
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
        </div>
      </Section>

      {/* ═══ 7. TESTIMONIALS ═══ */}
      <Section variant="gray" padding="xl">
        <div
          ref={reviewsRef.ref}
          className={`max-w-7xl mx-auto px-5 sm:px-8 scroll-fade-in ${reviewsRef.isVisible ? 'is-visible' : ''}`}
        >
          <SectionHeader
            title={landingContent.testimonialsTitle}
            subtitle="Реальные истории наших клиентов о строительстве модульных домов"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 stagger-children">
            {testimonials.map((item) => (
              <Card key={item.name} variant="surface" padding="lg" className="flex flex-col gap-5 card-hover-lift">
                <p className="text-lg text-[#f59e0b]">★★★★★</p>
                <p className="text-[15px] leading-[1.6] text-[#161b21] flex-1">{item.quote}</p>
                <div className="flex items-center gap-3 pt-4 border-t border-[#f1f2f4]">
                  <div className="h-10 w-10 rounded-full bg-[#eaeeee]" />
                  <div>
                    <p className="text-sm font-semibold text-[#161b21]">{item.name}</p>
                    <p className="text-[13px] text-[#737a82]">{item.role}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      {/* ═══ CTA ═══ */}
      <section className="bg-gradient-to-r from-[#ff563f] to-[#ff563f] px-5 py-20 sm:px-8">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-8 text-center">
          <h2 className="text-[36px] font-semibold leading-tight text-white sm:text-[44px]">
            Готовы начать строительство?
          </h2>
          <p className="max-w-[500px] text-lg text-white/80">
            Оставьте заявку и получите бесплатную консультацию и расчёт стоимости вашего дома
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-10 py-4 text-base font-semibold text-[#161b21]"
            >
              Оставить заявку
              <ArrowRight size={18} />
            </Link>
            <Link
              to="/catalog"
              className="inline-flex items-center rounded-xl border border-white/25 px-10 py-4 text-base font-medium text-white"
            >
              Смотреть каталог
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};
