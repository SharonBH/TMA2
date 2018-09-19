import React, { Component} from 'react';
import pic from '../../homepage.jpg';
import classes from './HomePage.scss';

export class HomePage extends Component {
    
    render(){
        return (
            <div className={classes.HomePage}>
                <span>Hello on home page</span>
                <img src={pic} alt='pic' />
            </div>
        )
    }
}

export default HomePage;