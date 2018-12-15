import React, { Component } from 'react';
import Header from './components/Header/index'
import SideBar from './components/SibeBar/index'

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
      <Header/>
      <SideBar/>
        {/* Add the content here */}
      </div>
    );
  }
}

export default App;
