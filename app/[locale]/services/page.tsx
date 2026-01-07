'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { FlaskConical, TestTube, Microscope, Shield, Users, Award, FileCheck } from 'lucide-react';

export default function ServicesPage() {
  const t = useTranslations('services');

  const services = [
    {
      icon: FlaskConical,
      title: t('service1.title'),
      description: t('service1.description'),
      features: t.raw('features.service1') as string[],
    },
    {
      icon: TestTube,
      title: t('service2.title'),
      description: t('service2.description'),
      features: t.raw('features.service2') as string[],
    },
    {
      icon: Microscope,
      title: t('service3.title'),
      description: t('service3.description'),
      features: t.raw('features.service3') as string[],
    },
    {
      icon: Shield,
      title: t('service4.title'),
      description: t('service4.description'),
      features: t.raw('features.service4') as string[],
    },
    {
      icon: Users,
      title: t('service5.title'),
      description: t('service5.description'),
      features: t.raw('features.service5') as string[],
    },
    {
      icon: Award,
      title: t('service6.title'),
      description: t('service6.description'),
      features: t.raw('features.service6') as string[],
    },
  ];

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
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
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-primary-700 transition-colors">
                    {service.title}
                  </h2>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  <ul className="space-y-3">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start text-sm text-gray-600 group-hover:text-gray-700 transition-colors">
                        <span className="w-2 h-2 bg-primary-600 rounded-full mt-2 ml-3 rtl:ml-0 rtl:mr-3 flex-shrink-0 group-hover:bg-primary-700 transition-colors"></span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Decorative Corner */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary-500/5 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            );
          })}
        </div>

        {/* Bitumen Testing Section */}
        <div className="mb-20">
          <div className="bg-gradient-to-br from-primary-50 via-white to-secondary-50 rounded-3xl p-12 md:p-16 border-2 border-primary-200 shadow-xl">
            <div className="text-center mb-12">
              <div className="bg-gradient-to-br from-primary-600 to-primary-700 w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-primary-500/30">
                <FileCheck className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-4xl  md:text-5xl font-bold text-gray-900 mb-6 py-2">
                {t('bitumen.title')}
              </h2>
              <p className="text-xl text-center text-gray-700 mx-auto leading-relaxed mb-8 px-4 md:px-0">
                {t('bitumen.description')}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 mb-12">
              {/* Testing Services */}
              <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-primary-200 hover:-translate-y-2 relative overflow-hidden">
                {/* Gradient Background on Hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-50/0 to-secondary-50/0 group-hover:from-primary-50/50 group-hover:to-secondary-50/30 transition-all duration-300"></div>
                
                <div className="relative z-10">
                  <div className="bg-gradient-to-br from-primary-100 to-primary-200 w-20 h-20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg shadow-primary-200/50">
                    <TestTube className="w-10 h-10 text-primary-700 group-hover:text-primary-800 transition-colors" />
                  </div>
                  <h3 className="text-2xl  font-bold text-gray-900 mb-4 group-hover:text-primary-700 transition-colors">
                    {t('bitumen.testing.title')}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {t('bitumen.testing.description')}
                  </p>
                  <div className="md:block">
                    <div className="custom-scrollbar max-h-[60vh] md:max-h-none overflow-y-auto md:overflow-y-visible pr-3 rtl:pr-3 rtl:pl-0 md:pr-0 md:rtl:pr-0" style={{ direction: 'ltr' }}>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-3" style={{ direction: 'rtl' }}>
                        {t.raw('bitumen.testing.features') as string[] && (t.raw('bitumen.testing.features') as string[]).map((feature: string, idx: number) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-gray-600 group-hover:text-gray-700 transition-colors py-2 md:py-0 px-1 md:px-0">
                            <span className="w-2 h-2 bg-primary-600 rounded-full mt-2 ml-2 rtl:ml-0 rtl:mr-2 md:ml-3 md:rtl:ml-0 md:rtl:mr-3 flex-shrink-0 group-hover:bg-primary-700 transition-colors"></span>
                            <span className="leading-relaxed flex-1">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                
                {/* Decorative Corner */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary-500/5 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white p-8 rounded-2xl text-center">
              <p className="text-lg md:text-xl font-semibold mb-4">
                {t('bitumen.cta')}
              </p>
              <Link
                href="/request-test"
                className="inline-block bg-white text-primary-600 px-8 py-3 rounded-xl font-bold hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
              >
                {t('bitumen.ctaButton')}
              </Link>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-500 text-white rounded-3xl p-12 md:p-16 text-center overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
          
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              {t('cta.title')}
            </h2>
            <p className="text-xl md:text-2xl mb-10 text-white/95 max-w-2xl mx-auto leading-relaxed">
              {t('cta.description')}
            </p>
            <Link
              href="/contact"
              className="inline-block group bg-white text-primary-600 px-10 py-4 rounded-2xl font-bold text-lg hover:bg-gray-50 transition-all duration-300 shadow-2xl shadow-primary-900/30 hover:shadow-3xl hover:shadow-primary-900/40 hover:scale-105 active:scale-95 relative overflow-hidden"
            >
              <span className="relative z-10">{t('cta.button')}</span>
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

