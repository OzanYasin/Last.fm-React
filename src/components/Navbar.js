import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../logo.svg';
import { useGlobalContext } from '../context';

const Navbar = () => {
  const { toggleTheme } = useGlobalContext();
  return (
    <nav className="navbar">
      <div className="nav-center">
        <Link to="/">
          <img src={logo} alt="logo" className="logo" />
        </Link>
        <ul className="nav-links">
          <li>
            <button className="btn" onClick={toggleTheme}>
              toggle
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
