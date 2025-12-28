import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about GenTimes, your trusted source for technology news.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-neutral-950 px-4 py-12">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-8 text-3xl font-bold text-white">About GenTimes</h1>
        
        <div className="space-y-6 text-neutral-300 leading-relaxed">
          <p>
            GenTimes is a leading technology news publication dedicated to delivering accurate, 
            timely, and insightful coverage of the tech industry. Founded in 2024, we've grown 
            to become a trusted source for millions of readers worldwide.
          </p>

          <h2 className="pt-4 text-xl font-semibold text-white">Our Mission</h2>
          <p>
            We believe technology shapes our future. Our mission is to make tech news accessible, 
            understandable, and relevant to everyone—from industry professionals to curious readers.
          </p>

          <h2 className="pt-4 text-xl font-semibold text-white">What We Cover</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Artificial Intelligence & Machine Learning</li>
            <li>Consumer Technology & Gadgets</li>
            <li>Software & Applications</li>
            <li>Startups & Innovation</li>
            <li>Internet & Digital Culture</li>
          </ul>

          <h2 className="pt-4 text-xl font-semibold text-white">Our Team</h2>
          <p>
            Our editorial team consists of experienced journalists, industry analysts, and 
            technology enthusiasts committed to delivering quality content. We maintain 
            editorial independence and integrity in all our reporting.
          </p>

          <h2 className="pt-4 text-xl font-semibold text-white">Contact</h2>
          <p>
            Have questions or feedback? Reach us at{' '}
            <a href="mailto:hello@gentimes.com" className="text-blue-400 hover:underline">
              hello@gentimes.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
