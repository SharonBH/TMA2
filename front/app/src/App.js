import React, { Component } from 'react';
import classes from './App.scss';
import Nav from './containers/Nav/Nav';
import MainPage from './containers/MainPage';
import history from './configuration/history';
import Spinner from './components/UI/Spinner';
import { connect } from 'react-redux';
import { withCookies } from 'react-cookie';
import ConfirmMessage from './components/UI/ConfirmMessage';
import TopNavigation  from './containers/TopNavigation/TopNavigation';
import {REGISTER, SING_OUT} from './configuration/config'
import Login from './components/Login';
import Register from "./components/Register";
import ChangePassword from "./components/ChangePassword";


class App extends Component {
  spinner = () => {
        if (this.props.toggleSpinner) {
            return <Spinner />
        } else {
            return null
        }
  };

    render() {
        const isUserNotInSession = sessionStorage.getItem('session') === null;
        const divRegister = history.location.pathname === '/register'
            ? <div className={classes.App}>{this.spinner()}<Register headline={REGISTER}/></div>
            : history.location.pathname === '/change_password' ? <div className={classes.App}>{this.spinner()}<ChangePassword /></div>
            : <div className={classes.App}>{this.spinner()}<Login /></div>;
        const divToShow = isUserNotInSession ? divRegister :
            <div className={classes.App}>
                {this.spinner()}
                {history.location.pathname === '/' || history.location.pathname === '/register' ?  '' : <TopNavigation/>}
                {history.location.pathname === '/' || history.location.pathname === '/register' ?  '' : <Nav />}
                <MainPage />
                {this.props.signOutConfirmMessage ? <ConfirmMessage headline={SING_OUT} user=''/> : null}
            </div>;
        return divToShow;
    }
}

const mapStateToProps = (state) => {
    return {
        toggleSpinner: state.sharedReducer.toggleSpinner,
        signOutConfirmMessage: state.confirmMessageReducer.signOutConfirmMessage,
    }
}

export default withCookies(connect(mapStateToProps)(App));