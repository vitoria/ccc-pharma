import React, { Component } from 'react'
import { withCookies } from 'react-cookie'

import ClientList from './ClientList'
import Modal from '../Modal/index'
import ClientForm from './ClientForm'

class Clients extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showModal: false
    }
  }

  render() {
    const { showModal, refetch } = this.state
    return (
      <div id="clientContainer">
        <h1> Clientes </h1>
        <hr></hr>
        <div className="flex flex-row-reverse">
          <div className="btn-primary customBtn" id="add" onClick={() => this.setState({ showModal: true })}>
            <span className="glyphicon glyphicon-plus" />
            &nbsp;
          <span>Adicionar Cliente</span>
          </div>
        </div>
        <ClientList refetch={refetch} />
        {showModal && (
          <Modal onClose={() => this.setState({ showModal: false })}>
          <h3>Cadastrar Cliente</h3>
            <ClientForm onSuccess={() => this.setState({ showModal: false, refetch: true })} />
          </Modal>
        )}
      </div>
    )
  }
}

export default withCookies(Clients)