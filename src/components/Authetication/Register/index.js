import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { BASE_URL } from '../../../utils'
import FetchError from '../../FetchError/index'
import { withRouter } from 'react-router-dom'

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
        this.setState({ isLoading: true })
        const { email, name, password } = this.state
        fetch(`${BASE_URL}/user/create`, {
            method: 'post',
            body: JSON.stringify({email, name, password, role: 'CLIENT'}),
            headers: {
                "Content-Type": "application/json",
            }
        }).then(response => {
            this.setState({ isLoading: false })
            response && response.status === 200 && this.props.history.push('/login/registered')
            response && response.status !== 200 && this.setState({ error: 'Não foi possível realizar o cadastro' })
        })
        .catch(error => {
            this.setState({ isLoading: false })
            this.setState({error})
        })
    } 

    onChangePassword = event => {
        this.setState({ password: event.target.value, error: false })
    }

    onChangePasswordMatch = event => {
        this.setState({ passwordMatch: event.target.value, error: false })
    }

    onChangeName = event => {
        this.setState({ name: event.target.value, error: false })
    }

    onChangeEmail = event => {
        this.setState({ email: event.target.value, error: false })
    }

    render() {
        return (
            <div id="register">
                <h3>Cadastro</h3>
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
                    {}
                    <label htmlFor="passwordMatchRegister">Confirmar senha</label>
                    <input
                        type="password"
                        id="passwordMatchRegister"
                        value={this.state.passwordMatch}
                        onChange={this.onChangePasswordMatch}
                    />
                    {this.state.error && <FetchError msg={`${this.state.error}`} />}
                    <input type="submit" value="CADASTRAR" className={this.state.isLoading ? 'loading' : ''}></input>
                </form>
                <Link to={{ pathname: '/login' }}>Retornar para o login</Link>
            </div>
        )
    }
}

export default withRouter(Register)