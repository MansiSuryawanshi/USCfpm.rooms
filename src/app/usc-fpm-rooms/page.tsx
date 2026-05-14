import Dashboard from '@/components/Dashboard';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'USC FPM Rooms Overview | Space Readiness & Status',
  description: 'View the complete list of USC FPM rooms, their current readiness status, equipment health, and ongoing maintenance activities.',
  keywords: ['USC FPM rooms', 'USC Facilities Management', 'FPM rooms USC', 'USC space management'],
  alternates: {
    canonical: '/usc-fpm-rooms',
  }
};

export default function USCFPMRooms() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What are USC FPM rooms?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'USC FPM rooms are conference and meeting spaces managed by the University of Southern California Facilities Planning and Management division.'
        }
      },
      {
        '@type': 'Question',
        name: 'How do I check the readiness of a USC FPM room?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'You can check the operational status of any USC FPM room using this dashboard, which provides real-time updates on A/V equipment and overall room health.'
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
        <h1 className="text-3xl font-bold text-gray-900 mb-6">USC FPM Rooms Overview</h1>
        <p className="text-gray-700 mb-6 text-lg leading-relaxed">
          The <strong>USC FPM Rooms</strong> dashboard provides a centralized hub for monitoring the operational status of conference and meeting spaces managed by USC Facilities Planning and Management. Our goal is to ensure every room is fully equipped, maintained, and ready for your next critical meeting.
        </p>
        
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 mt-8">Frequently Asked Questions</h2>
        <div className="space-y-6 mb-8">
          <div>
            <h3 className="text-lg font-medium text-gray-900">What are USC FPM rooms?</h3>
            <p className="text-gray-600 mt-2">USC FPM rooms are conference and meeting spaces managed by the University of Southern California Facilities Planning and Management division, equipped with modern A/V technology and collaboration tools.</p>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900">How do I check the readiness of a USC FPM room?</h3>
            <p className="text-gray-600 mt-2">You can check the operational status of any USC FPM room using the interactive dashboard below, which tracks the health of Zoom TVs, projectors, and other essential equipment.</p>
          </div>
        </div>
      </div>
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <Dashboard />
      </div>
    </>
  );
}
