import React, { Component } from 'react';
import classes from './App.scss';
import Nav from './containers/Nav/Nav';
import MainPage from './containers/MainPage';
import history from './configuration/history'

class App extends Component {
  render() {
    return (
      <div className={classes.App}>
        {history.location.pathname === '/' || history.location.pathname === '/register' ?  '' : <Nav />}
        <MainPage />
      </div>
    );
  }
}

export default App;




