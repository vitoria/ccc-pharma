import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { instanceOf, PropTypes } from 'prop-types'
import { withCookies, Cookies } from 'react-cookie'
import { withRouter } from 'react-router-dom'
import { BASE_URL, TOKEN } from '../../../utils'
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
        event.preventDefault()
        fetch(`${BASE_URL}/login`, {
            method: 'post',
            body: JSON.stringify({ username, password }),
            headers: {
                "Content-Type": "text/plain",
                Authorization: TOKEN,
            }
        }).then(response => {
            const objJSON = response.json()
            console.log(response)
            response.status !== 200 && objJSON.then(Promise.reject.bind(Promise))
            return objJSON
        }).then(objJSON => {
            console.log(objJSON)
        }).catch(error => {
            console.log(error)
        })
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
                    <input type="submit" value="ENTRAR"></input>
                </form>
                <Link to={{ pathname: "/register" }}>Cadastrar</Link>
            </div>
        )
    }
}

export default withRouter(withCookies(Login))