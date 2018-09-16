import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
// import history from './helpers/history';
// import store from './helpers/store';


ReactDOM.render(

            <App />,

     document.getElementById('root'));
registerServiceWorker();
