import React, { Component } from 'react'
import { map } from 'ramda'
import ProductItem from './ProductItem'

class ProductList extends Component {
  renderProducts = () => {
    const { products, token } = this.props
    return products && map(product => (
      <ProductItem key={product.id} product={product} token={token} />
    ), products)
  }

  render() {
    return (
      <table className="table table-striped">
        <thead>
          <tr className="row-name">
            <th>Nome</th>
            <th>Código de Barra</th>
            <th>Fabricante</th>
            <th>Categoria</th>
            <th>Quantidade</th>
            <th>Preço(R$)</th>
            <th>Status</th>
            <th>Opções</th>
          </tr>
        </thead>
        <tbody>
          {this.renderProducts()}
        </tbody>
      </table>
    )
  }
}

export default ProductList

