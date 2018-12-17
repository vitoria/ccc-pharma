import React, { Component } from 'react'
import Modal from '../Modal/index'
import BatchList from '../Batches/BatchList'

const categories = {
  MEDICINE: 'Medicamento',
  COSMETIC: 'Cosmético',
  FOOD: 'Alimento',
  HYGIENE: 'Higiene'
}

const getStatus = status => status === 'UNAVAILABLE' ? 'Indisponível' : 'Disponível'

class ProductInfo extends Component {
  renderProductDetails = () => {
    const {
      product: {
        name,
        barCode,
        manufacturer,
        category,
        price,
        stock,
        expiredStock,
        status,
      }
    } = this.props
    return (
      <div id="productDetails">
        <span><strong>Código: </strong></span>
        <span>{barCode}</span>
        <span><strong>Nome: </strong></span>
        <span>{name}</span>
        <span><strong>Fabricante: </strong></span>
        <span>{manufacturer}</span>
        <span><strong>Categoria: </strong></span>
        <span>{categories[category]}</span>
        <span><strong>Preço (R$): </strong></span>
        <span>{price}</span>
        <span><strong>Status: </strong></span>
        <span>{getStatus(status)}</span>
        <span><strong>Qtd disponível: </strong></span>
        <span>{stock}</span>
        <span><strong>Qtd Vencidos: </strong></span>
        <span>{expiredStock}</span>
      </div>
    )
  }

  render() {
    const { product, onClose } = this.props
    return (
      <Modal onClose={onClose}>
        <h3>Informações do Produto</h3><hr />
        {this.renderProductDetails()}
        <hr />
        <BatchList productId={product.id} />
      </Modal>
    )
  }
}

export default ProductInfo