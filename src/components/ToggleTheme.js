import React from 'react';
import { useGlobalContext } from '../context';

const ToggleTheme = () => {
  const { toggleTheme } = useGlobalContext();
  return (
    <button className="btn" onClick={toggleTheme}>
      toggle
    </button>
  );
};

export default ToggleTheme;
