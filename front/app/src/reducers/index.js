import { combineReducers } from 'redux';
import UserLogInReducer from './UserLogInReducer';
import errorReducer from './errorReducer';
import addNewUserReducer from './addNewUserReducer';
import usersListReducer from './usersListReducer';
import toggleLoaderReducer from './toggleLoaderReducer';
import forgotPassReducer from './forgotPassReducer';
import editUserReducer from './editUserReducer';
import changePassReducer from './changePassReducer';
import successMessageReducer from './successMessageReducer';
import errorMessageReducer from './errorMessageReducer';
import closeNavReducer from './navReducer';
import confirmMessageReducer from './confirmMessageReducer';

const rootReducer = combineReducers({
  UserLogInReducer: UserLogInReducer,
  errorReducer: errorReducer,
  addNewUserReducer: addNewUserReducer,
  usersListReducer: usersListReducer,
  toggleLoaderReducer: toggleLoaderReducer,
  forgotPassReducer: forgotPassReducer,
  editUserReducer: editUserReducer,
  changePassReducer: changePassReducer,
  successMessageReducer: successMessageReducer,
  errorMessageReducer: errorMessageReducer,
  closeNavReducer: closeNavReducer,
  confirmMessageReducer: confirmMessageReducer,
});

export default rootReducer;