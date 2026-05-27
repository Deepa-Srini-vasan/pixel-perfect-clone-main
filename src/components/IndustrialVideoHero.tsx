import React from 'react';

const IndustrialVideoHero: React.FC = () => (
  <div className="relative w-full min-h-[calc(100vh-80px)] overflow-hidden" style={{ backgroundColor: '#eef7fc' }}>

    {/* ── Background Video Layer (lightened) ── */}
    <div className="absolute inset-0">
      <video
        autoPlay muted loop playsInline preload="auto"
        className="absolute inset-0 w-full h-full object-cover opacity-100 object-center"
      >
        <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260518_003132_8b7edcb6-c64d-4a52-a9ca-879942e122ad.mp4" type="video/mp4" />
      </video>
    </div>
  </div>
);

export default IndustrialVideoHero;
