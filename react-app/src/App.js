import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import ProtectedRoute from './components/auth/ProtectedRoute';
import MainContent from './components/MainVIew/MainContent';
// import UsersList from './components/UsersList';
// import User from './components/User';
import { authenticate } from './store/session';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  if (!sessionUser) return (
    <Switch>
      <Route exact path='/'>
        <SplashPage />
      </Route>
      <Route path='/login'>
          <LoginForm />
      </Route>
      <Route path ='/signup'>
          <SignUpForm />
      </Route>
      <Route>
        <p className='nope'>Nope. There's nothing here.</p>
      </Route>
    </Switch>
  )

  return loaded && (
    <BrowserRouter>
      <Switch>
        <ProtectedRoute path='/' exact={true}>
          <MainContent way={'home'}/>
        </ProtectedRoute>
        <ProtectedRoute path='/pay' exact={true}>
          <MainContent way={'form'}/>
        </ProtectedRoute>
        <ProtectedRoute path='/story/:paymentId'>
          <MainContent way={'onePayment'}/>
        </ProtectedRoute>
        <Route path='/login'>
            <Redirect to='/' />
        </Route>
        <Route path='/signup'>
          <Redirect to='/' />
        </Route>
        <Route>
          <p className='nope'>Nope. There's nothing here.</p>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
