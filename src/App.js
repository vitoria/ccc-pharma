import React, { Component } from 'react';
import Header from './components/Header/index'
import SideBar from './components/SibeBar/index'
import Products from './components/Products/index'
import Container from './components/Container/index'

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header/>
        <SideBar/>
        <Container>
          <Products/>
        </Container>
      </div>
    );
  }
}

export default App;
