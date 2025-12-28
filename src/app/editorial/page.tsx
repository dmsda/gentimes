import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Editorial Policy',
  description: 'GenTimes editorial standards and guidelines.',
};

export default function EditorialPage() {
  return (
    <div className="min-h-screen bg-neutral-950 px-4 py-12">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-8 text-3xl font-bold text-white">Editorial Policy</h1>
        
        <div className="space-y-6 text-neutral-300 leading-relaxed">
          <section>
            <h2 className="mb-3 text-xl font-semibold text-white">Our Standards</h2>
            <p>
              GenTimes is committed to accurate, fair, and independent journalism. 
              We adhere to the highest standards of editorial integrity.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-white">Independence</h2>
            <p>
              Editorial decisions are made independently of advertising and business 
              considerations. Our news coverage is not influenced by commercial relationships.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-white">Accuracy</h2>
            <p>
              We verify information before publication and clearly attribute sources. 
              When errors occur, we correct them promptly and transparently.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-white">Sponsored Content</h2>
            <p>
              Sponsored content is clearly labeled. It is produced separately from 
              editorial content and does not influence our news coverage.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-white">Corrections</h2>
            <p>
              If you believe we've made an error, please contact{' '}
              <a href="mailto:corrections@gentimes.com" className="text-blue-400 hover:underline">
                corrections@gentimes.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
