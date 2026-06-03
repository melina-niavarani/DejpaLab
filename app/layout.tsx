import type { Metadata } from 'next';
import './globals.css';

const siteUrl = 'https://dejpalab.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: 'Dejpa Laboratory | Bitumen Testing & Industrial Laboratory Services',
    template: '%s | Dejpa Laboratory',
  },

  description:
    'Dejpa Laboratory provides professional bitumen testing, petroleum product analysis, quality control, and industrial laboratory services for road construction, refinery, and export projects.',

  keywords: [
    'Dejpa Laboratory',
    'Dejpa Lab',
    'bitumen testing laboratory',
    'bitumen quality control',
    'petroleum laboratory',
    'asphalt binder testing',
    'industrial laboratory services',
    'bitumen analysis',
    'oil and bitumen laboratory',
    'آزمایشگاه دژپا',
    'آزمایش قیر',
    'کنترل کیفیت قیر',
    'آزمایشگاه قیر',
    'آزمایش فرآورده های نفتی',
  ],

  authors: [{ name: 'Dejpa Laboratory' }],
  creator: 'Dejpa Laboratory',
  publisher: 'Dejpa Laboratory',

  alternates: {
    canonical: '/',
    languages: {
      en: '/',
      fa: '/fa',
    },
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },

  openGraph: {
    type: 'website',
    url: siteUrl,
    siteName: 'Dejpa Laboratory',
    title: 'Dejpa Laboratory | Bitumen Testing & Industrial Laboratory Services',
    description:
      'Professional bitumen testing, petroleum product analysis, quality control, and industrial laboratory services.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Dejpa Laboratory - Bitumen Testing and Quality Control',
      },
    ],
    locale: 'en_US',
    alternateLocale: ['fa_IR'],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Dejpa Laboratory | Bitumen Testing & Industrial Laboratory Services',
    description:
      'Professional bitumen testing, petroleum product analysis, quality control, and industrial laboratory services.',
    images: ['/og-image.jpg'],
  },

  category: 'Industrial Laboratory',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Dejpa Laboratory',
    alternateName: ['Dejpa Lab', 'آزمایشگاه دژپا'],
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    description:
      'Professional bitumen testing, petroleum product analysis, quality control, and industrial laboratory services.',
    sameAs: [
      'https://www.linkedin.com/company/dejpa-oil-bitumen-refinery-co',
    ],
  };

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Dejpa Laboratory',
    url: siteUrl,
    image: `${siteUrl}/og-image.jpg`,
    description:
      'Bitumen testing, petroleum product analysis, quality control, and industrial laboratory services.',
    areaServed: ['Iran', 'Middle East', 'Central Asia', 'International Markets'],
    serviceType: [
      'Bitumen Testing',
      'Petroleum Product Analysis',
      'Industrial Laboratory Services',
      'Quality Control Testing',
      'Asphalt Binder Testing',
    ],
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema),
          }}
        />
      </head>

      <body>{children}</body>
    </html>
  );
}