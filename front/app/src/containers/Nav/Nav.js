import React, { Component} from 'react'
import { Link } from 'react-router-dom';
import classes from './Nav.scss';
import logo from '../../logo_sign.svg';
import { connect } from 'react-redux';

export class Nav extends Component {

    navLinks = () => {
        return (
            <div className={classes.innerNav}>
	            <Link to='/homeEvents' className={classes.navLink}>
		            <i className="fas fa-home"></i><span>Home</span>
	            </Link>
                {this.props.currentUser.role === 'Admin' 
                    ?  <Link to='/all_tournaments' className={classes.navLink}>
                            <i className="fas fa-trophy"></i><span>All Tournaments</span>
                        </Link>
                    : null }
                
                <Link to='/my_tournaments' className={classes.navLink}>
                    <i className="fas fa-dice"></i><span>My Tournaments</span>
                </Link>
                {this.props.currentUser.role === 'Admin' 
                    ?   <Link to='/all_groups' className={classes.navLink}>
                            <i className="fas fa-users"></i><span>All Groups</span>
                        </Link>
                    : null }
                
                <Link to='/my_groups' className={classes.navLink}>
                    <i className="fab fa-freebsd"></i><span>My Groups</span>
                </Link>
                {/*<Link to='/scores' className={classes.navLink}>*/}
                    {/*<i className="fas fa-star-half-alt"></i><span>Scores - soon...</span>*/}
                {/*</Link>*/}
            </div>
        )
    }

    render(){
        return   <div className={this.props.navAction.navState ? classes.navclosed : classes.nav}>
                    <span className={classes.logo_image}><img src={logo} alt='logo'/></span>
                        {this.navLinks()} 
                </div>

    }
}

const mapStateToProps = (state) => {
    return {
        navAction: state.sharedReducer.navAction,
        currentUser: state.userReducer.currentUser
    }
}

const mapDispatchToProps = dispatch => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav);