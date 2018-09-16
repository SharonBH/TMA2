import React, { Component} from 'react'
import { Link } from 'react-router-dom' 

export class Nav extends Component {
    render(){
        return (
            <div className='nav'>
                <Link to='/'></Link>
                <Link to='all_users'></Link>
            </div>
        )
    }
}

export default Nav;