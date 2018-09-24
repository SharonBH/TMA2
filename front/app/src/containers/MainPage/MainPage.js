import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { withRouter } from 'react-router';
import { HomePage } from '../HomePage/HomePage';
import AllUsersAdmin from '../../components/Users/AllUsersAdmin/AllUsersAdmin';
import LogIn from '../../components/LogIn';
import Register from '../../components/Register';
import classes from './MainPage.scss';
import NotFound from '../../components/NotFound';
import UserSummary from '../../components/UserSummary';
import { connect } from 'react-redux';

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
                    path='/register'
                    component={() => <Register headline='Register' />}
                />
                <Route
                    path='/home'
                    component={HomePage}
                />
                <Route
                    path='/profile'
                    component={() => <UserSummary headline='profile:' user={this.props.currentUser}/>}
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

const mapStateToProps = (state) => {
    return {
        currentUser: state.UserLogInReducer.currentUser
    }
}

export default withRouter(connect(mapStateToProps)(MainPage));