import React, { Component, Fragment } from 'react'
import { Route, withRouter } from 'react-router-dom'
import { instanceOf, PropTypes } from 'prop-types'
import { withCookies, Cookies } from 'react-cookie'

import Header from './components/Header/index'
import Products from './components/Products/index'
import Container from './components/Container/index'
import Authetication from './components/Authetication/index'

import './App.css';

class App extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired
    })
  }

  render() {
    return (
      <div className="App">
      <Route exact path="/" render={() => (
          <Fragment>
            <Header/>
            <Container>
              Home
            </Container>
          </Fragment>
        )}/>
        <Route exact path="/login" component={Authetication} />
        <Route exact path="/products" render={() => (
          <Fragment>
            <Header/>
            <Container>
              <Products/>
            </Container>
          </Fragment>
        )}/>
      </div>
    );
  }
}

export default withRouter(withCookies(App))
