import { useState } from 'react';
import {
  Home,
  Hammer,
  HardHat,
  Ruler,
  Truck,
  Shield,
  Wrench,
  Layers,
  ArrowRight,
  Search,
  Phone,
  Mail,
  MapPin,
  Clock,
  Star,
  Check,
  AlertTriangle,
  Info,
  X,
  ChevronDown,
  Heart,
  Building2,
  Paintbrush,
  Zap,
  User,
  Users,
  Settings,
  Bell,
  FileText,
  Package,
  Eye,
} from 'lucide-react';
import { Button } from '../components/Button';
import { Card, PricingCard } from '../components/Card';
import { Input, Textarea } from '../components/Input';
import { Section, SectionHeader } from '../components/Section';
import { FeatureCard, IconCard } from '../components/FeatureCard';
import { TestimonialCard } from '../components/TestimonialCard';
import { Accordion } from '../components/Accordion';
import { Badge } from '../components/Badge';
import { StatCounter, StatsBar } from '../components/StatCounter';
import { ProjectTimeline } from '../components/ProjectTimeline';
import { ServiceCard } from '../components/ServiceCard';
import { TeamMemberCard } from '../components/TeamMemberCard';
import {
  ConstructionProgress,
  ProjectStatusCard,
} from '../components/ConstructionProgress';
import { MaterialCard } from '../components/MaterialCard';
import { CompletedProjectCard } from '../components/CompletedProjectCard';
import { Avatar, AvatarGroup } from '../components/Avatar';
import { Modal } from '../components/Modal';
import { Tabs } from '../components/Tabs';
import { Divider } from '../components/Divider';
import { Tooltip } from '../components/Tooltip';
import { Breadcrumb } from '../components/Breadcrumb';
import { Switch, Checkbox } from '../components/FormControls';
import { Skeleton, SkeletonCard } from '../components/Skeleton';
import { ToastContainer, useToast } from '../components/Toast';
import { Stepper } from '../components/Stepper';
import { EmptyState } from '../components/EmptyState';

/* ------------------------------------------------------------------ */
/*  Navigation sidebar for sections                                    */
/* ------------------------------------------------------------------ */

const kitSections = [
  { id: 'colors', label: 'Цвета' },
  { id: 'typography', label: 'Типографика' },
  { id: 'buttons', label: 'Кнопки' },
  { id: 'badges', label: 'Бейджи' },
  { id: 'inputs', label: 'Формы ввода' },
  { id: 'form-controls', label: 'Переключатели' },
  { id: 'cards', label: 'Карточки' },
  { id: 'feature-cards', label: 'Карточки услуг' },
  { id: 'service-cards', label: 'Сервис-карточки' },
  { id: 'pricing', label: 'Тарифы' },
  { id: 'avatars', label: 'Аватары' },
  { id: 'tabs', label: 'Табы' },
  { id: 'breadcrumb', label: 'Хлебные крошки' },
  { id: 'divider', label: 'Разделители' },
  { id: 'tooltip', label: 'Тултипы' },
  { id: 'modal', label: 'Модальные окна' },
  { id: 'stepper', label: 'Степпер' },
  { id: 'skeleton', label: 'Скелетон' },
  { id: 'toast', label: 'Уведомления (toast)' },
  { id: 'empty-state', label: 'Пустое состояние' },
  { id: 'stats', label: 'Статистика' },
  { id: 'progress', label: 'Прогресс' },
  { id: 'timeline', label: 'Таймлайн' },
  { id: 'materials', label: 'Материалы' },
  { id: 'projects', label: 'Проекты' },
  { id: 'team', label: 'Команда' },
  { id: 'testimonials', label: 'Отзывы' },
  { id: 'accordion', label: 'Аккордеон' },
  { id: 'alerts', label: 'Алерты' },
  { id: 'animations', label: 'Анимации' },
];

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const SectionTitle = ({
  id,
  title,
  subtitle,
}: {
  id: string;
  title: string;
  subtitle?: string;
}) => (
  <div id={id} className="scroll-mt-28 mb-8">
    <h2 className="text-[34px] font-semibold text-[#161b21]">{title}</h2>
    {subtitle && <p className="text-lg text-[#737a82] mt-1">{subtitle}</p>}
    <div className="h-px bg-[rgba(60,58,62,0.15)] mt-4" />
  </div>
);

