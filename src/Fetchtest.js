import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FetchExample = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const options = {
        method: 'GET',
        url: 'https://streaming-availability.p.rapidapi.com/shows/search/filters',
        headers: {
          'x-rapidapi-key': '3406472949msh5d311deacd86ae3p153b1ejsnadf249bfda5b',
          'x-rapidapi-host': 'streaming-availability.p.rapidapi.com'
        },
        params: { country: 'us', catalogs: 'netflix,prime,hulu,peacock',show_type: 'movie',
            genre:genreID
         }
      };

      try {
        const response = await axios.request(options);
        console.log(response.data);
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this useEffect runs once when the component mounts

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>Fetched Data</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

//export default FetchExample;
