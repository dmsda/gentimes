import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description: 'Terms and conditions for using GenTimes.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-neutral-950 px-4 py-12">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-2 text-3xl font-bold text-white">Terms & Conditions</h1>
        <p className="mb-8 text-sm text-neutral-500">Last updated: December 2024</p>
        
        <div className="space-y-6 text-neutral-300 leading-relaxed">
          <section>
            <h2 className="mb-3 text-xl font-semibold text-white">Acceptance of Terms</h2>
            <p>
              By accessing GenTimes, you agree to these terms. If you do not agree, 
              please do not use our website.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-white">Use of Content</h2>
            <p>
              All content on GenTimes is protected by copyright. You may read and share 
              articles for personal, non-commercial use. Reproduction or redistribution 
              without permission is prohibited.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-white">User Conduct</h2>
            <p>You agree not to:</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>Use automated systems to access the site</li>
              <li>Interfere with site operations</li>
              <li>Transmit harmful content</li>
              <li>Impersonate others</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-white">Disclaimer</h2>
            <p>
              Content is provided "as is" without warranties. We strive for accuracy but 
              do not guarantee completeness or timeliness of information.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-white">Limitation of Liability</h2>
            <p>
              GenTimes is not liable for damages arising from use of the website or 
              reliance on its content.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-white">Changes</h2>
            <p>
              We may update these terms at any time. Continued use constitutes acceptance 
              of changes.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
