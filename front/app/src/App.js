import React, { Component } from 'react';
import LogPage from './containers/LogPage';
import './App.css';
// import LogInPage from './containers/LogInPage'
import './App.css';

import { MainPage } from './components/MainPage/MainPage'

class App extends Component {
  render() {
    return (
      <div className="App">
        <LogPage />
        <MainPage />
      </div>
    );
  }
}

export default App;




