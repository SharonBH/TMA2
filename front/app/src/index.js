import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import unregister from './registerServiceWorker';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import history from './configuration/history';
import store from './configuration/store';
import { CookiesProvider } from 'react-cookie';


ReactDOM.render(
    <CookiesProvider>
        <Provider store={store}>
            <Router history={history}>
                <App />
            </Router>
        </Provider>
    </CookiesProvider>
    ,document.getElementById('root'));
    unregister()

