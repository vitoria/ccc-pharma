import React, { Component, Fragment } from 'react'
import { BASE_URL, TOKEN } from '../../utils'
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
    }
  }

  fetchData = () => {
    this.setState({ isLoading: true })
    fetch(`${BASE_URL}/products`, {
      method: 'get',
      headers: {
        Authorization: TOKEN,
      },
    })
      .then(response => response.json())
      .then(data => {
        console.log("in fecth", data)
        this.setState({ isLoading: false, data: data, error: false })
      })
      .catch(error => this.setState({ isLoading: false, data: false, error }))
  }

  componentDidMount = () => {
    this.fetchData()
  }

  renderProducts = () => {
    const { data } = this.state
    console.log(data)
    return data ? map((product, index) => {
      console.log(index)
      return <div key={product.id}>{product}</div>
    }, data) : 'Nop'
  }

  handleBarCodeChange = e => this.setState({ bar_code: e.target.value })
  handleNameChange = e => this.setState({ name: e.target.value })
  handleManufacturerChange = e => this.setState({ manufacturer: e.target.value })
  handleCategoryChange = e => this.setState({ category: e.target.value })
  handlePriceChange = e => this.setState({ price: e.target.value })

  addProduct = event => {
    const { name, bar_code, manufacturer, category, price } = this.state
    console.log(this.state)
    event.preventDefault()
    fetch(`${BASE_URL}/products/create`, {
      method: 'post',
      headers: {
        "Content-Type": "application/json",
        Authorization: TOKEN,
      },
      body: JSON.stringify({ 
        name,
        "barCode": bar_code,
        manufacturer,
        category,
        price: parseFloat(price)
      })
    }).then(response => {
      console.log(response)
    }).catch(error => {
      console.log(error)
    })
  }

  renderProducForm = () => {
    const { name, bar_code, manufacturer, category, price } = this.state
    console.log(this.state)
    return (
      <form onSubmit={e => this.addProduct(e)}>
        <label htmlFor="nameProduct">Nome</label>
        <input id="nameProduct" value={name} onChange={e => this.handleNameChange(e)}></input>
        <label htmlFor="barCodeProduct">Código de Barras</label>
        <input id="barCodeProduct" value={bar_code} onChange={e => this.handleBarCodeChange(e)}></input>
        <label htmlFor="manufacturerProduct">Fabricante</label>
        <input id="manufacturerProduct" value={manufacturer} onChange={e => this.handleManufacturerChange(e)}></input>
        <label htmlFor="categoryProduct">Categoria</label>
        <select id="categoryProduct" onChange={e => this.handleCategoryChange(e)}>
          <option value="MEDICINE" selected={category === "MEDICINE"}>Medicamento</option>
          <option value="COSTEMIC" selected={category === "COSMETIC"}>Cosmético</option>
          <option value="FOOD" selected={category === "FOOD"}>Alimento</option>
          <option value="HYGIENE" selected={category === "HYGIENE"}>Higiene</option>
        </select>
        <label htmlFor="priceProduct">Preço</label>
        <input id="priceProduct" type="number" value={price} onChange={e => this.handlePriceChange(e)}></input>
        <input type="submit" value="Cadastrar" />
        <input type="button" onClick={() => this.setState({ showModal: false })} value="Cancel" />
      </form>
    )
  }

  renderCreateProduct = () => {
    return (
      <Fragment>
        <h3>Cadastro de Produto</h3>
        {this.renderProducForm()}
      </Fragment>
    )
  }

  render() {
    const { isLoading, error, showModal } = this.state
    const productsRended = this.renderProducts()
    console.log(productsRended)
    return (
      <div id="productsContainer">
        {isLoading ?
          <Spinner /> : error ?
            <FetchError msg={`${error}`} reload={this.fetchData} /> : (
              <div>
                <button onClick={() => this.setState({ showModal: true })}>
                  Adicionar produto
                </button>
                {showModal &&
                  <Modal
                    onCancel={() => this.setState({ showModal: false })}
                    onSubmit={this.addProduct}
                  >
                    {/* {map(item => item, productsRended)} */}
                  </Modal>
                }
                { productsRended }
              </div>
            )
        }
      </div>
    )
  }
}