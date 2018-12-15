import React, { Component } from 'react'
import { instanceOf, PropTypes } from 'prop-types'
import { withCookies, Cookies } from 'react-cookie'
import { withRouter, Link } from 'react-router-dom'

import './global.css'

class AuthenticationBtn extends Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired,
        history: PropTypes.shape({
            push: PropTypes.func.isRequired
        })
    }

    isLogged = () => this.props.cookies.get('ccc-pharma-token')

    logout = () => {
        const { cookies } = this.props
        cookies.set('ccc-pharma-token', '')
        window.location.reload()
    }

    render() {
        return (
            <div id="authBtn">{
                this.isLogged() ?
                <i className="fas fa-sign-out-alt" id="logoutBtn" onClick={this.logout}><span>Sair</span></i>
                : <Link to={{ pathname: "/login" }}><i className="fas fa-user"><span>Entrar</span></i></Link>
            }</div>
        )
    }
}

export default withRouter(withCookies(AuthenticationBtn))