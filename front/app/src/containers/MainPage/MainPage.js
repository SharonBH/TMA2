
import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import classes from './MainPage.scss';
import { HomePage } from '../HomePage/HomePage';
import  AllUsersAdmin  from '../../components/Users/AllUsersAdmin/AllUsersAdmin';
import Login from '../../components/Login';
import Register from '../../components/Register';
import NotFound from '../../components/NotFound';
import ChangePassword from '../../components/ChangePassword';
import UserSummary from '../../components/Users/UserSummary';
import TournamentsList from '../../components/Games/TournamentsList'
import EventsList from '../../components/Games/EventsList'

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
                    component={() => <UserSummary headline={`Your Profile`} user={this.props.currentUser} tournament={null}/>}
                />
                {this.props.currentUser !== null ? this.props.currentUser.role === 'Adimn' ? <Route path='/all_users' component={AllUsersAdmin}/> : null : null}
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

                <Route
                    path='/all_tournaments'
                    component={TournamentsList}
                />
                <Route
                    path='/all_events'
                    component={EventsList}
                />
                <Route
                    path='/scores'
                    // component={TournamentsList}
                />
                <Route
                    path='/edit_tournament/:tournamentName'
                    component={TournamentsList}
                />
                <Route component={NotFound} />
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