const ColorSwatch = ({
  color,
  name,
  hex,
}: {
  color: string;
  name: string;
  hex: string;
}) => (
  <div className="flex flex-col gap-2">
    <div
      className="w-full aspect-square rounded-[15px] border border-[rgba(60,58,62,0.08)]"
      style={{ background: color }}
    />
    <p className="text-sm font-medium text-[#161b21]">{name}</p>
    <p className="text-xs text-[#737a82] font-mono">{hex}</p>
  </div>
);

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export const UIKitPage = () => {
  const [activeSection, setActiveSection] = useState('colors');
  const [switchChecked, setSwitchChecked] = useState(true);
  const [checkbox1, setCheckbox1] = useState(true);
  const [checkbox2, setCheckbox2] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('tab1');
  const [stepperStep, setStepperStep] = useState(2);
  const { toasts, addToast, removeToast } = useToast();

  const scrollTo = (id: string) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="gradient-primary py-16 md:py-24 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 text-white text-sm font-medium mb-6">
            <HardHat size={16} /> UI/Kit v2.0
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Design System — Строитель
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
            Полная дизайн-система для сайтов строительных компаний. 30+ компонентов,
            стили, анимации и готовые блоки.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto flex gap-8 px-4 md:px-6 py-10">
        {/* Sidebar Navigation */}
        <nav className="hidden lg:block w-56 shrink-0 sticky top-24 h-fit">
          <p className="text-xs font-semibold uppercase text-[#737a82] tracking-wider mb-3">
            Разделы
          </p>
          <ul className="flex flex-col gap-0.5">
            {kitSections.map((s) => (
              <li key={s.id}>
                <button
                  onClick={() => scrollTo(s.id)}
                  className={`w-full text-left px-3 py-2 rounded-[10px] text-sm transition-default ${
                    activeSection === s.id
                      ? 'bg-[#161b21] text-white font-medium'
                      : 'text-[#737a82] hover:text-[#161b21] hover:bg-[#eaeeee]'
                  }`}
                >
                  {s.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Main Content */}
        <main className="flex-1 min-w-0">
          {/* ====== COLORS ====== */}
          <SectionTitle
            id="colors"
            title="Цвета"
            subtitle="Основная палитра дизайн-системы"
          />

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-[#161b21] mb-4">
              Основные
            </h3>
            <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-7 gap-4">
              <ColorSwatch color="#161b21" name="Primary" hex="#161B21" />
              <ColorSwatch color="#fbfbfb" name="Foreground" hex="#FBFBFB" />
              <ColorSwatch color="#ff563f" name="Gradient Start" hex="#ff563f" />
              <ColorSwatch color="#ff563f" name="Accent" hex="#FF563F" />
              <ColorSwatch color="#FF563F" name="Gradient End" hex="#FF563F" />
              <ColorSwatch color="#eaeeee" name="Surface" hex="#EAEEEE" />
              <ColorSwatch color="#f5f5f5" name="Input BG" hex="#F5F5F5" />
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-[#161b21] mb-4">
              Текст
            </h3>
            <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-7 gap-4">
              <ColorSwatch color="#161b21" name="Primary" hex="#161B21" />
              <ColorSwatch color="#737a82" name="Secondary" hex="#737A82" />
              <ColorSwatch color="#bbbebe" name="Muted" hex="#BBBEBE" />
            </div>
          </div>

          <div className="mb-12">
            <h3 className="text-lg font-semibold text-[#161b21] mb-4">
              Состояния
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 gap-4">
              <ColorSwatch color="#4caf50" name="Success" hex="#4CAF50" />
              <ColorSwatch color="#ff402d" name="Error" hex="#FF402D" />
              <ColorSwatch color="#ffcd05" name="Warning" hex="#FFCD05" />
              <ColorSwatch color="#2196f3" name="Info" hex="#2196F3" />
            </div>
          </div>

          <div className="mb-16">
            <h3 className="text-lg font-semibold text-[#161b21] mb-4">
              Градиенты
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <div className="h-20 rounded-[15px] gradient-primary" />
                <p className="text-sm font-medium">Primary Gradient</p>
                <p className="text-xs text-[#737a82] font-mono">
                  #ff563f → #FF563F → #FF563F
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <div className="h-20 rounded-[15px] bg-gradient-to-r from-[#ff563f] to-[#ff563f]" />
                <p className="text-sm font-medium">Dark Gradient</p>
                <p className="text-xs text-[#737a82] font-mono">
                  #161B21 → #3C3A3E
                </p>
              </div>
            </div>
          </div>

          {/* ====== TYPOGRAPHY ====== */}
          <SectionTitle
            id="typography"
            title="Типографика"
            subtitle="Иерархия заголовков и текстовые стили"
          />

          <div className="flex flex-col gap-6 mb-16">
            <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-6 pb-4 border-b border-[rgba(60,58,62,0.08)]">
              <span className="text-xs font-mono text-[#737a82] w-20 shrink-0">
                H1 — 44px
              </span>
              <h1 className="text-[44px] font-semibold text-[#161b21] leading-tight">
                Строим будущее
              </h1>
            </div>
            <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-6 pb-4 border-b border-[rgba(60,58,62,0.08)]">
              <span className="text-xs font-mono text-[#737a82] w-20 shrink-0">
                H2 — 34px
              </span>
              <h2 className="text-[34px] font-semibold text-[#161b21] leading-tight">
                Наши преимущества
              </h2>
            </div>
            <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-6 pb-4 border-b border-[rgba(60,58,62,0.08)]">
              <span className="text-xs font-mono text-[#737a82] w-20 shrink-0">
                H3 — 28px
              </span>
              <h3 className="text-[28px] font-semibold text-[#161b21]">
                Модульные дома
              </h3>
            </div>
            <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-6 pb-4 border-b border-[rgba(60,58,62,0.08)]">
              <span className="text-xs font-mono text-[#737a82] w-20 shrink-0">
                H4 — 24px
              </span>
              <h4 className="text-2xl font-semibold text-[#161b21]">
                Этапы строительства
              </h4>
            </div>
            <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-6 pb-4 border-b border-[rgba(60,58,62,0.08)]">
              <span className="text-xs font-mono text-[#737a82] w-20 shrink-0">
                XL — 20px
              </span>
              <p className="text-xl text-[#161b21]">
                Энергоэффективные решения для вашего комфорта
              </p>
            </div>
            <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-6 pb-4 border-b border-[rgba(60,58,62,0.08)]">
              <span className="text-xs font-mono text-[#737a82] w-20 shrink-0">
                Body — 16px
              </span>
              <p className="text-base text-[#737a82] leading-normal">
                Проектируем и строим современные модульные дома с гарантией
                качества. Используем только сертифицированные материалы.
              </p>
            </div>
            <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-6 pb-4 border-b border-[rgba(60,58,62,0.08)]">
              <span className="text-xs font-mono text-[#737a82] w-20 shrink-0">
                Small — 14px
              </span>
              <p className="text-sm text-[#737a82]">
                Все цены указаны с учётом монтажных работ
              </p>
            </div>
            <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-6">
              <span className="text-xs font-mono text-[#737a82] w-20 shrink-0">
                Gradient
              </span>
              <p className="text-3xl font-bold gradient-text">
                Строим с душой
              </p>
            </div>
          </div>

          {/* ====== BUTTONS ====== */}
          <SectionTitle
            id="buttons"
            title="Кнопки"
            subtitle="Основные стили кнопок и их состояния"
          />

          <div className="flex flex-col gap-8 mb-16">
            {/* Variants */}
            <div>
              <h3 className="text-lg font-semibold text-[#161b21] mb-4">
                Варианты
              </h3>
              <div className="flex flex-wrap gap-3 items-center">
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="gradient">Gradient</Button>
              </div>
            </div>

            {/* Sizes */}
            <div>
              <h3 className="text-lg font-semibold text-[#161b21] mb-4">
                Размеры
              </h3>
              <div className="flex flex-wrap gap-3 items-center">
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
              </div>
            </div>

            {/* Icons */}
            <div>
              <h3 className="text-lg font-semibold text-[#161b21] mb-4">
                С иконками
              </h3>
              <div className="flex flex-wrap gap-3 items-center">
                <Button icon={<ArrowRight size={20} />}>
                  Смотреть каталог
                </Button>
                <Button
                  variant="secondary"
                  icon={<Phone size={20} />}
                  iconPosition="left"
                >
                  Позвонить
                </Button>
                <Button
                  variant="gradient"
                  icon={<Hammer size={18} />}
                  iconPosition="left"
                >
                  Начать проект
                </Button>
              </div>
            </div>

            {/* States */}
            <div>
              <h3 className="text-lg font-semibold text-[#161b21] mb-4">
                Состояния
              </h3>
              <div className="flex flex-wrap gap-3 items-center">
                <Button>Активная</Button>
                <Button disabled>Неактивная</Button>
                <Button variant="gradient" disabled>
                  Gradient Disabled
                </Button>
              </div>
            </div>
          </div>

          {/* ====== BADGES ====== */}
          <SectionTitle
            id="badges"
            title="Бейджи"
            subtitle="Статусы и метки"
          />

          <div className="flex flex-wrap gap-3 mb-16">
            <Badge>По умолчанию</Badge>
            <Badge variant="success">Завершён</Badge>
            <Badge variant="warning">В процессе</Badge>
            <Badge variant="error">Ошибка</Badge>
            <Badge variant="gradient">Популярный</Badge>
            <Badge variant="outline">Контур</Badge>
            <Badge size="sm">SM</Badge>
            <Badge size="sm" variant="success">
              Эко
            </Badge>
          </div>

          {/* ====== INPUTS ====== */}
          <SectionTitle
            id="inputs"
            title="Формы ввода"
            subtitle="Текстовые поля, textarea и состояния"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Input label="Имя" placeholder="Введите ваше имя" />
            <Input
              label="Телефон"
              placeholder="+7 (999) 123-45-67"
              icon={<Phone size={20} />}
            />
            <Input
              label="Email"
              placeholder="email@example.com"
              icon={<Mail size={20} />}
            />
            <Input
              label="Поиск"
              placeholder="Поиск по каталогу..."
              icon={<Search size={20} />}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Input
              label="С ошибкой"
              placeholder="Обязательное поле"
              error="Это поле обязательно для заполнения"
            />
            <Input
              label="Неактивное"
              placeholder="Недоступно"
              disabled
            />
          </div>

          <div className="mb-16">
            <Textarea
              label="Сообщение"
              placeholder="Опишите ваш проект: площадь, количество комнат, пожелания по планировке..."
            />
          </div>

          {/* ====== FORM CONTROLS ====== */}
          <SectionTitle
            id="form-controls"
            title="Переключатели"
            subtitle="Switch, Checkbox и другие элементы управления"
          />

          <div className="flex flex-col gap-6 mb-16">
            <div>
              <h3 className="text-lg font-semibold text-[#161b21] mb-4">Switch</h3>
              <div className="flex flex-wrap gap-6 items-center">
                <Switch checked={switchChecked} onChange={setSwitchChecked} label="Уведомления" />
                <Switch checked={false} onChange={() => {}} label="Неактивный" disabled />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[#161b21] mb-4">Checkbox</h3>
              <div className="flex flex-wrap gap-6 items-center">
                <Checkbox checked={checkbox1} onChange={setCheckbox1} label="Согласен с условиями" />
                <Checkbox checked={checkbox2} onChange={setCheckbox2} label="Подписка на рассылку" />
                <Checkbox checked={false} onChange={() => {}} label="Неактивный" disabled />
              </div>
            </div>
          </div>

          {/* ====== CARDS ====== */}
          <SectionTitle
            id="cards"
            title="Карточки"
            subtitle="Базовые контейнеры с разными вариантами"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <Card variant="default" padding="lg" className="border border-[rgba(60,58,62,0.08)]">
              <h4 className="text-xl font-semibold text-[#161b21] mb-2">
                Default
              </h4>
              <p className="text-base text-[#737a82]">
                Базовая карточка с белым фоном и обводкой
              </p>
            </Card>

            <Card variant="surface" padding="lg">
              <h4 className="text-xl font-semibold text-[#161b21] mb-2">
                Surface
              </h4>
              <p className="text-base text-[#737a82]">
                Серая поверхность для групп контента
              </p>
            </Card>

            <Card variant="gradient" padding="lg">
              <h4 className="text-xl font-semibold text-white mb-2">
                Gradient
              </h4>
              <p className="text-base text-white/80">
                Яркие акцентные блоки
              </p>
            </Card>

            <Card variant="surface" padding="lg" hover>
              <h4 className="text-xl font-semibold text-[#161b21] mb-2">
                Hover Lift
              </h4>
              <p className="text-base text-[#737a82]">
                Наведите для эффекта подъёма
              </p>
            </Card>

            <Card variant="default" padding="sm" className="border border-[rgba(60,58,62,0.08)]">
              <h4 className="text-lg font-semibold text-[#161b21] mb-1">
                Small Padding
              </h4>
              <p className="text-sm text-[#737a82]">Компактный отступ (sm)</p>
            </Card>

            <Card variant="default" padding="none" className="border border-[rgba(60,58,62,0.08)]">
              <div className="h-24 gradient-primary rounded-t-[15px]" />
              <div className="p-4">
                <h4 className="text-lg font-semibold text-[#161b21]">
                  No Padding
                </h4>
                <p className="text-sm text-[#737a82]">
                  Для кастомного наполнения
                </p>
              </div>
            </Card>
          </div>

          {/* ====== FEATURE CARDS ====== */}
          <SectionTitle
            id="feature-cards"
            title="Карточки преимуществ"
            subtitle="Подсветка ключевых особенностей компании"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <FeatureCard
              icon={<Shield size={24} />}
              title="Гарантия 15 лет"
              description="Полная гарантия на конструктив и инженерные системы"
            />
            <FeatureCard
              icon={<Clock size={24} />}
              title="Строим за 3 месяца"
              description="От фундамента до сдачи «под ключ» — всего 90 дней"
            />
            <FeatureCard
              icon={<Zap size={24} />}
              title="Энергоэффективность"
              description="Класс энергосбережения A+ благодаря SIP-панелям"
              variant="gradient"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            <IconCard
              number="01"
              title="Консультация"
              description="Бесплатно обсуждаем проект"
            />
            <IconCard
              number="02"
              title="Проектирование"
              description="Создаём 3D-визуализацию"
            />
            <IconCard
              number="03"
              title="Строительство"
              description="Возведение на участке"
            />
            <IconCard
              number="04"
              title="Сдача объекта"
              description="Приёмка и документация"
            />
          </div>

          {/* ====== SERVICE CARDS ====== */}
          <SectionTitle
            id="service-cards"
            title="Карточки услуг"
            subtitle="Описание услуг с подробностями"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <ServiceCard
              icon={<Building2 size={24} />}
              title="Строительство домов"
              description="Полный цикл строительства модульных каркасных домов под ключ."
              features={[
                'Каркасная технология',
                'SIP-панели',
                'Фундамент',
                'Кровля',
              ]}
              onLearnMore={() => {}}
            />
            <ServiceCard
              icon={<Paintbrush size={24} />}
              title="Отделка интерьера"
              description="Чистовая и черновая отделка внутренних помещений любой сложности."
              features={[
                'Дизайн-проект',
                'Электрика',
                'Сантехника',
                'Декор',
              ]}
              highlighted
              onLearnMore={() => {}}
            />
            <ServiceCard
              icon={<Ruler size={24} />}
              title="Проектирование"
              description="Архитектурное и инженерное проектирование с 3D-визуализацией."
              features={[
                '3D-модель',
                'Планировки',
                'Смета',
                'Авторский надзор',
              ]}
              onLearnMore={() => {}}
            />
          </div>

          {/* ====== PRICING ====== */}
          <SectionTitle
            id="pricing"
            title="Тарифные карточки"
            subtitle="Комплектации и пакеты"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <PricingCard
              title="База"
              price="от 2.5 млн ₽"
              period="без отделки"
              features={[
                'Фундамент на винтовых сваях',
                'Каркас из профилированного бруса',
                'Утепление 200 мм',
                'Кровля металлочерепица',
                'Окна ПВХ двухкамерные',
              ]}
              onSelect={() => {}}
            />
            <PricingCard
              title="Стандарт"
              price="от 3.8 млн ₽"
              originalPrice="от 4.2 млн ₽"
              period="с черновой отделкой"
              features={[
                'Все из пакета «База»',
                'Электропроводка',
                'Сантехника',
                'Стяжка полов',
                'Штукатурка стен',
                'Утепление 250 мм',
              ]}
              highlighted
              onSelect={() => {}}
            />
            <PricingCard
              title="Премиум"
              price="от 5.5 млн ₽"
              period="под ключ"
              features={[
                'Все из пакета «Стандарт»',
                'Чистовая отделка',
                'Тёплый пол',
                'Умный дом',
                'Ландшафтный дизайн',
                'Забор и благоустройство',
              ]}
              onSelect={() => {}}
            />
          </div>

          {/* ====== AVATARS ====== */}
          <SectionTitle
            id="avatars"
            title="Аватары"
            subtitle="Аватары пользователей и группы"
          />

          <div className="flex flex-col gap-8 mb-16">
            <div>
              <h3 className="text-lg font-semibold text-[#161b21] mb-4">Размеры</h3>
              <div className="flex flex-wrap gap-4 items-end">
                <Avatar size="sm" name="АИ" />
                <Avatar size="md" name="МП" />
                <Avatar size="lg" name="ДС" />
                <Avatar size="xl" name="ЕК" />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[#161b21] mb-4">Со статусом</h3>
              <div className="flex flex-wrap gap-4 items-end">
                <Avatar size="lg" name="АИ" status="online" />
                <Avatar size="lg" name="МП" status="away" />
                <Avatar size="lg" name="ДС" status="busy" />
                <Avatar size="lg" name="ЕК" status="offline" />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[#161b21] mb-4">Группа</h3>
              <AvatarGroup>
                <Avatar size="md" name="АИ" />
                <Avatar size="md" name="МП" />
                <Avatar size="md" name="ДС" />
                <Avatar size="md" name="ЕК" />
                <Avatar size="md" name="+3" />
              </AvatarGroup>
            </div>
          </div>

          {/* ====== TABS ====== */}
          <SectionTitle
            id="tabs"
            title="Табы"
            subtitle="Переключение между разделами контента"
          />

          <div className="flex flex-col gap-8 mb-16">
            <div>
              <h3 className="text-lg font-semibold text-[#161b21] mb-4">По умолчанию</h3>
              <Tabs
                tabs={[
                  { id: 'tab1', label: 'Обзор', icon: <Eye size={16} /> },
                  { id: 'tab2', label: 'Характеристики', icon: <Settings size={16} /> },
                  { id: 'tab3', label: 'Отзывы', icon: <Star size={16} /> },
                ]}
                activeTab={activeTab}
                onChange={setActiveTab}
              />
              <Card variant="surface" padding="lg" className="mt-4">
                <p className="text-base text-[#737a82]">
                  {activeTab === 'tab1' && 'Содержимое вкладки «Обзор» — общая информация о проекте.'}
                  {activeTab === 'tab2' && 'Содержимое вкладки «Характеристики» — технические параметры.'}
                  {activeTab === 'tab3' && 'Содержимое вкладки «Отзывы» — мнения клиентов о проекте.'}
                </p>
              </Card>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[#161b21] mb-4">Pills</h3>
              <Tabs
                variant="pills"
                tabs={[
                  { id: 'tab1', label: 'Все' },
                  { id: 'tab2', label: 'Модульные' },
                  { id: 'tab3', label: 'Каркасные' },
                ]}
                activeTab={activeTab}
                onChange={setActiveTab}
              />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[#161b21] mb-4">Underline</h3>
              <Tabs
                variant="underline"
                tabs={[
                  { id: 'tab1', label: 'Проекты' },
                  { id: 'tab2', label: 'Услуги' },
                  { id: 'tab3', label: 'Контакты' },
                ]}
                activeTab={activeTab}
                onChange={setActiveTab}
              />
            </div>
          </div>

          {/* ====== BREADCRUMB ====== */}
          <SectionTitle
            id="breadcrumb"
            title="Хлебные крошки"
            subtitle="Навигационная цепочка в структуре сайта"
          />

          <div className="flex flex-col gap-4 mb-16">
            <Breadcrumb
              items={[
                { label: 'Главная', href: '/' },
                { label: 'Каталог', href: '/catalog' },
                { label: 'Модуль Скандинавия' },
              ]}
            />
            <Breadcrumb
              items={[
                { label: 'Главная', href: '/' },
                { label: 'Блог', href: '/blog' },
                { label: 'Технологии строительства', href: '/blog' },
                { label: 'SIP-панели: полное руководство' },
              ]}
            />
          </div>

          {/* ====== DIVIDER ====== */}
          <SectionTitle
            id="divider"
            title="Разделители"
            subtitle="Визуальное разделение контента"
          />

          <div className="flex flex-col gap-8 mb-16">
            <div>
              <p className="text-sm text-[#737a82] mb-3">Solid</p>
              <Divider />
            </div>
            <div>
              <p className="text-sm text-[#737a82] mb-3">Dashed</p>
              <Divider variant="dashed" />
            </div>
            <div>
              <p className="text-sm text-[#737a82] mb-3">Gradient</p>
              <Divider variant="gradient" />
            </div>
            <div>
              <p className="text-sm text-[#737a82] mb-3">С текстом</p>
              <Divider label="или" />
            </div>
          </div>

          {/* ====== TOOLTIP ====== */}
          <SectionTitle
            id="tooltip"
            title="Тултипы"
            subtitle="Подсказки при наведении на элемент"
          />

          <div className="flex flex-wrap gap-8 mb-16 items-center">
            <Tooltip content="Подсказка сверху" position="top">
              <Button variant="secondary" size="sm">Сверху</Button>
            </Tooltip>
            <Tooltip content="Подсказка снизу" position="bottom">
              <Button variant="secondary" size="sm">Снизу</Button>
            </Tooltip>
            <Tooltip content="Подсказка слева" position="left">
              <Button variant="secondary" size="sm">Слева</Button>
            </Tooltip>
            <Tooltip content="Подсказка справа" position="right">
              <Button variant="secondary" size="sm">Справа</Button>
            </Tooltip>
          </div>

          {/* ====== MODAL ====== */}
          <SectionTitle
            id="modal"
            title="Модальные окна"
            subtitle="Диалоговые окна для важной информации"
          />

          <div className="flex flex-wrap gap-4 mb-16">
            <Button variant="primary" onClick={() => setModalOpen(true)}>
              Открыть модальное окно
            </Button>
            <Modal
              isOpen={modalOpen}
              onClose={() => setModalOpen(false)}
              title="Заказать консультацию"
            >
              <div className="flex flex-col gap-4">
                <Input label="Ваше имя" placeholder="Введите имя" />
                <Input label="Телефон" placeholder="+7 (999) 123-45-67" icon={<Phone size={20} />} />
                <Textarea label="Комментарий" placeholder="Опишите ваши пожелания..." />
                <Button variant="primary" onClick={() => setModalOpen(false)}>
                  Отправить заявку
                </Button>
              </div>
            </Modal>
          </div>

          {/* ====== STEPPER ====== */}
          <SectionTitle
            id="stepper"
            title="Степпер"
            subtitle="Визуализация последовательных шагов"
          />

          <div className="flex flex-col gap-6 mb-16">
            <Stepper
              steps={['Выбор проекта', 'Консультация', 'Договор', 'Строительство', 'Сдача']}
              currentStep={stepperStep}
            />
            <div className="flex gap-3 justify-center">
              <Button variant="secondary" size="sm" onClick={() => setStepperStep(Math.max(0, stepperStep - 1))}>
                Назад
              </Button>
              <Button variant="primary" size="sm" onClick={() => setStepperStep(Math.min(4, stepperStep + 1))}>
                Далее
              </Button>
            </div>
          </div>

          {/* ====== SKELETON ====== */}
          <SectionTitle
            id="skeleton"
            title="Скелетон"
            subtitle="Заглушки загрузки контента"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            <Card variant="surface" padding="lg">
              <h4 className="text-lg font-semibold text-[#161b21] mb-4">Элементы</h4>
              <div className="flex flex-col gap-4">
                <Skeleton variant="text" width="80%" />
                <Skeleton variant="text" width="100%" />
                <Skeleton variant="text" width="60%" />
                <div className="flex gap-3 items-center mt-2">
                  <Skeleton variant="circular" width={48} height={48} />
                  <div className="flex-1 flex flex-col gap-2">
                    <Skeleton variant="text" width="50%" />
                    <Skeleton variant="text" width="30%" />
                  </div>
                </div>
              </div>
            </Card>
            <SkeletonCard />
          </div>

          {/* ====== TOAST ====== */}
          <SectionTitle
            id="toast"
            title="Уведомления (Toast)"
            subtitle="Всплывающие уведомления"
          />

          <div className="flex flex-wrap gap-3 mb-16">
            <Button variant="primary" size="sm" onClick={() => addToast('Заявка успешно отправлена!', 'success')}>
              Success
            </Button>
            <Button variant="secondary" size="sm" onClick={() => addToast('Ошибка при отправке формы', 'error')}>
              Error
            </Button>
            <Button variant="secondary" size="sm" onClick={() => addToast('Проверьте заполнение полей', 'warning')}>
              Warning
            </Button>
            <Button variant="secondary" size="sm" onClick={() => addToast('Новый проект добавлен в каталог', 'info')}>
              Info
            </Button>
          </div>
          <ToastContainer toasts={toasts} onClose={removeToast} />

          {/* ====== EMPTY STATE ====== */}
          <SectionTitle
            id="empty-state"
            title="Пустое состояние"
            subtitle="Заглушки для пустых разделов"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            <Card variant="surface" padding="none">
              <EmptyState
                icon={<Package size={28} />}
                title="Нет проектов"
                description="В данный момент нет активных проектов. Создайте первый проект, чтобы начать."
                action={<Button variant="primary" size="sm">Создать проект</Button>}
              />
            </Card>
            <Card variant="surface" padding="none">
              <EmptyState
                icon={<Search size={28} />}
                title="Ничего не найдено"
                description="Попробуйте изменить параметры поиска или сбросить фильтры."
                action={<Button variant="secondary" size="sm">Сбросить фильтры</Button>}
              />
            </Card>
          </div>

          {/* ====== STATS ====== */}
          <SectionTitle
            id="stats"
            title="Счётчики и статистика"
            subtitle="Числовые показатели компании"
          />

          <div className="mb-8">
            <StatsBar
              stats={[
                { value: '200', suffix: '+', label: 'Домов построено' },
                { value: '15', label: 'Лет на рынке' },
                { value: '98', suffix: '%', label: 'Довольных клиентов' },
                {
                  value: '3',
                  label: 'Месяца — средний срок',
                  variant: 'gradient',
                },
              ]}
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            <StatCounter value="50" suffix="+" label="Проектов в работе" />
            <StatCounter
              value="12"
              label="Регионов присутствия"
              variant="gradient"
            />
            <StatCounter value="350" suffix="м²" label="Средняя площадь" />
            <StatCounter value="24/7" label="Поддержка клиентов" />
          </div>

          {/* ====== PROGRESS ====== */}
          <SectionTitle
            id="progress"
            title="Прогресс строительства"
            subtitle="Визуализация этапов и статусов"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card
              variant="surface"
              padding="lg"
              className="flex flex-col gap-5"
            >
              <h4 className="text-xl font-semibold text-[#161b21]">
                Прогресс-бары
              </h4>
              <ConstructionProgress
                label="Фундамент"
                percentage={100}
                color="success"
              />
              <ConstructionProgress
                label="Каркас"
                percentage={75}
                color="gradient"
              />
              <ConstructionProgress
                label="Кровля"
                percentage={40}
                color="warning"
              />
              <ConstructionProgress
                label="Отделка"
                percentage={10}
                color="primary"
              />
            </Card>

            <ProjectStatusCard
              projectName="Дом «Скандинавия-120»"
              client="Семья Ивановых"
              completionDate="Июнь 2026"
              stages={[
                { label: 'Фундамент', percentage: 100, color: 'success' },
                { label: 'Стены и каркас', percentage: 100, color: 'success' },
                { label: 'Кровля', percentage: 80, color: 'gradient' },
                { label: 'Инженерные сети', percentage: 45, color: 'warning' },
                { label: 'Отделка', percentage: 0, color: 'primary' },
              ]}
            />
          </div>

          <div className="mb-16">
            <ProjectStatusCard
              projectName="Коттедж «Альпийский-250»"
              client="Иван Петрович К."
              completionDate="Март 2026"
              stages={[
                { label: 'Фундамент', percentage: 100, color: 'success' },
                { label: 'Каркас', percentage: 100, color: 'success' },
                { label: 'Кровля', percentage: 100, color: 'success' },
                { label: 'Инженерия', percentage: 100, color: 'success' },
                { label: 'Отделка', percentage: 100, color: 'success' },
              ]}
            />
          </div>

          {/* ====== TIMELINE ====== */}
          <SectionTitle
            id="timeline"
            title="Таймлайн проекта"
            subtitle="Этапы строительного процесса"
          />

          <div className="mb-16">
            <ProjectTimeline
              steps={[
                {
                  title: 'Консультация и замеры',
                  description:
                    'Обсуждаем ваши пожелания, выезжаем на участок, делаем замеры и определяем тип фундамента.',
                  duration: '1–2 дня',
                  completed: true,
                },
                {
                  title: 'Проектирование',
                  description:
                    'Разрабатываем архитектурный проект, 3D-визуализацию и инженерные схемы.',
                  duration: '2–3 недели',
                  completed: true,
                },
                {
                  title: 'Производство модулей',
                  description:
                    'Изготовление каркасных модулей на заводе с контролем качества на каждом этапе.',
                  duration: '3–4 недели',
                  active: true,
                },
                {
                  title: 'Фундамент и коммуникации',
                  description:
                    'Заливка фундамента, подведение водоснабжения, канализации и электричества.',
                  duration: '1–2 недели',
                },
                {
                  title: 'Монтаж и сборка',
                  description:
                    'Доставка модулей на участок и сборка дома с помощью крановой техники.',
                  duration: '3–5 дней',
                },
                {
                  title: 'Отделка и сдача',
                  description:
                    'Чистовая отделка, установка оборудования, финальная проверка и подписание акта.',
                  duration: '2–4 недели',
                },
              ]}
            />
          </div>

          {/* ====== MATERIALS ====== */}
          <SectionTitle
            id="materials"
            title="Строительные материалы"
            subtitle="Карточки материалов с характеристиками"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-16">
            <MaterialCard
              name="SIP-панели"
              image="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80"
              description="Структурно-изолированные панели с пенополистирольным утеплителем."
              eco
              properties={[
                { label: 'Толщина', value: '174 мм' },
                { label: 'R-фактор', value: '5.0' },
                { label: 'Класс', value: 'A+' },
                { label: 'Срок службы', value: '50+ лет' },
              ]}
            />
            <MaterialCard
              name="Профилированный брус"
              image="https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&q=80"
              description="Высушенный профилированный брус для каркасного строительства."
              properties={[
                { label: 'Сечение', value: '200×200 мм' },
                { label: 'Влажность', value: '12–14%' },
                { label: 'Порода', value: 'Сосна' },
                { label: 'Обработка', value: 'Антисептик' },
              ]}
            />
            <MaterialCard
              name="Минеральная вата"
              image="https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=600&q=80"
              description="Негорючий базальтовый утеплитель для стен, кровли и перекрытий."
              eco
              properties={[
                { label: 'Плотность', value: '50 кг/м³' },
                { label: 'Толщина', value: '150 мм' },
                { label: 'Горючесть', value: 'НГ' },
                { label: 'Теплопроводность', value: '0.035' },
              ]}
            />
          </div>

          {/* ====== PROJECTS ====== */}
          <SectionTitle
            id="projects"
            title="Реализованные проекты"
            subtitle="Портфолио завершённых работ"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            <CompletedProjectCard
              image="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80"
              title="Дом «Скандинавия-120»"
              location="Московская обл."
              year="2025"
              area="120 м²"
              category="Модульный"
              onClick={() => {}}
            />
            <CompletedProjectCard
              image="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80"
              title="Коттедж «Альпийский-250»"
              location="Ленинградская обл."
              year="2025"
              area="250 м²"
              category="Каркасный"
              onClick={() => {}}
            />
            <CompletedProjectCard
              image="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80"
              title="Эко-дом «Лесная поляна»"
              location="Тверская обл."
              year="2024"
              area="95 м²"
              category="Эко"
              onClick={() => {}}
            />
            <CompletedProjectCard
              image="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80"
              title="Вилла «Панорама-300»"
              location="Краснодарский край"
              year="2024"
              area="300 м²"
              category="Премиум"
              onClick={() => {}}
            />
          </div>

          {/* ====== TEAM ====== */}
          <SectionTitle
            id="team"
            title="Команда"
            subtitle="Карточки членов команды"
          />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            <TeamMemberCard
              name="Алексей Иванов"
              role="Главный архитектор"
              experience="15 лет опыта"
            />
            <TeamMemberCard
              name="Мария Петрова"
              role="Инженер-конструктор"
              experience="10 лет опыта"
            />
            <TeamMemberCard
              name="Дмитрий Сидоров"
              role="Прораб"
              experience="12 лет опыта"
            />
            <TeamMemberCard
              name="Елена Козлова"
              role="Дизайнер интерьеров"
              experience="8 лет опыта"
            />
          </div>

          {/* ====== TESTIMONIALS ====== */}
          <SectionTitle
            id="testimonials"
            title="Отзывы"
            subtitle="Карточки отзывов клиентов"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            <TestimonialCard
              name="Андрей Смирнов"
              rating={5}
              date="Февраль 2026"
              text="Отличная компания! Построили дом за 2.5 месяца. Качество на высшем уровне, все соседи завидуют. Рекомендую всем, кто хочет жить за городом."
            />
            <TestimonialCard
              name="Ольга Николаева"
              rating={4}
              date="Январь 2026"
              text="Дом получился тёплый и красивый. Немного задержали сроки из-за погоды, но в целом всё отлично. Зимой расход на отопление минимальный."
            />
          </div>

          {/* ====== ACCORDION ====== */}
          <SectionTitle
            id="accordion"
            title="Аккордеон (FAQ)"
            subtitle="Часто задаваемые вопросы"
          />

          <div className="mb-16">
            <Accordion
              items={[
                {
                  question: 'Сколько времени занимает строительство?',
                  answer:
                    'Среднее время строительства модульного дома — от 2 до 4 месяцев, в зависимости от площади и сложности проекта. Каркасные модули изготавливаются на заводе параллельно с подготовкой участка.',
                },
                {
                  question: 'Какие материалы вы используете?',
                  answer:
                    'Мы работаем с сертифицированными SIP-панелями, профилированным брусом, базальтовым утеплителем и другими экологичными материалами. Все материалы проходят контроль качества.',
                },
                {
                  question: 'Можно ли построить дом зимой?',
                  answer:
                    'Да, модульная технология позволяет вести строительство круглый год. Модули производятся в тёплом цеху, а монтаж на участке занимает всего несколько дней.',
                },
                {
                  question: 'Какая гарантия на дом?',
                  answer:
                    '15 лет на конструктив и 5 лет на инженерные системы. Мы также предлагаем сервисное обслуживание после сдачи объекта.',
                },
                {
                  question: 'Входит ли фундамент в стоимость?',
                  answer:
                    'Да, все наши пакеты включают свайно-винтовой фундамент. При необходимости можно выбрать ленточный или плитный фундамент за дополнительную плату.',
                },
              ]}
            />
          </div>

          {/* ====== ALERTS ====== */}
          <SectionTitle
            id="alerts"
            title="Уведомления"
            subtitle="Информационные блоки и алерты"
          />

          <div className="flex flex-col gap-4 mb-16">
            <div className="flex items-start gap-3 p-4 rounded-[15px] bg-[#4caf50]/10 border border-[#4caf50]/20">
              <Check size={20} className="text-[#4caf50] shrink-0 mt-0.5" />
              <div>
                <p className="text-base font-medium text-[#161b21]">
                  Заявка отправлена
                </p>
                <p className="text-sm text-[#737a82]">
                  Мы перезвоним вам в течение 30 минут
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-[15px] bg-[#2196f3]/10 border border-[#2196f3]/20">
              <Info size={20} className="text-[#2196f3] shrink-0 mt-0.5" />
              <div>
                <p className="text-base font-medium text-[#161b21]">
                  Акция до конца месяца
                </p>
                <p className="text-sm text-[#737a82]">
                  Скидка 10% на все проекты при заказе до 30 марта
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-[15px] bg-[#ffcd05]/10 border border-[#ffcd05]/20">
              <AlertTriangle
                size={20}
                className="text-[#b8930a] shrink-0 mt-0.5"
              />
              <div>
                <p className="text-base font-medium text-[#161b21]">
                  Требуется уточнение
                </p>
                <p className="text-sm text-[#737a82]">
                  Пожалуйста, загрузите план участка для расчёта
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-[15px] bg-[#ff402d]/10 border border-[#ff402d]/20">
              <X size={20} className="text-[#ff402d] shrink-0 mt-0.5" />
              <div>
                <p className="text-base font-medium text-[#161b21]">
                  Ошибка отправки
                </p>
                <p className="text-sm text-[#737a82]">
                  Проверьте подключение к интернету и попробуйте снова
                </p>
              </div>
            </div>
          </div>

          {/* ====== ANIMATIONS ====== */}
          <SectionTitle
            id="animations"
            title="Анимации"
            subtitle="CSS-анимации и переходы"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
            <Card variant="surface" padding="lg" className="text-center">
              <div className="animate-fade-in">
                <p className="text-base font-medium text-[#161b21]">Fade In</p>
                <p className="text-sm text-[#737a82]">.animate-fade-in</p>
              </div>
            </Card>

            <Card variant="surface" padding="lg" className="text-center">
              <div className="animate-fade-in-up">
                <p className="text-base font-medium text-[#161b21]">
                  Fade In Up
                </p>
                <p className="text-sm text-[#737a82]">.animate-fade-in-up</p>
              </div>
            </Card>

            <Card variant="surface" padding="lg" className="text-center">
              <div className="animate-scale-in">
                <p className="text-base font-medium text-[#161b21]">
                  Scale In
                </p>
                <p className="text-sm text-[#737a82]">.animate-scale-in</p>
              </div>
            </Card>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            <Card variant="surface" padding="lg">
              <p className="text-lg font-semibold text-[#161b21] mb-3">
                Button Hover Effects
              </p>
              <div className="flex flex-wrap gap-3">
                <button className="button-scale-hover px-5 py-3 bg-[#161b21] text-white rounded-full text-base font-medium">
                  Scale
                </button>
                <button className="button-lift-hover px-5 py-3 bg-[#161b21] text-white rounded-full text-base font-medium">
                  Lift
                </button>
                <button className="button-glow-hover px-5 py-3 gradient-primary text-white rounded-full text-base font-medium">
                  Glow
                </button>
              </div>
            </Card>

            <Card variant="surface" padding="lg">
              <p className="text-lg font-semibold text-[#161b21] mb-3">
                Link Animations
              </p>
              <div className="flex flex-col gap-3">
                <a href="#" className="link-underline text-[#161b21] text-base font-medium w-fit">
                  Underline Effect
                </a>
                <a
                  href="#"
                  className="link-underline-gradient text-[#161b21] text-base font-medium w-fit"
                >
                  Gradient Underline
                </a>
                <a href="#" className="link-slide-in text-[#161b21] text-base font-medium w-fit">
                  Slide In
                </a>
              </div>
            </Card>
          </div>

          <div className="mb-16">
            <Card variant="surface" padding="lg">
              <p className="text-lg font-semibold text-[#161b21] mb-3">
                Stagger Children
              </p>
              <p className="text-sm text-[#737a82] mb-4">
                .stagger-children &gt; * — дочерние элементы появляются последовательно
              </p>
              <div className="stagger-children grid grid-cols-4 md:grid-cols-8 gap-3">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    className="aspect-square rounded-[10px] gradient-primary flex items-center justify-center text-white font-bold text-sm"
                  >
                    {i + 1}
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* ====== SPACING REFERENCE ====== */}
          <div className="mt-8 mb-16">
            <SectionTitle
              id="spacing"
              title="Spacing & Radius"
              subtitle="Сетка отступов (8pt) и радиусы скругления"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card variant="surface" padding="lg">
                <h4 className="text-lg font-semibold text-[#161b21] mb-4">
                  Spacing (8pt grid)
                </h4>
                <div className="flex flex-col gap-3">
                  {[
                    { name: 'xs', value: '8px' },
                    { name: 'sm', value: '12px' },
                    { name: 'md', value: '16px' },
                    { name: 'lg', value: '20px' },
                    { name: 'xl', value: '24px' },
                    { name: '2xl', value: '32px' },
                    { name: '3xl', value: '40px' },
                    { name: '4xl', value: '48px' },
                    { name: '5xl', value: '64px' },
                    { name: '6xl', value: '80px' },
                  ].map((s) => (
                    <div
                      key={s.name}
                      className="flex items-center gap-4"
                    >
                      <span className="text-xs font-mono text-[#737a82] w-8">
                        {s.name}
                      </span>
                      <div
                        className="h-4 gradient-primary rounded"
                        style={{ width: s.value }}
                      />
                      <span className="text-xs text-[#737a82]">{s.value}</span>
                    </div>
                  ))}
                </div>
              </Card>

              <Card variant="surface" padding="lg">
                <h4 className="text-lg font-semibold text-[#161b21] mb-4">
                  Border Radius
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { name: 'xs', value: '6px' },
                    { name: 'sm', value: '10px' },
                    { name: 'md', value: '15px' },
                    { name: 'lg', value: '17px' },
                    { name: 'xl', value: '24px' },
                    { name: '2xl', value: '30px' },
                    { name: 'full', value: '9999px' },
                  ].map((r) => (
                    <div key={r.name} className="flex flex-col items-center gap-2">
                      <div
                        className="w-20 h-20 bg-[#161b21]"
                        style={{ borderRadius: r.value }}
                      />
                      <span className="text-sm font-medium text-[#161b21]">
                        {r.name}
                      </span>
                      <span className="text-xs text-[#737a82]">{r.value}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

