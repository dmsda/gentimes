import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description: 'GenTimes cookie policy and how we use cookies.',
};

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-neutral-950 px-4 py-12">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-2 text-3xl font-bold text-white">Cookie Policy</h1>
        <p className="mb-8 text-sm text-neutral-500">Last updated: December 2024</p>
        
        <div className="space-y-6 text-neutral-300 leading-relaxed">
          <section>
            <h2 className="mb-3 text-xl font-semibold text-white">What Are Cookies</h2>
            <p>
              Cookies are small text files stored on your device when you visit websites. 
              They help us provide a better experience.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-white">How We Use Cookies</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Essential:</strong> Required for site functionality</li>
              <li><strong>Analytics:</strong> Understand how visitors use our site</li>
              <li><strong>Advertising:</strong> Display relevant ads</li>
              <li><strong>Preferences:</strong> Remember your settings</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-white">Managing Cookies</h2>
            <p>
              You can control cookies through your browser settings. Note that disabling 
              cookies may affect site functionality.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-white">Third-Party Cookies</h2>
            <p>
              We use services like Google Analytics and advertising partners that set their 
              own cookies. These are governed by their respective privacy policies.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-white">Contact</h2>
            <p>
              Questions about cookies? Email{' '}
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
