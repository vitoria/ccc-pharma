import React, { Component, Fragment } from 'react'
import { Route, withRouter } from 'react-router-dom'
import { instanceOf, PropTypes } from 'prop-types'
import { withCookies, Cookies } from 'react-cookie'

import Authetication from './components/Authetication/index'
import Container from './components/Container/index'
import Employees from './components/Employees/index'
import Products from './components/Products/index'
import Clients from './components/Clients/index'
import Header from './components/Header/index'
import Sales from './components/Sales/index'
import Home from './components/Home/index'

import './App.css'

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
        <Route path="/login" component={Authetication} />
        <Fragment>
          <Header />
          <Container>
            <Route exact path="/" component={Home} />
            <Route path="/products" component={Products} />
            <Route path="/sales" component={Sales} />
            <Route path="/clients" component={Clients} />
            <Route path="/employees" component={Employees} />
          </Container>
        </Fragment>
      </div>
    );
  }
}

export default withRouter(withCookies(App))