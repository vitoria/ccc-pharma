import React, { Component, Fragment } from 'react'
import { Route, withRouter } from 'react-router-dom'
import { instanceOf, PropTypes } from 'prop-types'
import { withCookies, Cookies } from 'react-cookie'

import Header from './components/Header/index'
import SideBar from './components/SideBar/index'
import Products from './components/Products/index'
import Container from './components/Container/index'
import Authetication from './components/Authetication/index'
import Footer from './components/Footer/index'

import './App.css';

class App extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired
    })
  }

  getToken = () => this.props.cookies.get('ccc-pharma-token')

  componentDidMount = () => {
    this.getToken() ? this.props.history.push('/') : this.props.history.push('/login')
  }

  render() {
    return (
      <div className="App">
        <Route exact path="/" render={() => (
          <Fragment>
            <Header/>
            <Container>
              <SideBar/>
              <Products/>
            </Container>
            <Footer/>
          </Fragment>
        )}/>
        <Route path="/login" component={Authetication}/>
      </div>
    );
  }
}

export default withRouter(withCookies(App))

