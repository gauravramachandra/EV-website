import React, { useState, useEffect } from 'react';
import AuthModal from './AuthModal';

interface NavbarLink {
  name: string;
  href: string;
}

interface NavbarProps {
  links?: NavbarLink[];
}

const defaultLinks = [
  { name: 'Model S', href: '#model-s' },
  { name: 'Model 3', href: '#model-3' },
  { name: 'Model X', href: '#model-x' },
  { name: 'Model Y', href: '#model-y' },
  { name: 'Solar Roof', href: '#solar-roof' },
  { name: 'Solar Panels', href: '#solar-panels' },
];

const menuLinks = [
  'Existing Inventory',
  'Used Inventory',
  'Trade-In',
  'Cybertruck',
  'Roadster',
  'Semi',
  'Charging',
  'Powerwall',
  'Commercial Energy',
  'Utilities',
  'Find Us',
  'Support',
  'Investor Relations',
];

const Navbar: React.FC<NavbarProps> = ({ links = defaultLinks }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [sideMenuOpen, setSideMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  useEffect(() => {
    // Check for token and set user if exists (optional: decode token for user info)
    const token = localStorage.getItem('token');
    if (token) {
      // Optionally decode token for user info, or just set dummy user
      setUser({ name: 'Account', email: '' });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  // Reset to home/landing view
  const handleTeslaClick = () => {
    window.location.hash = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Optionally reload or reset app state if needed
    window.location.reload();
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/40 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        <button
          onClick={handleTeslaClick}
          className="text-white text-2xl font-bold tracking-widest hover:opacity-80 transition focus:outline-none"
          aria-label="Go to home"
          style={{ background: 'none', border: 'none', padding: 0, margin: 0, cursor: 'pointer' }}
        >
          TESLA
        </button>
        <div className="hidden md:flex space-x-6">
          {links.map(link => (
            <a
              key={link.name}
              href={link.href}
              className="text-white/90 hover:text-white transition-colors text-sm font-medium"
            >
              {link.name}
            </a>
          ))}
        </div>
        {/* Account and Menu icons/links */}
        <div className="flex items-center space-x-6 ml-6">
          {user ? (
            <button onClick={handleLogout} className="text-white/90 hover:text-white text-sm font-medium">Logout</button>
          ) : (
            <button onClick={() => setAuthModalOpen(true)} className="text-white/90 hover:text-white text-sm font-medium">Login</button>
          )}
          <button className="text-white focus:outline-none" aria-label="Open menu" onClick={() => setSideMenuOpen(!sideMenuOpen)}>
            <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-black/90 px-6 pb-4 pt-2 space-y-2">
          {links.map(link => (
            <a
              key={link.name}
              href={link.href}
              className="block text-white/90 hover:text-white text-base font-medium"
              onClick={() => setMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
      {/* Side menu */}
      {sideMenuOpen && (
        <div className="fixed inset-0 bg-black/80 z-[200] flex justify-end">
          <div className="w-80 bg-white h-full shadow-lg p-6 flex flex-col relative">
            <button className="absolute top-4 right-4 text-2xl text-black" onClick={() => setSideMenuOpen(false)}>&times;</button>
            <div className="mt-8 space-y-4">
              {menuLinks.map(link => (
                <a key={link} href="#" className="block text-black text-lg font-medium hover:text-blue-600 transition">
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
      <AuthModal open={authModalOpen} onClose={() => setAuthModalOpen(false)} onAuth={setUser} />
    </nav>
  );
};

export default Navbar; 