import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logout } from '../../store/session';
import './LogoutButton.css';

const LogoutButton = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const onLogout = async (e) => {
    await dispatch(logout());
    history.push('/')
  };

  return (
    <div className='side-btn logout'>
      <i className="fas fa-sign-out-alt"></i>  <div onClick={onLogout} className='logout'>Logout</div>
    </div>
  )
};

export default LogoutButton;
