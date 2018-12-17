import React, { Component, Fragment } from 'react'
import { getMissingProducts } from '../../utils'
import { map } from 'ramda'

class ProductsMissing extends Component {
  constructor(props) {
    super(props)
    this.state = {
      product: false,
    }
  }

  componentDidMount = () => {
    getMissingProducts().then(response => {
      if (response.status === 200) {
        response.json().then(products => {
          this.setState({ products: products })
        })
      }
    })
  }

  renderProducts = () => {
    const { products } = this.state
    return products && map(product => (
      <tr className="row-content" key={product.id}>
        <td>{product.barCode}</td>
        <td>{product.name}</td>
      </tr>
    ), products)
  }

  render() {
    return (
      <Fragment>
        <h3>Produtos em Falta</h3>
        <hr />
        <table className="table table-striped">
          <thead>
            <tr className="row-name">
              <th>Código de Barra</th>
              <th>Nome</th>
            </tr>
          </thead>
          <tbody>
            {this.renderProducts()}
          </tbody>
        </table>
      </Fragment>
    )
  }
}

export default ProductsMissing