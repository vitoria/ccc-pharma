import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './global.css'

export default class SideBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 0
    }
  }

  render() {
    const { selected } = this.state
    const { isAdmin } = this.props
    return isAdmin ? (
      <nav className={`${this.props.isOpen ? 'drawer-in' : 'drawer-out'}`}>
        <Link
          to={{ pathname: "/" }}
          onClick={() => this.setState({ selected: 0 })}
          className={selected === 0 ? 'nav-item-selected' : ''}
        >
          <i className="fas fa-home"></i>
          <span>Painel de Controle</span>
        </Link>
        <Link
          to={{ pathname: "/products" }}
          onClick={() => this.setState({ selected: 1 })}
          className={selected === 1 ? 'nav-item-selected' : ''}
        >
          <i className="fas fa-shopping-cart"></i>
          <span>Gerenciar Produtos</span>
        </Link>
        <Link
          to={{ pathname: "/sales" }}
          onClick={() => this.setState({ selected: 2 })}
          className={selected === 2 ? 'nav-item-selected' : ''}
        >
          <i className="fas fa-cash-register"></i>
          <span>Gerenciar Vendas</span>
        </Link>
        <Link
          to={{ pathname: "/clients" }}
          onClick={() => this.setState({ selected: 3 })}
          className={selected === 3 ? 'nav-item-selected' : ''}
        >
          <i className="fas fa-users"></i>
          <span>Gerenciar Clientes</span>
        </Link>
        <Link
          to={{ pathname: "/employees" }}
          onClick={() => this.setState({ selected: 4 })}
          className={selected === 4 ? 'nav-item-selected' : ''}
        >
          <i className="fas fa-people-carry"></i>
          <span>Gerenciar Funcionários</span>
        </Link>
      </nav>
    ) : (
      <nav className={`${this.props.isOpen ? 'drawer-in' : 'drawer-out'}`}>
        <Link
          to={{ pathname: "/products" }}
          onClick={() => this.setState({ selected: 1 })}
          className="nav-item-selected"
        >
          <i className="fas fa-shopping-cart"></i>
          <span>Visualizar Produtos</span>
        </Link>
      </nav>
    )
  }
}