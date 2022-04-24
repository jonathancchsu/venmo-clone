import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import logo from '../../../img/venmo-logo.svg';
import LogOutButton from '../../auth/LogoutButton';
import solidColorLogo from '../../../img/solid-color-logo.png';

import './LeftSideBar.css';


const LeftSideBar = () => {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <div className="left-side-bar">
      <Link to='/'>
        <img src={logo} alt='logo' className='leftLogo' />
      </Link>
      <div className="user-info">
        <div className="profile-pic"></div>
        <div className="user-welcome">
          Hi, {sessionUser.name}
          <div className="usertag">
            @{sessionUser.username}
          </div>
        </div>
      </div>
      <div className="balance">
        <p>$ {sessionUser.balance} in Venmo</p>
      </div>
      <div className="side-btn">
        <Link className="incomplete" to='/incomplete'>
          Incomplete
        </Link>
      </div>
      <div className="side-btn">
        <Link className="notification" to='/notification'>
          Notification
        </Link>
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
