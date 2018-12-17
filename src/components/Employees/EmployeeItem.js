import React, { Component } from 'react'
import { deleteUser } from '../../utils'

class EmployeeItem extends Component {
  constructor(props) {
    super(props)
    this.state = { deleted: false }
  }

  handleDeleteEmployee = id => {
    deleteUser(id).then(response => {
      if (response.status === 200) {
        this.setState({ deleted: true })
      }
    })
  }

  render() {
    const { employee: { id, name, email } } = this.props
    const { deleted } = this.state
    return !deleted ? (
      <tr className="row-content">
        <td>{name}</td>
        <td>{email}</td>
        <td>
          <div className="btn btn-danger edit" onClick={() => this.handleDeleteEmployee(id)}>
            <i className="fa fa-trash" aria-hidden="true"></i>
          </div>
        </td>
      </tr>
    ) : null
  }
}

export default EmployeeItem