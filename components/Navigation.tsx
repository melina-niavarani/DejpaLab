'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Menu, X, Search, Globe, ArrowRight, LogOut } from 'lucide-react';
import { usePathname } from '@/i18n/navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function Navigation() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const { isAuthenticated, user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  const isRTL = locale === 'fa';

  const toggleLanguage = () => {
    const newLocale = locale === 'fa' ? 'en' : 'fa';
    window.location.href = `/${newLocale}${pathname}`;
  };

  const navItems = [
    { href: '/', label: t('home') },
    { href: '/services', label: t('services') },
    { href: '/request-test', label: t('requestTest') },
    { href: '/results', label: t('results') },
    { href: '/about', label: t('about') },
    { href: '/contact', label: t('contact') },
  ];

  const filteredSearchItems = navItems.filter((item) =>
    item.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const target = filteredSearchItems[0] || navItems[0];
    if (target) {
      setIsSearchOpen(false);
      setIsOpen(false);
      window.location.href = target.href;
    }
  };

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isOpen && !target.closest('.mobile-menu-container') && !target.closest('button[aria-label="Menu"]')) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      // Prevent body scroll when menu is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        @media (min-width: 1280px) {
          .header-nav .logo-wrapper {
            width: 200px !important;
            max-width: 200px !important;
          }
          .header-nav .logo-container {
            max-width: 200px !important;
          }
        }
        @media (min-width: 1536px) {
          .header-nav .logo-wrapper {
            width: 220px !important;
            max-width: 220px !important;
          }
        }
        @media (min-width: 1760px) {
          .header-nav .container {
            max-width: 1760px;
          }
          .header-nav .logo-wrapper {
            width: 240px !important;
            max-width: 240px !important;
          }
        }
        @media (min-width: 1920px) {
          .header-nav .container {
            max-width: 1920px;
          }
          .header-nav .logo-wrapper {
            width: 260px !important;
            max-width: 260px !important;
          }
        }
      `}} />
      <header className="header header-nav fixed top-0 left-0 right-0 w-full z-50 backdrop-blur-xl bg-primary-600/80 border-b border-white/20 shadow-lg shadow-primary-900/10 overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex items-center justify-between h-16 relative">
          {/* Left Section: Logo Box */}
          <div className="flex items-center justify-start relative">
            {/* Subtle shadow/glow effect for logo visibility */}
            <div 
              className="hidden xl:block absolute top-0 h-16 logo-wrapper pointer-events-none" 
              style={{ 
                width: '200px', 
                maxWidth: '200px',
                [isRTL ? 'right' : 'left']: '0',
                zIndex: 0,
              }}
            >
              {/* Subtle glow background for logo */}
              <div 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full logo-glow"
                style={{
                  background: 'radial-gradient(ellipse at center, rgba(255, 255, 255, 0.15) 0%, transparent 70%)',
                  filter: 'blur(8px)',
                  width: '180px',
                  height: '60px',
                }}
              ></div>
            </div>
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="xl:hidden p-2.5 rounded-xl text-white hover:bg-white/20 active:scale-95 transition-all duration-200 mr-4 rtl:mr-0 rtl:ml-4 z-50 relative"
              aria-label="Menu"
              aria-expanded={isOpen}
            >
              <div className="w-6 h-5 flex flex-col justify-between">
                <span className={`block h-0.5 w-full bg-white transition-all duration-300 ease-out ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                <span className={`block h-0.5 w-full bg-white transition-all duration-300 ease-out ${isOpen ? 'opacity-0' : ''}`}></span>
                <span className={`block h-0.5 w-full bg-white transition-all duration-300 ease-out ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
              </div>
            </button>

            {/* Desktop Logo */}
            <Link href="/" className="hidden xl:flex items-center relative z-10 h-16 px-8 group logo-container" style={{ maxWidth: '200px', position: 'relative' }}>
              <div className="relative">
                {/* Subtle drop shadow for logo visibility */}
                <div 
                  className="absolute inset-0"
                  style={{
                    filter: 'drop-shadow(0 2px 8px rgba(0, 0, 0, 0.3)) drop-shadow(0 0 12px rgba(255, 255, 255, 0.2))',
                    zIndex: -1,
                  }}
                >
                  <Image
                    src="/img/logo.webp"
                    alt="DejpaLab Logo Shadow"
                    width={160}
                    height={53}
                    className="h-12 w-auto object-contain opacity-0"
                    aria-hidden="true"
                  />
                </div>
                <Image
                  src="/img/logo.png"
                  alt="DejpaLab Logo"
                  width={160}
                  height={53}
                  className="h-12 w-auto object-contain relative z-10 transition-transform duration-300 group-hover:scale-105"
                  style={{
                    filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.4)) drop-shadow(0 0 8px rgba(255, 255, 255, 0.3))',
                  }}
                  priority
                />
              </div>
            </Link>

            {/* Mobile Search Button */}
            <button className="xl:hidden p-2.5 rounded-xl text-white hover:bg-white/20 active:scale-95 transition-all duration-200 mr-2 rtl:mr-0 rtl:ml-2">
              <Search className="w-5 h-5" />
            </button>

            {/* Mobile Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="xl:hidden px-3.5 py-1.5 rounded-xl text-white hover:bg-white/20 active:scale-95 transition-all duration-200 text-sm font-medium backdrop-blur-sm"
            >
              {locale === 'fa' ? 'EN' : 'FA'}
            </button>
          </div>

          {/* Center Section: Main Menu (Desktop Only) */}
          <div className="hidden xl:flex items-center justify-center flex-1">
            <nav className="flex items-center space-x-2 rtl:space-x-reverse">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 relative group ${
                    pathname === item.href
                      ? 'text-primary-600 bg-white shadow-lg shadow-primary-900/10 scale-105'
                      : 'text-white hover:text-white hover:bg-white/20 hover:scale-105'
                  }`}
                >
                  <span className="relative z-10">{item.label}</span>
                  {pathname === item.href && (
                    <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-white to-white/90 animate-pulse opacity-50"></span>
                  )}
                </Link>
              ))}
            </nav>
          </div>

          {/* Right Section: Tools */}
          <div className="flex items-center justify-end space-x-3 rtl:space-x-reverse relative">
            {/* Mobile Logo */}
            <div className="xl:hidden relative h-16 flex items-center justify-center px-4" style={{ width: '120px' }}>
              <Link href="/" className="relative z-10 flex items-center justify-center h-full group">
                <div className="relative">
                  <Image
                    src="/img/logo.webp"
                    alt="DejpaLab Logo"
                    width={120}
                    height={40}
                    className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                    style={{
                      filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.4)) drop-shadow(0 0 8px rgba(255, 255, 255, 0.3))',
                    }}
                  />
                </div>
              </Link>
            </div>

            {/* Desktop Search Button */}
            <button
              onClick={() => setIsSearchOpen((prev) => !prev)}
              className="hidden xl:block p-2.5 rounded-xl text-white hover:bg-white/20 active:scale-95 transition-all duration-200 backdrop-blur-sm"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Desktop Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="hidden xl:flex items-center space-x-2 rtl:space-x-reverse px-4 py-2.5 rounded-xl text-sm font-medium text-white hover:bg-white/20 active:scale-95 transition-all duration-200 backdrop-blur-sm"
            >
              <Globe className="w-4 h-4" />
              <span>{locale === 'fa' ? 'EN' : 'FA'}</span>
            </button>

            {/* Admin Login Button */}
            {isAuthenticated && user?.role === 'admin' ? (
              <>
                <Link
                  href="/admin"
                  className="hidden xl:flex items-center px-5 py-2.5 bg-white text-primary-600 rounded-xl text-sm font-semibold hover:bg-gray-50 hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg shadow-primary-900/10 hover:shadow-xl hover:shadow-primary-900/20"
                >
                  {t('adminPanel')}
                </Link>
                <button
                  onClick={logout}
                  className="hidden xl:flex items-center px-5 py-2.5 bg-gray-200 text-gray-700 rounded-xl text-sm font-semibold hover:bg-gray-300 transition-all duration-200"
                >
                  <LogOut className="w-4 h-4 mr-2 rtl:mr-0 rtl:ml-2" />
                  {t('logout')}
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="hidden xl:flex items-center px-5 py-2.5 bg-white text-primary-600 rounded-xl text-sm font-semibold hover:bg-gray-50 hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg shadow-primary-900/10 hover:shadow-xl hover:shadow-primary-900/20"
              >
                {t('adminLogin')}
              </Link>
            )}

            {/* Contact Button (Desktop Only) */}
            <Link
              href="/contact"
              className="hidden xl:flex items-center px-5 py-2.5 bg-white text-primary-600 rounded-xl text-sm font-semibold hover:bg-gray-50 hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg shadow-primary-900/10 hover:shadow-xl hover:shadow-primary-900/20"
            >
              {t('contact')}
            </Link>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <div
          className={`xl:hidden mobile-menu-container overflow-hidden transition-all duration-300 ease-out ${
            isOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
          }`}
          style={{
            zIndex: 40,
          }}
        >
          <div className="pb-4 bg-primary-600/95 backdrop-blur-xl border-t border-white/20 overflow-y-auto max-h-[calc(100vh-4rem)]">
            {navItems.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-3.5 text-base font-medium transition-all duration-200 hover:pl-6 rtl:hover:pl-4 rtl:hover:pr-6 ${
                  pathname === item.href
                    ? 'text-primary-600 bg-white/95 shadow-lg'
                    : 'text-white hover:bg-white/20'
                }`}
                style={{
                  animationDelay: `${index * 50}ms`,
                }}
              >
                {item.label}
              </Link>
            ))}
            {isAuthenticated && user?.role === 'admin' ? (
              <>
                <Link
                  href="/admin"
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-3.5 mt-2 mx-4 bg-white text-primary-600 rounded-xl text-base font-semibold text-center hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg"
                >
                  {t('adminPanel')}
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                  className="block w-full px-4 py-3.5 mt-2 mx-4 bg-gray-200 text-gray-700 rounded-xl text-base font-semibold text-center hover:bg-gray-300 transition-all duration-200"
                >
                  {t('logout')}
                </button>
              </>
            ) : (
              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3.5 mt-2 mx-4 bg-white text-primary-600 rounded-xl text-base font-semibold text-center hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg"
              >
                {t('adminLogin')}
              </Link>
            )}
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-3.5 mt-2 mx-4 bg-white text-primary-600 rounded-xl text-base font-semibold text-center hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg"
            >
              {t('contact')}
            </Link>
          </div>
        </div>
      </div>

      {/* Search Panel */}
      {isSearchOpen && (
        <div className="absolute left-0 right-0 top-16 xl:top-20 px-4">
          <div className="mx-auto w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-gray-100 p-4">
            <div className="flex items-center gap-3">
              <Search className="w-5 h-5 text-primary-600" />
              <form onSubmit={handleSearchSubmit} className="flex-1 flex items-center gap-3">
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t('searchPlaceholder', { defaultValue: 'جستجو...' })}
                  className="flex-1 px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all bg-gray-50"
                />
              </form>
              <button
                onClick={() => setIsSearchOpen(false)}
                className="p-2 rounded-xl hover:bg-gray-100 transition-colors"
                aria-label="Close search"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="mt-4 space-y-1 max-h-56 overflow-y-auto">
              {(filteredSearchItems.length ? filteredSearchItems : navItems).map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => {
                    setIsSearchOpen(false);
                    setIsOpen(false);
                  }}
                  className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-primary-50 text-gray-800"
                >
                  <span>{item.label}</span>
                  <ArrowRight className="w-4 h-4 text-primary-600 rtl:rotate-180" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
    </>
  );
}
