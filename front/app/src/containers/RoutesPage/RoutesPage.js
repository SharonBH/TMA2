import React, { Component} from 'react';
import { Switch, Route } from 'react-router-dom';

export class RoutesPage extends Component {
    render(){
        return (
            <div className='wrapper'>
                <Switch>
                    <Route
                        exact
                        path='/'
                        component={MainPage}
                    />
                    <Route
                        exact
                        path='/all_users'
                        component={AllUsersAdmin}
                    />
                </Switch>
            </div>
        )
    }
}

export default RoutesPage;