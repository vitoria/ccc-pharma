import React, { Component, Fragment } from 'react'
import { BASE_URL } from '../../utils'
import { map } from 'ramda'

import Modal from '../Modal/index'
import Spinner from '../Spinner/index'
import FetchError from '../FetchError/index'

import './global.css'

const categories = {
  MEDICINE: 'Medicamento',
  COMSMETIC: 'Cosmético',
  FOOD: 'Alimento',
  HYGIENE: 'Higiene'
}

const getStatus = status => status === 'UNAVAILABLE' ? 'Indisponível' : 'Disponível'

export default class Product extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      data: false,
      category: 'MEDICINE',
      filter: 'TODOS',
    }
  }

  handleBarCodeChange = e => this.setState({ barCode: e.target.value, errorModal: false })
  handleNameChange = e => this.setState({ name: e.target.value, errorModal: false })
  handleManufacturerChange = e => this.setState({ manufacturer: e.target.value, errorModal: false })
  handleCategoryChange = e => this.setState({ category: e.target.value, errorModal: false })
  handlePriceChange = e => this.setState({ price: e.target.value, errorModal: false })
  handleFilterChange = e => {
    this.setState({ filter: e.target.value })
    this.fetchData(e.target.value)
  }

  fetchData = (category = 'TODOS') => {
    this.setState({ isLoading: true })
    const url = `${BASE_URL}/products${category !== 'TODOS' ? `/category/${category}` : '/'}`
    fetch(url, {
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
    return data && map(product => (
      <tr className="row-content" key={product.id}>
        <td>{product.name}</td>
        <td>{product.barCode}</td>
        <td>{product.manufacturer}</td>
        <td>{categories[product.category]}</td>
        <td>{product.status !== 'UNAVAILABLE' ? product.price : '-'}</td>
        <td>
          <span className={`badge ${product.status}`}>
            {getStatus(product.status)}
          </span>
        </td>
        <td>
          <a className="btn btn-danger edit" href="path/to/settings" aria-label="Settings">
            <i className="fa fa-trash" aria-hidden="true"></i>
          </a>
          &nbsp;
              <a className="btn btn-info edit" href="path/to/settings" aria-label="Settings">
            <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
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
    const { isLoading, error, showModal, filter } = this.state
    const productsRended = this.renderProducts()
    return (
      <div id="productContainer">
        {isLoading ?
          <Spinner /> : (error) ?
            <FetchError msg={`${error}`} reload={this.fetchData} /> : (
              <div>
                <h1> Produtos </h1>
                <hr></hr>
                <div className="flex flex-row-reverse w-100">
                  <div className="ml1">
                    <select value={filter} onChange={e => this.handleFilterChange(e)}>
                      <option value="TODOS">Todos</option>
                      <option value="MEDICINE">Medicamento</option>
                      <option value="COSMETIC">Cosmético</option>
                      <option value="FOOD">Alimento</option>
                      <option value="HYGIENE">Higiene</option>
                    </select>
                  </div>
                  <div className="btn-primary customBtn" id="add" onClick={() => this.setState({ showModal: true })}>
                    <span className="glyphicon glyphicon-plus" />
                    <span>Adicionar Produto</span>
                  </div>
                </div>
                {showModal &&
                  <Modal
                    onClose={() => this.setState({ showModal: false })}
                  >
                    {this.renderCreateProduct()}
                  </Modal>
                }
                <table className="table table-striped">
                  <thead>
                    <tr className="row-name">
                      <th>Nome</th>
                      <th>Código de Barra</th>
                      <th>Fabricante</th>
                      <th>Categoria</th>
                      <th>Preço(R$)</th>
                      <th>Status</th>
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