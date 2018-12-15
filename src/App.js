import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'

import Header from './components/Header/index'
import SideBar from './components/SibeBar/index'
import Products from './components/Products/index'
import Container from './components/Container/index'
import Authetication from './components/Authetication/index'

import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
      <div className="App">
        <Route exact path="/" render={() => (
          <Fragment>
            <Header/>
            <Container>
              <SideBar/>
              <Products/>
            </Container>
          </Fragment>
        )}/>
        <Route path="/login" component={Authetication}/>
      </div>
      </Router>
    );
  }
}

export default App;
