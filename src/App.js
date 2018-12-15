import React, { Component } from 'react'
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'

import Header from './components/Header/index'
import SideBar from './components/SibeBar/index'
import Products from './components/Products/index'
import Container from './components/Container/index'

import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
      <div className="App">
        <Header/>
        <Container>
          <SideBar/>
          <Products/>
        </Container>
      </div>
      </Router>
    );
  }
}

export default App;
