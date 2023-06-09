
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
import TournamentsList from '../../components/Games/TournamentsList';
import HomeEvents from '../../components/HomeEvents/HomeEvents'
// import EventsList from '../../components/Games/EventsList';
// import { appCallTakeAllTournaments, appCallTakeAllEvents, mainPageGetAllGroupsRequest, appCallgetAllGroupsRequest,takeMyHomeLeaderboardRequest } from '../../actions/GamesApi';
import TournamentPage from '../../components/Games/TournamentPage';
import { getAllRolesRequest } from '../../actions/Api';
import Groups from '../../components/Games/Groups';
import { REGISTER, YOUR_PROFILE } from '../../configuration/config'


export class MainPage extends Component {

    componentWillMount() {
        // if(this.props.currentUser !== null){
        //     const userId = this.props.currentUser.userId
        //     setTimeout(() => {
        //         this.props.takeMyHomeLeaderboardRequest(userId)
        //     }, 200)
        // }
        
    }

    render() {
        //console.log('main props', this.props)
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
                        component={() => <Register headline={REGISTER} />}
                    />
                    <Route
                        path='/home'
                        component={HomePage}
                    />
                    <Route
                        path='/homeEvents'
                        component={HomeEvents}
                    />
                    <Route
                        path='/profile'
                        component={() => <UserSummary headline={YOUR_PROFILE} user={this.props.currentUser} tournament={null}/>}
                    />
                    {(this.props.currentUser !== null && this.props.currentUser !== undefined && this.props.currentUser.role === 'Admin') ? <Route path='/all_users' component={AllUsersAdmin}/> : null}
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
                    {(this.props.currentUser !== null && this.props.currentUser !== undefined && this.props.currentUser.role === 'Admin') 
                    ? <Route
                    exact
                        path='/all_groups'
                        component={Groups}
                    />
                    : null}
                    
                    <Route
                    exact
                        path='/my_groups'
                        component={Groups}
                    />
                    <Route
                        path='/all_groups/:groupName'
                        component={Groups}
                    />
                    {(this.props.currentUser !== null && this.props.currentUser !== undefined && this.props.currentUser.role === 'Admin') 
                    ? <Route
                    exact
                        path='/all_tournaments'
                        component={TournamentsList}
                    />
                    : null}
                    
                    <Route
                    exact
                        path='/my_tournaments'
                        component={TournamentsList}
                    />
                    <Route
                        path='/:tournamentName/add_event'
                        component={TournamentsList}
                    />
                    <Route
                        exact
                        path='/edit_tournament/:tournamentName'
                        component={TournamentsList}
                    />


                    <Route
                    exact
                        path='/all_tournaments/:tournamentName'
                        component={TournamentPage}
                    />
                    <Route
                    exact
                        path='/my_tournaments/:tournamentName'
                        component={TournamentPage}
                    />


                    <Route 
                        path='/edit_event/:eventName'
                        component={TournamentPage}
                    />
                    
                    <Route
                    exact
                        path='/:tournamentName/edit_tournament'
                        component={TournamentPage}
                    />                    
                    <Route
                        path='/scores'
                        // component={TournamentsList}
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

const mapDispatchToProps = dispatch => {
    return {
        // appCallTakeAllTournaments: payload => dispatch(appCallTakeAllTournaments(payload)),
        // appCallTakeAllEvents: payload => dispatch(appCallTakeAllEvents(payload)),
        // appCallTakeAllUsers: payload => dispatch(appCallTakeAllUsers(payload)),
        // mainPageGetAllGroupsRequest: payload => dispatch(mainPageGetAllGroupsRequest(payload)),
        // appCallgetAllGroupsRequest: payload => dispatch(appCallgetAllGroupsRequest(payload)),
        getAllRolesRequest: payload => dispatch(getAllRolesRequest(payload)),
        // takeMyHomeLeaderboardRequest: payload => dispatch(takeMyHomeLeaderboardRequest(payload)),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainPage));