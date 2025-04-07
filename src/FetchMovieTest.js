import React, { useState } from 'react';
import axios from 'axios';
import MovieCard from './MovieCard.js';

const MovieList = () => {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const removeHashtags = (title) => {
    return title.replace(/#/g, '').trim();
  };

  const fetchMovie = async () => {
    setLoading(true);
    setError(null);

 
  const options = {
    method: 'GET',
    url: 'https://streaming-availability.p.rapidapi.com/genres',
    params: {
      output_language: 'en'
    },
    headers: {
      'x-rapidapi-key': '3406472949msh5d311deacd86ae3p153b1ejsnadf249bfda5b',
      'x-rapidapi-host': 'streaming-availability.p.rapidapi.com'
    }
  };
  
  try {
    const response = await axios.request(options);
    console.log('genre:',response.data);
  } catch (error) {
    console.error(error);
  }
   };
 


  return (
    <div>
      <button onClick={fetchMovie} className="fetch-button">Fetch Movie</button>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}
      {!loading && !error && movie && (
        <>
          <div>
            <h2 className='movies-heading'>Movie to match your mood</h2>
          </div>
          <div className='container'>
            <div className="row">
              <MovieCard key={movie.title} show={{ ...movie, title: removeHashtags(movie.title) }} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MovieList;
