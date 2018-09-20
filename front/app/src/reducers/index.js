import { combineReducers } from 'redux';
import UserLogInReducer from './UserLogInReducer';
import userReducer from './userReducer';
import loginErrorMessageReducer from './loginErrorMessageReducer';
import registerErrorMessageReducer from './registerErrorMessageReducer';

const rootReducer = combineReducers({
  UserLogInReducer: UserLogInReducer,
  userReducer: userReducer,
  loginErrorMessageReducer: loginErrorMessageReducer,
  registerErrorMessageReducer: registerErrorMessageReducer
});

export default rootReducer;