import React, { Component} from 'react'
import { Link } from 'react-router-dom';
import classes from './Nav.scss';
import logo from '../../logo_sign.svg';
import { connect } from 'react-redux';
import {closeRespNav} from "../../actions";

export class Nav extends Component {
	// state = {
	// 	navRespState: true
	// }
	closeRespNav = () => {
		// this.setState({navRespState: !this.state.navRespState})
		this.props.closeRespNav(!this.props.navRespAction)
	}
    navLinks = () => {
	    // console.log(this.state.navRespState)
        return (
            <div className={classes.innerNav}>
	            <Link to='/homeEvents' className={classes.navLink} onClick={()=>this.closeRespNav()}>
		            <i className="fas fa-home"></i><span>Home</span>
	            </Link>
                {this.props.currentUser.role === 'Admin' 
                    ?  <Link to='/all_tournaments' className={classes.navLink}  onClick={()=>this.closeRespNav()}>
                            <i className="fas fa-trophy"></i><span>All Tournaments</span>
                        </Link>
                    : null }
                
                <Link to='/my_tournaments' className={classes.navLink} onClick={()=>this.closeRespNav()}>
                    <i className="fas fa-dice"></i><span>My Tournaments</span>
                </Link>
                {this.props.currentUser.role === 'Admin' 
                    ?   <Link to='/all_groups' className={classes.navLink} onClick={()=>this.closeRespNav()}>
                            <i className="fas fa-users"></i><span>All Groups</span>
                        </Link>
                    : null }
                
                <Link to='/my_groups' className={classes.navLink} onClick={()=>this.closeRespNav()}>
                    <i className="fab fa-freebsd"></i><span>My Groups</span>
                </Link>
                {/*<Link to='/scores' className={classes.navLink}>*/}
                    {/*<i className="fas fa-star-half-alt"></i><span>Scores - soon...</span>*/}
                {/*</Link>*/}
            </div>
        )
    }

    render(){
        console.log('nav', this.props.navRespAction)
	    // console.log('nav state', this.state)
	    const w = window.innerWidth;
        return(
	            w < 1000
                ? <div className={this.props.navRespAction  ? classes.NavRespOpen : classes.NavRespClosed}>
                    <span className={classes.logo_image}><img src={logo} alt='logo'/></span>
                    {this.navLinks()}
                </div>
                : <div className={this.props.navAction.navState ? classes.navclosed : classes.nav}>
                    <span className={classes.logo_image}><img src={logo} alt='logo'/></span>
                        {this.navLinks()} 
                </div>)

    }
}

const mapStateToProps = (state) => {
    return {
        navAction: state.sharedReducer.navAction,
	    navRespAction: state.sharedReducer.navRespAction,
        currentUser: state.userReducer.currentUser
    }
}

const mapDispatchToProps = dispatch => {
    return {
	    closeRespNav: payload => dispatch(closeRespNav(payload)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav);