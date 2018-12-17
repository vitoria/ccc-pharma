import React, { Component } from 'react'
import { getClients } from '../../utils'
import { map } from 'ramda'
import ClientItem from './ClientItem'

class ClientList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      clients: false,
    }
  }

  componentWillUpdate = () => {
    this.getClients()
  }

  getClients = () => getClients().then(response => {
    if (response.status === 200) {
      response.json().then(clients => this.setState({ clients: clients }))
    }
  })

  componentDidMount = () => {
    this.getClients()
  }

  renderClients = clients => (
    map(client => (
      <ClientItem key={client.id} client={client} />
    ), clients)
  )

  render() {
    const { clients } = this.state
    return clients ? (
      <table className="table table-striped">
        <thead>
          <tr className="row-name">
            <th>Nome</th>
            <th>Username</th>
            <th className="fit">Opções</th>
          </tr>
        </thead>
        <tbody>
          {this.renderClients(clients)}
        </tbody>
      </table>
    ) : <div>Sem clientes</div>
  }
}

export default ClientList