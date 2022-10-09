import React, { useState, useContext, useCallback } from 'react';
// import { useCallback } from 'react';

const URL_TOP_ARTIST =
  'https://ws.audioscrobbler.com/2.0/?api_key=29a080980b034e8c18685f697014f77c&format=json&method=chart.gettopartists';
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [artists, setArtists] = useState([]);
  // console.log(artists);
  // const [method, setMethod] = useState('chart.gettopartists');

  const fetchTopArtists = useCallback(async () => {
    // Every time we set fetching setLoading should be true.
    setLoading(true);
    try {
      const response = await fetch(`${URL_TOP_ARTIST}`);
      const data = await response.json();

      if (data) {
        const artistList = data.artists.artist;
        const newArtist = artistList.map((artist) => {
          const { name, playcount, listeners, image } = artist;
          return { name, playCount: playcount, listeners, image };
        });
        setArtists(newArtist);
      } else {
        // if artists array is null
        setArtists([]);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, []);

  return (
    <AppContext.Provider
      value={{
        loading,
        artists,
        fetchTopArtists,
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
