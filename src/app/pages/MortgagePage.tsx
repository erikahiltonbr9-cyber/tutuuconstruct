import { useState, useCallback, useMemo } from 'react';
import {
  Landmark,
  Percent,
  CalendarDays,
  Clock,
  CheckCircle,
  Shield,
  FileText,
  Send,
  ArrowRight,
  CreditCard,
  Calculator,
  BadgeCheck,
  Building2,
  User,
  Phone,
  Mail,
  MessageSquare,
} from 'lucide-react';
import { Section, SectionHeader } from '../components/Section';
import { Card } from '../components/Card';
import { formatPhoneHref, useSiteContent } from '../context/SiteContentContext';
import { Input, Textarea } from '../components/Input';
import { Button } from '../components/Button';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { clsx } from 'clsx';

/* ─── Bank Data ─── */

interface Bank {
  id: string;
  name: string;
  description: string;
  rateFrom: number;
  termMax: number;
  minDown: number;
  monthlyExample: string;
  color: string;
  features: string[];
}

const banks: Bank[] = [
  {
    id: 'tbank',
    name: 'Т-Банк',
    description: 'Ведущий цифровой банк России с быстрым онлайн-одобрением ипотеки за 2 минуты',
    rateFrom: 5.3,
    termMax: 30,
    minDown: 15,
    monthlyExample: 'от 18 500 ₽/мес',
    color: '#FFDD2D',
    features: ['Онлайн-одобрение за 2 мин', 'Без комиссий', 'Страхование в подарок'],
  },
  {
    id: 'mts',
    name: 'МТС Банк',
    description: 'Надёжный банк экосистемы МТС с выгодными условиями для модульного строительства',
    rateFrom: 5.7,
    termMax: 25,
    minDown: 10,
    monthlyExample: 'от 19 200 ₽/мес',
    color: '#E30611',
    features: ['Первоначальный взнос от 10%', 'Кешбэк баллами MTS', 'Досрочное погашение 0 ₽'],
  },
];

/* ─── Loan Details ─── */

const loanDetails = [
  { icon: <Percent size={24} />, title: 'Процентная ставка', value: 'от 5.3% годовых', description: 'Фиксированная на весь срок' },
  { icon: <CreditCard size={24} />, title: 'Первоначальный взнос', value: 'от 10%', description: 'Минимальный взнос от стоимости' },
  { icon: <CalendarDays size={24} />, title: 'Срок кредита', value: 'до 30 лет', description: 'Гибкий выбор срока' },
  { icon: <Clock size={24} />, title: 'Срок одобрения', value: '1-2 рабочих дня', description: 'Предварительное — за 2 мин' },
  { icon: <Shield size={24} />, title: 'Страхование', value: 'Включено', description: 'Страховка жизни и имущества' },
  { icon: <FileText size={24} />, title: 'Документы', value: '2 документа', description: 'Паспорт + подтверждение дохода' },
];

const requirements = [
  'Гражданство РФ',
  'Возраст от 21 до 65 лет',
  'Стаж работы от 3 месяцев',
  'Регистрация в регионе присутствия банка',
  'Подтверждение дохода (справка 2-НДФЛ или по форме банка)',
  'Положительная кредитная история',
];

