import React, { Component } from 'react';

import { Nav } from '../Nav/Nav';
import { RoutesPage } from '../../containers/RoutesPage/RoutesPage'

export class MainPage extends Component {
  render() {
    return (
      <div className="MainPage">
        <Nav/>
        <RoutesPage/>
      </div>
    );
  }
}

export default MainPage;
