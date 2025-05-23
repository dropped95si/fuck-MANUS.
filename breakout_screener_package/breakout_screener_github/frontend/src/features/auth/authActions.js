import axios from 'axios';
import { userLoaded, authError, loginSuccess, loginFail, registerSuccess, registerFail, logout } from './authSlice';

// Set auth token in headers
export const setAuthToken = token => {
  if (token) {
    axios.defaults.headers.common['x-auth-token'] = token;
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
  }
};

// Load user
export const loadUser = () => async dispatch => {
  const token = localStorage.getItem('token');
  
  if (token) {
    setAuthToken(token);
  }
  
  try {
    const res = await axios.get('/api/auth/user');
    
    dispatch(userLoaded(res.data));
  } catch (err) {
    dispatch(authError());
  }
};

// Login user
export const login = (email, password) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  
  const body = JSON.stringify({ email, password });
  
  try {
    const res = await axios.post('/api/auth/login', body, config);
    
    dispatch(loginSuccess(res.data));
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    
    if (errors) {
      // Handle errors
    }
    
    dispatch(loginFail(err.response.data.msg));
  }
};

// Register user
export const register = ({ name, email, password }) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  
  const body = JSON.stringify({ name, email, password });
  
  try {
    const res = await axios.post('/api/auth/register', body, config);
    
    dispatch(registerSuccess(res.data));
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    
    if (errors) {
      // Handle errors
    }
    
    dispatch(registerFail(err.response.data.msg));
  }
};

// Logout
export const logoutUser = () => dispatch => {
  dispatch(logout());
};
