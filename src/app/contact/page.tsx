import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with GenTimes editorial team.',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-neutral-950 px-4 py-12">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-8 text-3xl font-bold text-white">Contact Us</h1>
        
        <div className="space-y-8 text-neutral-300">
          <div>
            <h2 className="mb-3 text-xl font-semibold text-white">General Inquiries</h2>
            <p>
              Email:{' '}
              <a href="mailto:hello@gentimes.com" className="text-blue-400 hover:underline">
                hello@gentimes.com
              </a>
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-xl font-semibold text-white">Editorial</h2>
            <p>For news tips, corrections, or editorial inquiries:</p>
            <p>
              <a href="mailto:editorial@gentimes.com" className="text-blue-400 hover:underline">
                editorial@gentimes.com
              </a>
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-xl font-semibold text-white">Advertising</h2>
            <p>For advertising and partnership opportunities:</p>
            <p>
              <a href="mailto:ads@gentimes.com" className="text-blue-400 hover:underline">
                ads@gentimes.com
              </a>
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-xl font-semibold text-white">Press</h2>
            <p>For press inquiries and media requests:</p>
            <p>
              <a href="mailto:press@gentimes.com" className="text-blue-400 hover:underline">
                press@gentimes.com
              </a>
            </p>
          </div>

          <div className="border-t border-neutral-800 pt-8">
            <h2 className="mb-3 text-xl font-semibold text-white">Office</h2>
            <p className="text-neutral-400">
              GenTimes Media<br />
              123 Tech Boulevard<br />
              San Francisco, CA 94105<br />
              United States
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
