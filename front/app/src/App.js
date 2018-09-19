import React, { Component } from 'react';
import classes from './App.scss';
import Nav from './containers/Nav/Nav';
import MainPage from './containers/MainPage';

class App extends Component {
  render() {

    return (
      <div className={classes.App}>
        <Nav />
        <MainPage />
      </div>
    );
  }
}

export default App;




