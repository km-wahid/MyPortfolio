import type { Metadata, Viewport } from 'next';
import './globals.css';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Khalid Muhammad Wahid | Software Engineer',
    template: '%s | Khalid Muhammad Wahid',
  },
  description:
    'Software engineer building backend, real-time, and AI-powered systems with Node.js, AdonisJS, Python, and modern infrastructure.',
  keywords: ['Software Engineer', 'Backend Developer', 'Node.js', 'AdonisJS', 'Real-time Systems', 'AI', 'Dhaka'],
  authors: [{ name: 'Khalid Muhammad Wahid' }],
  openGraph: {
    title: 'Khalid Muhammad Wahid | Software Engineer',
    description: 'Software engineer building reliable backend, real-time, and AI-powered systems.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Khalid Muhammad Wahid | Software Engineer',
    description: 'Software engineer building reliable backend, real-time, and AI-powered systems.',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#070b14',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body>{children}</body>
    </html>
  );
}
