import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './reducers/user.reducer';

const rootReducer = combineReducers({
  user: userReducer
});

export default rootReducer;
