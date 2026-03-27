import { useEffect, useMemo, useRef, useState, type ChangeEvent } from 'react';
import { Link } from 'react-router';
import { clsx } from 'clsx';
import {
  Bell,
  Globe,
  House,
  Image,
  Inbox,
  Landmark,
  LayoutDashboard,
  MessageSquare,
  Pen,
  PenLine,
  Plus,
  Search,
  Settings,
  SlidersHorizontal,
  Upload,
} from 'lucide-react';
import { ScrollToTop } from '../components/ScrollToTop';
import { useSiteContent } from '../context/SiteContentContext';

type SectionKey =
  | 'dashboard'
  | 'pages'
  | 'catalog'
  | 'media'
  | 'settings'
  | 'filters'
  | 'mortgage'
  | 'blog';

type EditablePageKey = 'landing' | 'about' | 'services' | 'contact';

type MediaItem = {
  id: string;
  name: string;
  type: string;
  size: string;
};

type BlogItem = {
  id: string;
  title: string;
  category: string;
  description: string;
  coverImage: string;
  isActive: boolean;
};

const primarySections: Array<{ key: SectionKey; label: string; icon: typeof LayoutDashboard }> = [
  { key: 'dashboard', label: 'Дашборд', icon: LayoutDashboard },
  { key: 'pages', label: 'Страницы', icon: PenLine },
  { key: 'catalog', label: 'Каталог домов', icon: House },
  { key: 'media', label: 'Медиатека', icon: Image },
  { key: 'settings', label: 'Настройки', icon: Settings },
];

const secondarySections: Array<{ key: SectionKey; label: string; icon: typeof LayoutDashboard }> = [
  { key: 'filters', label: 'Фильтры', icon: SlidersHorizontal },
  { key: 'mortgage', label: 'Ипотека', icon: Landmark },
  { key: 'blog', label: 'Блог', icon: PenLine },
];

const initialMedia: MediaItem[] = [
  { id: 'm1', name: 'hero-house.jpg', type: 'Изображение', size: '2.4 MB' },
  { id: 'm2', name: 'catalog-grid.jpg', type: 'Изображение', size: '1.8 MB' },
  { id: 'm3', name: 'price-list.pdf', type: 'PDF', size: '0.6 MB' },
  { id: 'm4', name: 'brand-logo.svg', type: 'SVG', size: '0.1 MB' },
];

const initialBlogPosts: BlogItem[] = [
  {
    id: 'b1',
    title: 'Как выбрать модульный дом для семьи',
    category: 'Советы',
    description: 'Разбираем базовые критерии выбора: площадь, планировка, материалы и бюджет.',
    coverImage: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=1080',
    isActive: true,
  },
  {
    id: 'b2',
    title: 'Сравнение технологий утепления',
    category: 'Технологии',
    description: 'Сравнение популярных решений по энергоэффективности для модульных домов.',
    coverImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1080',
    isActive: false,
  },
  {
    id: 'b3',
    title: 'Сколько стоит модульный дом в 2026',
    category: 'Финансы',
    description: 'Разбиваем стоимость по этапам: проект, производство, монтаж и отделка.',
    coverImage: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1080',
    isActive: true,
  },
];

const activityRows = [
  {
    key: 'pages' as SectionKey,
    icon: Pen,
    iconBg: 'bg-[#eef4ff]',
    iconColor: 'text-[#3b82f6]',
    title: 'Обновлена страница «О компании»',
    subtitle: 'Админ · 15 мин назад',
  },
  {
    key: 'catalog' as SectionKey,
    icon: Plus,
    iconBg: 'bg-[#fff0ed]',
    iconColor: 'text-[#ff563f]',
    title: 'Добавлен новый дом «Альпийский 120»',
    subtitle: 'Админ · 2 ч назад',
  },
  {
    key: 'media' as SectionKey,
    icon: Upload,
    iconBg: 'bg-[#f0fdf4]',
    iconColor: 'text-[#22c55e]',
    title: 'Загружено 4 новых изображения',
    subtitle: 'Админ · 5 ч назад',
  },
  {
    key: 'mortgage' as SectionKey,
    icon: MessageSquare,
    iconBg: 'bg-[#fef3c7]',
    iconColor: 'text-[#f59e0b]',
    title: 'Новая заявка на ипотеку «Скандинавский»',
    subtitle: 'Клиент · вчера',
  },
];

const quickActions = [
  { key: 'catalog' as SectionKey, icon: Plus, iconBg: 'bg-[#ff563f]', title: 'Добавить дом', subtitle: 'Новая модель в каталог' },
  { key: 'pages' as SectionKey, icon: PenLine, iconBg: 'bg-[#3b82f6]', title: 'Редактировать страницу', subtitle: 'Изменить контент сайта' },
  { key: 'media' as SectionKey, icon: Upload, iconBg: 'bg-[#22c55e]', title: 'Загрузить медиа', subtitle: 'Фото и документы' },
  { key: 'settings' as SectionKey, icon: Settings, iconBg: 'bg-[#8b5cf6]', title: 'Настройки сайта', subtitle: 'SEO и общие параметры' },
];

const sectionTitles: Record<SectionKey, string> = {
  dashboard: 'Дашборд',
  pages: 'Страницы',
  catalog: 'Каталог домов',
  media: 'Медиатека',
  settings: 'Настройки',
  filters: 'Фильтры',
  mortgage: 'Ипотека',
  blog: 'Блог',
};

const editablePages: Array<{ key: EditablePageKey; label: string; subtitle: string }> = [
  { key: 'landing', label: 'Главная', subtitle: 'Hero, CTA и ключевые тексты' },
  { key: 'about', label: 'О компании', subtitle: 'Hero и структура секций страницы' },
  { key: 'services', label: 'Услуги', subtitle: 'Настройка блоков и порядка акцентов' },
  { key: 'contact', label: 'Контакты', subtitle: 'Hero, блоки связи и карта' },
];

const Field = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <label className="flex flex-col gap-2 text-sm font-medium text-[#161b21]">
    <span>{label}</span>
    {children}
  </label>
);

const inputClassName =
  'w-full rounded-lg border border-[#e5e7eb] bg-white px-3 py-2.5 text-sm text-[#161b21] outline-none transition focus:border-[#ff563f] focus:ring-2 focus:ring-[#ff563f]/20';

const secondaryButtonClassName =
  'inline-flex items-center justify-center rounded-lg border border-[#e5e7eb] bg-white px-4 py-2.5 text-sm font-medium text-[#161b21] transition hover:bg-[#fafafa]';

const primaryButtonClassName =
  'inline-flex items-center justify-center rounded-lg bg-[#ff563f] px-4 py-2.5 text-sm font-medium text-white transition hover:opacity-90';

