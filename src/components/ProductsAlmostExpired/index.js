import React, { Component, Fragment } from 'react'
import { getAlmostExpiredBatches } from '../../utils'
import { map } from 'ramda'

class ProductsAlmostExpired extends Component {
  constructor(props) {
    super(props)
    this.state = {
      products: false
    }
  }

  componentDidMount = () => {
    getAlmostExpiredBatches().then(response => {
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
        <td>{product.product.name}</td>
        <td>{product.quantity}</td>
        <td>{product.expirationDate}</td>
      </tr>
    ), products)
  }

  render() {
    return (
      <Fragment>
        <h3>Lotes Próximos do Vencimento</h3>
        <hr />
        <table className="table table-striped">
          <thead>
            <tr className="row-name">
              <th>Nome do produto</th>
              <th>Quantidade</th>
              <th>Data de Vencimento</th>
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

export default ProductsAlmostExpired