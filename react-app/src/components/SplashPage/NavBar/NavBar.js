import React from 'react';
import { NavLink, Link } from 'react-router-dom';
// import LogoutButton from '../../auth/LogoutButton';
import logo from '../../../img/venmo-logo.svg';
import './NavBar.css'

const NavBar = () => {
  return (
    <div className='navbar'>
      <Link to='/' className='splash-logo'>
        <img src={logo} alt='logo' />
      </Link>
      <div className='splash-btn'>
        <div className='btn1'>
          <NavLink to='/login' exact={true} activeClassName='active' className='btn'>
            Login
          </NavLink>
        </div>
        <div className='btn1'>
          <NavLink to='/sign-up' exact={true} activeClassName='active' className='btn'>
            Get Venmo
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default NavBar;