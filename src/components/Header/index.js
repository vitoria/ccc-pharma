import React, { Component } from 'react'
import AuthenticationBtn from '../Authetication/AuthenticationBtn/index'
import SideBar from '../SibeBar/index'
import { Link } from 'react-router-dom'
import { withCookies } from 'react-cookie'
import { getCurrentUser, getToken } from '../../utils'

import './global.css'

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 0,
      height: 0,
      openSideBar: false,
      user: false,
    }
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
    this.setState({ isAdmin: this.props.cookies.get('waza') === 'true'})
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
    const { width, openSideBar, isAdmin } = this.state
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
        <SideBar isOpen={width > 1000 || openSideBar} isAdmin={isAdmin} />
      </div>
    )
  }
}

export default withCookies(Header)