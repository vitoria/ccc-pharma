import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { instanceOf, PropTypes } from 'prop-types'
import { withCookies, Cookies } from 'react-cookie'
import { withRouter } from 'react-router-dom'
import { BASE_URL } from '../../../utils'
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
            username: 'adm',
            password: 'adm'
        }
    }

    handleLogin = event => {
        const { username, password} = this.state
        const waza = { username, password }
        console.log(waza)
        event.preventDefault()
        fetch(`${BASE_URL}/login`, {
            method: 'post',
            body: JSON.stringify(waza),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(response => {
            console.log('oi', response.headers)
            for (var pair of response.headers.entries()) {
                console.log(pair[0]+ ': '+ pair[1]);
             }
            // if (response.status === 200 && response.authorization) {
            //     this.props.cookies.set('ccc-pharma-token', response.authorization)
            //     this.props.history.push('/')
            // }
            return response.json()
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