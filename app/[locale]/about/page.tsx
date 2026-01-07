'use client';

import { useTranslations } from 'next-intl';
import { Target, Eye, Heart, CheckCircle } from 'lucide-react';

export default function AboutPage() {
  const t = useTranslations('about');

  const values = [
    {
      icon: CheckCircle,
      title: t('value1'),
      description: t('valueDescriptions.value1'),
    },
    {
      icon: Heart,
      title: t('value2'),
      description: t('valueDescriptions.value2'),
    },
    {
      icon: Target,
      title: t('value3'),
      description: t('valueDescriptions.value3'),
    },
  ];

  return (
    <div className="py-24 bg-gradient-to-b from-white via-gray-50/50 to-white min-h-screen">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
            {t('title')}
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t('subtitle')}
          </p>
        </div>

        {/* Description */}
        <div className="max-w-4xl mx-auto mb-20">
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed text-center">
            {t('description')}
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <div className="group bg-gradient-to-br from-primary-50 to-primary-100 p-10 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-primary-100">
            <div className="bg-gradient-to-br from-primary-600 to-primary-700 w-20 h-20 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-primary-500/30 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
              <Target className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-5">
              {t('mission')}
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              {t('missionText')}
            </p>
          </div>

          <div className="group bg-gradient-to-br from-secondary-50 to-secondary-100 p-10 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-secondary-100">
            <div className="bg-gradient-to-br from-secondary-600 to-secondary-700 w-20 h-20 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-secondary-500/30 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
              <Eye className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-5">
              {t('vision')}
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              {t('visionText')}
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-16">
            {t('values')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={index}
                  className="group bg-white p-8 rounded-2xl shadow-lg border border-gray-100 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                >
                  <div className="bg-gradient-to-br from-primary-100 to-primary-200 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-primary-200/50 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                    <Icon className="w-10 h-10 text-primary-700 group-hover:text-primary-800 transition-colors" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-primary-700 transition-colors">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-12 md:p-16 shadow-xl border border-gray-100">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center">
            <div className="group">
              <div className="text-5xl md:text-6xl font-bold bg-gradient-to-br from-primary-600 to-primary-700 bg-clip-text text-transparent mb-3 group-hover:scale-110 transition-transform duration-300">10+</div>
              <div className="text-gray-600 text-lg font-medium">{t('stats.years')}</div>
            </div>
            <div className="group">
              <div className="text-5xl md:text-6xl font-bold bg-gradient-to-br from-primary-600 to-primary-700 bg-clip-text text-transparent mb-3 group-hover:scale-110 transition-transform duration-300">500+</div>
              <div className="text-gray-600 text-lg font-medium">{t('stats.clients')}</div>
            </div>
            <div className="group">
              <div className="text-5xl md:text-6xl font-bold bg-gradient-to-br from-primary-600 to-primary-700 bg-clip-text text-transparent mb-3 group-hover:scale-110 transition-transform duration-300">1000+</div>
              <div className="text-gray-600 text-lg font-medium">{t('stats.tests')}</div>
            </div>
            <div className="group">
              <div className="text-5xl md:text-6xl font-bold bg-gradient-to-br from-primary-600 to-primary-700 bg-clip-text text-transparent mb-3 group-hover:scale-110 transition-transform duration-300">50+</div>
              <div className="text-gray-600 text-lg font-medium">{t('stats.testTypes')}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

