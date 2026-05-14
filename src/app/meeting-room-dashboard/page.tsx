import Dashboard from '@/components/Dashboard';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'USC Meeting Room Dashboard | Facilities Planning',
  description: 'Manage and monitor USC meeting rooms through the comprehensive FPM dashboard. Track equipment status and submit readiness reports.',
  keywords: ['USC meeting room dashboard', 'USC meeting rooms', 'FPM dashboard', 'USC facilities dashboard', 'USC daily meeting room checks'],
  alternates: {
    canonical: '/meeting-room-dashboard',
  }
};

export default function MeetingRoomDashboard() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What features does the USC meeting room dashboard offer?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The dashboard provides real-time monitoring of meeting room equipment, allows technicians to toggle device statuses, add comments for broken equipment, and generate daily status reports.'
        }
      },
      {
        '@type': 'Question',
        name: 'Who uses the USC meeting room dashboard?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The dashboard is primarily used by the USC Facilities Planning and Management Network Services team to track the health of campus meeting spaces.'
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="max-w-3xl mx-auto px-4 pt-8 pb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">USC Meeting Room Dashboard</h1>
        <p className="text-gray-700 mb-6 text-lg leading-relaxed">
          Access the official <strong>USC Meeting Room Dashboard</strong> designed by Facilities Planning and Management. This tool streamlines the daily checks of campus meeting spaces, ensuring that all technology is operational and ready for collaboration.
        </p>
        
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 mt-8">Dashboard Overview FAQs</h2>
        <div className="space-y-6 mb-8">
          <div>
            <h3 className="text-lg font-medium text-gray-900">What features does the USC meeting room dashboard offer?</h3>
            <p className="text-gray-600 mt-2">The dashboard provides real-time monitoring of meeting room equipment, allows technicians to toggle device statuses, add comments for broken equipment, and generate daily status reports.</p>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900">Who uses the USC meeting room dashboard?</h3>
            <p className="text-gray-600 mt-2">The dashboard is primarily used by the USC Facilities Planning and Management Network Services team to track the health of campus meeting spaces.</p>
          </div>
        </div>
      </div>
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <Dashboard />
      </div>
    </>
  );
}
