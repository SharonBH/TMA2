import React, { Component} from 'react'
import { Link } from 'react-router-dom';
import classes from './Nav.scss';
import logo from '../../logo_sign.svg';
import { connect } from 'react-redux';
import { getUserAction } from '../../actions';
// import { accountLogout } from '../../actions/Api';

export class Nav extends Component {

    logout = () => {
        this.props.getUserAction(null)
        // this.props.accountLogout()
    }

    navLinks = () => {
        if(this.props.currentUser === null) {
            return (
                <div className={classes.innerNav}>
                    <Link to='/'><i className="fas fa-sign-in-alt"></i><span>Sign In</span></Link>
                    <Link to='/register'><i className="fas fa-edit"></i><span>Register</span></Link>
                </div>
            )
        } else {
            return (
                <div className={classes.innerNav}>
                    <Link to='/profile'><i className="fas fa-user"></i><span>Profile</span></Link>
                    <Link to='/all_users'><i className="fas fa-users-cog"></i><span>Users Managment</span></Link>
                    <Link to='/' onClick={this.logout}><i className="fas fa-sign-out-alt"></i><span>Sign Out</span></Link>
                </div>
            )
        }
    }

    helloUser = () => {
        if(this.props.currentUser === null) {
            return (
                <span className={classes.Hello}>Hello You</span>
            )
        } else {
            return (
                <span className={classes.Hello}>Hello {this.props.currentUser.name}</span>
            )
        }
    }

    render(){
        return (
            <div className={classes.nav}>
                <span className={classes.logo_image}><img src={logo} alt='logo'/></span>
                {this.helloUser()}
                <Link to='/home'><i className="fas fa-home"></i><span>Home</span></Link> 
                {this.navLinks()}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.UserLogInReducer.currentUser,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getUserAction: payload => dispatch(getUserAction(payload)),
        // accountLogout: payload => dispatch(accountLogout(payload)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav);