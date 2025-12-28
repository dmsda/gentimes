import type { Metadata } from 'next';
import { Inter, Source_Serif_4 } from 'next/font/google';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { generateWebsiteSchema, generateOrganizationSchema } from '@/lib/seo';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  variable: '--font-source-serif',
  display: 'swap',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://gentimes.com';

export const metadata: Metadata = {
  title: {
    default: 'GenTimes - Technology News & Insights',
    template: '%s | GenTimes',
  },
  description:
    'Your trusted source for the latest technology news, reviews, and insights. Covering AI, gadgets, software, startups, and the future of tech.',
  keywords: [
    'technology news',
    'tech news',
    'AI',
    'artificial intelligence',
    'gadgets',
    'software',
    'startups',
    'internet',
  ],
  authors: [{ name: 'GenTimes Editorial' }],
  creator: 'GenTimes',
  publisher: 'GenTimes',
  metadataBase: new URL(siteUrl),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'GenTimes',
    title: 'GenTimes - Technology News & Insights',
    description:
      'Your trusted source for the latest technology news, reviews, and insights.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'GenTimes - Technology News',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GenTimes - Technology News & Insights',
    description:
      'Your trusted source for the latest technology news, reviews, and insights.',
    creator: '@gentimes',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: siteUrl,
    types: {
      'application/rss+xml': '/feed.xml',
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const websiteSchema = generateWebsiteSchema(siteUrl);
  const organizationSchema = generateOrganizationSchema(siteUrl);

  return (
    <html lang="en" className={`${inter.variable} ${sourceSerif.variable}`} suppressHydrationWarning>
      <head>
        {/* Site-wide Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([websiteSchema, organizationSchema]),
          }}
        />
      </head>
      <body className="min-h-screen bg-neutral-950 text-neutral-100 antialiased" suppressHydrationWarning>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-blue-600 focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
