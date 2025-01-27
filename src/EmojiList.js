// import React, { useState, useEffect, useMemo } from 'react';
// import axios from 'axios';

// const EmojiList = () => {
//   const [emojis, setEmojis] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [randomEmojis, setRandomEmojis] = useState([]);

//   const subgroupsEmotions = useMemo(() => ["music", "person-sport"], []);
//   const subgroup = useMemo(() => [
//     "animal-bird", "animal-amphibian", "animal-reptile", "animal-marine", "animal-bug", 
//     "plant-flower", "plant-other", "food-fruit", "food-vegetable", "food-prepared", 
//     "food-asian", "food-marine", "food-sweet", "drink", "dishware", "transport-ground", 
//     "transport-water", "transport-air", "hotel", "time", "event", "award-medal", "game", 
//     "arts-crafts", "clothing"
//   ], []);

//   const fetchAndDisplayEmojis = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get('https://emoji-api.com/emojis?access_key=352cbcc2559967a6e748bbd1b737ab1e71d5f6a5');
//       const filteredEmojis = response.data.filter(emoji => 
//         subgroupsEmotions.includes(emoji.subGroup) || subgroup.includes(emoji.subGroup)
//       );
//       setEmojis(filteredEmojis);

//       // Select 5 random emojis
//       const shuffledEmojis = filteredEmojis.sort(() => 0.5 - Math.random());
//       const selectedEmojis = shuffledEmojis.slice(0, 5);
//       setRandomEmojis(selectedEmojis);

//       setLoading(false);
//     } catch (error) {
//       setError(error);
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <button onClick={fetchAndDisplayEmojis} className="btn btn-primary">Show Random Emojis</button>
//       {loading && <div>Loading...</div>}
//       {error && <div>Error: {error.message}</div>}
//       {!loading && !error && (
//         <div>
//           <h1>Emoji List</h1>
//           <div>
//             {randomEmojis.map((emoji) => (
//               <span key={emoji.slug} title={emoji.unicodeName} style={{ fontSize: '2rem', margin: '5px' }}>
//                 {emoji.character}
//               </span>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default EmojiList;


