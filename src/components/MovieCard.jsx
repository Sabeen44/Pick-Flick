// // components/MovieCard.jsx
// import { useState } from 'react';

// export default function MovieCard({ movie }) {
//   const [imgError, setImgError] = useState(false);
//   const [isExpanded, setIsExpanded] = useState(false);

//   return (
//     <div className="group relative bg-slate-800/60 border border-white/10 rounded-2xl overflow-hidden hover:border-violet-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-violet-500/10">
//       {/* Poster */}
//       <div className="relative aspect-[2/3] overflow-hidden">
//         <img
//           src={imgError ? '[picsum.photos](https://picsum.photos/300/450)' : movie.poster}
//           alt={movie.title}
//           onError={() => setImgError(true)}
//           className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
//         />

//         {/* Rating Badge */}
//         <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1">
//           <span className="text-yellow-400 text-sm">★</span>
//           <span className="text-white text-sm font-medium">{movie.rating}</span>
//         </div>

//         {/* Year Badge */}
//         <div className="absolute top-2 left-2 bg-violet-600/80 backdrop-blur-sm px-2 py-1 rounded-lg">
//           <span className="text-white text-xs font-medium">{movie.year}</span>
//         </div>

//         {/* Hover Overlay */}
//         <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
//           <p className="text-gray-200 text-sm line-clamp-4">
//             {movie.overview}
//           </p>
//         </div>
//       </div>

//       {/* Info */}
//       <div className="p-4">
//         <h3 className="text-white font-semibold text-sm md:text-base line-clamp-2 group-hover:text-violet-300 transition-colors">
//           {movie.title}
//         </h3>
//       </div>
//     </div>
//   );
// }
// src/components/MovieCard.jsx
import { useState } from 'react';

const PLATFORM_STYLES = {
  'pb-netflix': { bg: '#e50914', color: '#fff' },
  'pb-prime':   { bg: '#00a8e0', color: '#fff' },
  'pb-hulu':    { bg: '#1ce783', color: '#0a2a1a' },
  'pb-peacock': { bg: '#f5a623', color: '#3a2800' },
  'pb-disney':  { bg: '#113ccf', color: '#fff' },
  'pb-hbo':     { bg: '#6a1b9a', color: '#fff' },
  'pb-apple':   { bg: '#444', color: '#fff' },
};

function PlatformBadge({ platform }) {
  const style = PLATFORM_STYLES[platform.class] || { bg: '#555', color: '#fff' };
  return (
    <span
      style={{ background: style.bg, color: style.color }}
      className="text-xs font-semibold uppercase tracking-wide px-2 py-0.5 rounded"
    >
      {platform.name}
    </span>
  );
}

export default function MovieCard({ movie }) {
  const [imgError, setImgError] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const posterSrc = imgError || !movie.poster
    ? `https://picsum.photos/seed/${movie.id}/300/450`
    : movie.poster;

  return (
    <div className="group relative bg-slate-800/60 border border-white/10 rounded-2xl overflow-hidden hover:border-violet-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-violet-500/10 flex flex-col">
      {/* Poster */}
      <div className="relative aspect-[2/3] overflow-hidden flex-shrink-0">
        <img
          src={posterSrc}
          alt={movie.title}
          onError={() => setImgError(true)}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Rating Badge */}
        <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1">
          <span className="text-yellow-400 text-sm">★</span>
          <span className="text-white text-sm font-medium">{movie.rating}</span>
        </div>

        {/* Year Badge */}
        {movie.year && (
          <div className="absolute top-2 left-2 bg-violet-600/80 backdrop-blur-sm px-2 py-1 rounded-lg">
            <span className="text-white text-xs font-medium">{movie.year}</span>
          </div>
        )}

        {/* Hover Overlay with overview */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <p className="text-gray-200 text-sm line-clamp-5">{movie.overview}</p>
        </div>
      </div>

      {/* Info Panel */}
      <div className="p-4 flex flex-col gap-2 flex-1">
        {/* Platform Badges */}
        {movie.platforms && movie.platforms.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {movie.platforms.map((p) => (
              <PlatformBadge key={p.name} platform={p} />
            ))}
          </div>
        )}

        {/* Title */}
        <h3 className="text-white font-semibold text-sm md:text-base leading-snug group-hover:text-violet-300 transition-colors line-clamp-2">
          {movie.title}
        </h3>

        {/* Expanded overview for mobile (no hover) */}
        <div className="block sm:hidden">
          <p className={`text-gray-400 text-xs leading-relaxed ${isExpanded ? '' : 'line-clamp-3'}`}>
            {movie.overview}
          </p>
          {movie.overview?.length > 100 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-violet-400 text-xs mt-1 hover:text-violet-300 transition-colors"
            >
              {isExpanded ? 'Show less' : 'Read more'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}