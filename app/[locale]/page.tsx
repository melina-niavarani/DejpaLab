'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import { FlaskConical, Microscope, TestTube, Shield, Award, Users, FileText, Search, ArrowRight } from 'lucide-react';
import { useEffect, useRef } from 'react';

export default function HomePage() {
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observers = sectionRefs.current.map((ref) => {
      if (!ref) return null;
      
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('animate-fade-in-up');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
      );
      
      observer.observe(ref);
      return observer;
    });

    return () => {
      observers.forEach((observer) => observer?.disconnect());
    };
  }, []);
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
    <div className="flex flex-col page-transition">
      {/* Hero Section */}
      <section className="relative text-white py-24 md:py-36 min-h-[600px] md:min-h-[700px] flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/img/cover.webp"
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
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 z-[1] opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px',
            animation: 'shimmer 20s linear infinite'
          }}></div>
        </div>
        {/* Content */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl animate-fade-in-up">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance leading-tight tracking-tight">
              <span className="block animate-fade-in-up stagger-1">{t('title')}</span>
            </h1>
            <p className="text-xl md:text-2xl mb-4 text-white/95 font-medium leading-relaxed animate-fade-in-up stagger-2">
              {t('subtitle')}
            </p>
            <p className="text-lg md:text-xl mb-10 text-white/85 leading-relaxed max-w-2xl animate-fade-in-up stagger-3">
              {t('description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up stagger-4">
              <Link
                href="/services"
                className="group bg-white text-primary-600 px-8 py-4 rounded-2xl font-semibold hover:bg-gray-50 transition-all duration-300 text-center shadow-2xl shadow-primary-900/30 hover:shadow-3xl hover:shadow-primary-900/40 hover:scale-105 active:scale-95 relative overflow-hidden hover-lift"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {t('cta')}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
              </Link>
              <Link
                href="/about"
                className="group bg-secondary-500/95 backdrop-blur-sm border-2 border-secondary-400/50 text-white px-8 py-4 rounded-2xl font-semibold hover:bg-secondary-600 hover:border-secondary-300 transition-all duration-300 text-center shadow-xl shadow-secondary-900/30 hover:shadow-2xl hover:shadow-secondary-900/40 hover:scale-105 active:scale-95 relative overflow-hidden hover-lift"
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
      <section 
        ref={(el) => { sectionRefs.current[0] = el; }}
        className="py-24 bg-gradient-to-b from-gray-50 to-white"
      >
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
                  className={`group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-primary-200 hover:-translate-y-2 relative overflow-hidden animate-fade-in-up hover-lift ${
                    index === 0 ? 'stagger-1' : index === 1 ? 'stagger-2' : index === 2 ? 'stagger-3' : 
                    index === 3 ? 'stagger-4' : index === 4 ? 'stagger-5' : 'stagger-6'
                  }`}
                >
                  {/* Gradient Background on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-50/0 to-secondary-50/0 group-hover:from-primary-50/50 group-hover:to-secondary-50/30 transition-all duration-300"></div>
                  
                  {/* Animated Border Glow */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary-500/20 via-secondary-500/20 to-primary-500/20 animate-shimmer"></div>
                  </div>
                  
                  <div className="relative z-10">
                    <div className="bg-gradient-to-br from-primary-100 to-primary-200 w-20 h-20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg shadow-primary-200/50 group-hover:shadow-xl group-hover:shadow-primary-300/60">
                      <Icon className="w-10 h-10 text-primary-700 group-hover:text-primary-800 transition-colors group-hover:scale-110" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-700 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors">
                      {service.description}
                    </p>
                  </div>
                  
                  {/* Decorative Corner */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary-500/5 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Hover Indicator */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section 
        ref={(el) => { sectionRefs.current[1] = el; }}
        className="py-24 bg-gradient-to-b from-white via-gray-50/50 to-white"
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            <div className="text-center group animate-fade-in-up stagger-1 hover-lift">
              <div className="bg-gradient-to-br from-secondary-100 to-secondary-200 w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-secondary-200/50 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 group-hover:shadow-xl group-hover:shadow-secondary-300/60">
                <Award className="w-12 h-12 text-secondary-700 group-hover:text-secondary-800 transition-colors group-hover:scale-110" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-secondary-700 transition-colors">
                {tServices('service6.title')}
              </h3>
              <p className="text-gray-600 leading-relaxed max-w-sm mx-auto group-hover:text-gray-700 transition-colors">
                {tServices('service6.description')}
              </p>
            </div>
            <div className="text-center group animate-fade-in-up stagger-2 hover-lift">
              <div className="bg-gradient-to-br from-primary-100 to-primary-200 w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-primary-200/50 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 group-hover:shadow-xl group-hover:shadow-primary-300/60">
                <Shield className="w-12 h-12 text-primary-700 group-hover:text-primary-800 transition-colors group-hover:scale-110" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-primary-700 transition-colors">
                {tServices('service4.title')}
              </h3>
              <p className="text-gray-600 leading-relaxed max-w-sm mx-auto group-hover:text-gray-700 transition-colors">
                {tServices('service4.description')}
              </p>
            </div>
            <div className="text-center group animate-fade-in-up stagger-3 hover-lift">
              <div className="bg-gradient-to-br from-secondary-100 to-secondary-200 w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-secondary-200/50 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 group-hover:shadow-xl group-hover:shadow-secondary-300/60">
                <Users className="w-12 h-12 text-secondary-700 group-hover:text-secondary-800 transition-colors group-hover:scale-110" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-secondary-700 transition-colors">
                {tServices('service5.title')}
              </h3>
              <p className="text-gray-600 leading-relaxed max-w-sm mx-auto group-hover:text-gray-700 transition-colors">
                {tServices('service5.description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Request Test & Results Section */}
      <section 
        ref={(el) => { sectionRefs.current[2] = el; }}
        className="py-24 bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-500 text-white relative overflow-hidden"
      >
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
              className="group bg-white/10 backdrop-blur-lg p-10 rounded-3xl border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-2xl relative overflow-hidden hover-lift animate-fade-in-up stagger-1"
            >
              {/* Animated Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/0 group-hover:from-white/10 group-hover:to-white/5 transition-all duration-300"></div>
              
              <div className="relative z-10">
                <div className="bg-white/20 w-20 h-20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 group-hover:bg-white/30 shadow-lg">
                  <FileText className="w-10 h-10 text-white group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="text-2xl font-bold mb-4 group-hover:text-white transition-colors">{tRequest('title')}</h3>
                <p className="text-white/80 mb-6 leading-relaxed group-hover:text-white/90 transition-colors">
                  {tRequest('subtitle')}
                </p>
                <div className="flex items-center text-white font-semibold group-hover:translate-x-2 rtl:group-hover:-translate-x-2 transition-transform duration-300">
                  <span>{t('requestSection.requestButton')}</span>
                  <ArrowRight className="w-5 h-5 mr-2 rtl:mr-0 rtl:ml-2 rtl:rotate-180 group-hover:scale-110 transition-transform" />
                </div>
              </div>
              
              {/* Hover Glow Effect */}
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-primary-400/20 via-secondary-400/20 to-primary-400/20 animate-shimmer"></div>
              </div>
            </Link>

            {/* View Results Card */}
            <Link
              href="/results"
              className="group bg-white/10 backdrop-blur-lg p-10 rounded-3xl border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-2xl relative overflow-hidden hover-lift animate-fade-in-up stagger-2"
            >
              {/* Animated Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/0 group-hover:from-white/10 group-hover:to-white/5 transition-all duration-300"></div>
              
              <div className="relative z-10">
                <div className="bg-white/20 w-20 h-20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 group-hover:bg-white/30 shadow-lg">
                  <Search className="w-10 h-10 text-white group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="text-2xl font-bold mb-4 group-hover:text-white transition-colors">{tResults('title')}</h3>
                <p className="text-white/80 mb-6 leading-relaxed group-hover:text-white/90 transition-colors">
                  {tResults('subtitle')}
                </p>
                <div className="flex items-center text-white font-semibold group-hover:translate-x-2 rtl:group-hover:-translate-x-2 transition-transform duration-300">
                  <span>{t('requestSection.resultsButton')}</span>
                  <ArrowRight className="w-5 h-5 mr-2 rtl:mr-0 rtl:ml-2 rtl:rotate-180 group-hover:scale-110 transition-transform" />
                </div>
              </div>
              
              {/* Hover Glow Effect */}
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-primary-400/20 via-secondary-400/20 to-primary-400/20 animate-shimmer"></div>
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