const mortgageSupportBlocks = [
  {
    title: 'Одобрение ипотеки',
    description: 'Собираем документы, выбираем оптимальную программу и ведем заявку до финального решения банка.',
    icon: <Landmark size={24} />,
    accent: 'Одобрение за 1-2 дня',
    points: ['Проверка анкеты', 'Подача в несколько банков', 'Контроль статуса заявки'],
  },
  {
    title: 'Сопровождение ипотечного кредита',
    description: 'Полное сопровождение сделки: согласование условий, проверка договора и контроль всех этапов до выдачи кредита.',
    icon: <Shield size={24} />,
    accent: 'Персональный менеджер',
    points: ['Проверка условий банка', 'Разбор графика платежей', 'Контроль подписания документов'],
  },
  {
    title: 'Подбор земельного участка',
    description: 'Подбираем участок под ваш проект: анализируем подъездные пути, коммуникации и ограничения по застройке.',
    icon: <Building2 size={24} />,
    accent: 'Участки под ипотеку',
    points: ['Оценка локации', 'Проверка юридической чистоты', 'Соответствие требованиям банка'],
  },
  {
    title: 'Планировка и отсыпка участка',
    description: 'Готовим площадку к монтажу дома: планировка рельефа, отсыпка и выравнивание под строительные работы.',
    icon: <CalendarDays size={24} />,
    accent: 'Готовность к монтажу',
    points: ['Выравнивание участка', 'Отсыпка основания', 'Подготовка подъездных зон'],
  },
  {
    title: 'Кадастровые работы',
    description: 'Организуем кадастровые процедуры, чтобы объект корректно прошел регистрацию и был готов к сделке.',
    icon: <FileText size={24} />,
    accent: 'Документы без задержек',
    points: ['Подготовка техплана', 'Взаимодействие с кадастровым инженером', 'Сопровождение регистрации'],
  },
  {
    title: 'Регулируемые фундаментные блоки',
    description: 'Подбираем и настраиваем регулируемые опоры под рельеф участка для надежной и быстрой установки модулей.',
    icon: <BadgeCheck size={24} />,
    accent: 'Сложный рельеф — не проблема',
    points: ['Подбор схемы опор', 'Настройка по высоте', 'Контроль геометрии основания'],
  },
];

/* ─── Helpers ─── */

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('ru-RU', { maximumFractionDigits: 0 }).format(value) + ' ₽';
}

