'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import { FlaskConical, Microscope, TestTube, Shield, Award, Users, FileText, Search, ArrowRight } from 'lucide-react';

export default function HomePage() {
  const t = useTranslations('home');
  const tServices = useTranslations('services');
  const tRequest = useTranslations('requestTest');
  const tResults = useTranslations('results');

  const services = [
    {
      icon: FlaskConical,
      title: tServices('service1.title'),
      description: tServices('service1.description'),
    },
    {
      icon: TestTube,
      title: tServices('service2.title'),
      description: tServices('service2.description'),
    },
    {
      icon: Microscope,
      title: tServices('service3.title'),
      description: tServices('service3.description'),
    },
    {
      icon: Shield,
      title: tServices('service4.title'),
      description: tServices('service4.description'),
    },
    {
      icon: Users,
      title: tServices('service5.title'),
      description: tServices('service5.description'),
    },
    {
      icon: Award,
      title: tServices('service6.title'),
      description: tServices('service6.description'),
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative text-white py-24 md:py-36 min-h-[600px] md:min-h-[700px] flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/img/cover.jpg"
            alt="Hero Cover"
            fill
            className="object-cover scale-105 transition-transform duration-[20s] ease-out hover:scale-100"
            priority
            quality={90}
          />
        </div>
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600/85 via-primary-700/75 to-primary-800/85 z-[1]"></div>
        {/* Animated Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary-900/40 via-transparent to-transparent z-[2]"></div>
        {/* Content */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl animate-fade-in-up">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance leading-tight tracking-tight">
              <span className="block">{t('title')}</span>
            </h1>
            <p className="text-xl md:text-2xl mb-4 text-white/95 font-medium leading-relaxed">
              {t('subtitle')}
            </p>
            <p className="text-lg md:text-xl mb-10 text-white/85 leading-relaxed max-w-2xl">
              {t('description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/services"
                className="group bg-white text-primary-600 px-8 py-4 rounded-2xl font-semibold hover:bg-gray-50 transition-all duration-300 text-center shadow-2xl shadow-primary-900/30 hover:shadow-3xl hover:shadow-primary-900/40 hover:scale-105 active:scale-95 relative overflow-hidden"
              >
                <span className="relative z-10">{t('cta')}</span>
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
              </Link>
              <Link
                href="/about"
                className="group bg-secondary-500/95 backdrop-blur-sm border-2 border-secondary-400/50 text-white px-8 py-4 rounded-2xl font-semibold hover:bg-secondary-600 hover:border-secondary-300 transition-all duration-300 text-center shadow-xl shadow-secondary-900/30 hover:shadow-2xl hover:shadow-secondary-900/40 hover:scale-105 active:scale-95 relative overflow-hidden"
              >
                <span className="relative z-10">{t('learnMore')}</span>
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
              </Link>
            </div>
          </div>
        </div>
        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-50 to-transparent z-[3] pointer-events-none"></div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-5 tracking-tight">
              {tServices('title')}
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              {tServices('subtitle')}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={index}
                  className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-primary-200 hover:-translate-y-2 relative overflow-hidden"
                >
                  {/* Gradient Background on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-50/0 to-secondary-50/0 group-hover:from-primary-50/50 group-hover:to-secondary-50/30 transition-all duration-300"></div>
                  
                  <div className="relative z-10">
                    <div className="bg-gradient-to-br from-primary-100 to-primary-200 w-20 h-20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg shadow-primary-200/50">
                      <Icon className="w-10 h-10 text-primary-700 group-hover:text-primary-800 transition-colors" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-700 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                  
                  {/* Decorative Corner */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary-500/5 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gradient-to-b from-white via-gray-50/50 to-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            <div className="text-center group">
              <div className="bg-gradient-to-br from-secondary-100 to-secondary-200 w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-secondary-200/50 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                <Award className="w-12 h-12 text-secondary-700 group-hover:text-secondary-800 transition-colors" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-secondary-700 transition-colors">
                {tServices('service6.title')}
              </h3>
              <p className="text-gray-600 leading-relaxed max-w-sm mx-auto">
                {tServices('service6.description')}
              </p>
            </div>
            <div className="text-center group">
              <div className="bg-gradient-to-br from-primary-100 to-primary-200 w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-primary-200/50 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                <Shield className="w-12 h-12 text-primary-700 group-hover:text-primary-800 transition-colors" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-primary-700 transition-colors">
                {tServices('service4.title')}
              </h3>
              <p className="text-gray-600 leading-relaxed max-w-sm mx-auto">
                {tServices('service4.description')}
              </p>
            </div>
            <div className="text-center group">
              <div className="bg-gradient-to-br from-secondary-100 to-secondary-200 w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-secondary-200/50 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                <Users className="w-12 h-12 text-secondary-700 group-hover:text-secondary-800 transition-colors" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-secondary-700 transition-colors">
                {tServices('service5.title')}
              </h3>
              <p className="text-gray-600 leading-relaxed max-w-sm mx-auto">
                {tServices('service5.description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Request Test & Results Section */}
      <section className="py-24 bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-500 text-white relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              {t('requestSection.title')}
            </h2>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              {t('requestSection.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Request Test Card */}
            <Link
              href="/request-test"
              className="group bg-white/10 backdrop-blur-lg p-10 rounded-3xl border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <div className="bg-white/20 w-20 h-20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                <FileText className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">{tRequest('title')}</h3>
              <p className="text-white/80 mb-6 leading-relaxed">
                {tRequest('subtitle')}
              </p>
              <div className="flex items-center text-white font-semibold group-hover:translate-x-2 rtl:group-hover:-translate-x-2 transition-transform duration-300">
                <span>{t('requestSection.requestButton')}</span>
                <ArrowRight className="w-5 h-5 mr-2 rtl:mr-0 rtl:ml-2 rtl:rotate-180" />
              </div>
            </Link>

            {/* View Results Card */}
            <Link
              href="/results"
              className="group bg-white/10 backdrop-blur-lg p-10 rounded-3xl border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <div className="bg-white/20 w-20 h-20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                <Search className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">{tResults('title')}</h3>
              <p className="text-white/80 mb-6 leading-relaxed">
                {tResults('subtitle')}
              </p>
              <div className="flex items-center text-white font-semibold group-hover:translate-x-2 rtl:group-hover:-translate-x-2 transition-transform duration-300">
                <span>{t('requestSection.resultsButton')}</span>
                <ArrowRight className="w-5 h-5 mr-2 rtl:mr-0 rtl:ml-2 rtl:rotate-180" />
              </div>
            </Link>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="bg-white/20 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-bold mb-2">{tRequest('infoCard1.title')}</h4>
              <p className="text-sm text-white/80">{tRequest('infoCard1.description')}</p>
            </div>
            <div className="text-center">
              <div className="bg-white/20 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-bold mb-2">{tRequest('infoCard2.title')}</h4>
              <p className="text-sm text-white/80">{tRequest('infoCard2.description')}</p>
            </div>
            <div className="text-center">
              <div className="bg-white/20 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-bold mb-2">{tRequest('infoCard3.title')}</h4>
              <p className="text-sm text-white/80">{tRequest('infoCard3.description')}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

