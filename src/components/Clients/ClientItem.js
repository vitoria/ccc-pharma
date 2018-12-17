import React, { Component } from 'react'
import { deleteUser } from '../../utils'

class ClientItem extends Component {
  constructor(props) {
    super(props)
    this.state = { deleted: false }
  }

  handleDeleteClient = id => {
    deleteUser(id).then(response => {
      if (response.status === 200) {
        this.setState({ deleted: true })
      }
    })
  }

  render() {
    const { client: { id, name, email } } = this.props
    const { deleted } = this.state
    return !deleted ? (
      <tr className="row-content">
        <td>{name}</td>
        <td>{email}</td>
        <td>
          <div className="btn btn-danger edit" onClick={() => this.handleDeleteClient(id)}>
            <i className="fa fa-trash" aria-hidden="true"></i>
          </div>
        </td>
      </tr>
    ) : null
  }
}

export default ClientItem