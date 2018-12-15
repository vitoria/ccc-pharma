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
        return (
            <nav>
                <Link
                    to={{ pathname: "/" }}
                    onClick={() => this.setState({selected: 0})}
                    className={selected === 0 ? 'nav-item-selected' : ''}
                >
                    <i class="fas fa-home"></i>
                    <span>Painel de Controle</span>
                </Link>
                <Link
                    to={{ pathname: "/products" }}
                    onClick={() => this.setState({selected: 1})}
                    className={selected === 1 ? 'nav-item-selected' : ''}
                >
                    <i class="fas fa-shopping-cart"></i>
                    <span>Gerenciar Produtos</span>
                </Link>
                <Link
                    to={{ pathname: "/products" }}
                    onClick={() => this.setState({selected: 2})}
                    className={selected === 2 ? 'nav-item-selected' : ''}
                >
                    <i class="fas fa-cash-register"></i>
                    <span>Gerenciar Vendas</span>
                </Link>
                <Link
                    to={{ pathname: "/products" }}
                    onClick={() => this.setState({selected: 3})}
                    className={selected === 3 ? 'nav-item-selected' : ''}
                >
                    <i class="fas fa-users"></i>
                    <span>Gerenciar Clientes</span>
                </Link>
                <Link
                    to={{ pathname: "/products" }}
                    onClick={() => this.setState({selected: 4})}
                    className={selected === 4 ? 'nav-item-selected' : ''}
                >
                    <i class="fas fa-people-carry"></i>
                    <span>Gerenciar Funcionários</span>
                </Link>
            </nav>
        )
    }
}