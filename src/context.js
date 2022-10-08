import React, { useState, useContext, useEffect } from 'react';
import { useCallback } from 'react';

// const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='
const URL_TOP_ARTIST =
  'https://ws.audioscrobbler.com/2.0/?api_key=29a080980b034e8c18685f697014f77c&format=json&method=';
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [artists, setArtists] = useState([]);
  console.log(artists);
  const [method, setMethod] = useState('chart.gettopartists');

  const fetchArtists = async () => {
    // Every time we set fetching setLoading should be true.
    setLoading(true);
    try {
      const response = await fetch(`${URL_TOP_ARTIST}${method}`);
      const data = await response.json();
      // console.log(data);
      const { artists } = data;
      if (artists) {
        const artistList = artists.artist;
        const newArtist = artistList.map((artist) => {
          const { name, playcount, listeners } = artist;
          return { name, playCount: playcount, listeners };
        });
        setArtists(newArtist);
      } else {
        // Happens if artists array is null
        setArtists([]);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArtists();
  }, []);

  return (
    <AppContext.Provider
      value={{
        loading,
        artists,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
