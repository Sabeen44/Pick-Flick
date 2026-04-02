// 
// src/components/EmojiPicker.jsx
import { useState, useEffect } from 'react';
import emojiGenreMap from '../data/emojiGenreMap';

// Build a flat deduplicated list of { emoji, genres[] }
const UNIQUE_EMOJIS = Object.entries(emojiGenreMap).reduce((acc, [genre, emojis]) => {
  emojis.forEach((emoji) => {
    const existing = acc.find((e) => e.emoji === emoji);
    if (existing) {
      if (!existing.genres.includes(genre)) existing.genres.push(genre);
    } else {
      acc.push({ emoji, genres: [genre] });
    }
  });
  return acc;
}, []);

function getRandomEmojis(count = 24) {
  return [...UNIQUE_EMOJIS]
    .sort(() => Math.random() - 0.5)
    .slice(0, count)
    .map((item, i) => ({ id: i + 1, emoji: item.emoji, genres: item.genres }));
}

export default function EmojiPicker({ selectedEmojis, setSelectedEmojis, onFindMovies }) {
  const [emojiPool, setEmojiPool] = useState([]);
  const MAX = 2;

  useEffect(() => {
    setEmojiPool(getRandomEmojis(24));
  }, []);

  const handleEmojiClick = (emojiObj) => {
    setSelectedEmojis((prev) => {
      const isSelected = prev.some((e) => e.id === emojiObj.id);
      if (isSelected) return prev.filter((e) => e.id !== emojiObj.id);
      if (prev.length >= MAX) return prev;
      return [...prev, emojiObj];
    });
  };

  const removeEmoji = (emojiObj) => {
    setSelectedEmojis((prev) => prev.filter((e) => e.id !== emojiObj.id));
  };

  const handleShuffle = () => {
    setEmojiPool(getRandomEmojis(24));
    setSelectedEmojis([]);
  };

  const handleFindMovies = () => {
    // Resolve genres silently — user never sees this
    const genres = [...new Set(selectedEmojis.flatMap((e) => e.genres))];
    onFindMovies(selectedEmojis, genres);
  };

  const isAtLimit = selectedEmojis.length >= MAX;

  return (
    <main className="w-full max-w-4xl bg-slate-800/60 border border-white/10 rounded-3xl p-6 md:p-10 backdrop-blur-md">
      {/* Prompt */}
      <div className="text-center mb-8">
        <h2 className="text-white text-xl md:text-2xl font-semibold mb-2">
          How are you feeling right now?
        </h2>
        <p className="text-gray-400">Pick 1 or 2 emojis — we'll find the perfect match</p>
      </div>

      {/* Emoji Grid */}
      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3 mb-6">
        {emojiPool.map((emojiObj) => {
          const isSelected = selectedEmojis.some((e) => e.id === emojiObj.id);
          const isDisabled = isAtLimit && !isSelected;
          return (
            <button
              key={emojiObj.id}
              onClick={() => handleEmojiClick(emojiObj)}
              disabled={isDisabled}
              className={`
                relative p-3 md:p-4 rounded-2xl text-3xl sm:text-4xl
                transition-all duration-200 flex items-center justify-center
                focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-slate-800
                ${isSelected
                  ? 'bg-violet-500/20 border-2 border-violet-500 scale-105'
                  : 'bg-white/5 border-2 border-transparent hover:bg-white/10 hover:border-white/20 hover:scale-105'}
                ${isDisabled ? 'opacity-40 cursor-not-allowed hover:scale-100 hover:bg-white/5' : 'cursor-pointer'}
              `}
            >
              <span>{emojiObj.emoji}</span>
              {isSelected && (
                <span className="absolute -top-2 -right-2 w-6 h-6 bg-violet-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  ✓
                </span>
              )}
            </button>
          );
        })}
      </div>

      {isAtLimit && (
        <p className="text-center text-amber-400 text-sm mb-4 animate-pulse">
          Maximum 2 emojis selected
        </p>
      )}

      {/* Mood Row */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 py-4 border-t border-white/10 mb-8">
        <span className="text-gray-500 text-sm font-semibold tracking-wide">MOOD</span>
        <div className="flex gap-3 flex-wrap flex-1">
          {selectedEmojis.length === 0 ? (
            <span className="text-gray-600 text-sm italic">Select an emoji above</span>
          ) : (
            selectedEmojis.map((emojiObj) => (
              <div
                key={emojiObj.id}
                className="flex items-center gap-2 bg-violet-500/20 border border-violet-500 rounded-full px-3 py-2"
              >
                <span className="text-2xl">{emojiObj.emoji}</span>
                <button
                  onClick={() => removeEmoji(emojiObj)}
                  className="text-gray-400 hover:text-red-400 text-lg leading-none transition-colors"
                >
                  ×
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-center gap-4 flex-wrap">
        <button
          onClick={handleShuffle}
          className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold
            bg-white/5 border-2 border-white/20 text-white
            hover:bg-white/10 hover:border-white/40 hover:-translate-y-0.5 transition-all duration-200"
        >
          <span className="text-xl">🔀</span>
          <span>Shuffle</span>
        </button>

        <button
          onClick={handleFindMovies}
          disabled={selectedEmojis.length === 0}
          className={`
            flex items-center gap-2 px-6 py-3 rounded-xl font-semibold
            bg-gradient-to-r from-violet-600 to-indigo-600 text-white transition-all duration-200
            ${selectedEmojis.length === 0
              ? 'opacity-50 cursor-not-allowed'
              : 'hover:-translate-y-0.5 hover:shadow-lg hover:shadow-violet-500/40'}
          `}
        >
          <span className="text-xl">🎬</span>
          <span>Find Movies</span>
        </button>
      </div>
    </main>
  );
}