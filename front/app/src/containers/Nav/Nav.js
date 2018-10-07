import React, { Component} from 'react'
import { Link } from 'react-router-dom';
import classes from './Nav.scss';
import logo from '../../logo_sign.svg';
import { connect } from 'react-redux';
import { getUserAction } from '../../actions';

export class Nav extends Component {

    // logout = () => {
    //     this.props.getUserAction(null)
    //     localStorage.clear();
    //     sessionStorage.clear();
    // }
    // navLinks = () => {
    //     return (
    //         <div className={classes.innerNav}>
    //             <Link to='/profile' className={classes.navLink}>
    //                 <i className="fas fa-user"></i><span>Profile</span>
    //             </Link>
    //             <Link to='/all_users' className={classes.navLink}>
    //                 <i className="fas fa-users-cog"></i><span>Users Managment</span>
    //             </Link>
    //             <Link to='/' onClick={this.logout} className={classes.navLink}>
    //                 <i className="fas fa-sign-out-alt"></i><span>Sign Out</span>
    //             </Link>
    //         </div>
    //     )
    // }

    render(){
        return   <div className={this.props.navAction.navState ? classes.navclosed : classes.nav}>
                    <span className={classes.logo_image}><img src={logo} alt='logo'/></span>
                </div>
    //             <Link to='/home' className={classes.navLink}>
    //                 <i className="fas fa-home"></i><span>Home</span>
    //             </Link> 
    //             {this.navLinks()}
    }
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.userReducer.currentUser,
        navAction: state.sharedReducer.navAction
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getUserAction: payload => dispatch(getUserAction(payload)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav);