import { combineReducers } from 'redux';
import addNewItemReducer from './addNewItemReducer';
import allListReducer from './allListReducer';
import editItemReducer from './editItemReducer';

import confirmMessageReducer from './confirmMessageReducer';
import sharedReducer from './sharedReducer';
import userReducer from './userReducer';


const rootReducer = combineReducers({
  addNewItemReducer: addNewItemReducer,
  allListReducer: allListReducer,

  editItemReducer: editItemReducer,

  confirmMessageReducer: confirmMessageReducer,
  sharedReducer: sharedReducer,
  userReducer: userReducer,

});

export default rootReducer;