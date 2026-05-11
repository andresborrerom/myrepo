import BuzonClient from './BuzonClient';
import { getCombinedFeed } from '@/lib/feed';

export const metadata = { title: 'Buzón' };
export const dynamic = 'force-dynamic';

export default async function BuzonPage() {
  const updates = await getCombinedFeed();
  return <BuzonClient initialUpdates={updates} />;
}
