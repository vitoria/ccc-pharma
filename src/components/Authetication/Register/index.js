import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { BASE_URL } from '../../../utils'

import './global.css'

class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            name: '',
            passwordMatch: '',
        }
    }

    handleRegister = event => {
        event.preventDefault()
        const { email, name, password } = this.state
        fetch(`${BASE_URL}/user/create`, {
            method: 'post',
            body: {email, name, password}
        }).then(response => console.log(response))
        .catch(error => console.log(error))
    } 

    onChangePassword = event => {
        this.setState({ password: event.target.value })
    }

    onChangePasswordMatch = event => {
        this.setState({ passwordMatch: event.target.value })
    }

    onChangeName = event => {
        this.setState({ name: event.target.value })
    }

    onChangeEmail = event => {
        this.setState({ email: event.target.value })
    }

    render() {
        return (
            <div id="register">
                <form onSubmit={e => this.handleRegister(e)}>
                    <label htmlFor="nameRegister">Nome</label>
                    <input
                        type="text"
                        id="nameRegister"
                        value={this.state.name}
                        onChange={this.onChangeName}
                    />
                    <label htmlFor="emailRegister">E-mail</label>
                    <input
                        type="email"
                        id="emailRegister"
                        value={this.state.email}
                        onChange={this.onChangeEmail}
                    />
                    <label htmlFor="passwordRegister">Senha</label>
                    <input
                        type="password"
                        id="passwordRegister"
                        value={this.state.password}
                        onChange={this.onChangePassword}
                    />
                    <label htmlFor="passwordMatchRegister">Confirmar senha</label>
                    <input
                        type="password"
                        id="passwordMatchRegister"
                        value={this.state.passwordMatch}
                        onChange={this.onChangePasswordMatch}
                    />
                    <input type="submit" value="CADASTRAR"></input>
                </form>
                <Link to={{ pathname: '/login'}}>Retornar para o login</Link>
            </div>
        )
    }
}

export default Register