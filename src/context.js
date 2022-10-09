import React, { useState, useContext, useCallback } from 'react';
// import { useCallback } from 'react';

const URL_TOP_ARTIST =
  'https://ws.audioscrobbler.com/2.0/?api_key=29a080980b034e8c18685f697014f77c&format=json&method=chart.gettopartists&limit=6';
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(5);
  console.log(page);
  const [artists, setArtists] = useState([]);

  const fetchTopArtists = useCallback(async () => {
    // Every time we set fetching loading should be true.
    setLoading(true);
    const URL_PAGE = `&page=${page}`;
    try {
      const response = await fetch(`${URL_TOP_ARTIST}${URL_PAGE}`);
      const data = await response.json();
      const artistList = data.artists.artist;
      const newArtist = artistList.map((artist) => {
        const { name, playcount, listeners, image } = artist;
        return { name, playCount: playcount, listeners, image };
      });
      // setArtists(newArtist);
      setArtists((oldArtists) => [...oldArtists, ...newArtist]);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, [page]);

  const infiniteScroll = () => {
    const event = window.addEventListener('scroll', () => {
      if (
        !loading &&
        window.innerHeight + window.scrollY >= document.body.scrollHeight
      ) {
        // setPage((oldPage) => {
        //   return oldPage + 1;
        // });
      }
    });
    return () => window.removeEventListener('scroll', event);
  };

  return (
    <AppContext.Provider
      value={{
        loading,
        artists,
        fetchTopArtists,
        page,
        infiniteScroll,
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
