import React, { Component} from 'react';
import { Switch, Route } from 'react-router-dom';
import LogIn from '../../components/LogIn';
import Register from '../../components/Register';
import './LogPage.scss';

export class LogPage extends Component {

    render(){

        return (
            <div className='app'>
                <Switch>
                    <Route
                        exact
                        path='/login'
                        component={LogIn}
                    />
                    <Route
                        path='/register'
                        component={Register}
                    />
                </Switch>
            </div>
        )
    }
}

export default LogPage;