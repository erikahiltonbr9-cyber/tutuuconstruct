import { MapPin, Phone, Mail, Clock, Send, MessageSquare } from 'lucide-react';
import { Section, SectionHeader } from '../components/Section';
import { Card } from '../components/Card';
import { Input, Textarea } from '../components/Input';
import { Button } from '../components/Button';
import { useState } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { formatPhoneHref, useSiteContent } from '../context/SiteContentContext';

export const ContactPage = () => {
  const { siteSettings, mainPagesContent } = useSiteContent();
  const pageContent = mainPagesContent.contact;
  const getBlock = (id: string) => pageContent.blocks.find((block) => block.id === id);
  const isBlockVisible = (id: string) => getBlock(id)?.isVisible !== false;
  const infoRef = useScrollAnimation({ threshold: 0.2 });
  const formRef = useScrollAnimation({ threshold: 0.15 });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      {/* Hero Section */}
      <Section variant="default" padding="xl" className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-mesh" />
        <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#eaeeee] mb-6 hero-badge">
              <MessageSquare size={16} className="text-[#ff563f]" />
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

      {/* Contact Info Cards */}
      {isBlockVisible('contacts') && (
      <Section variant="gray" padding="lg">
        <div
          ref={infoRef.ref}
          className={`max-w-7xl mx-auto px-5 sm:px-8 scroll-fade-in ${infoRef.isVisible ? 'is-visible' : ''}`}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 stagger-children">
            <Card variant="surface" padding="lg" className="flex flex-col gap-4 text-center card-hover-lift">
              <div className="w-14 h-14 rounded-full bg-[#161b21] flex items-center justify-center mx-auto card-icon icon-spin-hover">
                <Phone size={24} className="text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[#161b21] mb-2">Телефон</h3>
                <a href={formatPhoneHref(siteSettings.phone)} className="text-base text-[#737a82] hover:text-[#161b21] transition-default">
                  {siteSettings.phone}
                </a>
              </div>
            </Card>

            <Card variant="surface" padding="lg" className="flex flex-col gap-4 text-center card-hover-lift">
              <div className="w-14 h-14 rounded-full bg-[#161b21] flex items-center justify-center mx-auto card-icon icon-spin-hover">
                <Mail size={24} className="text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[#161b21] mb-2">Email</h3>
                <a href={`mailto:${siteSettings.email}`} className="text-base text-[#737a82] hover:text-[#161b21] transition-default">
                  {siteSettings.email}
                </a>
              </div>
            </Card>

            <Card variant="surface" padding="lg" className="flex flex-col gap-4 text-center card-hover-lift">
              <div className="w-14 h-14 rounded-full bg-[#161b21] flex items-center justify-center mx-auto card-icon icon-spin-hover">
                <MapPin size={24} className="text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[#161b21] mb-2">Адрес</h3>
                <p className="text-base text-[#737a82]">
                  {siteSettings.address}
                </p>
              </div>
            </Card>

            <Card variant="surface" padding="lg" className="flex flex-col gap-4 text-center card-hover-lift">
              <div className="w-14 h-14 rounded-full bg-[#161b21] flex items-center justify-center mx-auto card-icon icon-spin-hover">
                <Clock size={24} className="text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[#161b21] mb-2">Режим работы</h3>
                <p className="text-base text-[#737a82]">
                  {siteSettings.workingHours}
                </p>
              </div>
            </Card>
          </div>
        </div>
      </Section>
      )}

      {/* Contact Form */}
      {isBlockVisible('form') && (
      <Section variant="default" padding="xl">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Form */}
            <div
              ref={formRef.ref}
              className={`scroll-slide-up ${formRef.isVisible ? 'is-visible' : ''}`}
            >
              <SectionHeader 
                title={getBlock('form')?.title ?? 'Напишите нам'}
                subtitle={getBlock('form')?.description ?? 'Заполните форму для получения бесплатного расчёта стоимости вашего проекта'}
                centered={false}
              />
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <Input
                  label="Ваше имя"
                  name="name"
                  placeholder="Иван Иванов"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <Input
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="ivan@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <Input
                  label="Телефон"
                  name="phone"
                  type="tel"
                      placeholder={siteSettings.phone}
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
                <Textarea
                  label="Сообщение"
                  name="message"
                  placeholder="Расскажите о вашем проекте: желаемая площадь, количество комнат, локация..."
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  required
                />
                <Button 
                  type="submit" 
                  variant="primary" 
                  size="lg"
                  icon={<Send size={18} />}
                  className="w-full sm:w-auto"
                >
                  Отправить сообщение
                </Button>
              </form>
            </div>

            {/* Additional Info */}
            <div className="space-y-8">
              {isBlockVisible('quick-contact') && (
              <Card variant="gradient" padding="lg" className="text-white">
                <div className="flex flex-col gap-6">
                  <h3 className="text-3xl font-semibold">{getBlock('quick-contact')?.title ?? 'Быстрая связь'}</h3>
                  <p className="text-lg text-white/90 leading-normal">
                    {getBlock('quick-contact')?.description ?? 'Для срочной консультации по строительству модульного дома позвоните нам или напишите в WhatsApp'}
                  </p>
                  <div className="flex flex-col gap-4">
                    <a 
                      href={formatPhoneHref(siteSettings.phone)}
                      className="flex items-center gap-3 text-lg hover:opacity-80 transition-default"
                    >
                      <Phone size={20} />
                      {siteSettings.phone}
                    </a>
                    <a 
                      href={`mailto:${siteSettings.email}`}
                      className="flex items-center gap-3 text-lg hover:opacity-80 transition-default"
                    >
                      <Mail size={20} />
                      {siteSettings.email}
                    </a>
                  </div>
                </div>
              </Card>
              )}

              {isBlockVisible('office') && (
              <Card variant="surface" padding="lg">
                <div className="flex flex-col gap-6">
                  <h3 className="text-2xl font-semibold text-[#161b21]">{getBlock('office')?.title ?? 'Офис и производство'}</h3>
                  <div className="flex flex-col gap-4 text-base text-[#737a82]">
                    <div className="flex items-start gap-3">
                      <MapPin size={20} className="shrink-0 mt-1 text-[#161b21]" />
                      <div>
                        <p className="font-medium text-[#161b21] mb-1">Адрес:</p>
                        <p>{siteSettings.address}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock size={20} className="shrink-0 mt-1 text-[#161b21]" />
                      <div>
                        <p className="font-medium text-[#161b21] mb-1">Режим работы:</p>
                        <p>{siteSettings.workingHours}</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-[#737a82] pt-4 border-t border-[rgba(60,58,62,0.15)]">
                    * Вы можете посетить наше производство и офис продаж. Запись на экскурсию обязательна.
                  </p>
                </div>
              </Card>
              )}

              <Card variant="surface" padding="lg">
                <div className="flex flex-col gap-4">
                  <h4 className="text-xl font-semibold text-[#161b21]">Бесплатная консультация</h4>
                  <p className="text-base text-[#737a82] leading-normal">
                    Запишитесь на{' '}
                    <a href="/about" className="text-[#161b21] underline hover:opacity-80">бесплатную экскурсию</a>
                    {' '}по производству модульных домов
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </Section>
      )}

      {/* Map Section (Placeholder) */}
      {isBlockVisible('map') && (
      <Section variant="gray" padding="none">
        <div className="max-w-full">
          <div className="aspect-video lg:aspect-[21/9] bg-[#eaeeee] flex items-center justify-center">
            <div className="text-center">
              <p className="mb-2 text-sm font-semibold text-[#161b21]">
                {getBlock('map')?.title ?? 'Карта и локация'}
              </p>
              <MapPin size={64} className="text-[#737a82] mx-auto mb-4" />
              <p className="text-xl text-[#737a82]">
                {getBlock('map')?.description ?? 'Карта загружается...'}
              </p>
            </div>
          </div>
        </div>
      </Section>
      )}
    </>
  );
};