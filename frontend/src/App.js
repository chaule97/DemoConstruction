import React, { Component } from 'react';
import './App.css';
import HeaderContainer from './ui/containers/Header';
import SideBarContainer from './ui/containers/SideBar';
class App extends Component {
  render() {
    return (
      <div className="App">
        <HeaderContainer/>
        <SideBarContainer/>
      </div>
    );
  }
}

export default App;
