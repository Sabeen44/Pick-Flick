import React, { useState, useMemo } from 'react';
import axios from 'axios';
import movieMood from './MoodArray.js';
import genres from './GenreObject';

import MovieCard from './MovieCard.js';

const EmojiList = () => {
  const [emojis, setEmojis] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [randomEmojis, setRandomEmojis] = useState([]);
  const [movies, setMovies] = useState([]); // Define the useState for movies here
  const [showEmojis, setShowEmojis] = useState(false); // State for emoji visibility
  const [showMovies, setShowMovies] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);

  const groupEmojis = useMemo(() => ["animal-mammal"

//'tool','person-activity','music' ,,,'family','heart','transport-air','flag','science',"grinning-face",'face-negative',"writing","person-fantasy"
], []);

   const singleEmoji = useMemo(() => 
    [
//        'e0-6-television',"e0-6-camera",'e0-6-videocassette','e0-6-camerawithflash','e1-nazaramulet','e14-hamsa',
//     'e12-0-mechanical-arm','e12-0-mechanical-leg',"e0-7-detective",'e0-6-police-officer', 
// "e13-0-ninja","e14-0-person-with-crown",
// "e11-0-superhero", 
// "e11-0-supervillain","e0-6-old-woman","e0-6-old-man"
   
   ], []);

  //'plant-flower',"award-medal",'animal-bug'
  
  const removeHashtags = (title) => {
    return title.replace(/#/g, '').trim();
  };

  let searchQuery = 'magnet';

  // const fetchAndDisplayEmojis = async () => {
  //   setLoading(true);
  //   setButtonClicked(true);
  //   try {
  //     const response1 = await axios.get('https://emoji-api.com/emojis?access_key=352cbcc2559967a6e748bbd1b737ab1e71d5f6a5');
  //     const response2 = await axios.get(`https://emoji-api.com/emojis?search=${searchQuery}&access_key=352cbcc2559967a6e748bbd1b737ab1e71d5f6a5`);

  //     console.log('Response 1:', response1);
  //     console.log('Response 2:', response2);

  //     if  (Array.isArray(response1.data) && Array.isArray(response2.data)){
  //       const allEmojis = [...response1.data, ...response2.data];
  //       const filteredEmojis = allEmojis.filter(emoji => 
  //         singleEmoji.includes(emoji.slug) || groupEmojis.includes(emoji.subGroup)
  //       );
  //       setEmojis(filteredEmojis);

  //       // Select 5 random emojis
  //       const shuffledEmojis = filteredEmojis.sort(() => 0.5 - Math.random());
  //       const selectedEmojis = shuffledEmojis.slice(0, 50);
  //       setRandomEmojis(selectedEmojis);

  //       setLoading(false);
  //       setShowEmojis(true);
  //     } else {
  //       throw new Error('Invalid data structure from API responses');
  //     }
      
  //     setShowMovies(false);
  //     setLoading(false);
  //   } catch (error) {
  //     console.log('error fetching', error);
  //     setError(error);
  //     setShowMovies(false);
  //   }
  // };

  // const fetchMovies = async (genreId) => {
  //   setLoading(true);
  //   setError(null);
  //   let retries = 3; // Number of retries
  
  //   const delay = ms => new Promise(resolve => setTimeout(resolve, ms)); // Helper function for delay
  
  //   const options = {
  //     method: 'GET',
  //     url: 'https://streaming-availability.p.rapidapi.com/shows/search/filters',
  //     headers: {
  //       'x-rapidapi-key': '3406472949msh5d311deacd86ae3p153b1ejsnadf249bfda5b',
  //       'x-rapidapi-host': 'streaming-availability.p.rapidapi.com'
  //     },
  //     params: { country: 'us', catalogs: 'netflix,prime,hulu,peacock', show_type: 'movie', genre: genreId }
  //   };
  
  //   while (retries > 0) {
  //     try {
  //       const response = await axios.request(options);
  //       console.log(options);
  //       console.log(response.data);
  //       setMovies(response.data.shows || []);
  //       setLoading(false);
  //       setShowEmojis(false);
  //       setShowMovies(true);
  //       break; // Exit the loop if the request is successful
  //     } catch (error) {
  //       if (error.response && error.response.status === 429) {
  //         retries -= 1;
  //         if (retries > 0) {
  //           // Wait for some time before retrying (exponential backoff)
  //           const backoffTime = Math.pow(2, 3 - retries) * 1000;
  //           console.log(`Retrying request in ${backoffTime / 1000} seconds...`);
  //           await delay(backoffTime);
  //         } else {
  //           setError(new Error('Rate limit exceeded. Please try again later.'));
  //           setLoading(false);
  //           break;
  //         }
  //       } else {
  //         setError(error);
  //         setLoading(false);
  //         break;
  //       }
  //     }
  //   }
  // };

  const fetchAndDisplayEmojis = async () => {
    setLoading(true);
    setButtonClicked(true);
    try {
      const response1 = await axios.get('https://emoji-api.com/emojis?access_key=352cbcc2559967a6e748bbd1b737ab1e71d5f6a5');

      console.log('Response 1:', response1);

      if (Array.isArray(response1.data)) {
        const filteredEmojis = response1.data.filter(emoji => 
          singleEmoji.includes(emoji.slug) || groupEmojis.includes(emoji.subGroup)
        );
        setEmojis(filteredEmojis);

        // Select 5 random emojis
        const shuffledEmojis = filteredEmojis.sort(() => 0.5 - Math.random());
        const selectedEmojis = shuffledEmojis.slice(0, 50);
        setRandomEmojis(selectedEmojis);

        setLoading(false);
        setShowEmojis(true);
      } else {
        throw new Error('Invalid data structure from API response');
      }
      
      setShowMovies(false);
      setLoading(false);
    } catch (error) {
      console.log('error fetching', error);
      setError(error);
      setShowMovies(false);
    }
};


  const fetchMovies = async (genreName) => {
    setLoading(true);
    setError(null);
  
    const options = {
      method: 'GET',
      url: 'https://streaming-availability.p.rapidapi.com/shows/search/filters',
      headers: {
        'x-rapidapi-key': '3406472949msh5d311deacd86ae3p153b1ejsnadf249bfda5b',
        'x-rapidapi-host': 'streaming-availability.p.rapidapi.com'
      },
      params: { country: 'us', catalogs: 'netflix,prime,hulu,peacock', show_type: 'movie', genres: genreName }
    };
  
    try {
      const response = await axios.request(options);
      console.log(options);
      console.log(response.data);
      setMovies(response.data.shows || []);
      setLoading(false);
      setShowEmojis(false);
      setShowMovies(true);
    } catch (error) {
      console.log('Error fetching movies:', error);
      if (error.response && error.response.status === 429) {
        setError(new Error('Rate limit exceeded. Please try again later.'));
      } else {
        setError(error);
      }
      setLoading(false);
    }
  };
  

  // const handleEmojiClick = (emoji) => {
  //   const mood = Object.keys(movieMood).find(mood => 
  //     movieMood[mood].includes(emoji.character)
  //   );
  //   console.log(`Selected Emoji: ${emoji.character}, Mood: ${mood}`);
  //   const genreId = genres[mood];
  //   console.log(`Mapped Genre ID: ${genreId}`);
  //   if (genreId) {
  //     fetchMovies(genreId);
  //   } else {
  //     console.log("No genre found for this emoji mood.");
  //   }
  // };
  const handleEmojiClick = (emoji) => {
    const mood = Object.keys(movieMood).find(mood => 
      movieMood[mood].includes(emoji.character)
    );
    console.log(`Selected Emoji: ${emoji.character}, Mood: ${mood}`);
    const genreName = mood;
    console.log(`Mapped Genre Name: ${genreName}`);
    if (genreName) {
      fetchMovies(genreName);
    } else {
      console.log("No genre found for this emoji mood.");
    }
  };
  

  return (
    <>
      <div className='button-container'>
        <button onClick={fetchAndDisplayEmojis} className="emoji-button">Display Emojis</button>
      </div>
      <div>
        {loading && <div>Loading...</div>}
        {error && <div>Error: {error.message}</div>}
        {buttonClicked && !showMovies && (
          <>
            <h2 className='emoji-heading'>Select emoji for your mood</h2>
            {!loading && !error && showEmojis && (
              <div className='emoji-list'>
                {randomEmojis.map((emoji) => (
                  <span className='emoji-span' 
                    key={emoji.slug} 
                    title={emoji.unicodeName} 
                    onClick={() => handleEmojiClick(emoji)}
                  >
                    {emoji.character}
                  </span>
                ))}
              </div>
            )}
          </>
        )}
        {showMovies && !loading && !error && movies.length > 0 && (
          <>
            <div>
              <h2 className='movies-heading'>Movies to match your mood</h2>
            </div>
            <div className='container'>
              <div className="row">
                {movies.map((show, index) => (
                  <MovieCard key={index} show={{...show, title: removeHashtags(show.title),overview:show.overview}} />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default EmojiList;
