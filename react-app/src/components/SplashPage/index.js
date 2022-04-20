import NavBar from './NavBar/NavBar';
import './SplashPage.css';

function SplashPage() {
  return (
    <div className='main-container'>
      <NavBar />
      <div className='splash-text'>
        <h1>
          Fast, safe, social payments
        </h1>
        <h4>
          Pay. Get Paid. Shop. Share. Join more than 83
        </h4>
        <div>
          Get Venmo
        </div>
      </div>
    </div>
  )
};

export default SplashPage;
