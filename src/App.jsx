// src/App.jsx
import { useState } from 'react';
import EmojiPicker from './components/EmojiPicker';
import MovieResults from './components/MovieResults';
import { fetchMoviesByGenres } from './api/tmdb';
import InfoModal from './components/Infomodal';

function App() {
  const [selectedEmojis, setSelectedEmojis] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [error, setError] = useState(null);
  const [showInfo, setShowInfo] = useState(false);

  const handleFindMovies = async (emojis, genres) => {
    setIsLoading(true);
    setHasSearched(true);
    setSelectedGenres(genres);
    setError(null);

    try {
      const { results } = await fetchMoviesByGenres(genres);
      setMovies(results);
    } catch (err) {
      console.error('Failed to fetch movies:', err);
      setError('Could not load movies. Check your TMDB API key and try again.');
      setMovies([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setSelectedEmojis([]);
    setSelectedGenres([]);
    setMovies([]);
    setHasSearched(false);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-slate-900 to-indigo-950 px-5 py-10 flex flex-col items-center">
      <header className="text-center mb-10 relative w-full max-w-6xl">
        <button
          onClick={() => setShowInfo(true)}
          className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full
            border border-white/20 text-gray-400 hover:text-white hover:border-white/40
            flex items-center justify-center text-sm font-medium transition-all duration-200
            hover:bg-white/5"
          aria-label="How it works"
          title="How it works"
        >
          ?
        </button>
        <h1
          onClick={handleReset}
          className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-red-400 via-orange-400 to-red-400 bg-clip-text text-transparent cursor-pointer hover:opacity-80 transition-opacity"
        >
          PickFlick
        </h1>
        <p className="text-gray-500 text-sm tracking-widest mt-2">
          PICK AN EMOJI · DISCOVER YOUR MOVIE
        </p>
      </header>

      {!hasSearched ? (
        <EmojiPicker
          selectedEmojis={selectedEmojis}
          setSelectedEmojis={setSelectedEmojis}
          onFindMovies={handleFindMovies}
        />
      ) : (
        <MovieResults
          movies={movies}
          isLoading={isLoading}
          error={error}
          selectedEmojis={selectedEmojis}
          selectedGenres={selectedGenres}
          onReset={handleReset}
          onNewSearch={() => setHasSearched(false)}
        />
      )}
      <InfoModal isOpen={showInfo} onClose={() => setShowInfo(false)} />
    </div>
  );
}

export default App;