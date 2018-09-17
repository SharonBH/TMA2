import React, { Component} from 'react'
import { Link } from 'react-router-dom';
import classes from './Nav.scss';
import logo from '../../logo_sign.svg';

export class Nav extends Component {
    render(){
        return (
            <div className={classes.nav}>
                <span className={classes.logo_image}><img src={logo} /></span>
                <Link to='/'>Home</Link>
                <Link to='all_users'>Users managment</Link>
            </div>
        )
    }
}

export default Nav;