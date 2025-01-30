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

   const subgroupsEmotions = useMemo(() => ['family'], []);
   
  const subgroup = useMemo(() => [
    //"person-fantasy","music","award-medal","person-activity",'animal-bug', 'plant-flower',"animal-mammal",'other-object',
   //
  ], []);
  // "food-fruit", "food-vegetable", "food-prepared", 
  //   "food-asian", "food-marine", "food-sweet", "drink", "dishware",
  //, "person-sport", "grinning-face","face-smiling",
  // "animal-bird", "animal-amphibian", "animal-reptile", "animal-marine", "animal-bug", 
    // "plant-flower", "plant-other",  "transport-ground", 
    // "transport-water", "transport-air", "hotel", "time", "event", "award-medal", "game", 
    // "arts-crafts", "clothing",

  const removeHashtags = (title) => {
    return title.replace(/#/g, '').trim();
  };

  const fetchAndDisplayEmojis = async () => {
    setLoading(true);
    setButtonClicked(true);
    try {
      const response = await axios.get('https://emoji-api.com/emojis?access_key=352cbcc2559967a6e748bbd1b737ab1e71d5f6a5');
      const filteredEmojis = response.data.filter(emoji => 
        subgroupsEmotions.includes(emoji.subGroup) || subgroup.includes(emoji.subGroup)
      );
      setEmojis(filteredEmojis);

      // Select 5 random emojis
      const shuffledEmojis = filteredEmojis.sort(() => 0.5 - Math.random());
      const selectedEmojis = shuffledEmojis.slice(0, 50);
      setRandomEmojis(selectedEmojis);

      setLoading(false);
      setShowEmojis(true);
      setShowMovies(false);
    } catch (error) {
      setError(error);
      setLoading(false);
      setShowMovies(false);
    }
  };

  // const fetchMovies = async (genreId) => {
  //   setLoading(true);
  //   setError(null);

  //   const options = {
  //       method: 'GET',
  //       url: 'https://streaming-availability.p.rapidapi.com/shows/search/filters',
  //       headers: {
  //         'x-rapidapi-key': '3406472949msh5d311deacd86ae3p153b1ejsnadf249bfda5b',
  //         'x-rapidapi-host': 'streaming-availability.p.rapidapi.com'
  //       },
  //       params: { country: 'us', catalogs: 'netflix,prime,hulu,peacock', show_type: 'movie', genre: genreId }
  //   };

  //   try {
  //     const response = await axios.request(options);
  //     console.log(options);
  //     console.log(response.data);
  //     setMovies(response.data.shows || []);
  //     setLoading(false);
  //     setShowEmojis(false);
  //     setShowMovies(true);
  //   } catch (error) {
  //     console.error(error);
  //     setError(error.message);
  //     setLoading(false);
  //   }
  // };

  const fetchMovies = async (genreId) => {
    setLoading(true);
    setError(null);
    let retries = 3; // Number of retries
  
    while (retries > 0) {
      const options = {
        method: 'GET',
        url: 'https://streaming-availability.p.rapidapi.com/shows/search/filters',
        headers: {
          'x-rapidapi-key': '3406472949msh5d311deacd86ae3p153b1ejsnadf249bfda5b',
          'x-rapidapi-host': 'streaming-availability.p.rapidapi.com'
        },
        params: { country: 'us', catalogs: 'netflix,prime,hulu,peacock', show_type: 'movie', genre: genreId }
      };
  
      try {
        const response = await axios.request(options);
        console.log(options);
        console.log(response.data);
        setMovies(response.data.shows || []);
        setLoading(false);
        setShowEmojis(false);
        setShowMovies(true);
        break; // Exit the loop if the request is successful
      } catch (error) {
        if (error.response && error.response.status === 429) {
          retries -= 1;
          if (retries > 0) {
            // Wait for some time before retrying
            await new Promise(res => setTimeout(res, 2000 * (3 - retries)));
          } else {
            setError(error);
            setLoading(false);
            break;
          }
        } else {
          setError(error);
          setLoading(false);
          break;
        }
      }
    }
  };
  

  const handleEmojiClick = (emoji) => {
    const mood = Object.keys(movieMood).find(mood => 
      movieMood[mood].includes(emoji.character)
    );
    console.log(`Selected Emoji: ${emoji.character}, Mood: ${mood}`);
    const genreId = genres[mood];
    if (genreId) {
      fetchMovies(genreId);
    } else {
      console.log("No genre found for this emoji mood.");
    }
  };

  return (
    <>
      <div className='button-container'>
      <button onClick={fetchAndDisplayEmojis} className="emoji-button">Display Emojis</button></div>
          <div >
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
              <MovieCard key={index} show={{...show, title: removeHashtags(show.title)}} />
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

