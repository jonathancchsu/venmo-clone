import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';

import logo from '../../../img/venmo-logo.svg';
import LogOutButton from '../../auth/LogoutButton';
import solidColorLogo from '../../../img/solid-color-logo.png';
import { getOneUser } from "../../../store/session";
// import { login } from "../../../store/session";

import './LeftSideBar.css';


const LeftSideBar = () => {
  const [loaded, setLoaded] = useState();
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const sessionUser = useSelector(state => state.session);

  useEffect(() => {
    (async() => {
      await dispatch(getOneUser(user.id));
      return setLoaded(true);
    })()
  }, [dispatch, user.id]);

  if (!loaded) {
    return null;
  };

  return (
    <div className="left-side-bar">
      <Link to='/'>
        <img src={logo} alt='logo' className='leftLogo' />
      </Link>
      <div className="user-info">
        <div className="profile-pic"></div>
        <div className="user-welcome">
          Hi, {sessionUser[user.id].name}
          <div className="usertag">
            @{sessionUser[user.id].username}
          </div>
        </div>
      </div>
      <div className="balance">
        <p>$ {sessionUser[user.id].balance} in Venmo</p>
      </div>
      <div className="side-btn">
        <Link className="incomplete" to='/incomplete'>
          <i className="fas fa-spinner"></i> Incomplete
        </Link>
      </div>
      <div className="side-btn">
        <Link className="notification" to='/notification'>
        <i className="far fa-bell"></i> Notifications
        </Link>
      </div>
      <div className="side-btn">
      <a href="https://github.com/jonathancchsu" className="incomplete">
        <i className="fab fa-github"></i> GitHub
      </a>
      </div>
      <div className="side-btn">
      <a href="https://www.linkedin.com/in/jonathancchsu/" className="incomplete">
      <i className="fab fa-linkedin"></i> LinkedIn
      </a>
      </div>
      <div>
        <LogOutButton />
      </div>
      {window.location.href.split('/')[3] !=='pay' ?
        <Link className="pay-btn getVenmo btn" to='/pay'>
          <img src={solidColorLogo} className='solid-color-logo' alt='solid-color-logo'/>
          Pay or Request
        </Link>
        :
        <></>
      }
    </div>
  )
}

export default LeftSideBar;
