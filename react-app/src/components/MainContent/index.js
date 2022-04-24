import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import OnePayment from './OnePayment';
import Home from './Home';
import LeftSideBar from './LeftSideBar';
import TransactionForm from './TransactionForm';
import Incomplete from './Incomplete';
import Notification from './Notofication';

import './MainContent.css';

function MainContent({ way }) {
  const allRequests = useSelector(state => state.requestState?.entries[0]?.requests)
  const sessionUser = useSelector(state => state.session.user);
  const payment = useSelector(state => state.paymentState?.entries[0]);
  const users = [];
  const [usersObj, setUsersObj] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/users/');
      const responseData = await response.json();
      setUsersObj(responseData?.users);
    }
    fetchData();
  }, []);

  usersObj.forEach((user, i) => {
    let userObj = {};
    userObj[user.id] = user.name;
    users.push(userObj);
  })

  console.log('users from main content',users)

  if (way === 'onePayment') {
    return (
      <div className='main-container'>
        <div className='left-side-bar'>
          <LeftSideBar />
        </div>
        <div className='main-content'>
          <OnePayment payment={payment} sessionUser={sessionUser} users={users}/>
        </div>
      </div>
    )
  };

  if (way === 'home') {
    return (
      <div className='main-container'>
        <div className='left-side-bar'>
          <LeftSideBar />
        </div>
        <div className='main-content'>
          <Home />
        </div>
      </div>
    )
  };

  if (way === 'form') {
    return (
      <div className='main-container'>
        <div className='left-side-bar'>
          <LeftSideBar />
        </div>
        <div className='main-content'>
          <TransactionForm />
        </div>
      </div>
    )
  };

  if (way === 'incomplete') {
    return (
      <div className='main-container'>
        <div className='left-side-bar'>
          <LeftSideBar />
        </div>
        <div className='main-content'>
          <Incomplete allRequests={allRequests} sessionUser={sessionUser} users={users}/>
        </div>
      </div>
    )
  };

  if (way === 'notification') {
    return (
      <div className='main-container'>
        <div className='left-side-bar'>
          <LeftSideBar />
        </div>
        <div className='main-content'>
          <Notification allRequests={allRequests} sessionUser={sessionUser} users={users}/>
        </div>
      </div>
    )
  };
};

export default MainContent;
