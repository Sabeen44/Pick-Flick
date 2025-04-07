import React, { useState, useMemo } from 'react';
import axios from 'axios';
import movieMood from './MoodArray.js';
import genres from './GenreObject';
import Header from './Header.js';

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
  const [isVisible, setIsVisible] = useState(true);

  const groupEmojis = useMemo(() => [
   



'music','heart','family','flag','tool',
 'person-activity','light-video',"place-geographic","place-map",'place-other','animal-mammal',"person-fantasy","face-concerned",'face-costume','face-negative','transport-air','other-object','medical','science','writing','money'],


 []);

   const singleEmoji = useMemo(() => 
    [
//"e5-0-older-person"
//     'e0-6-television',"e0-6-camera",'e0-6-videocassette','e1-0-camera-with-flash',  
// confirmed ## 'e0-6-woman-dancing','e3-0-man-dancing',
// 'e1-0-grinning-face', 
//  'e0-6-grinning-face-with-big-eyes',
//  'e0-6-grinning-face-with-smiling-eyes',  
//  'e0-6-beaming-face-with-smiling-eyes',  
//  'e0-6-grinning-squinting-face',  
//  'e0-6-grinning-face-with-sweat',  
//  'e0-6-face-with-tears-of-joy',     
// 'e1-0-upside-down-face',
//  'e14-0-melting-face',
//  'e0-6-winking-face'
// 'e0-6-smiling-face-with-smiling-eyes'
// 'e1-0-smiling-face-with-halo',
// 'e0-7-globe-showing-europe-africa',
//'e1-0-nerd-face','e5-0-face-with-monocle',
//'e0-7-globe-showing-americas',
//'e11-0-compass','e3-0-eagle',"e11-0-hiking-boot"
//"e0-6-old-man","e0-6-old-woman","e12-1-person-white-hair","e11-0-woman-white-hair",
//"e5-0-older-person"

// ##

// 'e1-nazaramulet','e14-hamsa'
//     'e12-0-mechanical-arm','e12-0-mechanical-leg',"e0-7-detective",'e0-6-police-officer', 
// "e13-0-ninja","e14-0-person-with-crown",
// "e11-0-superhero", 
// "e11-0-supervillain","e0-6-old-woman","e0-6-old-man",'e0-6-page-with-curl','e0-6-scroll','e0-6-page-facing-up','e0-6-newspaper','e0-7-rolled-up-newspaper','e0-6-ledger',"e0-7-old-key","e11-0-abacus"



   
   ], []);

  //'plant-flower',"award-medal",'animal-bug'
  
  const removeHashtags = (title) => {
    return title.replace(/#/g, '').trim();
  };

  let searchQuery = 'magnet';


  const fetchAndDisplayEmojis = async () => {
    setLoading(true);
    setButtonClicked(true);
    setIsVisible(false);
    try {
      const response1 = await axios.get('https://emoji-api.com/emojis?access_key=352cbcc2559967a6e748bbd1b737ab1e71d5f6a5');

      console.log('Response 1:', response1);

      if (Array.isArray(response1.data)) {
        const filteredEmojis = response1.data.filter(emoji => 
          singleEmoji.includes(emoji.slug) || groupEmojis.includes(emoji.subGroup)
        );
        setEmojis(filteredEmojis);
        console.log(emojis);
        // Select 5 random emojis
        const shuffledEmojis = filteredEmojis.sort(() => 0.5 - Math.random());
        const selectedEmojis = shuffledEmojis.slice(0, 10);
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
    {isVisible && <Header/>}
      <div className='button-container'>
        <button onClick={fetchAndDisplayEmojis} className="emoji-button">Display Emojis</button>
        
      </div>
      <div>
        {loading && <div>Loading...</div>}
        {error && <div>Error: {error.message}</div>}
        {buttonClicked && !showMovies && (
          <>
            <h2 className='emoji-heading'>Select an emoji that matches your mood</h2>
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
              <h2 className='movies-heading'>Movie Choices</h2>
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
