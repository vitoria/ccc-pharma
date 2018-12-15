import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { instanceOf, PropTypes } from 'prop-types'
import { withCookies, Cookies } from 'react-cookie'
import { withRouter } from 'react-router-dom'
import { TOKEN } from '../../../utils'

import './global.css'

class Login extends Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired,
        history: PropTypes.shape({
            push: PropTypes.func.isRequired
        })
    }

    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: ''
        }
    }

    handleLogin = event => {
        event.preventDefault()
        this.props.cookies.set('ccc-pharma-token', TOKEN)
        window.location.reload('/')
    } 

    onChangePassword = event => {
        this.setState({ password: event.target.value })
    }

    onChangeUsername = event => {
        this.setState({ username: event.target.value })
    }

    render() {
        return (
            <div id="login">
                <form onSubmit={e => this.handleLogin(e)}>
                    <label htmlFor="usernameLogin">Username</label>
                    <input
                        type="text"
                        id="usernameLogin"
                        value={this.state.username}
                        onChange={this.onChangeUsername}
                    />
                    <label htmlFor="passwordLogin">Senha</label>
                    <input
                        type="password"
                        id="passwordLogin"
                        value={this.state.password}
                        onChange={this.onChangePassword}
                    />
                    <input type="submit" value="ENTRAR"></input>
                </form>
                <Link to={{ pathname: "/register" }}>Cadastrar</Link>
            </div>
        )
    }
}

export default withRouter(withCookies(Login))