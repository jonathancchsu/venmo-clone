import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { postPayment } from '../../../store/payment';
import { postRequest } from '../../../store/request';
import { getUsers, getOneUser } from '../../../store/session';

import "./TransactionForm.css";

const TransactionForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const sender_id = useSelector((state) => state.session.user.id);
  const userState = Object.values(useSelector((state) => state.session));
  const [errors, setErrors] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [amount, setAmount] = useState(0);
  const [receiverName, setReceiverName] = useState('');
  const [title, setTitle] = useState('');
  // const [privacy, setPrivacy] = useState('public');
  const privacy = 'public';

  useEffect(() => [
    (async() => {
      await dispatch(getUsers());
      setLoaded(true);
    })()
  ], [dispatch])

  let usersList = [];

  for(let i = 0; i < userState.length; i++) {
    usersList.push(userState[i].username)
  }

  // console.log(usersList)
  // console.log(usersList.indexOf('marnie'))

  function validateDecimal(decimalValue) {
    var rx = /^\d+(?:\.\d{1,2})?$/

    if(rx.test(decimalValue)) {
      return true;
    }
    else {
      return false;
    }
  };

  const onCreatePayment = async(e) => {
    e.preventDefault();

    let receiver_id = usersList.indexOf(receiverName) + 1
    // console.log({ amount, receiverName, sender_id, title, privacy })
    // console.log('amount > 0', amount > 0)
    // console.log('title length > 1',title.length > 1)
    // console.log('validatedecimal',validateDecimal(amount))
    // console.log('isNaN', !isNaN(amount))
    // console.log('user in userlist', usersList.indexOf(receiverName) >= 0)
    if (amount > 0 && title.length > 0 && !isNaN(amount) && validateDecimal(amount) && usersList.indexOf(receiverName) >= 0) {
        await dispatch(postPayment({ amount, receiver_id, sender_id, title, privacy }))
        .then(dispatch(getOneUser(sender_id)))
        .then(() => {
          history.push('/')
        });


        // if (data) {
        //   setErrors(data);
        //   return
        // };
    }

    let errorsList = [];

    if (!(amount < 0)) {
      errorsList.push("Please provide a number greater than 0.")
    }
    if (title.length < 1) {
      errorsList.push("Please provide a title.")
    }
    if (!isNaN(amount)) {
      errorsList.push("Please provide a valid number.")
    }
    if (validateDecimal(amount)) {
      errorsList.push('Please provide a valid number with right decimal points.');
    }
    if (!(usersList.indexOf(receiverName) >= 0)) {
      errorsList.push('Please provide a valid username.')
    }
    setErrors(errorsList)
    return
  };

  const onCreateRequest = async(e) => {
    e.preventDefault();

    if (amount > 0 && title.length > 0 && !isNaN(amount) && validateDecimal(amount) && usersList.indexOf(receiverName) >= 0) {
      await dispatch(postRequest({ amount, receiverName, sender_id, title, privacy }))
        .then(dispatch(getOneUser(sender_id)))
        .then(
          history.push(`/`)
        );
      // if (data) {
      //   setErrors(data);
      // }
    }
    let errorsList = [];

    if (!(amount < 0)) {
      errorsList.push("Please provide a number greater than 0.")
    }
    if (title.length < 1) {
      errorsList.push("Please provide a title.")
    }
    if (!isNaN(amount)) {
      errorsList.push("Please provide a valid number.")
    }
    if (validateDecimal(amount)) {
      errorsList.push('Please provide a valid number with right decimal points.');
    }
    if (!(usersList.indexOf(receiverName) >= 0)) {
      errorsList.push('Please provide a valid username.')
    }
    setErrors(errorsList)
    return
  };

  // const amountValidation = amount => {
  //   const regex = new RegExp('/(?=.*?\d)^\$?(([1-9]\d{0,2}?(\.\d{1,2})?$/');
  //   return regex.test(amount);
  // }

  // const changeAmount = e => {
  //   const amount = e.target.value;
  //   const validAmount = !amount || amountValidation(amount);
  //   if (validAmount) setAmount(amount);
  // };

  if (!loaded) {
    return null;
  };

  return (
    <div className='form-container transaction-form notification-page'>
      <div className='page-title notification-title'>
          Venmo | Pay & Request
      </div>
      <form className='trans-form'>
        <div className='amount'>
          <div className='dollar-sign'> $ </div>
          <input
            type='number'
            step='0.01'
            name='amount'
            value={amount}
            onChange={e => setAmount(e.target.value)}
            required={true}
            placeholder='0.00'
            className='amount-input'
          ></input>
        </div>
        <div className='error-div '>
          {errors.map((error, ind) => (
            <div key={ind} className='errors sign-in-errors'>{error}</div>
          ))}
        </div>
        <div className='receiver'>
          <input
            type='text'
            name='receiverName'
            value={receiverName}
            onChange={e => setReceiverName(e.target.value)}
            placeholder='To: username'
            required={true}
            className='receiver-input'
          ></input>
        </div>
        <div className='title'>
          <textarea
            type='text'
            name='title'
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder='Note'
            required={true}
            className='title-input'
          ></textarea>
        </div>
        {/* <div className='privacy-container'>
          <select
            className='privacy-select'
            value={privacy}
            onChange={e => setPrivacy(e.target.value)}
          >
            <option value='public'>Public</option>
            <option value='friends'>Friends</option>
            <option value='private'>Private</option>
          </select>
          <div className='privacy-description'>
            {privacy === 'public' && (
              <p>This info can be viewed by everyone on the internet</p>
            )}
            {privacy === 'friends' && (
              <p>This info can be viewed by sender, recipient and their friends on Venmo</p>
            )}
            {privacy === 'private' && (
              <p>This info can be viewed by the sender and recipient only</p>
            )}
          </div>
        </div> */}
        <div className='btn-container'>
          <button
            type='submit'
            className='pay-btn getVenmo btn trans-btn'
            onClick={onCreatePayment}
          >
            Payment
          </button>
          <button
            type='submit'
            className='pay-btn getVenmo btn trans-btn'
            onClick={onCreateRequest}
          >
            Request
          </button>
        </div>
      </form>
    </div>
  )
};

export default TransactionForm;
