import React, { Component } from 'react'
import { BASE_URL } from '../../utils'

import ProductInfo from './ProductInfo'

const categories = {
  MEDICINE: 'Medicamento',
  COSMETIC: 'Cosmético',
  FOOD: 'Alimento',
  HYGIENE: 'Higiene'
}

const getStatus = status => status === 'UNAVAILABLE' ? 'Indisponível' : 'Disponível'

class ProductItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      deleted: false,
    }
  }

  handleDeleteProduct = () => {
    fetch(`${BASE_URL}/products/${this.props.product.id}`, {
      method: 'delete',
      Authorization: this.props.token,
    }).then(response => {
      if (response.status === 200) {
        this.setState({ deleted: true })
      } else {
        console.log('Something went wrong')
      }
    }).catch(err => console.log(err))
  }

  handleInfoProduct = () => {
    this.setState({ showInfo: true })
  }

  render() {
    const {
      product,
      product: {
        id,
        barCode,
        name,
        manufacturer,
        category,
        status,
        price,
        stock,
      }
    } = this.props
    const { showInfo } = this.state
    return !this.state.deleted ? (
      <tr className="row-content" key={id}>
        <td>{name}</td>
        <td>{barCode}</td>
        <td>{manufacturer}</td>
        <td>{categories[category]}</td>
        <td>{status !== 'UNAVAILABLE' ? stock : '-'}</td>
        <td>{status !== 'UNAVAILABLE' ? price : '-'}</td>
        <td>
          <span className={`badge ${status}`}>
            {getStatus(status)}
          </span>
        </td>
        <td>
          <div className="btn btn-danger edit" onClick={this.handleDeleteProduct}>
            <i className="fa fa-trash" aria-hidden="true"></i>
          </div>
          &nbsp;
          <div className="btn btn-warning edit">
            <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
          </div>
          &nbsp;
          <div className="btn btn-info edit" onClick={this.handleInfoProduct}>
            <i className="far fa-eye" aria-hidden="true"></i>
          </div>
        </td>
        {showInfo && <ProductInfo product={product} />}
      </tr>
    ) : null
  }
}

export default ProductItem