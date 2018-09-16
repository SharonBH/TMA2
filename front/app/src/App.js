import React, { Component } from 'react';
import LogPage from './containers/LogPage';
import './App.css';

import { AllUsersAdmin } from './components/Users/AllUsersAdmin/AllUsersAdmin'

class App extends Component {
  render() {
    return (
      <div className="App">
        <LogPage />
      </div>
    );
  }
}

export default App;
