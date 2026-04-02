// src/components/InfoModal.jsx
import { useEffect } from 'react';

const STEPS = [
  {
    emoji: '🎭',
    title: 'Pick your mood',
    desc: 'Choose 1 or 2 emojis from the random pool that match how you feel right now.',
  },
  {
    emoji: '🔮',
    title: 'We read the vibe',
    desc: 'Each emoji is secretly mapped to a film genre behind the scenes — no guessing required.',
  },
  {
    emoji: '🎬',
    title: 'Discover your watch',
    desc: 'We surface real movies and shows streaming today that match your exact mood.',
  },
];

export default function InfoModal({ isOpen, onClose }) {
  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    // Backdrop
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(4px)' }}
      onClick={onClose}
    >
      {/* Modal panel */}
      <div
        className="relative w-full max-w-md bg-slate-900 border border-white/10 rounded-3xl p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full
            text-gray-500 hover:text-white hover:bg-white/10 transition-all text-lg leading-none"
          aria-label="Close"
        >
          ×
        </button>

        {/* Title */}
        <h2 className="text-white text-xl font-semibold mb-1">How PickFlick works</h2>
        <p className="text-gray-500 text-sm mb-8">Three steps to your perfect watch.</p>

        {/* Steps */}
        <div className="flex flex-col gap-6 mb-8">
          {STEPS.map((step, i) => (
            <div key={i} className="flex items-start gap-4">
              <div className="w-11 h-11 flex-shrink-0 rounded-2xl bg-violet-500/15 border border-violet-500/30 flex items-center justify-center text-2xl">
                {step.emoji}
              </div>
              <div>
                <p className="text-white text-sm font-medium mb-0.5">{step.title}</p>
                <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-6">
          {/* Shuffle tip */}
          <div className="flex items-start gap-3 mb-5">
            <span className="text-lg flex-shrink-0 mt-0.5">💡</span>
            <p className="text-gray-400 text-sm leading-relaxed">
              Not feeling any of the emojis? Hit <span className="text-white font-medium">Shuffle</span> for a fresh random set anytime.
            </p>
          </div>

          {/* TMDB Attribution — required by their terms */}
          <div className="flex items-center gap-3 bg-slate-800/60 border border-white/5 rounded-2xl p-4">
            <img
              src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"
              alt="TMDB logo"
              className="h-4 flex-shrink-0"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
            <p className="text-gray-500 text-xs leading-relaxed">
              Movie data provided by{' '}
              <a
                href="https://www.themoviedb.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                The Movie Database (TMDB)
              </a>
              . PickFlick uses the TMDB API but is not endorsed or certified by TMDB.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}