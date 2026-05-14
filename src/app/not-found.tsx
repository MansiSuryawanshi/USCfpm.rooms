import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page Not Found | USC FPM Room Status',
  description: 'The page you are looking for could not be found. Return to the USC FPM Room Status Dashboard.',
  robots: {
    index: false,
    follow: true,
  }
};

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <h1 className="text-6xl font-bold text-[#990000] mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Page Not Found</h2>
      <p className="text-gray-600 mb-8 max-w-md">
        We couldn't find the page you were looking for. It might have been moved or doesn't exist.
      </p>
      <Link 
        href="/" 
        className="px-6 py-3 bg-[#990000] text-white rounded-lg font-medium hover:bg-[#800000] transition-colors"
      >
        Return to Dashboard
      </Link>
    </div>
  );
}
