import React, { Component } from 'react'
import FetchError from '../FetchError/index'
import { createUser } from '../../utils'

class EmployeeForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      password: '',
      passwordConfirmation: '',
    }
  }

  handleNameChange = e => this.setState({ name: e.target.value, errorModal: false })
  handleUsernameChange = e => this.setState({ email: e.target.value, errorModal: false })
  handlePasswordChange = e => this.setState({ password: e.target.value, errorModal: false })
  handlePasswordConfirmationChange = e => this.setState({ passwordConfirmation: e.target.value, errorModal: false })

  onSuccess = event => {
    const { name, email, password, passwordConfirmation } = this.state
    event.preventDefault()
    if (name === '' || email === '' || password === '' || passwordConfirmation === '') {
      this.setState({ error: 'Preencha todas as informações' })
    } else {
      if (password === passwordConfirmation) {
        createUser({ name, email, password, role: 'ADMIN' }).then(response => {
          if (response.status === 200) {
            this.props.onSuccess()
          } else {
            this.setState({ error: 'Não foi possível realizar o cadastro' })
          }
        }).catch(err => {
          this.setState({ error: err })
        })
      } else {
        this.setState({ error: 'As senhas não conferem' })
      }
    }
  }

  onCancel = event => {
    event.preventDefault()
    this.props.onCancel()
  }

  render() {
    const { name, email, password, passwordConfirmation, error } = this.state
    return (
      <form onSubmit={e => this.onSuccess(e)}>
        <label htmlFor="nameEmployee">Nome</label>
        <input type="text" id="nameEmployee" value={name} onChange={e => this.handleNameChange(e)}></input>
        <label htmlFor="emailEmployee">E-mail</label>
        <input type="email" id="emailEmployee" value={email} onChange={e => this.handleUsernameChange(e)}></input>
        <label htmlFor="passwordEmployee">Senha</label>
        <input type="password" id="passwordEmployee" value={password} onChange={e => this.handlePasswordChange(e)}></input>
        <label htmlFor="passwordConfirmationEmployee">Confirmar Senha</label>
        <input type="password" id="passwordConfirmationEmployee" value={passwordConfirmation} onChange={e => this.handlePasswordConfirmationChange(e)}></input>
        {error && (
          <FetchError msg={`${error}`} />
        )}
        <input type="submit" value="Cadastrar" />
        <input type="button" onClick={e => this.onCancel(e)} value="Cancelar" />
      </form>
    )
  }
}

export default EmployeeForm