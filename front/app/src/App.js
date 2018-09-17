import React, { Component } from 'react';
import LogPage from './containers/LogPage';
import classes from './App.scss';

class App extends Component {
  render() {
      console.log(classes.App)
    return (
      <div className={classes.App}>
        <LogPage />
      </div>
    );
  }
}

export default App;
