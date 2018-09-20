import React, { Component} from 'react'
import { Link } from 'react-router-dom';
import classes from './Nav.scss';
import logo from '../../logo_sign.svg';
import { connect } from 'react-redux';
import { getUserAction } from '../../actions';

export class Nav extends Component {

    logout = () => {
        this.props.getUserAction(null)
    }

    navLinks = () => {
        if(this.props.currentUser === null) {
            return (
                <div className={classes.innerNav}>
                    <Link to='/login'>Login</Link>
                    <Link to='/register'>Register</Link>
                </div>
            )
        } else {
            return (
                <div className={classes.innerNav}>
                    <Link to='/all_users'>Users managment</Link>
                    <Link to='/' onClick={this.logout}>Logout</Link>
                </div>
            )
        }
    }

    helloUser = () => {
        if(this.props.currentUser === null) {
            return (
                <span className={classes.Hello}>Hello Guest</span>
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
                <Link to='/'>Home</Link>
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
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav);