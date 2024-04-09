// store.js

import { configureStore } from '@reduxjs/toolkit';
import { setSignedIn, updateUserData } from './actions'; // Importing action creators from the new actions file

// Initial state
export const initialState = {
  isSigned: false,
  isChating: false,
  ChatPartner: '',
  inCall: false,
  isCalled: false,
  RoomID: '',
  userID: '',
  userName: '',
  Bio: '',
  DateJoined: '',
  Friends: []
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
    case 'SET_USER_DATA':
      return {
        ...state,
        userID: action.payload.UserID,
        userName: action.payload.Username,
        Bio: action.payload.Bio,
        DateJoined: action.payload.DateCreated,
        Friends: action.payload.Friends,
        isChating: action.payload.isChating, 
        ChatPartner: action.payload.ChatPartner, 
        inCall: action.payload.inCall,
        isCalled: action.payload.isCalled,
        RoomID: action.payload.RoomID
      };
    default:
      return state;
  }
};

// Configure store
const store = configureStore({
  reducer: handleState
});

export default store;
