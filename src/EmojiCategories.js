import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EmojiCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://emoji-api.com/categories?access_key=352cbcc2559967a6e748bbd1b737ab1e71d5f6a5');
        console.log("Response received:", response);
        setCategories(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <h1>Emoji Categories</h1>
      <div className="emoji-list">
        {categories.map((emoji) => (
          <span
            className="emoji-span"
            key={emoji.slug}
            title={emoji.unicodeName}
          >
            {emoji.character}
          </span>
        ))}
      </div>
    </>
  );
  
};

export default EmojiCategories;
