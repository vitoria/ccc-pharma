import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import './global.css'

class Register extends Component {
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
            <div id="register">
                <form onSubmit={this.handleRegister}>
                    <label for="usernameRegister">Username</label>
                    <input
                        type="text"
                        id="usernameRegister"
                        value={this.state.username}
                        onChange={this.onChangeUsername}
                    />
                    <label for="passwordRegister">Senha</label>
                    <input
                        type="password"
                        id="passwordRegister"
                        value={this.state.password}
                        onChange={this.onChangePassword}
                    />
                    <input type="submit" value="CADASTRAR"></input>
                </form>
                <Link to={{ pathname: '/login'}}>Retornar para o login</Link>
            </div>
        )
    }
}

export default Register