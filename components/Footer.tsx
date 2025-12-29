'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');
  const tContact = useTranslations('contact');

  return (
    <footer className="bg-gradient-to-b from-primary-600 to-primary-800 text-gray-200 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary-500 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
      </div>
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* About */}
          <div className="space-y-4">
            <Link href="/" className="inline-block group">
              <Image
                src="/img/logo.webp"
                alt="DejpaLab Logo"
                width={140}
                height={46}
                className="h-12 w-auto object-contain brightness-0 invert transition-transform duration-300 group-hover:scale-105"
              />
            </Link>
            <p className="text-gray-300 leading-relaxed max-w-sm">{t('description')}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-2xl font-bold mb-6">{t('quickLinks')}</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="group flex items-center hover:text-white transition-all duration-200">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-white mr-0 group-hover:mr-2 transition-all duration-200"></span>
                  {tNav('home')}
                </Link>
              </li>
              <li>
                <Link href="/services" className="group flex items-center hover:text-white transition-all duration-200">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-white mr-0 group-hover:mr-2 transition-all duration-200"></span>
                  {tNav('services')}
                </Link>
              </li>
              <li>
                <Link href="/about" className="group flex items-center hover:text-white transition-all duration-200">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-white mr-0 group-hover:mr-2 transition-all duration-200"></span>
                  {tNav('about')}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="group flex items-center hover:text-white transition-all duration-200">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-white mr-0 group-hover:mr-2 transition-all duration-200"></span>
                  {tNav('contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white text-2xl font-bold mb-6">{t('contactInfo')}</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3 rtl:space-x-reverse group">
                <MapPin className="w-5 h-5 text-white mt-1 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <span className="hover:text-white transition-colors">{tContact('addressText')}</span>
              </li>
              <li className="flex items-center space-x-3 rtl:space-x-reverse group">
                <Phone className="w-5 h-5 text-white flex-shrink-0 group-hover:scale-110 transition-transform" />
                <a href="tel:+982112345678" className="hover:text-white transition-colors">+98 21 1234 5678</a>
              </li>
              <li className="flex items-center space-x-3 rtl:space-x-reverse group">
                <Mail className="w-5 h-5 text-white flex-shrink-0 group-hover:scale-110 transition-transform" />
                <a href="mailto:info@dejpalab.com" className="hover:text-white transition-colors">info@dejpalab.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 text-center">
          <p className="text-gray-300 text-sm">
            © {new Date().getFullYear()} DejpaLab. {t('rights')}
          </p>
        </div>
      </div>
    </footer>
  );
}

