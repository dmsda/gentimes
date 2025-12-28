import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Careers',
  description: 'Join the GenTimes team. View open positions.',
};

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-neutral-950 px-4 py-12">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-8 text-3xl font-bold text-white">Careers at GenTimes</h1>
        
        <div className="space-y-6 text-neutral-300 leading-relaxed">
          <p>
            Join our team and help shape the future of technology journalism. 
            We're always looking for talented individuals who share our passion for tech.
          </p>

          <section>
            <h2 className="mb-4 text-xl font-semibold text-white">Why GenTimes?</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Work with cutting-edge technology</li>
              <li>Flexible remote work options</li>
              <li>Competitive compensation</li>
              <li>Creative freedom</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-semibold text-white">Open Positions</h2>
            <p className="text-neutral-400">
              No open positions at this time. Check back soon or send your resume to{' '}
              <a href="mailto:careers@gentimes.com" className="text-blue-400 hover:underline">
                careers@gentimes.com
              </a>
            </p>
          </section>

          <section className="border-t border-neutral-800 pt-6">
            <p>
              Interested in joining us? Send your resume to{' '}
              <a href="mailto:careers@gentimes.com" className="text-blue-400 hover:underline">
                careers@gentimes.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
