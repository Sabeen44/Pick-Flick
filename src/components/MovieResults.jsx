// // components/MovieResults.jsx
// import MovieCard from './MovieCard';

// export default function MovieResults({ movies, isLoading, selectedEmojis, onReset, onNewSearch }) {
//   if (isLoading) {
//     return (
//       <div className="w-full max-w-6xl text-center py-20">
//         <div className="inline-flex items-center gap-3 text-white text-xl">
//           <div className="w-8 h-8 border-4 border-violet-500 border-t-transparent rounded-full animate-spin" />
//           <span>Finding movies for {selectedEmojis.map((e) => e.emoji).join(' ')}</span>
//         </div>
//         <p className="text-gray-400 mt-4">Matching your mood to perfect films...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="w-full max-w-6xl">
//       {/* Results Header */}
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
//         <div>
//           <h2 className="text-white text-2xl font-semibold flex items-center gap-3">
//             <span>Movies for</span>
//             <span className="flex gap-1">
//               {selectedEmojis.map((e) => (
//                 <span key={e.id} className="text-3xl">{e.emoji}</span>
//               ))}
//             </span>
//           </h2>
//           <p className="text-gray-400 mt-1">
//             {movies.length} films matched your mood
//           </p>
//         </div>

//         <button
//           onClick={onNewSearch}
//           className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium
//             bg-white/5 border border-white/20 text-white
//             hover:bg-white/10 hover:border-white/40
//             transition-all duration-200"
//         >
//           <span>🔄</span>
//           <span>New Search</span>
//         </button>
//       </div>

//       {/* Movie Grid */}
//       {movies.length > 0 ? (
//         <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
//           {movies.map((movie) => (
//             <MovieCard key={movie.id} movie={movie} />
//           ))}
//         </div>
//       ) : (
//         <div className="text-center py-16">
//           <p className="text-gray-400 text-lg">No movies found for this mood.</p>
//           <button
//             onClick={onNewSearch}
//             className="mt-4 text-violet-400 hover:text-violet-300 underline"
//           >
//             Try different emojis
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }
// src/components/MovieResults.jsx
import MovieCard from './MovieCard';

function SkeletonCard() {
  return (
    <div className="bg-slate-800/60 border border-white/10 rounded-2xl overflow-hidden animate-pulse">
      <div className="aspect-[2/3] bg-slate-700/60" />
      <div className="p-4 space-y-2">
        <div className="h-3 bg-slate-700/60 rounded w-1/2" />
        <div className="h-4 bg-slate-700/60 rounded w-3/4" />
        <div className="h-3 bg-slate-700/60 rounded w-full" />
      </div>
    </div>
  );
}

export default function MovieResults({
  movies,
  isLoading,
  error,
  selectedEmojis,
  selectedGenres,
  onReset,
  onNewSearch,
}) {
  return (
    <section className="w-full max-w-6xl">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-3 mb-1 flex-wrap">
            {/* Show selected emojis */}
            {selectedEmojis.map((e) => (
              <span key={e.id} className="text-3xl">{e.emoji}</span>
            ))}
            <span className="text-gray-500 text-sm">→</span>
            {/* Show matched genres as subtle pills */}
            <div className="flex flex-wrap gap-2">
              {selectedGenres.slice(0, 3).map((g) => (
                <span
                  key={g}
                  className="text-xs bg-violet-500/20 border border-violet-500/40 text-violet-300 px-2 py-1 rounded-full"
                >
                  {g}
                </span>
              ))}
              {selectedGenres.length > 3 && (
                <span className="text-xs text-gray-500">+{selectedGenres.length - 3} more</span>
              )}
            </div>
          </div>
          <p className="text-gray-500 text-sm">
            {isLoading
              ? 'Finding your perfect watch...'
              : error
              ? 'Something went wrong'
              : `${movies.length} movies found for your mood`}
          </p>
        </div>

        <div className="flex gap-3 flex-shrink-0">
          {/* <button
            onClick={onNewSearch}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium
              bg-white/5 border border-white/20 text-white
              hover:bg-white/10 hover:border-white/40 transition-all duration-200"
          >
            ← New Mood
          </button> */}
          <button
            onClick={onReset}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium
              bg-white/5 border border-white/20 text-white
              hover:bg-white/10 hover:border-white/40 transition-all duration-200"
          >
            🔄 Start Over
          </button>
        </div>
      </div>

      {/* Error state */}
      {error && (
        <div className="bg-red-900/30 border border-red-500/40 rounded-2xl p-6 text-center mb-8">
          <p className="text-red-300 text-sm">{error}</p>
          <p className="text-gray-500 text-xs mt-2">
            Make sure <code className="text-violet-400">VITE_TMDB_TOKEN</code> is set in your <code className="text-violet-400">.env</code> file.
          </p>
        </div>
      )}

      {/* Movie Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 md:gap-6">
        {isLoading
          ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
          : movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
      </div>

      {/* Empty state */}
      {!isLoading && !error && movies.length === 0 && (
        <div className="text-center py-20">
          <p className="text-5xl mb-4">🎬</p>
          <p className="text-gray-400 text-lg mb-2">No movies found for this mood</p>
          <p className="text-gray-600 text-sm mb-6">Try different emojis or shuffle for new options</p>
          <button
            onClick={onNewSearch}
            className="px-6 py-3 rounded-xl bg-violet-600 text-white font-medium hover:bg-violet-500 transition-colors"
          >
            Try Again
          </button>
        </div>
      )}
    </section>
  );
}