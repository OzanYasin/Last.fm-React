import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../logo.svg';
import ToggleTheme from './ToggleTheme';

const Navbar = () => {
  // const { toggleTheme } = useGlobalContext();

  return (
    <nav className="navbar">
      <div className="nav-center">
        <Link to="/">
          <img src={logo} alt="logo" className="logo" />
        </Link>
        <ul className="nav-links">
          <li>
            <ToggleTheme />
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
