import React from 'react';
import './globals.css';

export const metadata = {
  title      : 'Binidu Ransinghe',
  description: 'Portfolio website of Binidu Ransinghe',
  keywords: [
  // Personal
  'Binidu Ranasinghe',
  'Binidu',
  'Software Engineer',
  'Open Source Creator',
  'Developer Tools Builder',
  
  // Technologies
  'React',
  'Vite',
  'Next.js',
  'TypeScript',
  'JavaScript',
  'Node.js',
  'TailwindCSS',
  'Bini.js',
  'Tauri',
  'Express',
  'Django',
  'Flask',
  '.NET',
  'Hono',
  
  // Skills
  'Cross-platform Development',
  'Full Stack Development',
  'Web Development',
  'Desktop Applications',
  'Mobile Development',
  'API Development',
  'UI/UX Design',
  'System Architecture',
  'Cloud Computing',
  
  // Projects
  'Bini.js Framework',
  'Hummanize-AI',
  'Travel Assistant AI',
  'Developer Tools',
  
  // Industries
  'Developer Experience',
  'Open Source',
  'Artificial Intelligence',
  'Machine Learning',
  'Software Engineering',
  'Developer Productivity',
  
  // Tools
  'Git',
  'Docker',
  'Kubernetes',
  'Linux',
  'AWS',
  'Firebase',
  'MongoDB',
  'PostgreSQL',
  'Redis',
  
  // Education
  'BEng Software Engineering',
  'London Metropolitan University',
  'HND Computing',
  'Pearson UK',
  
  // Location
  'Sri Lanka',
  'Remote Developer'
],
  themeColor : '#00CFFF',
  manifest   : '/site.webmanifest',
  openGraph: {
    title      : 'Binidu Ransinghe',
    description: 'Portfolio website of Binidu Ransinghe',
    images     : [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card   : 'summary_large_image',
    title  : 'Binidu Ransinghe',
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
