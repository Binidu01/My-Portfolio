import React from 'react';
import './globals.css';

export const metadata = {
  title      : 'Binidu Ranasinghe',
  description: 'Software Engineering Graduate (First Class Honours) and active open-source maintainer. Creator of Bini.js framework and published npm packages. Building tools that empower developers.',
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
  themeColor : '#00CFFF',
  manifest   : '/site.webmanifest',
  openGraph: {
    title      : 'Binidu Ranasinghe',
    description: 'Software Engineering Graduate (First Class Honours) and active open-source maintainer. Creator of Bini.js framework and published npm packages. Building tools that empower developers.',
    images     : [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card   : 'summary_large_image',
    title  : 'Binidu Ranasinghe',
    creator: '@binidu01',
    images : ['/og-image.png'],
  },
  icons: {
    icon : [{ url: '/favicon.ico', type: 'image/x-icon' }],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <React.Fragment>{children}</React.Fragment>;
}
