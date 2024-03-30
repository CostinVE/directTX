// store.js

import { configureStore } from '@reduxjs/toolkit';

// Initial state
const initialState = {
  user: undefined,
  isSigned: false
};

// Reducer
const handleState = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.payload
      };
    case 'SET_SIGNED_IN':
      return {
        ...state,
        isSigned: true
      };
    default:
      return state;
  }
};

// Configure store
const store = configureStore({
  reducer: handleState
});

// Action types
export const SET_SIGNED_IN = 'SET_SIGNED_IN';

// Action creators
export const setSignedIn = () => ({
  type: SET_SIGNED_IN
});

export default store;
