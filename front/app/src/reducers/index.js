import { combineReducers } from 'redux';
import UserLogInReducer from './UserLogInReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  UserLogInReducer: UserLogInReducer,
  userReducer: userReducer,
});

export default rootReducer;