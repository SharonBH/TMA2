import React, { Component } from 'react';
// import classes from '../Nav/Nav.scss';
import classes from './MainPage.scss'

import { Nav } from '../Nav/Nav';
import { RoutesPage } from '../../containers/RoutesPage/RoutesPage'

export class MainPage extends Component {
  render() {
    return (
      <div className={classes.MainPage}>
        <Nav/>
        <RoutesPage/>
      </div>
    );
  }
}

export default MainPage;
