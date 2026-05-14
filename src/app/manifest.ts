import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'USC FPM Room Status Dashboard',
    short_name: 'USC Rooms',
    description: 'Track conference room readiness, room availability, and facilities status for USC Facilities Planning and Management spaces.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#990000',
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  };
}
