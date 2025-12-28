import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Advertise With Us',
  description: 'Advertising opportunities on GenTimes.',
};

export default function AdvertisePage() {
  return (
    <div className="min-h-screen bg-neutral-950 px-4 py-12">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-8 text-3xl font-bold text-white">Advertise With Us</h1>
        
        <div className="space-y-6 text-neutral-300 leading-relaxed">
          <p>
            Reach millions of tech-savvy readers through GenTimes. Our audience includes 
            industry professionals, developers, and technology enthusiasts.
          </p>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-white">Advertising Options</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Display Ads</strong> - Banner placements across the site</li>
              <li><strong>Sponsored Content</strong> - Branded articles clearly labeled</li>
              <li><strong>Newsletter Sponsorship</strong> - Reach subscribers directly</li>
              <li><strong>Custom Campaigns</strong> - Tailored solutions for your brand</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-white">Our Audience</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>5M+ monthly readers</li>
              <li>Tech professionals and decision makers</li>
              <li>Early adopters and enthusiasts</li>
              <li>Global reach with US focus</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-white">Get Started</h2>
            <p className="mb-4">
              Contact our advertising team to discuss your campaign goals and get a media kit.
            </p>
            <a 
              href="mailto:ads@gentimes.com"
              className="inline-block rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-500"
            >
              Contact Advertising Team
            </a>
          </section>

          <section className="border-t border-neutral-800 pt-6">
            <p className="text-sm text-neutral-500">
              All advertising is subject to our{' '}
              <Link href="/editorial" className="text-blue-400 hover:underline">
                editorial policy
              </Link>
              . Sponsored content is clearly labeled and separated from editorial content.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
