import { Link } from 'react-router';
import { Instagram, Mail, Phone } from 'lucide-react';
import { formatPhoneHref, useSiteContent } from '../context/SiteContentContext';

const footerLinks = {
  company: [
    { label: 'О компании', path: '/about' },
    { label: 'Каталог домов', path: '/catalog' },
    { label: 'Наши услуги', path: '/services' },
    { label: 'Для заказчика', path: '/customer' },
    { label: 'Блог', path: '/blog' },
    { label: 'Контакты', path: '/contact' },
  ],
  services: [
    { label: 'Строительство под ключ', path: '/services' },
    { label: 'Индивидуальное проектирование', path: '/services' },
    { label: 'Производство модулей', path: '/services' },
    { label: 'Гарантийное обслуживание', path: '/services' },
  ],
  legal: [
    { label: 'Политика конфиденциальности', path: '#' },
    { label: 'Условия использования', path: '#' },
    { label: 'Договор оферты', path: '#' },
  ],
};

export const Footer = () => {
  const { siteSettings } = useSiteContent();

  return (
    <footer className="bg-[#161b21] text-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-12 sm:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 mb-12">
          {/* Brand */}
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-[10px] gradient-primary" />
              <span className="text-xl font-semibold tracking-tight">{siteSettings.siteName}</span>
            </div>
            <p className="text-base text-white/70 leading-normal">
              Строим энергоэффективные модульные дома с 2015 года. Профессионально, быстро и с гарантией качества.
            </p>
            <div className="flex items-center gap-4">
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 social-icon-hover"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a 
                href={`mailto:${siteSettings.email}`} 
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 social-icon-hover"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
              <a 
                href={formatPhoneHref(siteSettings.phone)} 
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 social-icon-hover"
                aria-label="Phone"
              >
                <Phone size={20} />
              </a>
            </div>
          </div>

          {/* Company */}
          <div className="flex flex-col gap-5">
            <h4 className="text-xl font-semibold">Компания</h4>
            <ul className="flex flex-col gap-3">
              {footerLinks.company.map((link) => (
                <li key={link.path}>
                  <Link 
                    to={link.path}
                    className="text-base text-white/70 hover:text-white footer-link"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="flex flex-col gap-5">
            <h4 className="text-xl font-semibold">Услуги</h4>
            <ul className="flex flex-col gap-3">
              {footerLinks.services.map((link) => (
                <li key={link.path}>
                  <Link 
                    to={link.path}
                    className="text-base text-white/70 hover:text-white footer-link"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-5">
            <h4 className="text-xl font-semibold">Контакты</h4>
            <div className="flex flex-col gap-3 text-base text-white/70">
              <a href={formatPhoneHref(siteSettings.phone)} className="hover:text-white footer-link flex items-center gap-2">
                <Phone size={16} />
                {siteSettings.phone}
              </a>
              <a href={`mailto:${siteSettings.email}`} className="hover:text-white footer-link flex items-center gap-2">
                <Mail size={16} />
                {siteSettings.email}
              </a>
              <p>{siteSettings.address}</p>
              <p>{siteSettings.workingHours}</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/50">
            © 2026 {siteSettings.siteName}. Все права защищены.
          </p>
          <div className="flex items-center gap-6">
            {footerLinks.legal.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-sm text-white/50 hover:text-white footer-link"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};