import { combineReducers } from 'redux';
import UserLogInReducer from './UserLogInReducer';
import userReducer from './userReducer';
import loginErrorMessageReducer from './loginErrorMessageReducer';
import registerErrorMessageReducer from './registerErrorMessageReducer';
import errorReducer from './errorReducer';
import addNewUserReducer from './addNewUserReducer';
import usersListReducer from './usersListReducer';
import editErrorMessageReducer from './editErrorMessageReducer';
import toggleLoaderReducer from './toggleLoaderReducer';
import forgotPassReducer from './forgotPassReducer';
import editUserReducer from './editUserReducer';
import changePasswordErrorMessageReducer from './changePasswordErrorMessageReducer';


const rootReducer = combineReducers({
  UserLogInReducer: UserLogInReducer,
  userReducer: userReducer,
  loginErrorMessageReducer: loginErrorMessageReducer,
  registerErrorMessageReducer: registerErrorMessageReducer,
  errorReducer: errorReducer,
  addNewUserReducer: addNewUserReducer,
  usersListReducer: usersListReducer,
  editErrorMessageReducer: editErrorMessageReducer,
  toggleLoaderReducer: toggleLoaderReducer,
  forgotPassReducer: forgotPassReducer,
  editUserReducer: editUserReducer,
  changePasswordErrorMessageReducer: changePasswordErrorMessageReducer,

});

export default rootReducer;