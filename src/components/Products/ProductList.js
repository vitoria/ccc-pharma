import React, { Component } from 'react'
import { map } from 'ramda'
import ProductItem from './ProductItem'

class ProductList extends Component {
  renderProducts = () => {
    const { products, isAdmin } = this.props
    return products && map(product => (
      <ProductItem key={product.id} product={product} isAdmin={isAdmin} />
    ), products)
  }

  render() {
    const { isAdmin } = this.props
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
            {isAdmin && <th>Opções</th>}
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

