// constants
const SET_USER = 'session/SET_USER';
const REMOVE_USER = 'session/REMOVE_USER';
const GET_USER = 'session/GET_USER';
const GET_USERS = 'session/GET_USERS';

const setUser = (user) => ({
  type: SET_USER,
  payload: user
});

const removeUser = () => ({
  type: REMOVE_USER,
})

const getUser = (user) => ({
  type: GET_USER,
  user
})

const loadUsers = (users) => ({
  type: GET_USERS,
  users
})

export const getOneUser = userId => async(dispatch) => {
  const res = await fetch(`/api/auth/${userId}`);
  if (res.ok) {
    const user = await res.json();
    dispatch(getUser(user));
  }
}

export const getUsers = () => async(dispatch) => {
  const res = await fetch('/api/auth/users', {
    method: 'GET',
  })

  if (res.ok) {
    const users = await res.json();
    dispatch(loadUsers(users))
  }
}

const initialState = { user: null };

export const authenticate = () => async (dispatch) => {
  const response = await fetch('/api/auth/', {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }

    dispatch(setUser(data));
  }
}

export const login = (email, password) => async (dispatch) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password
    })
  });


  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data))
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }

}

export const logout = () => async (dispatch) => {
  const response = await fetch('/api/auth/logout', {
    headers: {
      'Content-Type': 'application/json',
    }
  });

  if (response.ok) {
    dispatch(removeUser());
  }
};


export const signUp = (username, email, name, password) => async (dispatch) => {
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      email,
      name,
      password,
    }),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data))
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }
}

export default function reducer(state = initialState, action) {
  let newState ={ ...state };
  switch (action.type) {
    case SET_USER:
      return { user: action.payload }
    case REMOVE_USER:
      return { user: null }
    case GET_USER:
        newState[action.user.id] = action.user;
      return newState;
    case GET_USERS:
      if(action.users) {
        action.users.users.forEach(
          (user) => (newState[user.id] = user)
        )
      } else {
        newState = {}
      }
      return newState;
    default:
      return state;
  }
}
