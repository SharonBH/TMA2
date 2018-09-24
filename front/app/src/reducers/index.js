import { combineReducers } from 'redux';
import UserLogInReducer from './UserLogInReducer';
import userReducer from './userReducer';
import loginErrorMessageReducer from './loginErrorMessageReducer';
import registerErrorMessageReducer from './registerErrorMessageReducer';
import errorReducer from './errorReducer';
import toggleLoaderReducer from './toggleLoaderReducer';
import addNewUserReducer from './addNewUserReducer';
import usersListReducer from './usersListReducer';
import editErrorMessageReducer from './editErrorMessageReducer';
import editUserReducer from './editUserReducer';

const rootReducer = combineReducers({
  UserLogInReducer: UserLogInReducer,
  userReducer: userReducer,
  loginErrorMessageReducer: loginErrorMessageReducer,
  registerErrorMessageReducer: registerErrorMessageReducer,
  errorReducer: errorReducer,
  toggleLoaderReducer: toggleLoaderReducer,
  addNewUserReducer: addNewUserReducer,
  usersListReducer: usersListReducer,
  editErrorMessageReducer: editErrorMessageReducer,
  editUserReducer: editUserReducer,
});

export default rootReducer;