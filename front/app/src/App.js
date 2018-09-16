import React, { Component } from 'react';

import './App.css';

import { AllUsersAdmin } from './components/Users/AllUsersAdmin/AllUsersAdmin'

class App extends Component {
  render() {
    return (
      <div className="App">
        <AllUsersAdmin/>
      </div>
    );
  }
}

export default App;
