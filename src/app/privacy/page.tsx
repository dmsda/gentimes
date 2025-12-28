import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'GenTimes privacy policy and data practices.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-neutral-950 px-4 py-12">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-2 text-3xl font-bold text-white">Privacy Policy</h1>
        <p className="mb-8 text-sm text-neutral-500">Last updated: December 2024</p>
        
        <div className="space-y-6 text-neutral-300 leading-relaxed">
          <section>
            <h2 className="mb-3 text-xl font-semibold text-white">Information We Collect</h2>
            <p>
              We collect information you provide directly, such as when you subscribe to our 
              newsletter or contact us. We also collect usage data through cookies and analytics.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-white">How We Use Information</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>To provide and improve our services</li>
              <li>To send newsletters and updates you've requested</li>
              <li>To analyze website usage and trends</li>
              <li>To display relevant advertising</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-white">Cookies</h2>
            <p>
              We use cookies for analytics, advertising, and to remember your preferences. 
              You can control cookies through your browser settings.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-white">Third Parties</h2>
            <p>
              We work with advertising partners and analytics providers who may collect 
              information about your visits. These partners have their own privacy policies.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-white">Your Rights</h2>
            <p>
              You may request access to, correction, or deletion of your personal data. 
              Contact us at{' '}
              <a href="mailto:privacy@gentimes.com" className="text-blue-400 hover:underline">
                privacy@gentimes.com
              </a>
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-white">Contact</h2>
            <p>
              For privacy-related questions, email{' '}
              <a href="mailto:privacy@gentimes.com" className="text-blue-400 hover:underline">
                privacy@gentimes.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
