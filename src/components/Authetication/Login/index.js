import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import './global.css'

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: ''
        }
    }

    handleLogin = () => {
        console.log(this.state)
        alert('')
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
                <form onSubmit={this.handleLogin}>
                    <label for="usernameLogin">Username</label>
                    <input
                        type="text"
                        id="usernameLogin"
                        value={this.state.username}
                        onChange={this.onChangeUsername}
                    />
                    <label for="passwordLogin">Senha</label>
                    <input
                        type="password"
                        id="passwordLogin"
                        value={this.state.password}
                        onChange={this.onChangePassword}
                    />
                    <input type="submit" value="Entrar"></input>
                </form>
                <Link to={{ pathname: "/register" }}>Cadastrar</Link>
            </div>
        )
    }
}

export default Login