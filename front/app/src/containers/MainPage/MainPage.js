
import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { withRouter } from 'react-router';
import { HomePage } from '../HomePage/HomePage';
import  AllUsersAdmin  from '../../components/Users/AllUsersAdmin/AllUsersAdmin';
import Login from '../../components/Login';
import Register from '../../components/Register';
import classes from './MainPage.scss';
import NotFound from '../../components/NotFound';
import ChangePassword from '../../components/ChangePassword';
import UserSummary from '../../components/Users/UserSummary';
import { connect } from 'react-redux';

export class MainPage extends Component {
  render() {
    return (
        <div className={classes.MainPage}>
        
            <Switch>
                <Route
                    exact
                    path='/'
                    component={() => <Login />}
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
                    component={() => <UserSummary headline={`Your Profile`} user={this.props.currentUser}/>}
                />
                <Route
                    path='/all_users'
                    component={AllUsersAdmin}
                />
                <Route
                    path='/edit_user/:userName'
                    component={AllUsersAdmin}
                />
                <Route
                    path='/not_found'
                    component={NotFound}
                />
                <Route
                    path='/change_password/:userName'
                    component={() => <ChangePassword header='reset password' />}
                />
            </Switch>
        </div>
    );
  }
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.userReducer.currentUser
    }
}

export default withRouter(connect(mapStateToProps)(MainPage));