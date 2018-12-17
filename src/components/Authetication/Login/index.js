import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { instanceOf, PropTypes } from 'prop-types'
import { withCookies, Cookies } from 'react-cookie'
import { withRouter } from 'react-router-dom'
import { BASE_URL, getCurrentUser } from '../../../utils'
import { path } from 'ramda'

import './global.css'
import FetchError from '../../FetchError';

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
        const { username, password} = this.state
        const waza = { username, password }
        event.preventDefault()
        fetch(`${BASE_URL}/login`, {
            method: 'post',
            body: JSON.stringify(waza),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(response => {
            const authorization = response.headers.get('authorization')
            if (response.status === 200 && authorization) {
                this.props.cookies.set('ccc-pharma-token', authorization)
                getCurrentUser(authorization).then(response => {
                    if (response.status === 200) {
                        response.json().then(user => {
                            this.props.cookies.set('waza', user.role === 'ADMIN')
                            window.location.reload()
                        })
                    }
                })
            } else {
                this.setState({ error: 'Credenciais inválidas' })
            }
        }).catch(error => {
            this.setState({ error })
        })
    } 

    onChangePassword = event => {
        this.setState({ password: event.target.value, error: false })
    }

    onChangeUsername = event => {
        this.setState({ username: event.target.value, error: false })
    }

    render() {
        return (
            <div id="login">
                <h3>Login</h3>
                <form onSubmit={e => this.handleLogin(e)}>
                    { path(['match', 'params', 'registered'], this.props) && <FetchError
                    msg="Cadastro realizado com sucesso!"
                    success={true}/>}
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
                    { this.state.error && (
                        <FetchError msg={`${this.state.error}`} />
                    ) }
                    <input type="submit" value="ENTRAR"></input>
                </form>
                <Link to={{ pathname: "/register" }}>Cadastrar</Link>
            </div>
        )
    }
}

export default withRouter(withCookies(Login))