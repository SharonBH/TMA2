import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import classes from './TopNavigation.scss';
import { connect } from 'react-redux';
import { getUserAction, closeNav, signOutConfirmMessageAction, deleteUserConfirmMessageAction } from '../../actions';
class TopNavigation extends Component {

    state = {
        navState: false
    }

    logout = () => {
        this.props.deleteUserConfirmMessageAction(false)
        this.props.signOutConfirmMessageAction(true)
    }

    helloUser = () => {
        if(this.props.currentUser === null) {
            return (
                <span className={classes.HelloTop}>Hello You</span>
            )
        } else {
            return ( 
                <span className={classes.HelloTop}>Hello {this.props.currentUser.name}</span>
            )
        }
    }

    navState = () => {
        this.setState({navState: !this.state.navState})
        this.props.closeNav({navState: !this.state.navState})
    }

    render() {
        return (
            <div className={this.state.navState ? classes.TopNavClosed : classes.TopNav} >
                <span className={classes.closeBtn}>
                    <i className="fas fa-bars"  onClick={this.navState}></i>
                    {this.helloUser()}
                </span>
                
                <div className={classes.topNavLinks}>
                    <Link to='/home' className={classes.navLink}>
                        <i className="fas fa-home"></i><span>Home</span>
                    </Link> 
                    <Link to='/profile' className={classes.navLink}>
                        <i className="fas fa-users-cog"></i><span>Profile</span>
                    </Link>
                    {this.props.currentUser.role === 'Admin' 
                    ? <Link to='/all_users' className={classes.navLink}>
                        <i className="fas fa-users"></i><span>Users Managment</span>
                    </Link>
                    : null
                    }
                    <a href='#' onClick={this.logout} className={classes.navLink}>
                        <i className="fas fa-power-off"></i><span>Sign Out</span>
                    </a>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        currentUser: state.UserLogInReducer.currentUser,
        // navAction: state.closeNavReducer.navAction
    }
}
const mapDispatchToProps = dispatch => {
    return {
        closeNav: payload => dispatch(closeNav(payload)),
        getUserAction: payload => dispatch(getUserAction(payload)),
        signOutConfirmMessageAction: payload => dispatch(signOutConfirmMessageAction(payload)),
        deleteUserConfirmMessageAction: payload => dispatch(deleteUserConfirmMessageAction(payload)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TopNavigation);