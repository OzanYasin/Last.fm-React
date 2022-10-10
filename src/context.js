import React, {
  useState,
  useContext,
  useCallback,
  useRef,
  useEffect,
} from 'react';

const URL_TOP_ARTIST =
  'https://ws.audioscrobbler.com/2.0/?api_key=29a080980b034e8c18685f697014f77c&format=json&method=chart.gettopartists&limit=6';
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [artists, setArtists] = useState([]);
  const [page, setPage] = useState(1);
  const [newArtists, setNewArtists] = useState(false);

  const mounted = useRef(false);

  const URL_PAGE = `&page=${page}`;

  const fetchTopArtists = useCallback(async () => {
    // Every time we set fetching loading should be true.
    setLoading(true);
    try {
      const response = await fetch(`${URL_TOP_ARTIST}${URL_PAGE}`);
      const data = await response.json();
      const artistList = data.artists.artist;
      const newArtist = artistList.map((artist) => {
        const { name, playcount, listeners, image } = artist;
        return { name, playCount: playcount, listeners, image };
      });
      setArtists((oldArtists) => [...oldArtists, ...newArtist]);
      setNewArtists(false); // setLoading'den once olmasi lazim!
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, [URL_PAGE]);

  // Dark Theme START
  const getStorageTheme = () => {
    let theme = 'light-theme';
    if (localStorage.getItem('theme')) {
      theme = localStorage.getItem('theme');
    }
    return theme;
  };

  const toggleTheme = () => {
    if (theme === 'light-theme') {
      setTheme('dark-theme');
    } else {
      setTheme('light-theme');
    }
  };
  // Cannot access 'getStorageTheme' before initialization
  const [theme, setTheme] = useState(getStorageTheme());

  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);
  // Dark Theme END

  // Infinite Scroll START
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    // we need to check for the loading and newArtists to fech for only once
    if (!newArtists) return;
    if (loading) return;
    setPage((oldPage) => oldPage + 1);
  }, [newArtists, loading]);

  const event = () => {
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 2) {
      setNewArtists(true);
    }
  };
  useEffect(() => {
    window.addEventListener('scroll', event);
    return () => window.removeEventListener('scroll', event);
  }, []);
  // Infinite Scroll END

  return (
    <AppContext.Provider
      value={{
        loading,
        artists,
        fetchTopArtists,
        page,
        toggleTheme,
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
