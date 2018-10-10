import React, { Component} from 'react'
import { Link } from 'react-router-dom';
import classes from './Nav.scss';
import logo from '../../logo_sign.svg';
import { connect } from 'react-redux';

export class Nav extends Component {

    navLinks = () => {
        return (
            <div className={classes.innerNav}>
                <Link to='/all_tournaments' className={classes.navLink}>
                    <i className="fas fa-trophy"></i><span>Tournaments</span>
                </Link>
                <Link to='/all_events' className={classes.navLink}>
                    <i className="fas fa-gamepad"></i><span>Events</span>
                </Link>
                <Link to='/scores' className={classes.navLink}>
                    <i className="fas fa-star-half-alt"></i><span>Scores - soon...</span>
                </Link>
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
        navAction: state.sharedReducer.navAction
    }
}

const mapDispatchToProps = dispatch => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav);