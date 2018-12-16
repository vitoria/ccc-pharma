import React, { Component, Fragment } from 'react'
import { BASE_URL } from '../../utils'
import { map } from 'ramda'

import Modal from '../Modal/index'
import Spinner from '../Spinner/index'
import FetchError from '../FetchError/index'

import './global.css'

export default class Product extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      data: false,
      category: 'MEDICINE',
    }
  }


  handleBarCodeChange = e => this.setState({ barCode: e.target.value, errorModal: false })
  handleNameChange = e => this.setState({ name: e.target.value, errorModal: false })
  handleManufacturerChange = e => this.setState({ manufacturer: e.target.value, errorModal: false })
  handleCategoryChange = e => this.setState({ category: e.target.value, errorModal: false })
  handlePriceChange = e => this.setState({ price: e.target.value, errorModal: false })

  fetchData = () => {
    this.setState({ isLoading: true })
    fetch(`${BASE_URL}/products`, {
      method: 'get'
    })
      .then(response => response.json())
      .then(data => {
        this.setState({ isLoading: false, data: data, error: false, showModal: false })
      })
      .catch(error => this.setState({ isLoading: false, data: false, error, showModal: false }))
  }

  componentDidMount = () => {
    this.fetchData()
  }

  renderProducts = () => {
    const { data } = this.state
    const categories = {
      MEDICINE: 'Medicamento',
      COMSMETIC: 'Cosmético',
      FOOD: 'Alimento',
      HYGIENE: 'Higiene'
  }
    return data && map(product => (
      <tr class="row-content" key={product.id}>
        <td>{product.name}</td>
        <td>{product.barCode}</td>
        <td>{product.manufacturer}</td>
        <td>{categories[product.category]}</td>
        <td>{product.price}</td>
        <td>
              <a class="btn btn-danger edit" href="path/to/settings" aria-label="Settings">
                <i class="fa fa-trash" aria-hidden="true"></i>
              </a>
              &nbsp; 
              <a class="btn btn-info edit" href="path/to/settings" aria-label="Settings">
                <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
              </a> 
           </td>
      </tr>
    ), data)
  }

  addProduct = event => {
    const { name, barCode, manufacturer, category, price } = this.state
    event.preventDefault()
    fetch(`${BASE_URL}/products/create`, {
      method: 'post',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        barCode,
        manufacturer,
        category,
        price: parseFloat(price)
      })
    }).then(response => {
      if (response.status === 200) {
        this.closeModal()
        this.fetchData()
      } else {
        this.setState({ errorModal: 'Não foi possível adicionar o produto', showModal: true })
      }
    }).catch(error => {
      console.log(error)
    })
  }

  closeModal = () => {
    this.setState({
      showModal: false,
      name: '',
      barCode: '',
      manufacturer: '',
      category: '',
      price: '',
      errorModal: false,
    })
  }

  renderProducForm = () => {
    const { name, barCode, manufacturer, category, price, errorModal } = this.state
    return (
      <form onSubmit={e => this.addProduct(e)}>
        <label htmlFor="nameProduct">Nome</label>
        <input id="nameProduct" value={name} onChange={e => this.handleNameChange(e)}></input>
        <label htmlFor="barCodeProduct">Código de Barras</label>
        <input id="barCodeProduct" value={barCode} onChange={e => this.handleBarCodeChange(e)}></input>
        <label htmlFor="manufacturerProduct">Fabricante</label>
        <input id="manufacturerProduct" value={manufacturer} onChange={e => this.handleManufacturerChange(e)}></input>
        <label htmlFor="categoryProduct">Categoria</label>
        <select id="categoryProduct" value={category} onChange={e => this.handleCategoryChange(e)}>
          <option value="MEDICINE">Medicamento</option>
          <option value="COSMETIC">Cosmético</option>
          <option value="FOOD">Alimento</option>
          <option value="HYGIENE">Higiene</option>
        </select>
        <label htmlFor="priceProduct">Preço</label>
        <input id="priceProduct" value={price} onChange={e => this.handlePriceChange(e)}></input>
        {errorModal && (
          <FetchError msg={`${errorModal}`} />
        )}
        <input type="submit" value="Cadastrar" />
        <input type="button" onClick={this.closeModal} value="Cancel" />
      </form>
    )
  }

  renderCreateProduct = () => (
    <Fragment>
      <h3>Cadastro de Produto</h3>
      {this.renderProducForm()}
    </Fragment>
  )

  render() {
    const { isLoading, error, showModal } = this.state
    const productsRended = this.renderProducts()
    console.log(productsRended)
    return (
      <div id="productContainer">
        {isLoading ?
          <Spinner /> : (error) ?
            <FetchError msg={`${error}`} reload={this.fetchData} /> : (
              <div>
                <h1> Produtos </h1>
                <hr></hr>
                <div class="dropdown">
                  <a class="btn-top" href="#" class="btn btn-primary pull-right" id="add" onClick={() => this.setState({ showModal: true })}> <span class="glyphicon glyphicon-plus"></span> Adicionar Produto</a>
                </div>
                {showModal &&
                  <Modal
                    onClose={() => this.setState({ showModal: false })}
                  >
                    {this.renderCreateProduct()}
                  </Modal>
                }
                <table class="table table-striped">
                    <thead>
                        <tr class="row-name">
                          <th>Nome</th>
                          <th>Código de Barra</th>
                          <th>Fabricante</th>
                          <th>Categoria</th>
                          <th>Preço(Em R$)</th>
                          <th>Opções</th>
                        </tr>
                    </thead>   
                    <tbody>
                        {productsRended}
                  </tbody>
                </table>
                </div>
            )
            }
            </div>
          )
  }
}