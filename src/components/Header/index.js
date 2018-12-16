import React, { Component } from 'react'
import AuthenticationBtn from '../Authetication/AuthenticationBtn/index'
import SideBar from '../SibeBar/index'
import { Link } from 'react-router-dom'

import './global.css'

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { width: 0, height: 0, openSideBar: false };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  changeSideBarState = () => {
    this.setState({ openSideBar: !this.state.openSideBar })
  }

  render() {
    const { width, openSideBar } = this.state
    return (
      <div>
        <header>
          <div className="titleHeader">
            <div id="menuBtn">
              <i className="fas fa-bars" onClick={this.changeSideBarState} />
            </div>
            <Link to={{ pathname: "/" }}><span>CCC Pharma</span></Link>
          </div>
          <AuthenticationBtn />
        </header>
        <SideBar isOpen={width > 1000 || openSideBar} />
      </div>
    )
  }
}