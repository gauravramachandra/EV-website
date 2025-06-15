import React from 'react';

interface HeroProps {
  title: string;
  subtitle?: string;
  backgroundImage: string;
  ctaPrimary?: string;
  ctaSecondary?: string;
  onPrimary?: () => void;
  onSecondary?: () => void;
  nextSectionId?: string;
}

const Hero: React.FC<HeroProps> = ({
  title,
  subtitle,
  backgroundImage,
  ctaPrimary = 'Order Now',
  ctaSecondary = 'Demo Drive',
  onPrimary,
  onSecondary,
  nextSectionId,
}) => {
  // Smooth scroll to next section
  const handleScroll = (e: React.MouseEvent) => {
    e.preventDefault();
    if (nextSectionId) {
      const el = document.getElementById(nextSectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section
      className="relative h-screen flex flex-col justify-between items-center text-center overflow-hidden"
      style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}
    >
      {/* Parallax/gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/80 z-0" />
      <div className="relative z-10 flex flex-col items-center justify-center h-full w-full">
        <h1 className="text-5xl md:text-6xl font-bold text-white drop-shadow-lg mb-4 mt-24 md:mt-0 tracking-tight">
          {title}
        </h1>
        {subtitle && <p className="text-xl md:text-2xl text-white/80 mb-8 font-light tracking-wide">{subtitle}</p>}
        <div className="flex flex-col md:flex-row gap-4 mt-4">
          <button
            className="bg-white/90 text-black px-8 py-3 rounded-md font-semibold text-lg shadow hover:bg-white transition"
            onClick={onPrimary}
          >
            {ctaPrimary}
          </button>
          <button
            className="bg-black/70 text-white px-8 py-3 rounded-md font-semibold text-lg border border-white/30 hover:bg-black/90 transition"
            onClick={onSecondary}
          >
            {ctaSecondary}
          </button>
        </div>
      </div>
      {/* Scroll to next section */}
      {nextSectionId && (
        <button
          onClick={handleScroll}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce focus:outline-none"
          aria-label="Scroll to next section"
        >
          <svg width="32" height="32" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </button>
      )}
    </section>
  );
};

export default Hero; 