import React, { Component, Fragment } from 'react'
import { instanceOf, PropTypes } from 'prop-types'
import { withCookies, Cookies } from 'react-cookie'
import { withRouter, Link } from 'react-router-dom'

import { getCurrentUser } from '../../../utils'

import './global.css'

class AuthenticationBtn extends Component {
  constructor(props) {
    super(props)
    this.state = {
      profile: false
    }
  }

  static propTypes = {
    cookies: instanceOf(Cookies).isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired
    })
  }

  componentWillMount = () => this.fetchCurrentUser()

  fetchCurrentUser = () => {
    getCurrentUser(this.isLogged())
      .then(response => {
        if (response.status === 200) {
          response.json().then(profile => {
            this.setState({ profile: profile })
          })
        }
      })
  }

  isLogged = () => this.props.cookies.get('ccc-pharma-token')

  logout = () => {
    const { cookies } = this.props
    cookies.set('ccc-pharma-token', '')
    cookies.set('waza', 'false')
    window.location.reload()
  }

  render() {
    const { profile } = this.state
    return (
      <Fragment>
        {profile && (
          <div id="user">
            <i className="fas fa-user" />
            <span> {profile.name}</span>
            <span></span>
          </div>
        )}
        <div id="authBtn">
          {
            this.isLogged() ? (
              <Link to={{ pathname: "/" }}>
                <i
                  className="fas fa-sign-out-alt"
                  id="logoutBtn"
                  onClick={this.logout}
                >
                  <span>Sair</span>
                </i>
              </Link>
            ) : (
                <Link to={{ pathname: "/login" }}>
                  <i className="fas fa-user">
                    <span>Entrar</span>
                  </i>
                </Link>
              )
          }
        </div>
      </Fragment>
    )
  }
}

export default withRouter(withCookies(AuthenticationBtn))