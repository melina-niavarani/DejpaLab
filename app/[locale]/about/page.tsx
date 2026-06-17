'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import {
  Target,
  Eye,
  ShieldCheck,
  FlaskConical,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

const heroImages = ['/img/2.webp', '/img/3.webp', '/img/4.webp', '/img/5.webp'];

export default function AboutPage() {
  const t = useTranslations('about');
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % heroImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + heroImages.length) % heroImages.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const values = [
    {
      icon: Target,
      title: t('value1'),
      description: t('valueDescriptions.value1'),
    },
    {
      icon: ShieldCheck,
      title: t('value2'),
      description: t('valueDescriptions.value2'),
    },
    {
      icon: FlaskConical,
      title: t('value3'),
      description: t('valueDescriptions.value3'),
    },
  ];

  const standardUnitAwards = [
    {
      year: t('standardUnitAwards.items.y1397.year'),
      image: '/img/about/awards/standard-unit-1397.webp',
      title: t('standardUnitAwards.items.y1397.title'),
      description: t('standardUnitAwards.items.y1397.description'),
    },
    {
      year: t('standardUnitAwards.items.y1399.year'),
      image: '/img/about/awards/standard-unit-1399.webp',
      title: t('standardUnitAwards.items.y1399.title'),
      description: t('standardUnitAwards.items.y1399.description'),
    },
    {
      year: t('standardUnitAwards.items.y1400.year'),
      image: '/img/about/awards/standard-unit-1400.webp',
      title: t('standardUnitAwards.items.y1400.title'),
      description: t('standardUnitAwards.items.y1400.description'),
    },
    {
      year: t('standardUnitAwards.items.y1401.year'),
      image: '/img/about/awards/standard-unit-1401.webp',
      title: t('standardUnitAwards.items.y1401.title'),
      description: t('standardUnitAwards.items.y1401.description'),
    },
    {
      year: t('standardUnitAwards.items.y1403.year'),
      image: '/img/about/awards/standard-unit-1403.webp',
      title: t('standardUnitAwards.items.y1403.title'),
      description: t('standardUnitAwards.items.y1403.description'),
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Slider Section */}
      <section className="relative text-white h-[500px] md:h-[600px] overflow-hidden">
        <div className="relative w-full h-full">
          {heroImages.map((image, index) => (
            <div
              key={image}
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

              <div className="absolute inset-0 bg-gradient-to-br from-primary-600/85 via-primary-700/75 to-primary-800/85" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-900/40 via-transparent to-transparent" />
            </div>
          ))}
        </div>

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

        <button
          type="button"
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 active:scale-95"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          type="button"
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 active:scale-95"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2">
          {heroImages.map((image, index) => (
            <button
              key={image}
              type="button"
              onClick={() => goToSlide(index)}
              className={`h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'bg-white w-8'
                  : 'bg-white/50 hover:bg-white/75 w-3'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-50 to-transparent z-[3] pointer-events-none" />
      </section>

      {/* Main Content */}
      <main className="py-24 bg-gradient-to-b from-gray-50 via-white to-white">
        <div className="container mx-auto px-4">
          {/* Description */}
          <div className="max-w-4xl mx-auto mb-20">
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed text-center whitespace-pre-line">
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
          <section className="mb-20">
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
          </section>

          {/* Standard Unit Awards Section */}
          <section className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-2 rounded-full bg-primary-50 text-primary-700 text-sm font-bold mb-4">
                {t('standardUnitAwards.eyebrow')}
              </span>

              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {t('standardUnitAwards.title')}
              </h2>

              <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
                {t('standardUnitAwards.subtitle')}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {standardUnitAwards.map((award, index) => (
                <article
                  key={index}
                  className="group bg-white rounded-2xl border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden hover:-translate-y-1"
                >
                  <div className="relative h-64 bg-gray-50 border-b border-gray-100 flex items-center justify-center p-5">
                    <Image
                      src={award.image}
                      alt={award.title}
                      width={260}
                      height={260}
                      className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />

                    <div className="absolute top-4 right-4 rtl:right-auto rtl:left-4 bg-primary-600 text-white text-sm font-bold px-3 py-1 rounded-full shadow-md">
                      {award.year}
                    </div>
                  </div>

                  <div className="p-5 text-center">
                    <h3 className="font-bold text-gray-900 text-base mb-3 leading-relaxed">
                      {award.title}
                    </h3>

                    <p className="text-sm text-gray-600 leading-relaxed">
                      {award.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}