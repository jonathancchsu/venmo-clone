import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import NavBar from '../SplashPage/NavBar/NavBar';

import './LoginForm.css';

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div>
      <div>
        <NavBar />
      </div>
      <div className='form-page'>
        <div className='form-container'>
          <h2 className='sign-in-text'>
            Sign in to Venmo
          </h2>
          <div className='form'>
            <div className='allItems'>
              <div className='login-items'>
                <div className="error-div">
                  {errors.map((error, ind) => (
                    <div key={ind} className='errors'>{error}</div>
                  ))}
                </div>
              </div>
            <form onSubmit={onLogin}>
              <div className='login-items email-div'>
                <label htmlFor='email' className='label email'>Email: </label>
                <input
                className='input-fields'
                  name='email'
                  type='text'
                  placeholder='Email'
                  value={email}
                  onChange={updateEmail}
                />
              </div>
              <div className='login-items password-div'>
                <label htmlFor='password' className='label'>{`Password:`}</label>
                <input
                  className='input-fields'
                  name='password'
                  type='password'
                  placeholder='Password'
                  value={password}
                  onChange={updatePassword}
                />
              </div>
              <button type='submit' className='login-items login-btn'>
                Login
              </button>
            </form>
            <p className='demotext'>Don't have an account? <a className='login-sgnup' href='/sign-up' style={{textDecoration:'none'}}>Sign up</a></p>
            <p className='demotext'>Want to check out the site? Log in as a<button className='demo-btn' style={{textDecoration:'none'}} onClick={() => dispatch(login('demo@aa.io', 'password'))}>Demo user</button></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
