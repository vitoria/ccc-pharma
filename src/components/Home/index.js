import React, { Component, Fragment } from 'react'
import ProductsAlmostMissing from '../ProductsAlmostMissing/index'
import ProductsMissing from '../ProductsMissing/index'

import { getProducts, getAdmins, getClients } from '../../utils'
import ProductsAlmostExpired from '../ProductsAlmostExpired/index'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      qtdProducts: 0,
      qtdSales: 0,
      qtdClients: 0,
      qtdEmployees: 0,
    }
  }

  componentDidMount = () => {
    getProducts().then(response => {
      if (response.status === 200) {
        response.json().then(products => {
          this.setState({ qtdProducts: products.length })
        })
      }
    })
    getAdmins().then(response => {
      if (response.status === 200) {
        response.json().then(admins => {
          this.setState({ qtdEmployees: admins.length })
        })
      }
    })
    getClients().then(response => {
      if (response.status === 200) {
        response.json().then(clients => {
          this.setState({ qtdClients: clients.length })
        })
      }
    })
  }

  render() {
    const { qtdProducts, qtdEmployees, qtdClients } = this.state
    return (
      <Fragment>
        <h2>Painel de Controle</h2>
        <hr />
        <div id="homeInfo" className="flex flex-row">
          <div className="homeItem">
            <h1>{qtdProducts}</h1>
            <span>Produtos</span>
          </div>
          <div className="homeItem">
            <h1>-</h1>
            <span>Vendas</span>
          </div>
          <div className="homeItem">
            <h1>{qtdClients}</h1>
            <span>Clientes</span>
          </div>
          <div className="homeItem">
            <h1>{qtdEmployees}</h1>
            <span>Funcionários</span>
          </div>
        </div>
        <hr />
        <div id="homeContainer">
        <div>
        <ProductsMissing />
        </div>
        <div>
        <ProductsAlmostMissing />
        </div>
        <div>
        <ProductsAlmostExpired />
        </div>
        </div>
      </Fragment>
    )
  }
}

export default Home