import React, { Component } from 'react'
import FetchError from '../FetchError/index'

class ProductForm extends Component {
  constructor(props) {
    super(props)
    const { product } = props
    this.state = {
      category: 'MEDICINE',
      name: product ? product.name : '',
      price: product ? product.price : '',
      manufacturer: product ? product.manufacturer : '',
      barCode: product ? product.barCode : '',
    }
  }

  handleBarCodeChange = e => this.setState({ barCode: e.target.value, errorModal: false })
  handleNameChange = e => this.setState({ name: e.target.value, errorModal: false })
  handleManufacturerChange = e => this.setState({ manufacturer: e.target.value, errorModal: false })
  handleCategoryChange = e => this.setState({ category: e.target.value, errorModal: false })
  handlePriceChange = e => this.setState({ price: e.target.value, errorModal: false })

  onSuccess = event => {
    const { name, barCode, manufacturer, category, price } = this.state
    const { product } = this.props
    event.preventDefault()
    if ( name === '' || barCode === '' || manufacturer === '' || price === '') {
      this.setState({ errorModal: 'Preencha todas informações' })
    } else {
      this.props.product ?
      this.props.onSuccess({ id: product && product.id, name, barCode, manufacturer, category, price, status: this.props.product.status })
      : this.props.onSuccess({ id: product && product.id, name, barCode, manufacturer, category, price })

    }
  }

  onCancel = event => {
    event.preventDefault()
    this.props.onCancel()
  }

  render() {
    const { name, barCode, manufacturer, category, price, errorModal } = this.state
    const { product } = this.props
    return (
      <form onSubmit={e => this.onSuccess(e)}>
        <label htmlFor="nameProduct">Nome</label>
        <input type="text" id="nameProduct" value={name} onChange={e => this.handleNameChange(e)}></input>
        <label htmlFor="barCodeProduct">Código de Barras</label>
        <input type="text" id="barCodeProduct" disabled={product} value={barCode} onChange={e => this.handleBarCodeChange(e)}></input>
        <label htmlFor="manufacturerProduct">Fabricante</label>
        <input type="text" id="manufacturerProduct" value={manufacturer} onChange={e => this.handleManufacturerChange(e)}></input>
        <label htmlFor="categoryProduct">Categoria</label>
        <select id="categoryProduct" value={category} onChange={e => this.handleCategoryChange(e)}>
          <option value="MEDICINE">Medicamento</option>
          <option value="COSMETIC">Cosmético</option>
          <option value="FOOD">Alimento</option>
          <option value="HYGIENE">Higiene</option>
        </select>
        <label htmlFor="priceProduct">Preço</label>
        <input type="number" id="priceProduct" value={price} onChange={e => this.handlePriceChange(e)}></input>
        {errorModal && (
          <FetchError msg={`${errorModal}`} />
        )}
        <input type="submit" value={product ? "EDITAR" : "Cadastrar"} />
        <input type="button" onClick={e => this.onCancel(e)} value="Cancelar" />
      </form>
    )
  }
}

export default ProductForm