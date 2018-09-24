import { combineReducers } from 'redux';
import UserLogInReducer from './UserLogInReducer';
import userReducer from './userReducer';
import loginErrorMessageReducer from './loginErrorMessageReducer';
import registerErrorMessageReducer from './registerErrorMessageReducer';
import errorReducer from './errorReducer';
import editErrorMessageReducer from './editErrorMessageReducer';
import toggleLoaderReducer from '../reducers/toggleLoaderReducer.js'

const rootReducer = combineReducers({
  UserLogInReducer: UserLogInReducer,
  userReducer: userReducer,
  loginErrorMessageReducer: loginErrorMessageReducer,
  registerErrorMessageReducer: registerErrorMessageReducer,
  errorReducer: errorReducer,
  editErrorMessageReducer: editErrorMessageReducer,
  toggleLoaderReducer: toggleLoaderReducer
});

export default rootReducer;