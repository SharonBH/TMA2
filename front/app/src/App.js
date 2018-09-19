import React, { Component } from 'react';
import LogPage from './containers/LogPage';
import classes from './App.scss';
import { MainPage } from './components/MainPage/MainPage';
import { Switch, Route } from 'react-router-dom';
import Register from './components/Register';

class App extends Component {
  render() {

    return (
      <div className={classes.App}>
        <Switch>
            <Route
                exact
                path='/login'
                component={LogPage}
            />
            <Route
                path='/register'
                component={Register}
            />
            <Route
                path='/'
                component={MainPage}
            />
        </Switch>
      </div>
    );
  }
}

export default App;




