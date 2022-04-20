import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import logo from '../../../img/venmo-logo.svg';
import LogOutButton from '../../auth/LogoutButton';

import './LeftSideBar.css';


const LeftSideBar = () => {
  // const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  // const [loaded, setLoaded] = useState();
  console.log(sessionUser)
  // useEffect(() => {
  //   setLoaded(true);
  // })

  return (
    <div className="left-side-bar">
      <Link to='/'>
        <img src={logo} alt='logo' />
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
      {window.location.href.split('/')[3] !=='pay' ?
        <Link className="pay-btn" to='/pay'>
          {/* usefont awesome for logo */}
          Pay or Request
        </Link>
        :
        <></>
      }
      <div className="balance">
        <p>$ {sessionUser.balance} in Venmo</p>
      </div>
      <div>
        <LogOutButton />
      </div>
    </div>
  )
}

export default LeftSideBar;
