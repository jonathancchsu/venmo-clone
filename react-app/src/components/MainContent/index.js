import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, Route, Switch, NavLink, Link } from 'react-router-dom';
import * as sessionActions from '../../store/session';

import { getAllPayments } from '../../store/payment';
import OnePayment from './OnePayment';
import Home from './Home';
import LeftSideBar from './LeftSideBar';
import TransactionForm from './TransactionForm';

import './MainContent.css';

function MainContent({ way }) {
  const dispatch = useDispatch();
  // const sessionUser = useSelector(state => state.session.user);
  // const payments = useSelector(state => state.paymentState.entries);

  useEffect(() => {
    dispatch(getAllPayments());
  }, [dispatch]);

  if (way === 'onePayment') {
    return (
      <div className='main-container'>
        <div className='left-side-bar'>
          <LeftSideBar />
        </div>
        <div className='main-content'>
          <OnePayment />
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
};

export default MainContent;
