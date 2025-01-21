import React, { useState, useMemo, useEffect } from 'react';
import axios from 'axios';

const EmojiList = () => {
  const [emojis, setEmojis] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [randomEmojis, setRandomEmojis] = useState([]);
  const [movies, setMovies] = useState([]); // Define the useState for movies here

  const subgroupsEmotions = useMemo(() => ["music", "person-sport"], []);
  const subgroup = useMemo(() => [
    "animal-bird", "animal-amphibian", "animal-reptile", "animal-marine", "animal-bug", 
    "plant-flower", "plant-other", "food-fruit", "food-vegetable", "food-prepared", 
    "food-asian", "food-marine", "food-sweet", "drink", "dishware", "transport-ground", 
    "transport-water", "transport-air", "hotel", "time", "event", "award-medal", "game", 
    "arts-crafts", "clothing"
  ], []);

  //const movieMood = {
//     "Music": ["music"] , // 🎶 // all subgroup music!
//     "Romance": ["kiss", "red heart", "hearts", "heart-eyes"] , // 💏 names contating these words
//     "Comedy": ["grin", "laugh", "tears of joy"], // 🤣
//     "Biography": ["memo", "scroll"], // 📝
//     "Family": ["family"], // 👪 
//     "War": ["bomb", "Military Medal"], // 💣
//     "News": ["new"], // 📰
//     "Reality": ["person tipping hand", "television"], // 💁
//     "Talk Show": ["speaking head"], // 🗣️
//     "Adventure" : ["person mountain biking", "camping", "desert", "national park", "world map", "sunrise", "climbing", "water wave", "palm tree", "sunset"], // 🚵
//     "Fantasy" : ["mage", "castle", "dragon", "merperson", "fairy", "elf"], // 🧙
//     "Animation" : ["eyes", " mouse face"], //
//     "Drama" : ["performing arts", "crying face", "broken heart"], // 🎭
//     "Film Noir" : ['magnifying glass', 'cigarette', 'black heart', 'night with stars'], //
//     "Horror" : ['face screaming in fear'], // 🧟// 😱
//     "Action" : ["helicopter", "motorcycle", "pistol"], // ⚔️
//     "Game Show" : ["slot machine", "thinking face"], // 🎰
//     "History" : ["old man", "face with monocle", 'film frames', 'film projector', 'mantelpiece clock'], // 👴
//     "Western" : ["cowboy hat face"], // 🤠
//     "Musical" : ["woman dancing"], // 💃
//     "Sport" : ["person-sport"], //subgroup
//     "Thiller" : ["drop of blood", 'skul'], 
//     "Short" : ["ruler"], // 
//     "Crime" : ["police officer", "police car light", "oncoming police car", "police car"], // 👮
//     "Science Fiction" : ["nerdy face", "dna", "telescope", "test tube"], // 👽
//     "Mystery" : ["detective", "silhouette","briefcase",  "compass", "old key", "puzzle"], // 🕵️
//     "Documentary" : ["video camera", "film frames", "bookmark tabs"] // 📹
  // };

   const movieMood = {
    "Music": ["🎶"],
    "Romance": ["💏", "❤️", "💞", "😍"],
    "Comedy": ["😁", "😂", "🤣",'🌸','🕣','🏌🏼‍♂️','🏋🏻‍♀️'],
    "Biography": ["📝", "📜"],
    "Family": ["👪"],
    "War": ["💣", "🎖️"],
    "News": ["📰"],
    "Reality": ["💁", "📺"],
    "Talk Show": ["🗣️"],
    "Adventure": ["🚵", "🏕️", "🏜️", "🌍", "🌅", "🥾", "🏄", "🌴", "🌄","🏂",'⛹🏼‍♂️'],
    "Fantasy": ["🧙", "🏰", "🐉", "🧜", "🧚", "🧝"],
    "Animation": ["👀", "🐭"],
    "Drama": ["🎭", "😢", "💔"],
    "Film Noir": ["🔍", "🚬", "🖤", "🌃"],
    "Horror": ["😱"],
    "Action": ["🚁", "🏍️", "🔫"],
    "Game Show": ["🎰", "🤔"],
    "History": ["👴", "🧐", "🎞️", "📽️", "🕰️"],
    "Western": ["🤠"],
    "Musical": ["💃"],
    "Sport": ["🤺", "🏇", "🏂", "🏋️", "🚴", "⛸️", "⛷️", "🏊", "🤾", "🧗"],
    "Thriller": ["🩸", "💀"],
    "Short": ["📏"],
    "Crime": ["👮", "🚨", "🚓"],
    "Science Fiction": ["🤓", "🧬", "🔭", "🧪"],
    "Mystery": ["🕵️", "👤", "💼", "🧭", "🗝️", "🧩"],
    "Documentary": ["📹", "🎞️", "📑"]
  };
  
  

  const genres = {
    "Biography": "1",
    "Music": "10402",
    "Romance": "10749",
    "Family":"10751",
    "War":"10752",
    "News":"10763",
    "Reality":"10764",
    "Talk Show":"10767",
    "Adventure":"12",
    "Fantasy":"14",
    "Animation":"16",
    "Drama":"18",
    "Film Noir": "2",
    "Horror":"27",
    "Action":"28",
    "Game Show":"3",
    "Comedy":"35",
    "History":"36",
    "Western":"37",
    "Musical":"4",
    "Sport":"5",
    "Thriller":"53",
    "Short":"6",
    "Crime":"80",
    "Science Fiction":"878",
    "Mystery":"9648",
    "Documentary":"99"
}
// const genres = {
//     "Biography": "biography",
//     "Music": "music",
//     "Romance": "romance",
//     "Family": "family",
//     "War": "war",
//     "News": "news",
//     "Reality": "reality",
//     "Talk Show": "talk_show",
//     "Adventure": "adventure",
//     "Fantasy": "fantasy",
//     "Animation": "animation",
//     "Drama": "drama",
//     "Film Noir": "film_noir",
//     "Horror": "horror",
//     "Action": "action",
//     "Game Show": "game_show",
//     "Comedy": "comedy",
//     "History": "history",
//     "Western": "western",
//     "Musical": "musical",
//     "Sport": "sport",
//     "Thriller": "thriller",
//     "Short": "short",
//     "Crime": "crime",
//     "Science Fiction": "science_fiction",
//     "Mystery": "mystery",
//     "Documentary": "documentary"
//   };
  
  

  const fetchAndDisplayEmojis = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://emoji-api.com/emojis?access_key=352cbcc2559967a6e748bbd1b737ab1e71d5f6a5');
      const filteredEmojis = response.data.filter(emoji => 
        subgroupsEmotions.includes(emoji.subGroup) || subgroup.includes(emoji.subGroup)
      );
      setEmojis(filteredEmojis);

      // Select 5 random emojis
      const shuffledEmojis = filteredEmojis.sort(() => 0.5 - Math.random());
      const selectedEmojis = shuffledEmojis.slice(0, 20);
      setRandomEmojis(selectedEmojis);

      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const fetchMovies = async (genreId) => {
    setLoading(true);
    setError(null);
    try {
      const options = {
        method: 'GET',
        url: `https://streaming-availability.p.rapidapi.com/search?country=us&services=netflix,prime,hulu,peacock&show_type=movie&genre=${genreId}`,
        headers: {
          'x-rapidapi-key': '3406472949msh5d311deacd86ae3p153b1ejsnadf249bfda5b',
          'x-rapidapi-host': 'streaming-availability.p.rapidapi.com'
        }
      };

    //   catalogs=netflix%2Cprime.buy%2Chulu.addon.hbo%2Cpeacock.free&
      
      const response = await axios.request(options);
      console.log(options);
      setMovies(response.data.result || []);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setError(error.message);
      setLoading(false);
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
    <div>
      <button onClick={fetchAndDisplayEmojis} className="btn btn-primary">Show Random Emojis</button>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}
      {!loading && !error && (
        <div>
          <h1>Emoji List</h1>
          <div>
            {randomEmojis.map((emoji) => (
              <span key={emoji.slug} title={emoji.unicodeName} style={{ fontSize: '2rem', margin: '5px', cursor: 'pointer' }} onClick={() => handleEmojiClick(emoji)}>
                {emoji.character}
              </span>
            ))}
          </div>
        </div>
      )}
      {movies.length > 0 && (
        <div>
          <h2>Movies</h2>
          <ul>
            {movies.map((movie) => (
              <li key={movie.id}>{movie.title}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default EmojiList;
