import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { HomePage } from '../HomePage/HomePage';
import { AllUsersAdmin } from '../../components/Users/AllUsersAdmin/AllUsersAdmin';
import LogIn from '../../components/LogIn';
import Register from '../../components/Register';
import classes from './MainPage.scss';
import NotFound from '../../components/NotFound';

export class MainPage extends Component {
  render() {
    return (
        <div className={classes.MainPage}>
            <Switch>
                <Route
                    exact
                    path='/'
                    component={LogIn}
                />
                <Route
                    exact
                    path='/register'
                    component={Register}
                />
                <Route
                    exact
                    path='/home'
                    component={HomePage}
                />
                <Route
                    path='/all_users'
                    component={AllUsersAdmin}
                />
                <Route
                    path='/not_found'
                    component={NotFound}
                />
            </Switch>
        </div>
    );
  }
}

export default MainPage;