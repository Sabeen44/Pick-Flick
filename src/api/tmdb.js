// src/api/tmdb.js
// ---------------------------------------------------------------------------
// All TMDB fetching lives here. Import GENRE_TO_TMDB_ID from emojiGenreMap.
//
// SETUP:
//   1. Create a free account at https://www.themoviedb.org/
//   2. Go to Settings → API → copy your "API Read Access Token" (Bearer token)
//   3. Create .env in your project root:
//        VITE_TMDB_TOKEN=your_bearer_token_here
// ---------------------------------------------------------------------------

import { GENRE_TO_TMDB_ID } from '../data/emojiGenreMap';

const BASE = 'https://api.themoviedb.org/3';
const IMG_BASE = 'https://image.tmdb.org/t/p';

const headers = {
  accept: 'application/json',
  Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
};

// Streaming services available in the US (TMDB watch provider IDs)
export const STREAMING_PROVIDERS = {
  8:   { name: 'Netflix',    class: 'pb-netflix'  },
  9:   { name: 'Prime Video', class: 'pb-prime'   },
  15:  { name: 'Hulu',       class: 'pb-hulu'     },
  386: { name: 'Peacock',    class: 'pb-peacock'  },
  337: { name: 'Disney+',    class: 'pb-disney'   },
  384: { name: 'HBO Max',    class: 'pb-hbo'      },
  350: { name: 'Apple TV+',  class: 'pb-apple'    },
};

const PROVIDER_IDS = Object.keys(STREAMING_PROVIDERS).join('|');

/**
 * Convert your mood genre names → comma-separated TMDB genre IDs
 */
function genresToIds(genres = []) {
  return genres
    .map((g) => GENRE_TO_TMDB_ID[g])
    .filter(Boolean)
    .join(',');
}

/**
 * Get a poster URL from a TMDB poster_path
 */
export function posterUrl(path, size = 'w342') {
  if (!path) return null;
  return `${IMG_BASE}/${size}${path}`;
}

/**
 * Fetch watch providers for a single movie (US region)
 * Returns an array of provider objects like { name, class }
 */
async function getProviders(movieId) {
  try {
    const res = await fetch(`${BASE}/movie/${movieId}/watch/providers`, { headers });
    const data = await res.json();
    const us = data?.results?.US;
    if (!us) return [];
    // Combine flatrate (subscription) providers
    const flat = us.flatrate || [];
    return flat
      .filter((p) => STREAMING_PROVIDERS[p.provider_id])
      .map((p) => STREAMING_PROVIDERS[p.provider_id])
      .slice(0, 3); // cap at 3 badges per card
  } catch {
    return [];
  }
}

/**
 * Main fetch: discover movies by mood genres
 * @param {string[]} genres  - array of your mood genre strings
 * @param {number}   page    - TMDB page (1-indexed)
 * @returns {Promise<{ results: Movie[], totalPages: number }>}
 */
export async function fetchMoviesByGenres(genres = [], page = 1) {
  const genreIds = genresToIds(genres);
  if (!genreIds) return { results: [], totalPages: 0 };

  const params = new URLSearchParams({
    with_genres: genreIds,
    sort_by: 'popularity.desc',
    'vote_count.gte': '100',       // filter out obscure titles
    'vote_average.gte': '6.0',     // decent quality floor
    with_watch_providers: PROVIDER_IDS,
    watch_region: 'US',
    include_adult: 'false',
    language: 'en-US',
    page,
  });

  const res = await fetch(`${BASE}/discover/movie?${params}`, { headers });
  if (!res.ok) throw new Error(`TMDB error: ${res.status}`);
  const data = await res.json();

  // Fetch providers in parallel (capped at 12 movies)
  const movies = (data.results || []).slice(0, 12);
  const withProviders = await Promise.all(
    movies.map(async (movie) => {
      const platforms = await getProviders(movie.id);
      return {
        id: movie.id,
        title: movie.title,
        overview: movie.overview,
        rating: movie.vote_average?.toFixed(1),
        year: movie.release_date?.slice(0, 4),
        poster: posterUrl(movie.poster_path),
        backdrop: posterUrl(movie.backdrop_path, 'w780'),
        genres: genres,
        platforms,
      };
    })
  );

  return {
    results: withProviders,
    totalPages: data.total_pages ?? 1,
  };
}