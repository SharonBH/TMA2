import React, { Component} from 'react'
import { Link } from 'react-router-dom';
import classes from './Nav.scss';
import logo from '../../logo_sign.svg';
import { connect } from 'react-redux';
import { getUserAction } from '../../actions';
// import { accountLogout } from '../../actions/Api';

export class Nav extends Component {

    state = {
        navState: true
    }

    logout = () => {
        this.props.getUserAction(null)
        // this.props.accountLogout()
    }

    navLinks = () => {
        if(this.props.currentUser === null) {
            return (
                <div className={classes.innerNav}>
                    <Link to='/'>
                        <i className="fas fa-sign-in-alt"></i>
                        {this.state.navState ? <span>Sign In</span> : null}
                    </Link>
                    <Link to='/register'>
                        <i className="fas fa-edit"></i>
                        {this.state.navState ? <span>Register</span> : null}
                    </Link>
                </div>
            )
        } else {
            return (
                <div className={classes.innerNav}>
                    <Link to='/profile'>
                        <i className="fas fa-user"></i>
                        {this.state.navState ? <span>Profile</span> : null}
                    </Link>
                    <Link to='/all_users'>
                        <i className="fas fa-users-cog"></i>
                        {this.state.navState ? <span>Users Managment</span> : null}
                    </Link>
                    <Link to='/' onClick={this.logout}>
                        <i className="fas fa-sign-out-alt"></i>
                        {this.state.navState ? <span>Sign Out</span> : null}
                    </Link>
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

    navState = () => {
        this.setState({navState: !this.state.navState})
    }

    render(){
        return (
            <div className={this.state.navState ? classes.nav : classes.navclosed}>
                <span className={classes.logo_image}><img src={logo} alt='logo'/></span>
                {this.helloUser()}
                <Link to='/home'>
                    <i className="fas fa-home"></i>
                    {this.state.navState ? <span>Home</span> : null}
                </Link> 
                {this.navLinks()}
                <span className={classes.Menu} onClick={this.navState}>
                    {this.state.navState ? <i className="fas fa-angle-left"></i> : <i className="fas fa-angle-right"></i>}
                </span>
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