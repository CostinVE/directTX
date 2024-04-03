// actions.js

// Action types
export const SET_SIGNED_IN = 'SET_SIGNED_IN';
export const SET_USER_DATA = 'SET_USER_DATA';

// Action creators
export const setSignedIn = () => ({
  type: SET_SIGNED_IN
});

export const updateUserData = (userData) => ({
  type: SET_USER_DATA,
  payload: userData
});
