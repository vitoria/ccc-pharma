import React, { Component } from 'react'
import { getEmployees } from '../../utils'
import { map } from 'ramda'
import EmployeeItem from './EmployeeItem'

class EmployeeList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      employees: false,
    }
  }

  componentWillUpdate = () => {
    this.getEmployees()
  }

  getEmployees = () => getEmployees().then(response => {
    if (response.status === 200) {
      response.json().then(employees => this.setState({ employees: employees }))
    }
  })

  componentDidMount = () => {
    this.getEmployees()
  }

  renderEmployees = employees => (
    map(employee => (
      <EmployeeItem key={employee.id} employee={employee} />
    ), employees)
  )

  render() {
    const { employees } = this.state
    return employees ? (
      <table className="table table-striped">
        <thead>
          <tr className="row-name">
            <th>Nome</th>
            <th>Username</th>
            <th className="fit">Opções</th>
          </tr>
        </thead>
        <tbody>
          {this.renderEmployees(employees)}
        </tbody>
      </table>
    ) : <div>Sem funcionários</div>
  }
}

export default EmployeeList