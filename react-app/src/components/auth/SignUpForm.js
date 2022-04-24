import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, useHistory } from 'react-router-dom';
import { signUp } from '../../store/session';
import NavBar from '../SplashPage/NavBar/NavBar';

import './SignUpForm.css';

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, name, password));
      if (data) {
        setErrors(data)
      }
    }
    history.push('/');
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updateName = (e) => {
    setName(e.target.value);
  }

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <>
      <div>
        <NavBar />
      </div>
      <div className='form-page'>
        <div className='form-container'>
          <h2 className='sign-in-text'>
            Get Venmo
          </h2>
          <div className='form getvenmo'>
              <div className='error-div'>
                {errors.map((error, ind) => (
                  <div key={ind} className='errors'>{error}</div>
                ))}
              </div>
            <form onSubmit={onSignUp}>
              <div className='login-items'>
                <label className='label'>User Tag:</label>
                <input
                  type='text'
                  name='username'
                  onChange={updateUsername}
                  value={username}
                  required={true}
                  placeholder='Username'
                ></input>
              </div>
              <div className='login-items'>
                <label className='label'>Name:</label>
                <input
                  type='text'
                  name='name'
                  onChange={updateName}
                  value={name}
                  required={true}
                  placeholder='Name'
                ></input>
              </div>
              <div className='login-items'>
                <label className='label'>Email:</label>
                <input
                  type='text'
                  name='email'
                  onChange={updateEmail}
                  value={email}
                  required={true}
                  placeholder='Email'
                ></input>
              </div>
              <div className='login-items'>
                <label className='label'>Password:</label>
                <input
                  type='password'
                  name='password'
                  onChange={updatePassword}
                  value={password}
                  required={true}
                  placeholder='Password'
                ></input>
              </div>
              <div className='login-items'>
                <label className='label'>Repeat Password:</label>
                <input
                  type='password'
                  name='repeat_password'
                  onChange={updateRepeatPassword}
                  value={repeatPassword}
                  required={true}
                  placeholder='Repeat Password'
                ></input>
              </div>
              <button type='submit' className='login-btn signup'>Sign Up</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUpForm;