function formatShort(value: number): string {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(value % 1_000_000 === 0 ? 0 : 1)} млн ₽`;
  if (value >= 1_000) return `${Math.round(value / 1_000)} тыс ₽`;
  return `${value} ₽`;
}

function calcMonthly(price: number, down: number, rate: number, years: number): number {
  const principal = price - down;
  if (principal <= 0) return 0;
  const monthlyRate = rate / 100 / 12;
  const months = years * 12;
  if (monthlyRate === 0) return principal / months;
  return (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
}

/* ─── Component ─── */

export const MortgagePage = () => {
  const { siteSettings } = useSiteContent();
  /* scroll refs */
  const banksRef = useScrollAnimation({ threshold: 0.15 });
  const calcRef = useScrollAnimation({ threshold: 0.1 });
  const detailsRef = useScrollAnimation({ threshold: 0.15 });
  const formRef = useScrollAnimation({ threshold: 0.1 });

  /* bank selection */
  const [selectedBankId, setSelectedBankId] = useState<string | null>(null);

  /* calculator state */
  const [price, setPrice] = useState(3_000_000);
  const [downPercent, setDownPercent] = useState(20);
  const [termYears, setTermYears] = useState(15);
  const [rate, setRate] = useState(5.3);

  const downPayment = Math.round(price * downPercent / 100);
  const monthly = useMemo(() => calcMonthly(price, downPayment, rate, termYears), [price, downPayment, rate, termYears]);
  const totalCost = monthly * termYears * 12;
  const overpayment = totalCost - (price - downPayment);

  const handlePriceSlider = useCallback((e: React.ChangeEvent<HTMLInputElement>) => setPrice(Number(e.target.value)), []);
  const handleDownSlider = useCallback((e: React.ChangeEvent<HTMLInputElement>) => setDownPercent(Number(e.target.value)), []);
  const handleTermSlider = useCallback((e: React.ChangeEvent<HTMLInputElement>) => setTermYears(Number(e.target.value)), []);
  const handleRateSlider = useCallback((e: React.ChangeEvent<HTMLInputElement>) => setRate(Number(e.target.value)), []);

  /* form state */
  const [form, setForm] = useState({ name: '', phone: '', email: '', bank: '', comment: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  /* slider percent helper */
  const pct = (val: number, min: number, max: number) => ((val - min) / (max - min)) * 100;

  return (
    <>
      {/* ═══ HERO ═══ */}
      <Section variant="default" padding="xl" className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-mesh" />
        <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#eaeeee] mb-6 hero-badge">
              <Landmark size={16} className="text-[#ff563f]" />
              <span className="text-sm font-medium text-[#161b21]">Ипотека</span>
            </div>
            <h1 className="text-5xl sm:text-6xl font-semibold text-[#161b21] leading-tight mb-6 hero-title">
              Ипотека на модульные дома
            </h1>
            <p className="text-xl text-[#737a82] leading-normal max-w-2xl mx-auto mb-10 hero-subtitle">
              Выгодное финансирование от ведущих банков-партнёров. Ставка от 5.3%, первоначальный взнос от 10%, одобрение за 2 минуты онлайн.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 hero-cta">
              <a href="#calculator">
                <Button variant="primary" size="lg" icon={<Calculator size={18} />}>
                  Рассчитать ипотеку
                </Button>
              </a>
              <a href="#apply">
                <Button variant="secondary" size="lg" icon={<ArrowRight size={18} />}>
                  Оставить заявку
                </Button>
              </a>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-3xl mx-auto hero-stats">
            {[
              { value: 'от 5.3%', label: 'Ставка' },
              { value: 'от 10%', label: 'Первый взнос' },
              { value: '2 мин', label: 'Одобрение' },
              { value: '2 банка', label: 'Партнёра' },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-3xl font-bold text-[#161b21]">{s.value}</p>
                <p className="text-sm text-[#737a82] mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ═══ BANK SELECTION ═══ */}
      <Section variant="gray" padding="xl">
        <div
          ref={banksRef.ref}
          className={`max-w-7xl mx-auto px-5 sm:px-8 scroll-fade-in ${banksRef.isVisible ? 'is-visible' : ''}`}
        >
          <SectionHeader
            title="Выберите банк"
            subtitle="Наши аккредитованные банки-партнёры предлагают специальные условия для модульных домов"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {banks.map((bank) => {
              const isSelected = selectedBankId === bank.id;
              return (
                <button
                  key={bank.id}
                  type="button"
                  onClick={() => {
                    setSelectedBankId(isSelected ? null : bank.id);
                    setForm((f) => ({ ...f, bank: isSelected ? '' : bank.name }));
                    if (!isSelected) setRate(bank.rateFrom);
                  }}
                  className={clsx(
                    'relative text-left rounded-[20px] p-8 transition-all duration-300 cursor-pointer',
                    'border-2 bg-white',
                    isSelected
                      ? 'border-[#ff563f] shadow-lg shadow-[#ff563f]/10 scale-[1.02]'
                      : 'border-transparent hover:border-[#eaeeee] hover:shadow-md card-hover-lift'
                  )}
                >
                  {/* Selected checkmark */}
                  {isSelected && (
                    <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#ff563f] flex items-center justify-center tag-pop-in">
                      <CheckCircle size={18} className="text-white" />
                    </div>
                  )}

                  {/* Bank logo placeholder */}
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
                    style={{ backgroundColor: bank.color + '20' }}
                  >
                    <Building2 size={28} style={{ color: bank.color === '#FFDD2D' ? '#1a1a1a' : bank.color }} />
                  </div>

                  <h3 className="text-2xl font-semibold text-[#161b21] mb-2">{bank.name}</h3>
                  <p className="text-base text-[#737a82] leading-normal mb-5">{bank.description}</p>

                  {/* Rate + monthly */}
                  <div className="flex items-end gap-6 mb-5">
                    <div>
                      <p className="text-sm text-[#737a82]">Ставка от</p>
                      <p className="text-3xl font-bold text-[#161b21]">{bank.rateFrom}%</p>
                    </div>
                    <div>
                      <p className="text-sm text-[#737a82]">Платёж</p>
                      <p className="text-lg font-semibold text-[#161b21]">{bank.monthlyExample}</p>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="flex flex-col gap-2">
                    {bank.features.map((f) => (
                      <div key={f} className="flex items-center gap-2">
                        <CheckCircle size={16} className="text-[#ff563f] shrink-0" />
                        <span className="text-sm text-[#161b21]">{f}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA strip */}
                  <div className={clsx(
                    'mt-6 py-3 rounded-full text-center font-medium text-base transition-all',
                    isSelected
                      ? 'bg-[#ff563f] text-white'
                      : 'bg-[#eaeeee] text-[#161b21]'
                  )}>
                    {isSelected ? 'Банк выбран ✓' : 'Выбрать банк'}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </Section>

      {/* ═══ MORTGAGE CALCULATOR ═══ */}
      <Section variant="default" padding="xl" id="calculator">
        <div
          ref={calcRef.ref}
          className={`max-w-7xl mx-auto px-5 sm:px-8 scroll-fade-in ${calcRef.isVisible ? 'is-visible' : ''}`}
        >
          <SectionHeader
            title="Ипотечный калькулятор"
            subtitle="Рассчитайте ежемесячный платёж и стоимость кредита"
          />

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 max-w-5xl mx-auto">
            {/* Sliders column */}
            <div className="lg:col-span-3 flex flex-col gap-8">
              {/* Price */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <label className="text-base font-medium text-[#161b21]">Стоимость дома</label>
                  <span className="text-lg font-bold text-[#161b21] bg-[#eaeeee] px-4 py-1 rounded-full">
                    {formatShort(price)}
                  </span>
                </div>
                <div className="relative pt-1">
                  <div className="absolute top-[14px] left-0 right-0 h-[6px] rounded-full bg-[#eaeeee]" />
                  <div
                    className="absolute top-[14px] h-[6px] rounded-full bg-gradient-to-r from-[#ff563f] to-[#ff563f]"
                    style={{ width: `${pct(price, 500000, 15000000)}%` }}
                  />
                  <input
                    type="range" min={500000} max={15000000} step={100000}
                    value={price} onChange={handlePriceSlider}
                    className="range-slider-thumb relative w-full appearance-none bg-transparent z-10"
                  />
                </div>
                <div className="flex justify-between text-xs text-[#737a82]">
                  <span>500 тыс</span><span>15 млн</span>
                </div>
              </div>

              {/* Down payment */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <label className="text-base font-medium text-[#161b21]">Первоначальный взнос</label>
                  <span className="text-lg font-bold text-[#161b21] bg-[#eaeeee] px-4 py-1 rounded-full">
                    {downPercent}% — {formatShort(downPayment)}
                  </span>
                </div>
                <div className="relative pt-1">
                  <div className="absolute top-[14px] left-0 right-0 h-[6px] rounded-full bg-[#eaeeee]" />
                  <div
                    className="absolute top-[14px] h-[6px] rounded-full bg-gradient-to-r from-[#ff563f] to-[#ff563f]"
                    style={{ width: `${pct(downPercent, 0, 90)}%` }}
                  />
                  <input
                    type="range" min={0} max={90} step={5}
                    value={downPercent} onChange={handleDownSlider}
                    className="range-slider-thumb relative w-full appearance-none bg-transparent z-10"
                  />
                </div>
                <div className="flex justify-between text-xs text-[#737a82]">
                  <span>0%</span><span>90%</span>
                </div>
              </div>

              {/* Term */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <label className="text-base font-medium text-[#161b21]">Срок кредита</label>
                  <span className="text-lg font-bold text-[#161b21] bg-[#eaeeee] px-4 py-1 rounded-full">
                    {termYears} лет
                  </span>
                </div>
                <div className="relative pt-1">
                  <div className="absolute top-[14px] left-0 right-0 h-[6px] rounded-full bg-[#eaeeee]" />
                  <div
                    className="absolute top-[14px] h-[6px] rounded-full bg-gradient-to-r from-[#ff563f] to-[#ff563f]"
                    style={{ width: `${pct(termYears, 1, 30)}%` }}
                  />
                  <input
                    type="range" min={1} max={30} step={1}
                    value={termYears} onChange={handleTermSlider}
                    className="range-slider-thumb relative w-full appearance-none bg-transparent z-10"
                  />
                </div>
                <div className="flex justify-between text-xs text-[#737a82]">
                  <span>1 год</span><span>30 лет</span>
                </div>
              </div>

              {/* Rate */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <label className="text-base font-medium text-[#161b21]">Процентная ставка</label>
                  <span className="text-lg font-bold text-[#161b21] bg-[#eaeeee] px-4 py-1 rounded-full">
                    {rate.toFixed(1)}%
                  </span>
                </div>
                <div className="relative pt-1">
                  <div className="absolute top-[14px] left-0 right-0 h-[6px] rounded-full bg-[#eaeeee]" />
                  <div
                    className="absolute top-[14px] h-[6px] rounded-full bg-gradient-to-r from-[#ff563f] to-[#ff563f]"
                    style={{ width: `${pct(rate, 1, 20)}%` }}
                  />
                  <input
                    type="range" min={1} max={20} step={0.1}
                    value={rate} onChange={handleRateSlider}
                    className="range-slider-thumb relative w-full appearance-none bg-transparent z-10"
                  />
                </div>
                <div className="flex justify-between text-xs text-[#737a82]">
                  <span>1%</span><span>20%</span>
                </div>
              </div>
            </div>

            {/* Results column */}
            <div className="lg:col-span-2">
              <Card variant="gradient" padding="lg" className="text-white sticky top-28">
                <div className="flex flex-col gap-6">
                  <div className="flex items-center gap-3 mb-2">
                    <Calculator size={24} />
                    <h3 className="text-xl font-semibold">Результат расчёта</h3>
                  </div>

                  <div className="flex flex-col gap-1">
                    <p className="text-sm text-white/70">Ежемесячный платёж</p>
                    <p className="text-4xl font-bold">{formatCurrency(Math.round(monthly))}</p>
                  </div>

                  <div className="h-px bg-white/20" />

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-white/70">Сумма кредита</p>
                      <p className="text-xl font-semibold">{formatCurrency(price - downPayment)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-white/70">Первый взнос</p>
                      <p className="text-xl font-semibold">{formatCurrency(downPayment)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-white/70">Общая стоимость</p>
                      <p className="text-xl font-semibold">{formatCurrency(Math.round(totalCost + downPayment))}</p>
                    </div>
                    <div>
                      <p className="text-sm text-white/70">Переплата</p>
                      <p className="text-xl font-semibold">{formatCurrency(Math.max(0, Math.round(overpayment)))}</p>
                    </div>
                  </div>

                  <a href="#apply">
                    <Button variant="secondary" size="md" icon={<ArrowRight size={16} />} className="w-full">
                      Оставить заявку
                    </Button>
                  </a>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </Section>

      {/* ═══ LOAN DETAILS ═══ */}
      <Section variant="gray" padding="xl">
        <div
          ref={detailsRef.ref}
          className={`max-w-7xl mx-auto px-5 sm:px-8 scroll-fade-in ${detailsRef.isVisible ? 'is-visible' : ''}`}
        >
          <SectionHeader
            title="Условия ипотеки"
            subtitle="Подробная информация о программе ипотечного кредитования"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 stagger-children">
            {loanDetails.map((d) => (
              <Card key={d.title} variant="surface" padding="lg" className="flex flex-col gap-4 card-hover-lift">
                <div className="w-12 h-12 rounded-full bg-[#161b21] flex items-center justify-center text-white card-icon icon-spin-hover">
                  {d.icon}
                </div>
                <div>
                  <p className="text-sm text-[#737a82] mb-1">{d.title}</p>
                  <p className="text-2xl font-bold text-[#161b21]">{d.value}</p>
                </div>
                <p className="text-sm text-[#737a82]">{d.description}</p>
              </Card>
            ))}
          </div>

          {/* Mortgage support services */}
          <div className="mb-16">
            <SectionHeader
              title="Сопровождение и дополнительные услуги"
              subtitle="Берём на себя все сложные этапы — от подбора программы до регистрации объекта"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
              {mortgageSupportBlocks.map((block) => (
                <Card key={block.title} variant="surface" padding="lg" className="flex flex-col gap-5 card-hover-lift">
                  <div className="flex items-start justify-between gap-3">
                    <div className="w-14 h-14 rounded-full bg-[#161b21] flex items-center justify-center text-white shrink-0 card-icon icon-spin-hover">
                      {block.icon}
                    </div>
                    <div className="inline-flex items-center rounded-full bg-[#fff5f3] px-3 py-1.5 text-xs font-semibold text-[#ff563f] text-right leading-snug">
                      {block.accent}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-[#161b21] mb-2">{block.title}</h4>
                    <p className="text-sm text-[#737a82] leading-relaxed">{block.description}</p>
                  </div>
                  <div className="flex flex-col gap-2 mt-auto pt-2 border-t border-[#f1f2f4]">
                    {block.points.map((point) => (
                      <div key={point} className="flex items-start gap-2">
                        <CheckCircle size={15} className="text-[#ff563f] shrink-0 mt-0.5" />
                        <span className="text-sm text-[#161b21]">{point}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Requirements */}
          <div className="max-w-3xl mx-auto">
            <h3 className="text-3xl font-semibold text-[#161b21] text-center mb-8">Требования к заёмщику</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {requirements.map((r) => (
                <div key={r} className="flex items-start gap-3 p-4 bg-white rounded-[15px]">
                  <BadgeCheck size={20} className="text-[#ff563f] shrink-0 mt-0.5" />
                  <span className="text-base text-[#161b21]">{r}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ═══ APPLICATION FORM ═══ */}
      <Section variant="default" padding="xl" id="apply">
        <div
          ref={formRef.ref}
          className={`max-w-7xl mx-auto px-5 sm:px-8 scroll-fade-in ${formRef.isVisible ? 'is-visible' : ''}`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Form */}
            <div>
              <SectionHeader
                title="Заявка на ипотеку"
                subtitle="Заполните форму, и наш ипотечный менеджер свяжется с вами в течение 30 минут"
                centered={false}
              />

              {submitted ? (
                <Card variant="surface" padding="lg" className="text-center">
                  <div className="flex flex-col items-center gap-4 py-8">
                    <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center animate-scale-in">
                      <CheckCircle size={32} className="text-green-600" />
                    </div>
                    <h3 className="text-2xl font-semibold text-[#161b21]">Заявка отправлена!</h3>
                    <p className="text-base text-[#737a82] max-w-md">
                      Наш ипотечный менеджер свяжется с вами в течение 30 минут для уточнения деталей и подбора лучших условий.
                    </p>
                    <Button
                      variant="secondary"
                      size="md"
                      onClick={() => {
                        setSubmitted(false);
                        setForm({ name: '', phone: '', email: '', bank: '', comment: '' });
                      }}
                    >
                      Отправить ещё одну
                    </Button>
                  </div>
                </Card>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  <Input
                    label="Ваше имя"
                    name="name"
                    placeholder="Иван Иванов"
                    icon={<User size={18} />}
                    value={form.name}
                    onChange={handleFormChange}
                    required
                  />
                  <Input
                    label="Телефон"
                    name="phone"
                    type="tel"
                    placeholder={siteSettings.phone}
                    icon={<Phone size={18} />}
                    value={form.phone}
                    onChange={handleFormChange}
                    required
                  />
                  <Input
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="ivan@example.com"
                    icon={<Mail size={18} />}
                    value={form.email}
                    onChange={handleFormChange}
                    required
                  />

                  {/* Bank selector */}
                  <div className="flex flex-col gap-2 w-full">
                    <label className="text-base font-medium text-[#161b21]">Выбранный банк</label>
                    <select
                      name="bank"
                      value={form.bank}
                      onChange={handleFormChange}
                      className="w-full px-5 py-4 rounded-full bg-[#f5f5f5] border border-[rgba(60,58,62,0.15)] text-base text-[#161b21] transition-default focus:outline-none focus:ring-2 focus:ring-[#161b21] focus:ring-opacity-20 appearance-none cursor-pointer"
                    >
                      <option value="">Не выбран</option>
                      {banks.map((b) => (
                        <option key={b.id} value={b.name}>{b.name}</option>
                      ))}
                    </select>
                  </div>

                  <Textarea
                    label="Комментарий"
                    name="comment"
                    placeholder="Расскажите о вашей ситуации: желаемая сумма, наличие первоначального взноса, вопросы..."
                    value={form.comment}
                    onChange={handleFormChange}
                    rows={4}
                  />

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    icon={<Send size={18} />}
                    className="w-full sm:w-auto"
                  >
                    Отправить заявку
                  </Button>
                </form>
              )}
            </div>

            {/* Right column — info cards */}
            <div className="space-y-6">
              <Card variant="gradient" padding="lg" className="text-white">
                <div className="flex flex-col gap-5">
                  <div className="flex items-center gap-3">
                    <MessageSquare size={24} />
                    <h3 className="text-2xl font-semibold">Быстрая консультация</h3>
                  </div>
                  <p className="text-base text-white/90 leading-normal">
                    Наш ипотечный менеджер поможет подобрать оптимальную программу, рассчитать платёж и собрать документы
                  </p>
                  <div className="flex flex-col gap-3">
                    <a href={formatPhoneHref(siteSettings.phone)} className="flex items-center gap-3 text-lg hover:opacity-80 transition-default">
                      <Phone size={20} />
                      {siteSettings.phone}
                    </a>
                    <a href={`mailto:${siteSettings.email}`} className="flex items-center gap-3 text-lg hover:opacity-80 transition-default">
                      <Mail size={20} />
                      {siteSettings.email}
                    </a>
                  </div>
                </div>
              </Card>

              <Card variant="surface" padding="lg">
                <div className="flex flex-col gap-5">
                  <h3 className="text-2xl font-semibold text-[#161b21]">Как получить ипотеку?</h3>
                  <div className="flex flex-col gap-4">
                    {[
                      { step: '01', text: 'Выберите дом из каталога или закажите индивидуальный проект' },
                      { step: '02', text: 'Рассчитайте ипотеку в калькуляторе и выберите банк' },
                      { step: '03', text: 'Оставьте заявку — мы подготовим все документы' },
                      { step: '04', text: 'Получите одобрение и подпишите договор' },
                    ].map((s) => (
                      <div key={s.step} className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center shrink-0">
                          <span className="text-sm font-bold text-white">{s.step}</span>
                        </div>
                        <p className="text-base text-[#737a82] pt-2">{s.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>

              <Card variant="surface" padding="lg">
                <div className="flex flex-col gap-4">
                  <h4 className="text-xl font-semibold text-[#161b21]">Ипотека + Материнский капитал</h4>
                  <p className="text-base text-[#737a82] leading-normal">
                    Вы можете использовать материнский капитал в качестве первоначального взноса или для досрочного погашения ипотеки на модульный дом.
                  </p>
                  <div className="flex items-center gap-2 text-[#ff563f] font-medium">
                    <BadgeCheck size={18} />
                    <span>Принимается в обоих банках-партнёрах</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </Section>

      {/* ═══ CTA BOTTOM ═══ */}
      <Section variant="gray" padding="xl">
        <div className="max-w-4xl mx-auto px-5 sm:px-8">
          <Card variant="gradient" padding="lg" className="text-white text-center">
            <div className="flex flex-col gap-6 items-center">
              <h2 className="text-4xl font-semibold leading-tight">
                Готовы начать?
              </h2>
              <p className="text-xl text-white/90 leading-normal max-w-2xl">
                Получите предварительное одобрение ипотеки онлайн за 2 минуты. Без визита в банк и без бумажных документов.
              </p>
              <div className="flex flex-wrap items-center gap-4 justify-center">
                <a href="#apply">
                  <Button variant="secondary" size="lg" icon={<ArrowRight size={18} />}>
                    Подать заявку онлайн
                  </Button>
                </a>
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

