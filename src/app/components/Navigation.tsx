import { Link, useLocation } from 'react-router';
import { clsx } from 'clsx';
import { Menu, X, Shield } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useSiteContent } from '../context/SiteContentContext';

const navItems = [
  { label: 'Главная', path: '/' },
  { label: 'О нас', path: '/about' },
  { label: 'Каталог', path: '/catalog' },
  { label: 'Ипотека', path: '/mortgage' },
  { label: 'Услуги', path: '/services' },
  { label: 'Для заказчика', path: '/customer' },
  { label: 'Блог', path: '/blog' },
  { label: 'Контакты', path: '/contact' },
];

export const Navigation = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { siteSettings } = useSiteContent();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={clsx(
        'sticky top-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-white/80 backdrop-blur-xl shadow-sm border-b border-[rgba(60,58,62,0.08)]'
          : 'bg-white/95 backdrop-blur-sm border-b border-[rgba(60,58,62,0.15)]'
      )}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex items-center justify-between h-[72px]">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-[10px] gradient-primary transition-transform duration-300 group-hover:scale-105" />
            <span className="text-xl font-semibold text-[#161b21] tracking-tight">{siteSettings.siteName}</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={clsx(
                  'px-4 py-2 rounded-full text-[15px] font-medium transition-all duration-200 nav-link-hover',
                  location.pathname === item.path
                    ? 'text-[#161b21] bg-[#eaeeee]'
                    : 'text-[#737a82] hover:text-[#161b21] hover:bg-[#f5f5f5]'
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-2">
            <Link
              to="/admin"
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full border border-[#e0e0e0] text-[#737a82] font-medium text-[14px] transition-all duration-200 hover:text-[#161b21] hover:border-[#161b21] hover:bg-[#f5f5f5]"
            >
              <Shield size={15} />
              Admin
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-[#161b21] text-white font-medium text-[15px] transition-all duration-200 hover:bg-[#2a3240] hover:shadow-md btn-press"
            >
              {siteSettings.contactButtonLabel}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-[10px] text-[#161b21] hover:bg-[#eaeeee] transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-[rgba(60,58,62,0.08)] nav-mobile-enter">
            <div className="flex flex-col gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={clsx(
                    'text-[15px] font-medium transition-colors py-3 px-4 rounded-[10px]',
                    location.pathname === item.path
                      ? 'text-[#161b21] bg-[#eaeeee]'
                      : 'text-[#737a82] hover:bg-[#f5f5f5]'
                  )}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                to="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="inline-flex items-center justify-center gap-1.5 px-6 py-3 rounded-full border border-[#e0e0e0] text-[#737a82] font-medium text-[15px] transition-all duration-200 hover:text-[#161b21] mt-3"
              >
                <Shield size={16} />
                Admin
              </Link>
              <Link
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-[#161b21] text-white font-medium text-[15px] transition-all duration-200 hover:bg-[#2a3240] mt-2"
              >
                {siteSettings.contactButtonLabel}
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};