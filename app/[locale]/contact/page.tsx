'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function ContactPage() {
  const t = useTranslations('contact');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    alert('پیام شما با موفقیت ارسال شد!');
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="py-24 bg-gradient-to-b from-gray-50 to-white min-h-screen">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
            {t('title')}
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Contact Form */}
          <div className="bg-white p-10 rounded-3xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              {t('send')}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                  {t('name')}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 bg-gray-50 focus:bg-white"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                  {t('email')}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 bg-gray-50 focus:bg-white"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                  {t('phone')}
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-5 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 bg-gray-50 focus:bg-white"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                  {t('message')}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-5 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 bg-gray-50 focus:bg-white resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full group bg-gradient-to-r from-primary-600 to-primary-700 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-primary-700 hover:to-primary-800 transition-all duration-300 flex items-center justify-center space-x-2 rtl:space-x-reverse shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40 hover:scale-105 active:scale-95 relative overflow-hidden"
              >
                <Send className="w-5 h-5 relative z-10" />
                <span className="relative z-10">{t('send')}</span>
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <div className="bg-white p-10 rounded-3xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                {t('contactInfo')}
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4 rtl:space-x-reverse group">
                  <div className="bg-gradient-to-br from-primary-100 to-primary-200 p-4 rounded-2xl group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-primary-200/50">
                    <MapPin className="w-6 h-6 text-primary-700" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 mb-2 text-lg">{t('address')}</h3>
                    <p className="text-gray-600 leading-relaxed">{t('addressText')}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 rtl:space-x-reverse group">
                  <div className="bg-gradient-to-br from-primary-100 to-primary-200 p-4 rounded-2xl group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-primary-200/50">
                    <Phone className="w-6 h-6 text-primary-700" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 mb-2 text-lg">{t('phoneLabel')}</h3>
                    <a href="tel:+982112345678" className="text-gray-600 hover:text-primary-600 transition-colors">+98 21 1234 5678</a>
                  </div>
                </div>
                <div className="flex items-start space-x-4 rtl:space-x-reverse group">
                  <div className="bg-gradient-to-br from-primary-100 to-primary-200 p-4 rounded-2xl group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-primary-200/50">
                    <Mail className="w-6 h-6 text-primary-700" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 mb-2 text-lg">{t('emailLabel')}</h3>
                    <a href="mailto:info@dejpalab.com" className="text-gray-600 hover:text-primary-600 transition-colors">info@dejpalab.com</a>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-500 text-white p-10 rounded-3xl shadow-2xl relative overflow-hidden">
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
              
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-6">{t('workingHours')}</h3>
                <div className="space-y-3 text-lg">
                  <p className="opacity-95">{t('workingHoursText.weekdays')}</p>
                  <p className="opacity-95">{t('workingHoursText.thursday')}</p>
                  <p className="opacity-95">{t('workingHoursText.friday')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

