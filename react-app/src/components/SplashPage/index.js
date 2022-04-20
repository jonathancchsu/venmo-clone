import NavBar from './NavBar/NavBar';
import { NavLink } from 'react-router-dom';
// import splash from '../../img/splash.png';
import './SplashPage.css';

function SplashPage() {
  return (
    <div className='splash-container'>
      <NavBar />
      <div className='splash'>
        <h1>
          Fast, safe, social payments
        </h1>
        <h4>
          Pay. Get Paid. Share. Join all the people who use the Venmo app.
        </h4>
        <div>
        <NavLink to='/sign-up' exact={true} activeClassName='active' className='btn'>
          Get Venmo
        </NavLink>
        </div>
      </div>
    </div>
  )
};

export default SplashPage;
