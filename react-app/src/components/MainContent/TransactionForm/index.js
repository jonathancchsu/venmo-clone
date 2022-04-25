import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { postPayment } from '../../../store/payment';
import { postRequest } from '../../../store/request';
import { getOneUser } from '../../../store/session';

import "./TransactionForm.css";

const TransactionForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const sender_id = useSelector((state) => state.session.user.id);
  const [errors, setErrors] = useState([]);
  const [amount, setAmount] = useState(0);
  const [receiverName, setReceiverName] = useState('');
  const [title, setTitle] = useState('');
  // const [privacy, setPrivacy] = useState('public');
  const privacy = 'public';

  const onCreatePayment = async(e) => {
    e.preventDefault();
    console.log({ amount, receiverName, sender_id, title, privacy })

    if (title.length >= 1 && amount > 0) {
      const data = await dispatch(postPayment({ amount, receiverName, sender_id, title, privacy }))
        .then(dispatch(getOneUser(sender_id)))
        .then(() => {
          history.push('/')
        });
        if (data) {
          setErrors(data);
        };
    }
  };

  const onCreateRequest = async(e) => {
    e.preventDefault();

    if (title.length >= 1 && amount > 0) {
      const data = await dispatch(postRequest({ amount, receiverName, sender_id, title, privacy }))
        .then(dispatch(getOneUser(sender_id)))
        .then(
          history.push(`/`)
        );
      if (data) {
        setErrors(data);
      }
    }
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

  return (
    <div className='form-container'>
      <div className='page-title'>
        <p>
          Venmo | Pay & Request
        </p>
      </div>
      <form className='form'>
        {errors.length > 0 && (
          <div className="errors-container">
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
        )}
        <div className='amount'>
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
        <div className='receiver'>
          <input
            type='text'
            name='receiverName'
            value={receiverName}
            onChange={e => setReceiverName(e.target.value)}
            placeholder='Name'
            required={true}
          ></input>
        </div>
        <div className='title'>
          <input
            type='text'
            name='title'
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder='Note'
            required={true}
          ></input>
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
            className='submit-btn'
            onClick={onCreatePayment}
          >
            Payment
          </button>
          <button
            type='submit'
            className='submit-btn'
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
