import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { products as defaultProducts, type Product } from '../data/products';

export type SiteSettings = {
  siteName: string;
  email: string;
  phone: string;
  address: string;
  workingHours: string;
  contactButtonLabel: string;
};

export type LandingContent = {
  badge: string;
  heroTitle: string;
  heroDescription: string;
  primaryCtaLabel: string;
  secondaryCtaLabel: string;
  statHomes: string;
  statBuildTime: string;
  statWarranty: string;
  featuredTitle: string;
  processTitle: string;
  testimonialsTitle: string;
  ctaTitle: string;
  ctaDescription: string;
  ctaButtonLabel: string;
};

export type MainPageBlock = {
  id: string;
  title: string;
  description: string;
  isVisible: boolean;
};

export type MainPageContent = {
  badge: string;
  heroTitle: string;
  heroDescription: string;
  blocks: MainPageBlock[];
};

export type MainPagesContent = {
  about: MainPageContent;
  services: MainPageContent;
  contact: MainPageContent;
};

type SiteContentContextValue = {
  siteSettings: SiteSettings;
  setSiteSettings: React.Dispatch<React.SetStateAction<SiteSettings>>;
  landingContent: LandingContent;
  setLandingContent: React.Dispatch<React.SetStateAction<LandingContent>>;
  mainPagesContent: MainPagesContent;
  setMainPagesContent: React.Dispatch<React.SetStateAction<MainPagesContent>>;
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
};

const SITE_SETTINGS_KEY = 'moduldom-site-settings';
const LANDING_CONTENT_KEY = 'moduldom-landing-content';
const MAIN_PAGES_CONTENT_KEY = 'moduldom-main-pages-content';
const PRODUCTS_KEY = 'moduldom-products';

const defaultSiteSettings: SiteSettings = {
  siteName: 'МодульДом',
  email: 'info@moduldom.ru',
  phone: '+7 (999) 999-99-99',
  address: 'Москва, ул. Строителей, 19',
  workingHours: 'Пн-Вс: 9:00 - 21:00',
  contactButtonLabel: 'Связаться',
};

const defaultLandingContent: LandingContent = {
  badge: 'Модульное строительство',
  heroTitle: 'Ваш дом под ключ\nза 3 месяца',
  heroDescription:
    'Проектируем и строим энергоэффективные модульные дома. Быстрое возведение, экологичные материалы и фиксированная цена.',
  primaryCtaLabel: 'Выбрать проект',
  secondaryCtaLabel: 'Получить консультацию',
  statHomes: '200+',
  statBuildTime: '3 мес',
  statWarranty: '15 лет',
  featuredTitle: 'Популярные модели',
  processTitle: 'Простой путь к вашему дому',
  testimonialsTitle: 'Что говорят наши клиенты',
  ctaTitle: 'Готовы начать строительство?',
  ctaDescription: 'Оставьте заявку и получите бесплатную консультацию и расчёт стоимости',
  ctaButtonLabel: 'Оставить заявку',
};

const defaultMainPagesContent: MainPagesContent = {
  about: {
    badge: 'С 2015 года',
    heroTitle: 'О компании',
    heroDescription:
      'Мы создаём инновационные модульные дома с 2015 года. Наша миссия — сделать качественное жильё доступным и быстрым в возведении для каждой семьи.',
    blocks: [
      {
        id: 'story',
        title: 'Наша история',
        description: 'Как компания развивалась и выросла в лидера регионального рынка.',
        isVisible: true,
      },
      {
        id: 'mission',
        title: 'Миссия и видение',
        description: 'Наши ориентиры, ценности и стратегические цели.',
        isVisible: true,
      },
      {
        id: 'values',
        title: 'Наши ценности',
        description: 'Принципы, на которых строится наша работа.',
        isVisible: true,
      },
      {
        id: 'numbers',
        title: 'Компания в цифрах',
        description: 'Наши достижения за 11 лет работы.',
        isVisible: true,
      },
      {
        id: 'production',
        title: 'Собственное производство',
        description: 'Современное оборудование и строгий контроль качества.',
        isVisible: true,
      },
      {
        id: 'team',
        title: 'Команда экспертов',
        description: 'Профессионалы, которые воплощают ваши мечты в реальность.',
        isVisible: true,
      },
      {
        id: 'cta',
        title: 'Станьте частью нашей истории!',
        description:
          'Запишитесь на экскурсию по производству и узнайте, как создаются модульные дома будущего',
        isVisible: true,
      },
    ],
  },
  services: {
    badge: 'Услуги',
    heroTitle: 'Наши услуги',
    heroDescription:
      'Полный спектр услуг по проектированию, производству и строительству модульных домов. От идеи до готового дома под ключ.',
    blocks: [
      {
        id: 'main-services',
        title: 'Основные услуги',
        description: 'Комплексные решения для строительства вашего дома.',
        isVisible: true,
      },
      {
        id: 'additional-services',
        title: 'Дополнительные услуги',
        description: 'Полное сопровождение на всех этапах.',
        isVisible: true,
      },
      {
        id: 'process',
        title: 'Процесс строительства',
        description: 'От первой встречи до въезда в готовый дом.',
        isVisible: true,
      },
      {
        id: 'technologies',
        title: 'Технологии строительства',
        description: 'Мы используем только проверенные решения.',
        isVisible: true,
      },
      {
        id: 'benefits',
        title: 'Почему выбирают нас',
        description: 'Преимущества работы с нашей компанией.',
        isVisible: true,
      },
    ],
  },
  contact: {
    badge: 'На связи',
    heroTitle: 'Свяжитесь с нами',
    heroDescription:
      'Готовы обсудить ваш проект модульного дома? Оставьте заявку, и мы свяжемся с вами в течение часа для бесплатной консультации.',
    blocks: [
      {
        id: 'contacts',
        title: 'Контактная информация',
        description: 'Телефон, почта, адрес и время работы.',
        isVisible: true,
      },
      {
        id: 'form',
        title: 'Напишите нам',
        description: 'Заполните форму для получения бесплатного расчёта стоимости вашего проекта.',
        isVisible: true,
      },
      {
        id: 'quick-contact',
        title: 'Быстрая связь',
        description:
          'Для срочной консультации по строительству модульного дома позвоните нам или напишите в WhatsApp',
        isVisible: true,
      },
      {
        id: 'office',
        title: 'Офис и производство',
        description: 'Открыты для встреч и экскурсий по предварительной записи.',
        isVisible: true,
      },
      {
        id: 'map',
        title: 'Карта и локация',
        description: 'Показываем, где находится наш офис и производство.',
        isVisible: true,
      },
    ],
  },
};

