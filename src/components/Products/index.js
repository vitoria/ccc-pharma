import React, { Component, Fragment } from 'react'
import { withCookies } from 'react-cookie'
import {
  getCurrentUser,
  getProducts,
  addProduct,
  getToken,
} from '../../utils'

import Modal from '../Modal/index'
import Spinner from '../Spinner/index'
import FetchError from '../FetchError/index'
import ProductList from './ProductList'
import ProductForm from './ProductForm'
import DiscountForm from './DiscountForm'

import './global.css'

class Products extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      data: false,
      isAdmin: false,
      filter: 'TODOS',
    }
  }

  handleFilterChange = e => {
    this.setState({ filter: e.target.value })
    this.fetchData(e.target.value)
  }

  fetchData = category => {
    this.setState({ isLoading: true })
    getProducts(category)
      .then(response => {
        if (response.status === 200) {
          return response.json()
        } else {
          this.setState({
            isLoading: false,
            data: false,
            error: 'Não foi possível carregar a nossa base de dados',
            showModal: false,
            showModalDiscount: false,
          })
        }
      })
      .then(data => {
        this.setState({ isLoading: false, data: data, error: false, showModal: false, showModalDiscount: false })
      })
      .catch(error => this.setState({ isLoading: false, data: false, error, showModal: false, showModalDiscount: false }))
  }

  componentWillMount = () => {
    this.fetchData()
    this.setState({ isAdmin: this.props.cookies.get('waza') === 'true'})
  }

  addProduct = product => {
    addProduct(product)
      .then(response => {
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

  renderCreateProduct = () => (
    <Fragment>
      <h3>Cadastro de Produto</h3>
      <ProductForm onSuccess={this.addProduct} onCancel={this.closeModal} />
    </Fragment>
  )

  renderAddDiscount = () => (
    <Fragment>
      <h3>Atribuir Desconto por Categoria</h3>
      <DiscountForm onSuccess={this.fetchData} onCancel={() => this.setState({ showModalDiscount: false })} />
    </Fragment>
  )

  render() {
    const { isLoading, error, showModal, showModalDiscount, filter, data, isAdmin } = this.state
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
                  {isAdmin && (
                    <div className="btn-primary customBtn" id="add" onClick={() => this.setState({ showModal: true })}>
                      <span className="glyphicon glyphicon-plus" />
                      &nbsp;
                      <span>Adicionar Produto</span>
                    </div>
                  )}
                  &nbsp;
                  &nbsp;
                  {isAdmin && (
                    <div className="btn-primary customBtn" id="add" onClick={() => this.setState({ showModalDiscount: true })}>
                      <span className="glyphicon glyphicon-plus" />
                      &nbsp;
                      <span>Atribuir Desconto</span>
                    </div>
                  )}
                </div>
                {showModal &&
                  <Modal
                    onClose={() => this.setState({ showModal: false })}
                  >
                    {this.renderCreateProduct()}
                  </Modal>
                }
                {showModalDiscount &&
                  <Modal
                    onClose={() => this.setState({ showModalDiscount: false })}
                  >
                    {this.renderAddDiscount()}
                  </Modal>
                }
                <ProductList products={data} isAdmin={isAdmin} />
              </div>
            )
        }
      </div>
    )
  }
}

export default withCookies(Products)