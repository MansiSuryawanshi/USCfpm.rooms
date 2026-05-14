import Dashboard from '@/components/Dashboard';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'USC Conference Room Status | Real-Time Readiness',
  description: 'Check the real-time status of USC conference rooms. Identify operational issues, A/V failures, and room readiness instantly.',
  keywords: ['USC conference room status', 'USC conference rooms', 'USC room readiness', 'USC A/V status', 'USC meeting spaces'],
  alternates: {
    canonical: '/conference-room-status',
  }
};

export default function ConferenceRoomStatus() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Why is checking conference room status important?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Checking the conference room status ensures that A/V equipment like projectors and monitors are functional before your meeting begins, minimizing disruptions.'
        }
      },
      {
        '@type': 'Question',
        name: 'How often is the USC conference room status updated?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The status is updated daily by the Network Services team during their routine morning meeting room checks.'
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
        <h1 className="text-3xl font-bold text-gray-900 mb-6">USC Conference Room Status</h1>
        <p className="text-gray-700 mb-6 text-lg leading-relaxed">
          Welcome to the <strong>USC Conference Room Status</strong> tracker. Before you schedule or attend your next presentation, use this dashboard to verify the operational readiness of the room's displays, peripherals, and network connectivity. 
        </p>
        
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 mt-8">Conference Room FAQs</h2>
        <div className="space-y-6 mb-8">
          <div>
            <h3 className="text-lg font-medium text-gray-900">Why is checking conference room status important?</h3>
            <p className="text-gray-600 mt-2">Checking the status ensures that A/V equipment like projectors and monitors are functional before your meeting begins, minimizing technical disruptions.</p>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900">How often is the USC conference room status updated?</h3>
            <p className="text-gray-600 mt-2">The room status is updated daily by the Network Services team during their routine morning meeting room checks.</p>
          </div>
        </div>
      </div>
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <Dashboard />
      </div>
    </>
  );
}
