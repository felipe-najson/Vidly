import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const NavBar = ({ user }) => {
  return (
    <nav className='navbar navbar-expand-lg navbar-light bg-light'>
      <Link className='navbar-brand' to='/'>
        Vidly
      </Link>
      <button
        className='navbar-toggler'
        type='button'
        data-toggle='collapse'
        data-target='#navbarText'
        aria-controls='navbarText'
        aria-expanded='false'
        aria-label='Toggle navigation'>
        <span className='navbar-toggler-icon'></span>
      </button>
      <div className='collapse navbar-collapse' id='navbarText'>
        <ul className='navbar-nav mr-auto'>
          <li className='nav-item'>
            <NavLink className='nav-link' to='/movies'>
              Movies
            </NavLink>
          </li>
          <li className='nav-item'>
            <NavLink className='nav-link' to='/customers'>
              Customers
            </NavLink>
          </li>
          <li className='nav-item'>
            <NavLink className='nav-link' to='/rentals'>
              Rentals
            </NavLink>
          </li>
          {!user && (
            <React.Fragment>
              <li className='nav-item'>
                <NavLink className='nav-link' to='/login'>
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink className='nav-link' to='/register'>
                  Register
                </NavLink>
              </li>
            </React.Fragment>
          )}
          {user && (
            <React.Fragment>
              <li className='nav-item'>
                <NavLink className='nav-link' to='/profile'>
                  Profile
                </NavLink>
              </li>
              <li>
                <NavLink className='nav-link' to='/logout'>
                  Logout
                </NavLink>
              </li>
            </React.Fragment>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
