import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { HomePage } from '../HomePage/HomePage';
import { AllUsersAdmin } from '../../components/Users/AllUsersAdmin/AllUsersAdmin';
import LogIn from '../../components/LogIn';
import Register from '../../components/Register';
import classes from './MainPage.scss';

export class MainPage extends Component {
  render() {
    return (
        <div className={classes.MainPage}>
            <Switch>
                <Route
                    exact
                    path='/'
                    component={HomePage}
                />
                <Route
                    exact
                    path='/login'
                    component={LogIn}
                />
                <Route
                    exact
                    path='/register'
                    component={Register}
                />
                <Route
                    path='/all_users'
                    component={AllUsersAdmin}
                />
            </Switch>
        </div>
    );
  }
}

export default MainPage;
