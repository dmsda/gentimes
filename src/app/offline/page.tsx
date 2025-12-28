import { Metadata } from 'next';
import { OfflineContent } from '@/components/OfflineContent';

export const metadata: Metadata = {
  title: 'Offline | GenTimes',
  description: 'You are currently offline',
  robots: { index: false, follow: false },
};

export default function OfflinePage() {
  return <OfflineContent />;
}
