import React, { Component} from 'react';
import classes from './HomePage.scss';

export class HomePage extends Component {
    
    render(){
        return (
            <div className={classes.homePage}>
                <span>Hello on home page</span>
            </div>
        )
    }
}

export default HomePage;