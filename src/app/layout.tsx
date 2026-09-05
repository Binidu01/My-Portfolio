import React from 'react';
import './globals.css';

export const metadata = {
  title: 'Binidu Ranasinghe | Software Engineer & Open-Source Creator',
  description:
    'Software Engineering Graduate (First Class Honours) and active open-source maintainer. Creator of Bini.js framework and published npm packages. Building tools that empower developers.',
  keywords: [
    'Binidu Ranasinghe',
    'Software Engineer',
    'Full-Stack Developer',
    'Bini.js',
    'React',
    'TypeScript',
    'Rust',
    'Open Source',
    'JavaScript',
    'Web Developer',
    'Portfolio',
  ],
  authors: [{ name: 'Binidu Ranasinghe' }],
  creator: 'Binidu Ranasinghe',
  publisher: 'Binidu Ranasinghe',
  metadataBase: new URL('https://my-portfolio-phi-blue-85.vercel.app/'),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Binidu Ranasinghe | Software Engineer & Open-Source Creator',
    description:
      'Software Engineering Graduate (First Class Honours) and active open-source maintainer. Creator of Bini.js framework and published npm packages.',
    url: 'https://my-portfolio-phi-blue-85.vercel.app/',
    siteName: 'Binidu Ranasinghe Portfolio',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Binidu Ranasinghe Portfolio',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Binidu Ranasinghe | Software Engineer & Open-Source Creator',
    description:
      'Software Engineering Graduate (First Class Honours) and active open-source maintainer. Creator of Bini.js framework.',
    creator: '@binidu01',
    images: ['/og-image.png'],
  },
  icons: {
    icon: [
      { url: '/favicon.ico', type: 'image/x-icon' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
    shortcut: ['/favicon.ico'],
    other: [
      {
        rel: 'mask-icon',
        url: '/safari-pinned-tab.svg',
        color: '#111111',
      },
    ],
  },
  manifest: '/site.webmanifest',
  themeColor: '#111111',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
  verification: {
    google: 'your-google-site-verification-code', // Add your code if you have Google Search Console
    // yandex: 'your-yandex-verification-code',
    // bing: 'your-bing-verification-code',
  },
  category: 'technology',
  classification: 'Software Engineering, Web Development, Open Source',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#f0ede8] antialiased">
        {children}
      </body>
    </html>
  );
}
