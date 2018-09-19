import React, { Component} from 'react';
import { Switch, Route } from 'react-router-dom';
import LogIn from '../../components/LogIn';
import Register from '../../components/Register';
import classes from './LogPage.scss';

export class LogPage extends Component {

    render(){

        return (
            <div className={classes.LogPage}>
                <LogIn />
            </div>
        )
    }
}

export default LogPage;