
import React from 'react';
import { NavLink } from 'react-router-dom';
// import LogoutButton from '../../auth/LogoutButton';

const NavBar = () => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to='/login' exact={true} activeClassName='active'>
            Login
          </NavLink>
        </li>
        <li>
          <NavLink to='/sign-up' exact={true} activeClassName='active'>
            Get Venmo
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
