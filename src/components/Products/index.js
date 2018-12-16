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


  handleBarCodeChange = e => this.setState({ barCode: e.target.value })
  handleNameChange = e => this.setState({ name: e.target.value })
  handleManufacturerChange = e => this.setState({ manufacturer: e.target.value })
  handleCategoryChange = e => this.setState({ category: e.target.value })
  handlePriceChange = e => this.setState({ price: e.target.value })

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
    return data && map(product => (
      <tr class="row-content" key={product.id}>
        <td>{product.name}</td>
        <td>{product.barCode}</td>
        <td>{product.manufacturer}</td>
        <td>{product.category}</td>
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
        "Content-Type": "application/json",
        Authorization: TOKEN,
      },
      body: JSON.stringify({ 
        name,
        barCode,
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
    const { name, barCode, manufacturer, category, price } = this.state
    console.log(this.state)
    return (
      <form onSubmit={e => this.addProduct(e)}>
        <label htmlFor="nameProduct">Nome</label>
        <input id="nameProduct" value={name} onChange={e => this.handleNameChange(e)}></input>
        <label htmlFor="barCodeProduct">Código de Barras</label>
        <input id="barCodeProduct" value={barCode} onChange={e => this.handleBarCodeChange(e)}></input>
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
      <div id="productContainer">
        {isLoading ?
          <Spinner /> : error ?
            <FetchError msg={`${error}`} reload={this.fetchData} /> : (
              <div>
                <h1> Produtos </h1>
                <div class="dropdown">
                  <a class="btn-top" href="#" class="btn btn-primary pull-right" id="add" onClick={() => this.setState({ showModal: true })}> <span class="glyphicon glyphicon-plus"></span> Adicionar Produto</a>
                </div>
                {showModal &&
                  <Modal
                    onCancel={() => this.setState({ showModal: false })}
                    onSubmit={this.addProduct}
                  >
                    {/* {map(item => item, productsRended)} */}
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
/*
<table id="productsTable">
{
  <div id="productsHeader">
    <div>Nome do Produto</div>
    <div>Código de Barras</div>
    <div>Fabricante</div>                    
    <div>Categoria</div>                    
    <div>Preço</div>
    <div>Opções</div>
  </div>
}
{ productsRended && (
  <div id="productsContainer">
    { productsRended }
  </div>
) }
</table>
*/
