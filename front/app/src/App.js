import React, { Component } from 'react';
import './App.css';
import LogPage from './containers/LogPage';
// import LogInPage from './containers/LogInPage'

import { MainPage } from './components/MainPage/MainPage'
class App extends Component {
  render() {
    return (
      <div className="App">
        <MainPage />
        <LogPage />
      </div>
    );
  }
}

export default App;