const mergeMainPageContent = (
  fallbackPage: MainPageContent,
  storedPage: Partial<MainPageContent> | undefined
): MainPageContent => {
  const storedBlocks = new Map((storedPage?.blocks ?? []).map((block) => [block.id, block]));

  return {
    badge: storedPage?.badge ?? fallbackPage.badge,
    heroTitle: storedPage?.heroTitle ?? fallbackPage.heroTitle,
    heroDescription: storedPage?.heroDescription ?? fallbackPage.heroDescription,
    blocks: fallbackPage.blocks.map((block) => {
      const stored = storedBlocks.get(block.id);
      return {
        ...block,
        ...stored,
      };
    }),
  };
};

const normalizeMainPagesContent = (
  stored: Partial<MainPagesContent> | null | undefined
): MainPagesContent => ({
  about: mergeMainPageContent(defaultMainPagesContent.about, stored?.about),
  services: mergeMainPageContent(defaultMainPagesContent.services, stored?.services),
  contact: mergeMainPageContent(defaultMainPagesContent.contact, stored?.contact),
});

const SiteContentContext = createContext<SiteContentContextValue | null>(null);

const loadStorageValue = <T,>(key: string, fallback: T): T => {
  if (typeof window === 'undefined') {
    return fallback;
  }

  const stored = window.localStorage.getItem(key);

  if (!stored) {
    return fallback;
  }

  try {
    return JSON.parse(stored) as T;
  } catch {
    return fallback;
  }
};

export const formatPhoneHref = (phone: string) => `tel:${phone.replace(/[^\d+]/g, '')}`;

export const SiteContentProvider = ({ children }: { children: ReactNode }) => {
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(() =>
    loadStorageValue(SITE_SETTINGS_KEY, defaultSiteSettings)
  );
  const [landingContent, setLandingContent] = useState<LandingContent>(() =>
    loadStorageValue(LANDING_CONTENT_KEY, defaultLandingContent)
  );
  const [mainPagesContent, setMainPagesContent] = useState<MainPagesContent>(() =>
    normalizeMainPagesContent(loadStorageValue<Partial<MainPagesContent> | null>(MAIN_PAGES_CONTENT_KEY, null))
  );
  const [products, setProducts] = useState<Product[]>(() => loadStorageValue(PRODUCTS_KEY, defaultProducts));

  useEffect(() => {
    window.localStorage.setItem(SITE_SETTINGS_KEY, JSON.stringify(siteSettings));
  }, [siteSettings]);

  useEffect(() => {
    window.localStorage.setItem(LANDING_CONTENT_KEY, JSON.stringify(landingContent));
  }, [landingContent]);

  useEffect(() => {
    window.localStorage.setItem(MAIN_PAGES_CONTENT_KEY, JSON.stringify(mainPagesContent));
  }, [mainPagesContent]);

  useEffect(() => {
    window.localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
  }, [products]);

  return (
    <SiteContentContext.Provider
      value={{
        siteSettings,
        setSiteSettings,
        landingContent,
        setLandingContent,
        mainPagesContent,
        setMainPagesContent,
        products,
        setProducts,
      }}
    >
      {children}
    </SiteContentContext.Provider>
  );
};

export const useSiteContent = () => {
  const context = useContext(SiteContentContext);

  if (!context) {
    throw new Error('useSiteContent must be used within SiteContentProvider');
  }

  return context;
};