export const AdminPage = () => {
  const {
    landingContent,
    mainPagesContent,
    products: productsState,
    setLandingContent,
    setMainPagesContent,
    setProducts,
    setSiteSettings,
    siteSettings,
  } = useSiteContent();
  const [currentSection, setCurrentSection] = useState<SectionKey>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [notificationCount, setNotificationCount] = useState(4);
  const [statusMessage, setStatusMessage] = useState('Рабочая админ-панель готова к использованию.');
  const [selectedPageKey, setSelectedPageKey] = useState<EditablePageKey>('landing');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(productsState[0]?.id ?? null);
  const imageUploadInputRef = useRef<HTMLInputElement | null>(null);

  const [mediaState, setMediaState] = useState<MediaItem[]>(initialMedia);
  const [blogState, setBlogState] = useState<BlogItem[]>(initialBlogPosts);
  const [filtersState, setFiltersState] = useState({
    minArea: '40',
    maxArea: '220',
    minPrice: '2500000',
    maxPrice: '12000000',
    styles: ['Скандинавский', 'Современный'],
    rooms: [2, 3],
    floors: [1, 2],
    onlyActive: true,
    onlyFeatured: false,
    onlyPopular: false,
    sortBy: 'area-asc',
    highlightedFirst: true,
    searchPlaceholder: 'Введите название проекта',
  });
  const [mortgageState, setMortgageState] = useState({
    minRate: '5.9',
    maxTerm: '30',
    partnerBank: 'СберБанк',
    firstPayment: '20',
  });

  const query = searchQuery.trim().toLowerCase();

  const filteredProducts = productsState.filter((item) =>
    [item.name, item.style, item.price, item.tagline, item.slug].some((value) =>
      value.toLowerCase().includes(query)
    )
  );
  const filteredMedia = mediaState.filter((item) =>
    [item.name, item.type, item.size].some((value) => value.toLowerCase().includes(query))
  );
  const filteredBlog = blogState.filter((item) =>
    [item.title, item.category, item.description, item.isActive ? 'активно' : 'не активно'].some((value) =>
      value.toLowerCase().includes(query)
    )
  );

  const availableStyles = useMemo(
    () => Array.from(new Set(productsState.map((item) => item.style))).sort((a, b) => a.localeCompare(b)),
    [productsState]
  );

  const filterPreviewCount = useMemo(() => {
    const minArea = Number(filtersState.minArea) || 0;
    const maxArea = Number(filtersState.maxArea) || Number.MAX_SAFE_INTEGER;
    const minPrice = Number(filtersState.minPrice) || 0;
    const maxPrice = Number(filtersState.maxPrice) || Number.MAX_SAFE_INTEGER;

    return productsState.filter((item) => {
      const styleMatched = filtersState.styles.length === 0 || filtersState.styles.includes(item.style);
      const roomsMatched = filtersState.rooms.length === 0 || filtersState.rooms.includes(item.rooms);
      const floorsMatched = filtersState.floors.length === 0 || filtersState.floors.includes(item.floors);
      const areaMatched = item.area >= minArea && item.area <= maxArea;
      const priceMatched = item.priceValue >= minPrice && item.priceValue <= maxPrice;
      const activeMatched = !filtersState.onlyActive || item.isActive !== false;
      const featuredMatched = !filtersState.onlyFeatured || item.featured;
      const popularMatched = !filtersState.onlyPopular || item.popular;

      return (
        styleMatched &&
        roomsMatched &&
        floorsMatched &&
        areaMatched &&
        priceMatched &&
        activeMatched &&
        featuredMatched &&
        popularMatched
      );
    }).length;
  }, [filtersState, productsState]);

  useEffect(() => {
    if (productsState.length === 0) {
      setSelectedProductId(null);
      return;
    }

    if (!selectedProductId || !productsState.some((item) => item.id === selectedProductId)) {
      setSelectedProductId(productsState[0].id);
    }
  }, [productsState, selectedProductId]);

  const selectedProduct = useMemo(
    () => productsState.find((item) => item.id === selectedProductId),
    [productsState, selectedProductId]
  );

  const selectedMainPageContent = selectedPageKey === 'landing' ? null : mainPagesContent[selectedPageKey];
  const totalEditablePageFields =
    Object.keys(landingContent).length +
    Object.values(mainPagesContent).reduce((total, page) => total + 3 + page.blocks.length * 3, 0);

  const saveMessage = (text: string) => setStatusMessage(text);

  const updateSelectedMainPageContent = (
    updater: (page: (typeof mainPagesContent)['about']) => (typeof mainPagesContent)['about']
  ) => {
    if (selectedPageKey === 'landing') {
      return;
    }

    setMainPagesContent((current) => ({
      ...current,
      [selectedPageKey]: updater(current[selectedPageKey]),
    }));
  };

  const updateSelectedMainPageBlock = (
    blockId: string,
    updater: (block: NonNullable<(typeof mainPagesContent)['about']['blocks'][number]>) => NonNullable<(typeof mainPagesContent)['about']['blocks'][number]>
  ) => {
    updateSelectedMainPageContent((page) => ({
      ...page,
      blocks: page.blocks.map((block) => (block.id === blockId ? updater(block) : block)),
    }));
  };

  const addProduct = () => {
    const newId = `${Date.now()}`;
    setProducts((current) => [
      {
        id: newId,
        slug: `new-house-${current.length + 1}`,
        name: 'Новый дом',
        tagline: 'Новая модель в каталоге',
        price: 'от 0 ₽',
        priceValue: 0,
        description: 'Описание новой модели можно изменить в админ-панели.',
        area: 60,
        rooms: 2,
        bedrooms: 2,
        bathrooms: 1,
        floors: 1,
        buildTime: '60 дней',
        materials: 'SIP-панели',
        warranty: '15 лет',
        style: 'Современный',
        isActive: true,
        featured: false,
        popular: false,
        images: [
          {
            url: 'https://images.unsplash.com/photo-1768637087224-cffa17561c53?w=1080',
            alt: 'Новый модульный дом',
            category: 'exterior',
          },
        ],
        downloadableFiles: [],
        features: ['Новая характеристика'],
        benefits: ['Новое преимущество'],
        customizationOptions: ['Новая опция'],
      },
      ...current,
    ]);
    setSelectedProductId(newId);
    setCurrentSection('catalog');
    saveMessage('Новая модель добавлена в каталог.');
  };

  const updateSelectedProduct = (updater: (item: (typeof productsState)[number]) => (typeof productsState)[number]) => {
    if (!selectedProductId) {
      return;
    }

    setProducts((current) =>
      current.map((item) => (item.id === selectedProductId ? updater(item) : item))
    );
  };

  const handleImageFilesUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);

    if (files.length === 0) {
      return;
    }

    const maxFileSizeMb = 5;
    const validFiles = files.filter((file) => file.size <= maxFileSizeMb * 1024 * 1024);

    if (validFiles.length === 0) {
      saveMessage(`Не удалось загрузить файлы: размер каждого должен быть до ${maxFileSizeMb} MB.`);
      event.target.value = '';
      return;
    }

    const readAsDataUrl = (file: File) =>
      new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(String(reader.result));
        reader.onerror = () => reject(new Error(`Не удалось прочитать файл ${file.name}`));
        reader.readAsDataURL(file);
      });

    try {
      const uploadedImages = await Promise.all(validFiles.map(async (file) => ({
        url: await readAsDataUrl(file),
        alt: file.name.replace(/\.[^/.]+$/, ''),
        category: 'exterior' as const,
      })));

      updateSelectedProduct((item) => ({
        ...item,
        images: [...item.images, ...uploadedImages],
      }));

      saveMessage(`Загружено изображений: ${uploadedImages.length}.`);
    } catch {
      saveMessage('Ошибка загрузки изображения. Попробуйте другой файл.');
    } finally {
      event.target.value = '';
    }
  };

  const addMedia = () => {
    setMediaState((current) => [
      {
        id: `${Date.now()}`,
        name: `upload-${current.length + 1}.jpg`,
        type: 'Изображение',
        size: '1.0 MB',
      },
      ...current,
    ]);
    setCurrentSection('media');
    saveMessage('Новая запись в медиатеке создана.');
  };

  const addBlogPost = () => {
    setBlogState((current) => [
      {
        id: `${Date.now()}`,
        title: 'Новая статья',
        category: 'Новости',
        description: 'Краткое описание статьи',
        coverImage: 'https://images.unsplash.com/photo-1448630360428-65456885c650?w=1080',
        isActive: true,
      },
      ...current,
    ]);
    setCurrentSection('blog');
    saveMessage('Новая статья блога создана.');
  };

  const updateBlogPost = (postId: string, updater: (post: BlogItem) => BlogItem) => {
    setBlogState((current) => current.map((item) => (item.id === postId ? updater(item) : item)));
  };

  const handleBlogCoverUpload = async (postId: string, event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const maxFileSizeMb = 5;
    if (file.size > maxFileSizeMb * 1024 * 1024) {
      saveMessage(`Файл слишком большой. Максимум ${maxFileSizeMb} MB.`);
      event.target.value = '';
      return;
    }

    const readAsDataUrl = () =>
      new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(String(reader.result));
        reader.onerror = () => reject(new Error(`Не удалось прочитать файл ${file.name}`));
        reader.readAsDataURL(file);
      });

    try {
      const imageUrl = await readAsDataUrl();
      updateBlogPost(postId, (post) => ({ ...post, coverImage: imageUrl }));
      saveMessage(`Обложка статьи обновлена: ${file.name}`);
    } catch {
      saveMessage('Не удалось загрузить изображение статьи.');
    } finally {
      event.target.value = '';
    }
  };

  const handleQuickAction = (key: SectionKey) => {
    if (key === 'catalog') {
      addProduct();
      return;
    }
    if (key === 'pages') {
      setCurrentSection('pages');
      saveMessage('Открыт редактор значений публичных страниц.');
      return;
    }
    if (key === 'media') {
      addMedia();
      return;
    }
    setCurrentSection(key);
    saveMessage(`Открыт раздел «${sectionTitles[key]}».`);
  };

  return (
    <div className="min-h-screen bg-[#f5f5f7]">
      <ScrollToTop />
      <div className="mx-auto flex min-h-screen w-full max-w-[1440px]">
        <aside className="hidden w-[260px] shrink-0 bg-[#161b21] px-5 py-6 lg:flex lg:flex-col">
          <div className="mb-6 flex items-center gap-2.5 border-b border-[#2a3140] pb-6">
            <div className="h-8 w-8 rounded-lg bg-[#ff563f]" />
            <span className="text-[18px] font-bold text-white">{siteSettings.siteName}</span>
          </div>

          <div className="border-b border-[#2a3140] py-4">
            <p className="mb-2 text-[11px] font-semibold tracking-wide text-[#737a82]">МЕНЮ</p>
            <nav className="space-y-1">
              {primarySections.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    type="button"
                    key={item.key}
                    onClick={() => setCurrentSection(item.key)}
                    className={clsx(
                      'flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm',
                      currentSection === item.key
                        ? 'bg-[#ff563f] text-white'
                        : 'text-[#a0a7b0] hover:bg-[#202733]'
                    )}
                  >
                    <Icon size={18} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="pt-4">
            <p className="mb-2 text-[11px] font-semibold tracking-wide text-[#737a82]">ИНТЕГРАЦИИ</p>
            <nav className="space-y-1">
              {secondarySections.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    type="button"
                    key={item.key}
                    onClick={() => setCurrentSection(item.key)}
                    className={clsx(
                      'flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm',
                      currentSection === item.key
                        ? 'bg-[#ff563f] text-white'
                        : 'text-[#a0a7b0] hover:bg-[#202733]'
                    )}
                  >
                    <Icon size={18} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="mt-auto pt-6">
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-lg border border-[#2a3140] px-3 py-2 text-sm text-[#d1d5db] hover:bg-[#202733]"
            >
              <Globe size={16} />
              На сайт
            </Link>
          </div>
        </aside>

        <main className="flex min-w-0 flex-1 flex-col">
          <header className="flex flex-col gap-4 border-b border-[#ececf1] bg-white px-4 py-4 sm:px-8 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-[22px] font-semibold text-[#161b21]">{sectionTitles[currentSection]}</h1>
              <p className="mt-1 text-sm text-[#737a82]">{statusMessage}</p>
            </div>

            <div className="flex items-center gap-3 sm:gap-4">
              <div className="flex min-w-0 flex-1 items-center gap-2 rounded-lg bg-[#f5f5f7] px-3.5 py-2 sm:min-w-[240px]">
                <Search size={16} className="text-[#737a82]" />
                <input
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Поиск..."
                  className="min-w-0 flex-1 bg-transparent text-[13px] text-[#161b21] outline-none placeholder:text-[#a0a7b0]"
                />
              </div>

              <button
                type="button"
                onClick={() => {
                  setNotificationCount(0);
                  saveMessage('Уведомления отмечены как просмотренные.');
                }}
                className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-[#f5f5f7] text-[#737a82]"
              >
                <Bell size={18} />
                {notificationCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#ff563f] px-1 text-[10px] font-semibold text-white">
                    {notificationCount}
                  </span>
                )}
              </button>

              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#ff563f] text-[13px] font-semibold text-white">
                АД
              </div>
            </div>
          </header>

          <div className="border-b border-[#ececf1] bg-white px-4 py-3 sm:px-8 lg:hidden">
            <div className="flex gap-2 overflow-x-auto pb-1">
              {[...primarySections, ...secondarySections].map((item) => (
                <button
                  type="button"
                  key={item.key}
                  onClick={() => setCurrentSection(item.key)}
                  className={clsx(
                    'whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium',
                    currentSection === item.key
                      ? 'bg-[#ff563f] text-white'
                      : 'bg-[#f5f5f7] text-[#161b21]'
                  )}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-1 flex-col gap-6 px-4 py-6 sm:px-8">
            {currentSection === 'dashboard' && (
              <>
                <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                  <button
                    type="button"
                    onClick={() => setCurrentSection('catalog')}
                    className="rounded-xl bg-white p-6 text-left"
                  >
                    <div className="mb-3 flex items-center justify-between">
                      <span className="text-[13px] text-[#737a82]">Модели домов</span>
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#fff0ed]">
                        <House size={16} className="text-[#ff563f]" />
                      </div>
                    </div>
                    <p className="text-[42px] font-semibold leading-none text-[#161b21]">{productsState.length}</p>
                    <p className="mt-2 text-xs text-[#22c55e]">Управление каталогом</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setCurrentSection('pages')}
                    className="rounded-xl bg-white p-6 text-left"
                  >
                    <div className="mb-3 flex items-center justify-between">
                      <span className="text-[13px] text-[#737a82]">Страницы</span>
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#eef4ff]">
                        <PenLine size={16} className="text-[#3b82f6]" />
                      </div>
                    </div>
                    <p className="text-[42px] font-semibold leading-none text-[#161b21]">{totalEditablePageFields}</p>
                    <p className="mt-2 text-xs text-[#22c55e]">Редактирование значений сайта</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setCurrentSection('media')}
                    className="rounded-xl bg-white p-6 text-left"
                  >
                    <div className="mb-3 flex items-center justify-between">
                      <span className="text-[13px] text-[#737a82]">Медиафайлы</span>
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#f0fdf4]">
                        <Image size={16} className="text-[#22c55e]" />
                      </div>
                    </div>
                    <p className="text-[42px] font-semibold leading-none text-[#161b21]">{mediaState.length}</p>
                    <p className="mt-2 text-xs text-[#737a82]">Активные файлы и документы</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setCurrentSection('mortgage')}
                    className="rounded-xl bg-white p-6 text-left"
                  >
                    <div className="mb-3 flex items-center justify-between">
                      <span className="text-[13px] text-[#737a82]">Заявки</span>
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#fef3c7]">
                        <Inbox size={16} className="text-[#f59e0b]" />
                      </div>
                    </div>
                    <p className="text-[42px] font-semibold leading-none text-[#161b21]">24</p>
                    <p className="mt-2 text-xs text-[#ff563f]">5 новых обращений</p>
                  </button>
                </section>

                <section className="grid flex-1 gap-5 xl:grid-cols-[1fr_320px]">
                  <article className="overflow-hidden rounded-xl bg-white">
                    <div className="flex items-center justify-between px-6 py-4">
                      <h2 className="text-[15px] font-semibold text-[#161b21]">Последние действия</h2>
                      <button
                        type="button"
                        onClick={() => setCurrentSection('pages')}
                        className="text-[13px] text-[#ff563f]"
                      >
                        Все действия →
                      </button>
                    </div>
                    <div className="h-px bg-[#f0f0f0]" />

                    {activityRows.map((row, idx) => {
                      const Icon = row.icon;
                      return (
                        <div key={row.title}>
                          <button
                            type="button"
                            onClick={() => {
                              setCurrentSection(row.key);
                              saveMessage(`Открыт раздел «${sectionTitles[row.key]}» по действию журнала.`);
                            }}
                            className="flex w-full items-center gap-3 px-6 py-3 text-left hover:bg-[#fafafa]"
                          >
                            <div className={`flex h-9 w-9 items-center justify-center rounded-full ${row.iconBg}`}>
                              <Icon size={14} className={row.iconColor} />
                            </div>
                            <div className="min-w-0">
                              <p className="truncate text-[13px] text-[#161b21]">{row.title}</p>
                              <p className="text-xs text-[#a0a7b0]">{row.subtitle}</p>
                            </div>
                          </button>
                          {idx < activityRows.length - 1 && <div className="h-px bg-[#f0f0f0]" />}
                        </div>
                      );
                    })}
                  </article>

                  <article className="overflow-hidden rounded-xl bg-white">
                    <div className="px-6 py-4">
                      <h2 className="text-[15px] font-semibold text-[#161b21]">Быстрые действия</h2>
                    </div>
                    <div className="h-px bg-[#f0f0f0]" />

                    {quickActions.map((action, idx) => {
                      const Icon = action.icon;
                      return (
                        <div key={action.title}>
                          <button
                            type="button"
                            onClick={() => handleQuickAction(action.key)}
                            className="flex w-full items-center gap-3 px-6 py-3.5 text-left hover:bg-[#fafafa]"
                          >
                            <div className={`flex h-10 w-10 items-center justify-center rounded-[10px] ${action.iconBg}`}>
                              <Icon size={18} className="text-white" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-[#161b21]">{action.title}</p>
                              <p className="text-xs text-[#a0a7b0]">{action.subtitle}</p>
                            </div>
                          </button>
                          {idx < quickActions.length - 1 && <div className="h-px bg-[#f0f0f0]" />}
                        </div>
                      );
                    })}
                  </article>
                </section>
              </>
            )}

            {currentSection === 'pages' && (
              <section className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h2 className="text-lg font-semibold text-[#161b21]">Настройки главных страниц</h2>
                  <button
                    type="button"
                    onClick={() => saveMessage('Настройки страниц сохранены и сразу применены на сайте.')}
                    className={primaryButtonClassName}
                  >
                    Сохранить значения
                  </button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {editablePages.map((page) => (
                    <button
                      key={page.key}
                      type="button"
                      onClick={() => {
                        setSelectedPageKey(page.key);
                        saveMessage(`Открыты настройки страницы «${page.label}».`);
                      }}
                      className={clsx(
                        'rounded-full border px-4 py-2 text-sm font-medium transition',
                        selectedPageKey === page.key
                          ? 'border-[#ff563f] bg-[#fff5f3] text-[#ff563f]'
                          : 'border-[#e5e7eb] bg-white text-[#161b21] hover:bg-[#fafafa]'
                      )}
                    >
                      {page.label}
                    </button>
                  ))}
                </div>

                <article className="rounded-xl bg-white p-5">
                  <p className="text-sm font-semibold text-[#161b21]">
                    {editablePages.find((page) => page.key === selectedPageKey)?.label}
                  </p>
                  <p className="mt-1 text-xs text-[#737a82]">
                    {editablePages.find((page) => page.key === selectedPageKey)?.subtitle}
                  </p>
                </article>

                {selectedPageKey === 'landing' ? (
                  <div className="grid gap-4 lg:grid-cols-2">
                    <article className="rounded-xl bg-white p-5">
                      <div className="grid gap-4">
                        <Field label="Бейдж в hero-блоке">
                          <input
                            className={inputClassName}
                            value={landingContent.badge}
                            onChange={(event) =>
                              setLandingContent((current) => ({ ...current, badge: event.target.value }))
                            }
                          />
                        </Field>
                        <Field label="Главный заголовок">
                          <textarea
                            className={inputClassName}
                            value={landingContent.heroTitle}
                            rows={3}
                            onChange={(event) =>
                              setLandingContent((current) => ({ ...current, heroTitle: event.target.value }))
                            }
                          />
                        </Field>
                        <Field label="Описание">
                          <textarea
                            className={inputClassName}
                            value={landingContent.heroDescription}
                            rows={4}
                            onChange={(event) =>
                              setLandingContent((current) => ({ ...current, heroDescription: event.target.value }))
                            }
                          />
                        </Field>
                        <Field label="Текст основной кнопки">
                          <input
                            className={inputClassName}
                            value={landingContent.primaryCtaLabel}
                            onChange={(event) =>
                              setLandingContent((current) => ({ ...current, primaryCtaLabel: event.target.value }))
                            }
                          />
                        </Field>
                        <Field label="Текст вторичной кнопки">
                          <input
                            className={inputClassName}
                            value={landingContent.secondaryCtaLabel}
                            onChange={(event) =>
                              setLandingContent((current) => ({ ...current, secondaryCtaLabel: event.target.value }))
                            }
                          />
                        </Field>
                      </div>
                    </article>

                    <article className="rounded-xl bg-white p-5">
                      <div className="grid gap-4">
                        <Field label="Статистика: построенных домов">
                          <input
                            className={inputClassName}
                            value={landingContent.statHomes}
                            onChange={(event) =>
                              setLandingContent((current) => ({ ...current, statHomes: event.target.value }))
                            }
                          />
                        </Field>
                        <Field label="Статистика: срок строительства">
                          <input
                            className={inputClassName}
                            value={landingContent.statBuildTime}
                            onChange={(event) =>
                              setLandingContent((current) => ({ ...current, statBuildTime: event.target.value }))
                            }
                          />
                        </Field>
                        <Field label="Статистика: гарантия">
                          <input
                            className={inputClassName}
                            value={landingContent.statWarranty}
                            onChange={(event) =>
                              setLandingContent((current) => ({ ...current, statWarranty: event.target.value }))
                            }
                          />
                        </Field>
                        <Field label="Заголовок блока каталога">
                          <input
                            className={inputClassName}
                            value={landingContent.featuredTitle}
                            onChange={(event) =>
                              setLandingContent((current) => ({ ...current, featuredTitle: event.target.value }))
                            }
                          />
                        </Field>
                        <Field label="Заголовок CTA блока">
                          <input
                            className={inputClassName}
                            value={landingContent.ctaTitle}
                            onChange={(event) =>
                              setLandingContent((current) => ({ ...current, ctaTitle: event.target.value }))
                            }
                          />
                        </Field>
                        <Field label="Описание CTA блока">
                          <textarea
                            className={inputClassName}
                            value={landingContent.ctaDescription}
                            rows={3}
                            onChange={(event) =>
                              setLandingContent((current) => ({ ...current, ctaDescription: event.target.value }))
                            }
                          />
                        </Field>
                      </div>
                    </article>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <article className="rounded-xl bg-white p-5">
                      <div className="grid gap-4 lg:grid-cols-3">
                        <Field label="Бейдж страницы">
                          <input
                            className={inputClassName}
                            value={selectedMainPageContent?.badge ?? ''}
                            onChange={(event) =>
                              updateSelectedMainPageContent((page) => ({ ...page, badge: event.target.value }))
                            }
                          />
                        </Field>
                        <Field label="Hero заголовок">
                          <input
                            className={inputClassName}
                            value={selectedMainPageContent?.heroTitle ?? ''}
                            onChange={(event) =>
                              updateSelectedMainPageContent((page) => ({ ...page, heroTitle: event.target.value }))
                            }
                          />
                        </Field>
                        <Field label="Hero описание">
                          <textarea
                            className={inputClassName}
                            value={selectedMainPageContent?.heroDescription ?? ''}
                            rows={2}
                            onChange={(event) =>
                              updateSelectedMainPageContent((page) => ({ ...page, heroDescription: event.target.value }))
                            }
                          />
                        </Field>
                      </div>
                    </article>

                    <div className="flex items-center justify-between rounded-xl bg-white px-5 py-4">
                      <p className="text-sm font-semibold text-[#161b21]">Блоки страницы</p>
                      <button
                        type="button"
                        onClick={() => {
                          const now = Date.now();
                          updateSelectedMainPageContent((page) => ({
                            ...page,
                            blocks: [
                              ...page.blocks,
                              {
                                id: `block-${now}`,
                                title: `Новый блок ${page.blocks.length + 1}`,
                                description: 'Описание нового блока',
                                isVisible: true,
                              },
                            ],
                          }));
                        }}
                        className={secondaryButtonClassName}
                      >
                        <Plus size={16} className="mr-1" />
                        Добавить блок
                      </button>
                    </div>

                    <div className="grid gap-4">
                      {(selectedMainPageContent?.blocks ?? []).map((block) => (
                        <article key={block.id} className="rounded-xl border border-[#ececf1] bg-white p-5">
                          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                            <p className="text-sm font-semibold text-[#161b21]">ID блока: {block.id}</p>
                            <div className="flex items-center gap-2">
                              <label className="inline-flex items-center gap-2 rounded-full border border-[#e5e7eb] px-3 py-1.5 text-xs font-medium text-[#161b21]">
                                <input
                                  type="checkbox"
                                  checked={block.isVisible}
                                  onChange={(event) =>
                                    updateSelectedMainPageBlock(block.id, (current) => ({
                                      ...current,
                                      isVisible: event.target.checked,
                                    }))
                                  }
                                />
                                Показывать
                              </label>
                              <button
                                type="button"
                                onClick={() =>
                                  updateSelectedMainPageContent((page) => ({
                                    ...page,
                                    blocks: page.blocks.filter((item) => item.id !== block.id),
                                  }))
                                }
                                className="rounded-lg border border-[#fecaca] px-3 py-1.5 text-xs font-medium text-[#dc2626] transition hover:bg-[#fef2f2]"
                              >
                                Удалить
                              </button>
                            </div>
                          </div>

                          <div className="grid gap-4 lg:grid-cols-2">
                            <Field label="Заголовок блока">
                              <input
                                className={inputClassName}
                                value={block.title}
                                onChange={(event) =>
                                  updateSelectedMainPageBlock(block.id, (current) => ({
                                    ...current,
                                    title: event.target.value,
                                  }))
                                }
                              />
                            </Field>
                            <Field label="Описание блока">
                              <textarea
                                className={inputClassName}
                                value={block.description}
                                rows={2}
                                onChange={(event) =>
                                  updateSelectedMainPageBlock(block.id, (current) => ({
                                    ...current,
                                    description: event.target.value,
                                  }))
                                }
                              />
                            </Field>
                          </div>
                        </article>
                      ))}
                    </div>
                  </div>
                )}
              </section>
            )}

            {currentSection === 'catalog' && (
              <section className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h2 className="text-lg font-semibold text-[#161b21]">Редактор каталога</h2>
                  <button type="button" onClick={addProduct} className={primaryButtonClassName}>
                    Добавить дом
                  </button>
                </div>

                <div className="grid gap-4 lg:grid-cols-[300px_1fr]">
                  <aside className="rounded-xl bg-white p-4">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-[#737a82]">Проекты</p>
                    <div className="max-h-[70vh] space-y-2 overflow-auto pr-1">
                      {filteredProducts.map((product) => (
                        <button
                          type="button"
                          key={product.id}
                          onClick={() => setSelectedProductId(product.id)}
                          className={clsx(
                            'flex w-full items-center gap-3 rounded-lg border px-3 py-2.5 text-left',
                            selectedProductId === product.id
                              ? 'border-[#ff563f] bg-[#fff5f3]'
                              : 'border-[#ececf1] hover:bg-[#f9fafb]'
                          )}
                        >
                          <img
                            src={product.images[0]?.url ?? 'https://images.unsplash.com/photo-1768637087224-cffa17561c53?w=300'}
                            alt={product.name}
                            className="h-12 w-12 rounded-md object-cover"
                          />
                          <div className="min-w-0">
                            <p className="truncate text-sm font-semibold text-[#161b21]">{product.name}</p>
                            <p className="truncate text-xs text-[#737a82]">{product.price}</p>
                            <p className={clsx('text-[11px] font-semibold', product.isActive === false ? 'text-[#ef4444]' : 'text-[#22c55e]')}>
                              {product.isActive === false ? 'Выключен' : 'Включен'}
                            </p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </aside>

                  {selectedProduct ? (
                    <article className="space-y-4 rounded-xl bg-white p-5">
                      <div className="grid gap-4 lg:grid-cols-2">
                        <Field label="Название модели">
                          <input
                            className={inputClassName}
                            value={selectedProduct.name}
                            onChange={(event) =>
                              updateSelectedProduct((item) => ({ ...item, name: event.target.value }))
                            }
                          />
                        </Field>
                        <Field label="Slug страницы">
                          <input
                            className={inputClassName}
                            value={selectedProduct.slug}
                            onChange={(event) =>
                              updateSelectedProduct((item) => ({ ...item, slug: event.target.value }))
                            }
                          />
                        </Field>
                        <Field label="Подзаголовок">
                          <input
                            className={inputClassName}
                            value={selectedProduct.tagline}
                            onChange={(event) =>
                              updateSelectedProduct((item) => ({ ...item, tagline: event.target.value }))
                            }
                          />
                        </Field>
                        <Field label="Стиль">
                          <input
                            className={inputClassName}
                            value={selectedProduct.style}
                            onChange={(event) =>
                              updateSelectedProduct((item) => ({ ...item, style: event.target.value }))
                            }
                          />
                        </Field>
                        <Field label="Цена">
                          <input
                            className={inputClassName}
                            value={selectedProduct.price}
                            onChange={(event) =>
                              updateSelectedProduct((item) => ({ ...item, price: event.target.value }))
                            }
                          />
                        </Field>
                        <Field label="Числовая цена">
                          <input
                            className={inputClassName}
                            type="number"
                            value={selectedProduct.priceValue}
                            onChange={(event) =>
                              updateSelectedProduct((item) => ({
                                ...item,
                                priceValue: Number(event.target.value) || 0,
                              }))
                            }
                          />
                        </Field>
                        <Field label="Площадь, м²">
                          <input
                            className={inputClassName}
                            type="number"
                            value={selectedProduct.area}
                            onChange={(event) =>
                              updateSelectedProduct((item) => ({ ...item, area: Number(event.target.value) || 0 }))
                            }
                          />
                        </Field>
                        <label className="flex items-center gap-3 text-sm font-medium text-[#161b21]">
                          <input
                            type="checkbox"
                            checked={selectedProduct.isActive !== false}
                            onChange={(event) =>
                              updateSelectedProduct((item) => ({ ...item, isActive: event.target.checked }))
                            }
                          />
                          Проект включен на сайте
                        </label>
                        <label className="flex items-center gap-3 text-sm font-medium text-[#161b21]">
                          <input
                            type="checkbox"
                            checked={Boolean(selectedProduct.featured)}
                            onChange={(event) =>
                              updateSelectedProduct((item) => ({ ...item, featured: event.target.checked }))
                            }
                          />
                          Показывать как рекомендуемую модель
                        </label>
                      </div>

                      <section className="rounded-xl border border-[#ececf1] p-4">
                        <input
                          ref={imageUploadInputRef}
                          type="file"
                          accept="image/*"
                          multiple
                          className="hidden"
                          onChange={handleImageFilesUpload}
                        />
                        <div className="mb-3 flex items-center justify-between">
                          <h3 className="text-sm font-semibold text-[#161b21]">Изображения проекта</h3>
                          <div className="flex flex-wrap gap-2">
                            <button
                              type="button"
                              onClick={() => imageUploadInputRef.current?.click()}
                              className={primaryButtonClassName}
                            >
                              Загрузить с компьютера
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                updateSelectedProduct((item) => ({
                                  ...item,
                                  images: [
                                    ...item.images,
                                    {
                                      url: 'https://images.unsplash.com/photo-1768637087224-cffa17561c53?w=1080',
                                      alt: 'Новое изображение',
                                      category: 'exterior',
                                    },
                                  ],
                                }))
                              }
                              className={secondaryButtonClassName}
                            >
                              Добавить по URL
                            </button>
                          </div>
                        </div>

                        <div className="space-y-3">
                          {selectedProduct.images.map((image, index) => (
                            <div key={`${image.url}-${index}`} className="grid gap-3 rounded-lg border border-[#f0f0f0] p-3 lg:grid-cols-[110px_1fr_200px_auto] lg:items-center">
                              <img src={image.url} alt={image.alt} className="h-20 w-full rounded-md object-cover" />
                              <input
                                className={inputClassName}
                                value={image.url}
                                onChange={(event) =>
                                  updateSelectedProduct((item) => ({
                                    ...item,
                                    images: item.images.map((img, idx) =>
                                      idx === index ? { ...img, url: event.target.value } : img
                                    ),
                                  }))
                                }
                                placeholder="URL изображения"
                              />
                              <div className="grid gap-2">
                                <input
                                  className={inputClassName}
                                  value={image.alt}
                                  onChange={(event) =>
                                    updateSelectedProduct((item) => ({
                                      ...item,
                                      images: item.images.map((img, idx) =>
                                        idx === index ? { ...img, alt: event.target.value } : img
                                      ),
                                    }))
                                  }
                                  placeholder="Alt текст"
                                />
                                <select
                                  className={inputClassName}
                                  value={image.category ?? 'exterior'}
                                  onChange={(event) =>
                                    updateSelectedProduct((item) => ({
                                      ...item,
                                      images: item.images.map((img, idx) =>
                                        idx === index
                                          ? {
                                              ...img,
                                              category: event.target.value as 'exterior' | 'interior' | 'plan',
                                            }
                                          : img
                                      ),
                                    }))
                                  }
                                >
                                  <option value="exterior">Экстерьер</option>
                                  <option value="interior">Интерьер</option>
                                  <option value="plan">Планировка</option>
                                </select>
                              </div>
                              <button
                                type="button"
                                onClick={() =>
                                  updateSelectedProduct((item) => ({
                                    ...item,
                                    images: item.images.length > 1
                                      ? item.images.filter((_, idx) => idx !== index)
                                      : item.images,
                                  }))
                                }
                                className={secondaryButtonClassName}
                              >
                                Удалить
                              </button>
                            </div>
                          ))}
                        </div>
                      </section>

                      <section className="rounded-xl border border-[#ececf1] p-4">
                        <div className="mb-3 flex items-center justify-between">
                          <h3 className="text-sm font-semibold text-[#161b21]">Файлы для скачивания проекта</h3>
                          <button
                            type="button"
                            onClick={() =>
                              updateSelectedProduct((item) => ({
                                ...item,
                                downloadableFiles: [
                                  ...(item.downloadableFiles ?? []),
                                  {
                                    id: `${Date.now()}`,
                                    name: 'План проекта PDF',
                                    url: 'https://example.com/project-plan.pdf',
                                  },
                                ],
                              }))
                            }
                            className={secondaryButtonClassName}
                          >
                            Добавить файл
                          </button>
                        </div>

                        <div className="space-y-3">
                          {(selectedProduct.downloadableFiles ?? []).map((file, index) => (
                            <div key={file.id} className="grid gap-3 rounded-lg border border-[#f0f0f0] p-3 lg:grid-cols-[220px_1fr_auto] lg:items-center">
                              <input
                                className={inputClassName}
                                value={file.name}
                                onChange={(event) =>
                                  updateSelectedProduct((item) => ({
                                    ...item,
                                    downloadableFiles: (item.downloadableFiles ?? []).map((entry, idx) =>
                                      idx === index ? { ...entry, name: event.target.value } : entry
                                    ),
                                  }))
                                }
                                placeholder="Название файла"
                              />
                              <input
                                className={inputClassName}
                                value={file.url}
                                onChange={(event) =>
                                  updateSelectedProduct((item) => ({
                                    ...item,
                                    downloadableFiles: (item.downloadableFiles ?? []).map((entry, idx) =>
                                      idx === index ? { ...entry, url: event.target.value } : entry
                                    ),
                                  }))
                                }
                                placeholder="URL файла"
                              />
                              <button
                                type="button"
                                onClick={() =>
                                  updateSelectedProduct((item) => ({
                                    ...item,
                                    downloadableFiles: (item.downloadableFiles ?? []).filter((_, idx) => idx !== index),
                                  }))
                                }
                                className={secondaryButtonClassName}
                              >
                                Удалить
                              </button>
                            </div>
                          ))}
                        </div>
                      </section>

                      <div className="flex gap-3">
                        <button
                          type="button"
                          onClick={() => saveMessage(`Карточка «${selectedProduct.name}» обновлена.`)}
                          className={primaryButtonClassName}
                        >
                          Сохранить
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            setProducts((current) => current.filter((item) => item.id !== selectedProduct.id))
                          }
                          className={secondaryButtonClassName}
                        >
                          Удалить проект
                        </button>
                      </div>
                    </article>
                  ) : (
                    <article className="rounded-xl bg-white p-10 text-center text-[#737a82]">
                      Выберите проект из списка слева
                    </article>
                  )}
                </div>
              </section>
            )}

            {currentSection === 'media' && (
              <section className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h2 className="text-lg font-semibold text-[#161b21]">Медиатека</h2>
                  <button type="button" onClick={addMedia} className={primaryButtonClassName}>
                    Загрузить файл
                  </button>
                </div>

                <div className="overflow-hidden rounded-xl bg-white">
                  {filteredMedia.map((item, idx) => (
                    <div key={item.id}>
                      <div className="grid gap-4 px-5 py-4 md:grid-cols-[1.2fr_140px_120px_auto] md:items-center">
                        <input
                          className={inputClassName}
                          value={item.name}
                          onChange={(event) =>
                            setMediaState((current) =>
                              current.map((media) =>
                                media.id === item.id ? { ...media, name: event.target.value } : media
                              )
                            )
                          }
                        />
                        <input
                          className={inputClassName}
                          value={item.type}
                          onChange={(event) =>
                            setMediaState((current) =>
                              current.map((media) =>
                                media.id === item.id ? { ...media, type: event.target.value } : media
                              )
                            )
                          }
                        />
                        <input
                          className={inputClassName}
                          value={item.size}
                          onChange={(event) =>
                            setMediaState((current) =>
                              current.map((media) =>
                                media.id === item.id ? { ...media, size: event.target.value } : media
                              )
                            )
                          }
                        />
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => saveMessage(`Файл «${item.name}» обновлён.`)}
                            className={primaryButtonClassName}
                          >
                            Сохранить
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              setMediaState((current) => current.filter((media) => media.id !== item.id))
                            }
                            className={secondaryButtonClassName}
                          >
                            Удалить
                          </button>
                        </div>
                      </div>
                      {idx < filteredMedia.length - 1 && <div className="h-px bg-[#f0f0f0]" />}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {currentSection === 'settings' && (
              <section className="grid gap-5 lg:grid-cols-2">
                <article className="rounded-xl bg-white p-5">
                  <div className="grid gap-4">
                    <Field label="Название сайта">
                      <input
                        className={inputClassName}
                        value={siteSettings.siteName}
                        onChange={(event) =>
                          setSiteSettings((current) => ({ ...current, siteName: event.target.value }))
                        }
                      />
                    </Field>
                    <Field label="Email">
                      <input
                        className={inputClassName}
                        value={siteSettings.email}
                        onChange={(event) =>
                          setSiteSettings((current) => ({ ...current, email: event.target.value }))
                        }
                      />
                    </Field>
                    <Field label="Телефон">
                      <input
                        className={inputClassName}
                        value={siteSettings.phone}
                        onChange={(event) =>
                          setSiteSettings((current) => ({ ...current, phone: event.target.value }))
                        }
                      />
                    </Field>
                    <Field label="Адрес">
                      <input
                        className={inputClassName}
                        value={siteSettings.address}
                        onChange={(event) =>
                          setSiteSettings((current) => ({ ...current, address: event.target.value }))
                        }
                      />
                    </Field>
                    <Field label="Режим работы">
                      <input
                        className={inputClassName}
                        value={siteSettings.workingHours}
                        onChange={(event) =>
                          setSiteSettings((current) => ({ ...current, workingHours: event.target.value }))
                        }
                      />
                    </Field>
                    <Field label="Текст кнопки связи в header">
                      <input
                        className={inputClassName}
                        value={siteSettings.contactButtonLabel}
                        onChange={(event) =>
                          setSiteSettings((current) => ({ ...current, contactButtonLabel: event.target.value }))
                        }
                      />
                    </Field>
                    <button
                      type="button"
                      onClick={() => saveMessage('Настройки сайта сохранены.')}
                      className={primaryButtonClassName}
                    >
                      Сохранить настройки
                    </button>
                  </div>
                </article>

                <article className="rounded-xl bg-white p-5">
                  <h2 className="mb-4 text-lg font-semibold text-[#161b21]">Статус системы</h2>
                  <div className="space-y-3 text-sm text-[#161b21]">
                    <div className="flex items-center justify-between rounded-lg bg-[#f9fafb] px-4 py-3">
                      <span>Фронтенд</span>
                      <span className="text-[#22c55e]">Активен</span>
                    </div>
                    <div className="flex items-center justify-between rounded-lg bg-[#f9fafb] px-4 py-3">
                      <span>Маршруты</span>
                      <span className="text-[#22c55e]">Настроены</span>
                    </div>
                    <div className="flex items-center justify-between rounded-lg bg-[#f9fafb] px-4 py-3">
                      <span>Админ-навигация</span>
                      <span className="text-[#22c55e]">Работает</span>
                    </div>
                  </div>
                </article>
              </section>
            )}

            {currentSection === 'filters' && (
              <section className="space-y-5">
                <article className="rounded-xl bg-white p-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h2 className="text-lg font-semibold text-[#161b21]">Фильтры каталога</h2>
                      <p className="mt-1 text-sm text-[#737a82]">Настройте дефолтные параметры фильтрации для страницы каталога.</p>
                    </div>
                    <div className="rounded-lg bg-[#f8fafc] px-4 py-2 text-sm font-medium text-[#161b21]">
                      Совпадений по текущим правилам: <span className="text-[#ff563f]">{filterPreviewCount}</span> из {productsState.length}
                    </div>
                  </div>
                </article>

                <div className="grid gap-5 xl:grid-cols-[1fr_320px]">
                  <article className="rounded-xl bg-white p-5">
                    <div className="grid gap-5 lg:grid-cols-2">
                      <Field label="Мин. площадь, м²">
                        <input
                          type="number"
                          className={inputClassName}
                          value={filtersState.minArea}
                          onChange={(event) =>
                            setFiltersState((current) => ({ ...current, minArea: event.target.value }))
                          }
                        />
                      </Field>
                      <Field label="Макс. площадь, м²">
                        <input
                          type="number"
                          className={inputClassName}
                          value={filtersState.maxArea}
                          onChange={(event) =>
                            setFiltersState((current) => ({ ...current, maxArea: event.target.value }))
                          }
                        />
                      </Field>
                      <Field label="Мин. бюджет, ₽">
                        <input
                          type="number"
                          className={inputClassName}
                          value={filtersState.minPrice}
                          onChange={(event) =>
                            setFiltersState((current) => ({ ...current, minPrice: event.target.value }))
                          }
                        />
                      </Field>
                      <Field label="Макс. бюджет, ₽">
                        <input
                          type="number"
                          className={inputClassName}
                          value={filtersState.maxPrice}
                          onChange={(event) =>
                            setFiltersState((current) => ({ ...current, maxPrice: event.target.value }))
                          }
                        />
                      </Field>
                      <Field label="Сортировка по умолчанию">
                        <select
                          className={inputClassName}
                          value={filtersState.sortBy}
                          onChange={(event) =>
                            setFiltersState((current) => ({ ...current, sortBy: event.target.value }))
                          }
                        >
                          <option value="area-asc">Площадь: по возрастанию</option>
                          <option value="area-desc">Площадь: по убыванию</option>
                          <option value="price-asc">Цена: по возрастанию</option>
                          <option value="price-desc">Цена: по убыванию</option>
                        </select>
                      </Field>
                      <Field label="Плейсхолдер поиска">
                        <input
                          className={inputClassName}
                          value={filtersState.searchPlaceholder}
                          onChange={(event) =>
                            setFiltersState((current) => ({ ...current, searchPlaceholder: event.target.value }))
                          }
                        />
                      </Field>
                    </div>

                    <div className="mt-5 grid gap-5 lg:grid-cols-3">
                      <div>
                        <p className="mb-2 text-sm font-medium text-[#161b21]">Стили</p>
                        <div className="flex flex-wrap gap-2">
                          {availableStyles.map((style) => {
                            const checked = filtersState.styles.includes(style);
                            return (
                              <button
                                type="button"
                                key={style}
                                onClick={() =>
                                  setFiltersState((current) => ({
                                    ...current,
                                    styles: checked
                                      ? current.styles.filter((item) => item !== style)
                                      : [...current.styles, style],
                                  }))
                                }
                                className={clsx(
                                  'rounded-full border px-3 py-1.5 text-xs font-medium transition',
                                  checked
                                    ? 'border-[#ff563f] bg-[#fff5f3] text-[#ff563f]'
                                    : 'border-[#e5e7eb] bg-white text-[#161b21] hover:bg-[#fafafa]'
                                )}
                              >
                                {style}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div>
                        <p className="mb-2 text-sm font-medium text-[#161b21]">Комнаты</p>
                        <div className="flex flex-wrap gap-2">
                          {[1, 2, 3, 4, 5].map((rooms) => {
                            const checked = filtersState.rooms.includes(rooms);
                            return (
                              <button
                                type="button"
                                key={rooms}
                                onClick={() =>
                                  setFiltersState((current) => ({
                                    ...current,
                                    rooms: checked
                                      ? current.rooms.filter((item) => item !== rooms)
                                      : [...current.rooms, rooms],
                                  }))
                                }
                                className={clsx(
                                  'rounded-full border px-3 py-1.5 text-xs font-medium transition',
                                  checked
                                    ? 'border-[#ff563f] bg-[#fff5f3] text-[#ff563f]'
                                    : 'border-[#e5e7eb] bg-white text-[#161b21] hover:bg-[#fafafa]'
                                )}
                              >
                                {rooms}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div>
                        <p className="mb-2 text-sm font-medium text-[#161b21]">Этажность</p>
                        <div className="flex flex-wrap gap-2">
                          {[1, 2, 3].map((floors) => {
                            const checked = filtersState.floors.includes(floors);
                            return (
                              <button
                                type="button"
                                key={floors}
                                onClick={() =>
                                  setFiltersState((current) => ({
                                    ...current,
                                    floors: checked
                                      ? current.floors.filter((item) => item !== floors)
                                      : [...current.floors, floors],
                                  }))
                                }
                                className={clsx(
                                  'rounded-full border px-3 py-1.5 text-xs font-medium transition',
                                  checked
                                    ? 'border-[#ff563f] bg-[#fff5f3] text-[#ff563f]'
                                    : 'border-[#e5e7eb] bg-white text-[#161b21] hover:bg-[#fafafa]'
                                )}
                              >
                                {floors} этаж
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </article>

                  <article className="space-y-4 rounded-xl bg-white p-5">
                    <h3 className="text-base font-semibold text-[#161b21]">Поведение выдачи</h3>
                    <label className="flex items-center gap-3 text-sm font-medium text-[#161b21]">
                      <input
                        type="checkbox"
                        checked={filtersState.onlyActive}
                        onChange={(event) =>
                          setFiltersState((current) => ({ ...current, onlyActive: event.target.checked }))
                        }
                      />
                      Только активные проекты
                    </label>
                    <label className="flex items-center gap-3 text-sm font-medium text-[#161b21]">
                      <input
                        type="checkbox"
                        checked={filtersState.onlyFeatured}
                        onChange={(event) =>
                          setFiltersState((current) => ({ ...current, onlyFeatured: event.target.checked }))
                        }
                      />
                      Только рекомендуемые
                    </label>
                    <label className="flex items-center gap-3 text-sm font-medium text-[#161b21]">
                      <input
                        type="checkbox"
                        checked={filtersState.onlyPopular}
                        onChange={(event) =>
                          setFiltersState((current) => ({ ...current, onlyPopular: event.target.checked }))
                        }
                      />
                      Только популярные
                    </label>
                    <label className="flex items-center gap-3 text-sm font-medium text-[#161b21]">
                      <input
                        type="checkbox"
                        checked={filtersState.highlightedFirst}
                        onChange={(event) =>
                          setFiltersState((current) => ({ ...current, highlightedFirst: event.target.checked }))
                        }
                      />
                      Подсвеченные проекты первыми
                    </label>

                    <div className="rounded-lg bg-[#f9fafb] p-3">
                      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#737a82]">Быстрые пресеты</p>
                      <div className="flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            setFiltersState((current) => ({
                              ...current,
                              minArea: '35',
                              maxArea: '90',
                              minPrice: '2000000',
                              maxPrice: '5000000',
                              rooms: [1, 2],
                              floors: [1],
                            }))
                          }
                          className={secondaryButtonClassName}
                        >
                          Компактные
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            setFiltersState((current) => ({
                              ...current,
                              minArea: '90',
                              maxArea: '220',
                              minPrice: '5000000',
                              maxPrice: '15000000',
                              rooms: [3, 4, 5],
                              floors: [1, 2],
                            }))
                          }
                          className={secondaryButtonClassName}
                        >
                          Семейные
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            setFiltersState((current) => ({
                              ...current,
                              minArea: '40',
                              maxArea: '220',
                              minPrice: '2500000',
                              maxPrice: '12000000',
                              styles: availableStyles,
                              rooms: [1, 2, 3, 4, 5],
                              floors: [1, 2, 3],
                              onlyActive: true,
                              onlyFeatured: false,
                              onlyPopular: false,
                            }))
                          }
                          className={secondaryButtonClassName}
                        >
                          Сброс
                        </button>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => saveMessage('Параметры фильтров обновлены: новый профиль выдачи сохранен.')}
                      className={primaryButtonClassName}
                    >
                      Сохранить фильтры
                    </button>
                  </article>
                </div>
              </section>
            )}

            {currentSection === 'mortgage' && (
              <section className="grid gap-5 lg:grid-cols-2">
                <article className="rounded-xl bg-white p-5">
                  <div className="grid gap-4">
                    <Field label="Минимальная ставка, %">
                      <input
                        className={inputClassName}
                        value={mortgageState.minRate}
                        onChange={(event) =>
                          setMortgageState((current) => ({ ...current, minRate: event.target.value }))
                        }
                      />
                    </Field>
                    <Field label="Максимальный срок, лет">
                      <input
                        className={inputClassName}
                        value={mortgageState.maxTerm}
                        onChange={(event) =>
                          setMortgageState((current) => ({ ...current, maxTerm: event.target.value }))
                        }
                      />
                    </Field>
                    <Field label="Банк-партнёр">
                      <input
                        className={inputClassName}
                        value={mortgageState.partnerBank}
                        onChange={(event) =>
                          setMortgageState((current) => ({ ...current, partnerBank: event.target.value }))
                        }
                      />
                    </Field>
                    <Field label="Первоначальный взнос, %">
                      <input
                        className={inputClassName}
                        value={mortgageState.firstPayment}
                        onChange={(event) =>
                          setMortgageState((current) => ({ ...current, firstPayment: event.target.value }))
                        }
                      />
                    </Field>
                    <button
                      type="button"
                      onClick={() => saveMessage('Ипотечные условия сохранены.')}
                      className={primaryButtonClassName}
                    >
                      Сохранить условия
                    </button>
                  </div>
                </article>
              </section>
            )}

            {currentSection === 'blog' && (
              <section className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h2 className="text-lg font-semibold text-[#161b21]">Статьи блога</h2>
                  <button type="button" onClick={addBlogPost} className={primaryButtonClassName}>
                    Добавить статью
                  </button>
                </div>

                <div className="rounded-xl bg-white p-4 text-sm text-[#161b21]">
                  Активных статей: <span className="font-semibold text-[#22c55e]">{blogState.filter((item) => item.isActive).length}</span> из {blogState.length}
                </div>

                <div className="grid gap-4 lg:grid-cols-2">
                  {filteredBlog.map((post) => (
                    <article key={post.id} className="rounded-xl bg-white p-5">
                      <div className="grid gap-4">
                        <div className="subblock-media relative aspect-[16/10] rounded-lg">
                          <img src={post.coverImage} alt={post.title} className="subblock-media__image rounded-lg" />
                        </div>

                        <Field label="Заголовок">
                          <input
                            className={inputClassName}
                            value={post.title}
                            onChange={(event) =>
                              updateBlogPost(post.id, (item) => ({ ...item, title: event.target.value }))
                            }
                          />
                        </Field>

                        <Field label="Категория">
                          <input
                            className={inputClassName}
                            value={post.category}
                            onChange={(event) =>
                              updateBlogPost(post.id, (item) => ({ ...item, category: event.target.value }))
                            }
                          />
                        </Field>

                        <Field label="Описание">
                          <textarea
                            className={inputClassName}
                            rows={4}
                            value={post.description}
                            onChange={(event) =>
                              updateBlogPost(post.id, (item) => ({ ...item, description: event.target.value }))
                            }
                          />
                        </Field>

                        <Field label="Фото статьи (URL)">
                          <input
                            className={inputClassName}
                            value={post.coverImage}
                            onChange={(event) =>
                              updateBlogPost(post.id, (item) => ({ ...item, coverImage: event.target.value }))
                            }
                          />
                        </Field>

                        <div className="flex flex-wrap items-center gap-3">
                          <label className={secondaryButtonClassName}>
                            <Upload size={16} className="mr-2" />
                            Загрузить фото
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(event) => void handleBlogCoverUpload(post.id, event)}
                            />
                          </label>

                          <label className="inline-flex items-center gap-2 text-sm font-medium text-[#161b21]">
                            <input
                              type="checkbox"
                              checked={post.isActive}
                              onChange={(event) =>
                                updateBlogPost(post.id, (item) => ({ ...item, isActive: event.target.checked }))
                              }
                            />
                            Статус: {post.isActive ? 'Активно' : 'Не активно'}
                          </label>
                        </div>

                        <div className="flex gap-3">
                          <button
                            type="button"
                            onClick={() => saveMessage(`Статья «${post.title}» сохранена.`)}
                            className={primaryButtonClassName}
                          >
                            Сохранить
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              setBlogState((current) => current.filter((item) => item.id !== post.id))
                            }
                            className={secondaryButtonClassName}
                          >
                            Удалить
                          </button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};
