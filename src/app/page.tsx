import Dashboard from '@/components/Dashboard';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'USC FPM Room Status Dashboard | Facilities Planning and Management',
  description: 'Track conference room readiness, room availability, and facilities status for USC Facilities Planning and Management spaces.',
  keywords: ['USC FPM rooms', 'USC room status', 'USC conference rooms', 'USC Facilities Planning and Management', 'USC meeting room dashboard', 'FPM room status'],
  alternates: {
    canonical: '/',
  }
};

export default function Home() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'USC FPM Room Status Dashboard',
    url: 'https://uscfpmrooms.vercel.app',
    description: 'Track conference room readiness, room availability, and facilities status for USC Facilities Planning and Management spaces.',
    applicationCategory: 'BusinessApplication',
    publisher: {
      '@type': 'Organization',
      name: 'USC Facilities Planning and Management',
      url: 'https://uscfpmrooms.vercel.app'
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col min-h-screen">
        {/* SEO Hero Section - Visible to search engines and visually appealing for users */}
        <div className="py-8 sm:py-12 md:py-16 text-center max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-4">
            USC FPM Room Status Dashboard
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Welcome to the official USC Facilities Planning and Management (FPM) Room Status Dashboard. 
            Use this tool to track conference room readiness, monitor equipment availability, and ensure 
            seamless operations across USC meeting spaces.
          </p>
        </div>

        {/* Main Dashboard Application */}
        <div className="pb-12">
          <Dashboard />
        </div>
      </div>
    </>
  );
}
