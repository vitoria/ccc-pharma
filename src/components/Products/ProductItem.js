import React, { Component, Fragment } from 'react'
import { BASE_URL, getProduct } from '../../utils'

import ProductInfo from './ProductInfo'
import ProductUpdate from './ProductUpdate'

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

  handleUpdateProduct = () => {
    this.setState({ showUpdate: true })
  }

  fetchProduct = () => {
    getProduct(this.props.product.id).then(response => {
      if (response.status === 200) {
        response.json().then(product => {
          this.setState({product2: product})
        })
      }
    })
  }

  render() {
    const {
      isAdmin,
      product,
    } = this.props
    const { showInfo, showUpdate, product2 } = this.state
    const {
      id,
      barCode,
      name,
      manufacturer,
      category,
      status,
      sellingPrice,
      listingPrice,
      stock,
    } = product2 ? product2 : product
    return !this.state.deleted ? (
      <Fragment>
        <tr className="row-content" key={id}>
          <td>{name}</td>
          <td>{barCode}</td>
          <td>{manufacturer}</td>
          <td>{categories[category]}</td>
          <td>{status !== 'UNAVAILABLE' ? stock : '-'}</td>
          <td>{status !== 'UNAVAILABLE' ? (
            sellingPrice !== listingPrice ? (
              <div className="flex flex-column">
                <span><strike>{listingPrice.toFixed(2)}</strike></span>
                <span>{sellingPrice.toFixed(2)}</span>
              </div>
            ) : (
                <span>{sellingPrice.toFixed(2)}</span>
              )
          ) : '-'}</td>
          <td>
            <span className={`badge ${status}`}>
              {getStatus(status)}
            </span>
          </td>
          {isAdmin && (
            <td>
              <div className="btn btn-danger edit" onClick={this.handleDeleteProduct}>
                <i className="fa fa-trash" aria-hidden="true"></i>
              </div>
              &nbsp;
          <div className="btn btn-warning edit" onClick={this.handleUpdateProduct}>
                <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
              </div>
              &nbsp;
          <div className="btn btn-info edit" onClick={this.handleInfoProduct}>
                <i className="far fa-eye" aria-hidden="true"></i>
              </div>
            </td>
          )}
        </tr>
        {showInfo && <ProductInfo product={product2 ? product2 : product} onClose={() => this.setState({ showInfo: false })} />}
        {showUpdate && <ProductUpdate
        product={product2 ? product2 : product}
        onSuccess={() => {
          this.fetchProduct()
          this.setState({ showUpdate: false })
        }}
        onClose={() => this.setState({ showUpdate: false })}
        />}
      </Fragment>
    ) : null
  }
}

export default ProductItem