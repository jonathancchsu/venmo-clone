import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
// import { Link } from 'react-router-dom'

import { getAllPayments } from '../../../store/payment'

import './Home.css'

const Home = () => {
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);
  const [users, setUsers] = useState([]);

  const allPayments = useSelector(state => state.paymentState?.entries[0]?.payments);
  const sessionUser = useSelector(state => state.session.user);

  useEffect(() => {
    (async() => {
      await dispatch(getAllPayments());
      setLoaded(true);
    })();
  }, [dispatch]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/users/');
      const responseData = await response.json();
      setUsers(responseData.users);
    }
    fetchData();
  }, []);

  if (!loaded) {
    return null;
  };

  return (
      <div>
        {allPayments.map((payment, i) =>
          <div key={i} className='payments'>
            <div className='sender-receiver'>
              {(payment.sender_id === sessionUser.id) ?
                "You"
                :
                users[payment.sender_id - 1].name}
              {` paid `}
              {(payment.receiver_id === sessionUser.id) ?
                "You"
                :
                users[payment.receiver_id - 1].name}
            </div>
            {payment.sender_id === sessionUser.id ||
              payment.receiver_id === sessionUser.id ?
              <div className='amount'>
                {`$ ${payment.amount}`}
              </div>
              :
              <></>
            }
            <div className='payment-btns'>
              {payment.title}
            </div>
            <Link to={`/story/${payment.id}`}>
              comments
            </Link>
          </div>)}
      </div>
    )
};

export default Home;
