import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';

import { getAllPayments } from '../../../store/payment'
import { getUsers } from '../../../store/session';

import './Home.css'

const Home = () => {
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);
  const users = Object.values(useSelector(state => state.session));
  // const [usersObj, setUsersObj] = useState([]);

  const allPayments = Object.values(useSelector(state => state.paymentState));
  const sessionUser = useSelector(state => state.session.user);
  console.log(sessionUser)
  console.log(allPayments)
  // useEffect(() => {
  //   async function fetchData() {
  //     const response = await fetch('/api/users/');
  //     const responseData = await response.json();
  //     return setUsersObj(responseData?.users);
  //   }
  //   fetchData();
  // }, []);

  // usersObj.forEach((user, i) => {
  //   let userObj = {};
  //   userObj[user.id] = user.name;
  //   users.push(userObj).reverse();
  // })
  // console.log(users)

  useEffect(() => {
    (async() => {
      await dispatch(getAllPayments());
      await dispatch(getUsers());
      return setLoaded(true);
    })();
  }, [dispatch]);

  const getDate = ((string) => {
    let data = string.split(' ');
    let date = [];
    for (let i = 2; i > 0; i--) {
      date.push(data[i]);
    };
    let monthDay = date.join();
    let md = monthDay.split(',');
    let d = md.join(' ');
    return d;
  })

  if (!loaded) {
    return null;
  };

  return (
    <div>
      <div className='payments-container'>
        {allPayments.map((payment, i) =>

          <div key={i} className='payments'>
            <div className='all-content'>
            <div className='payment-content'>
              <div className='sender-receiver'>
                {(payment?.sender_id === sessionUser?.id) ?
                  "You"
                  :
                  users[payment.sender_id - 1]?.name}
                {<div className='paid'>paid</div>}
                {(payment.receiver_id === sessionUser.id) ?
                  "You"
                  :
                  users[payment.receiver_id - 1]?.name}
              </div>
              <div className='date'>
                  {`${getDate(payment.created_at)}`}
              </div>
              <div className='payment-title'>
                {payment.title}
              </div>
              <div className='comment-icon'>
                <Link to={`/story/${payment.id}`} className='comment-link'>
                  {(payment.comments.comments.length >= 1) ?
                    <div className='comment-length'>
                      <i className="fas fa-comment blue"></i>
                      <p className='num'>{payment.comments.comments.length}</p>
                    </div>
                    :
                    <i className="fas fa-comment black"></i>
                  }
                </Link>
              </div>
            </div>
            <div className='amount-container'>
            {payment.sender_id === sessionUser.id ||
                (payment.receiver_id === sessionUser.id) ?
                  ((payment.sender_id === sessionUser.id) ?
                    <div className='amount red'>
                      {` - $${payment.amount}`}
                    </div>
                  :
                    <div className='amount green'>
                      {` + $${payment.amount}`}
                    </div>
                  )
                :
                <></>
              }
              </div>
            </div>
          </div>)}
      </div>
    </div>
    )
};

export default Home;
