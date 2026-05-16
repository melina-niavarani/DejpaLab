'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Target, Eye, Heart, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function AboutPage() {
  const t = useTranslations('about');
  const [currentSlide, setCurrentSlide] = useState(0);
  const images = ['/img/2.webp', '/img/3.webp', '/img/4.webp', '/img/5.webp'];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [images.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

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
    <div className="flex flex-col min-h-screen">
      {/* Hero Slider Section */}
      <section className="relative text-white h-[500px] md:h-[600px] overflow-hidden">
        {/* Slides Container */}
        <div className="relative w-full h-full">
          {images.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            >
              <Image
                src={image}
                alt={`Laboratory Image ${index + 1}`}
                fill
                className="object-cover"
                priority={index === 0}
                quality={90}
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-600/85 via-primary-700/75 to-primary-800/85"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-primary-900/40 via-transparent to-transparent"></div>
            </div>
          ))}
        </div>

        {/* Content Overlay */}
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div className="text-center px-4 animate-fade-in-up">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-balance leading-tight tracking-tight">
              {t('title')}
            </h1>
            <p className="text-xl md:text-2xl text-white/95 font-medium leading-relaxed max-w-3xl">
              {t('subtitle')}
            </p>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 active:scale-95"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 active:scale-95"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Dots Indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'bg-white w-8'
                  : 'bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Decorative Bottom Gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-50 to-transparent z-[3] pointer-events-none"></div>
      </section>

      {/* Main Content */}
      <div className="py-24 bg-gradient-to-b from-gray-50 via-white to-white">
        <div className="container mx-auto px-4">
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
    </div>
  );
}

