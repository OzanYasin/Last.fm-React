import React, { useState, useContext, useEffect } from 'react';
import { useCallback } from 'react';

// const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='
const URL_TOP_ARTIST =
  'https://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key=29a080980b034e8c18685f697014f77c&format=json';
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  return <AppContext.Provider value="hello">{children}</AppContext.Provider>;
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
