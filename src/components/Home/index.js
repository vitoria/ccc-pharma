import React, { Component, Fragment } from 'react'
import ProductsAlmostMissing from '../ProductsAlmostMissing/index'
import ProductsMissing from '../ProductsMissing/index'

import { getProducts } from '../../utils'

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
  }

  render() {
    const { qtdProducts } = this.state
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
            <h1>25.778</h1>
            <span>Vendas</span>
          </div>
          <div className="homeItem">
            <h1>1.458</h1>
            <span>Clientes</span>
          </div>
          <div className="homeItem">
            <h1>15</h1>
            <span>Funcionários</span>
          </div>
        </div>
        <hr />
        <div id="homeContainer" className="flex flex-row">
        <div className="w-50">
        <ProductsMissing />
        </div>
        <div className="w-50">
        <ProductsAlmostMissing />
        </div>
        </div>
      </Fragment>
    )
  }
}

export default Home