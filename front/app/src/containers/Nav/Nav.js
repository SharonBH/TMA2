import React, { Component} from 'react'
import { Link } from 'react-router-dom';
import classes from './Nav.scss';
import logo from '../../logo_sign.svg';
import { connect } from 'react-redux';
import { getUserAction } from '../../actions';

export class Nav extends Component {

    state = {
        navState: true
    }

    logout = () => {
        this.props.getUserAction(null)
        localStorage.clear();
        sessionStorage.clear();
    }

    navLinks = () => {
        // if(this.props.currentUser === null) {
        //     return (
        //         <div className={classes.innerNav}>
        //             <Link to='/' className={classes.navLink}>
        //                 <i className="fas fa-sign-in-alt"></i><span>Sign In</span>
        //             </Link>
        //             <Link to='/register' className={classes.navLink}>
        //                 <i className="fas fa-edit"></i><span>Register</span>
        //             </Link>
        //         </div>
        //     )
        // } else {
            return (
                <div className={classes.innerNav}>
                    <Link to='/profile' className={classes.navLink}>
                        <i className="fas fa-user"></i><span>Profile</span>
                    </Link>
                    <Link to='/all_users' className={classes.navLink}>
                        <i className="fas fa-users-cog"></i><span>Users Managment</span>
                    </Link>
                    <Link to='/' onClick={this.logout} className={classes.navLink}>
                        <i className="fas fa-sign-out-alt"></i><span>Sign Out</span>
                    </Link>
                </div>
            )
        // }
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
                <Link to='/home' className={classes.navLink}>
                    <i className="fas fa-home"></i><span>Home</span>
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