import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'USC FPM Room Status Dashboard';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(to bottom right, #990000, #4a0000)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          padding: '40px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'baseline', marginBottom: '20px' }}>
          <span style={{ fontSize: '80px', fontWeight: 'bold', color: '#FFCC00', marginRight: '20px' }}>USC</span>
          <span style={{ fontSize: '80px', fontWeight: 'bold', color: '#ffffff' }}>FPM</span>
        </div>
        <h1 style={{ fontSize: '60px', fontWeight: 'bold', textAlign: 'center', marginBottom: '20px' }}>
          Conference Room Status
        </h1>
        <p style={{ fontSize: '30px', color: '#e2e8f0', textAlign: 'center', maxWidth: '800px' }}>
          Facilities Planning and Management Dashboard
        </p>
      </div>
    ),
    {
      ...size,
    }
  );
}
