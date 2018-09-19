import React, { Component} from 'react';
import { Switch, Route } from 'react-router-dom';
import { HomePage } from '../HomePage/HomePage';
import { AllUsersAdmin } from '../../components/Users/AllUsersAdmin/AllUsersAdmin';
import { CreateNewUser } from '../../components/Users/CreateNewUser/CreateNewUser';
import classes from '../../components/MainPage/MainPage.scss';

export class RoutesPage extends Component {
    render(){
        return (
            <div className={classes.wrapper}>
                <Switch>
                    <Route
                        exact
                        path='/'
                        component={HomePage}
                    />
                    <Route
                        path='/all_users'
                        component={AllUsersAdmin}
                    />
                    <Route
                        path='/createNewUser'
                        component={CreateNewUser}
                    />
                </Switch>
            </div>
        )
    }
}

export default RoutesPage;