import React, { Component } from 'react'
import { withCookies } from 'react-cookie'

import EmployeeList from './EmployeeList'
import Modal from '../Modal/index'
import EmployeeForm from './EmployeeForm'

class Employees extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showModal: false
    }
  }

  render() {
    const { showModal, refetch } = this.state
    return (
      <div id="employeeContainer">
        <h1> Funcionários </h1>
        <hr></hr>
        <div className="flex flex-row-reverse">
          <div className="btn-primary customBtn" id="add" onClick={() => this.setState({ showModal: true })}>
            <span className="glyphicon glyphicon-plus" />
            &nbsp;
          <span>Adicionar Funcionário</span>
          </div>
        </div>
        <EmployeeList refetch={refetch} />
        {showModal && (
          <Modal onClose={() => this.setState({ showModal: false })}>
          <h3>Cadastrar Funcionário</h3>
            <EmployeeForm onSuccess={() => this.setState({ showModal: false, refetch: true })} />
          </Modal>
        )}
      </div>
    )
  }
}

export default withCookies(Employees)