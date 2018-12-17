import React, { Component } from 'react'
import ProductForm from './ProductForm'
import Modal from '../Modal/index'

import { updateProduct } from '../../utils'

class ProductUpdate extends Component {
  updateProduct = product => {
    updateProduct(product)
    .then(response => {
      if (response.status === 200) {
        this.props.onSuccess()
      }
    })
  }

  render() {
    const { onClose, product } = this.props
    return (
      <Modal onClose={onClose}>
        <h3>Edição de Produto</h3>
        <ProductForm
        product={product}
        onSuccess={this.updateProduct}
        onCancel={onClose}
        />
      </Modal>
    )
  }
}

export default ProductUpdate