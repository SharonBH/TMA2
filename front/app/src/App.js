import React, { Component } from 'react';
import LogPage from './containers/LogPage';
import classes from './App.scss';
import { MainPage } from './components/MainPage/MainPage'

class App extends Component {
  render() {

    return (
      <div className={classes.App}>
        <MainPage />
        <LogPage />
      </div>
    );
  }
}

export default App;




