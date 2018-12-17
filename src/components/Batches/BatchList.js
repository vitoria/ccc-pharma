import React, { Component } from 'react'
import BatchItem from './BatchItem'
import { getProductBatches, addProductBatch } from '../../utils'
import FetchError from '../FetchError/index'
import { map } from 'ramda'

import './global.css'

class BatchList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      batches: false,
      error: false,
      batch: {
        quantity: '',
        expirationDate: '',
      },
    }
  }

  handleOnDateChange = e => this.setState({
    batch: {
      expirationDate: e.target.value,
      quantity: this.state.batch.quantity,
    }
  })
  handleOnQuantityChange = e => this.setState({
    batch: {
      quantity: e.target.value,
      expirationDate: this.state.batch.expirationDate,
    }
  })

  fetchBatches = () => {
    const { productId } = this.props
    getProductBatches(productId)
      .then(response => {
        if (response.status === 200) {
          response.json().then(objJSON => {
            this.setState({ batches: objJSON, error: false, isAdding: false })
          })
        } else {
          this.setState({ error: 'Não foi possível carregar', isAdding: false })
        }
      })
      .catch(err => this.setState({ error: err }))
  }

  addBatch = () => {
    const { batch: { quantity, expirationDate } } = this.state
    addProductBatch(this.props.productId, { quantity: parseInt(quantity), expirationDate })
      .then(response => {
        if (response.status === 200) {
          this.props.onSuccess()
          this.fetchBatches()
        }
      })
      .catch(err => console.log(err))
  }

  renderBatches = () => {
    const { batches } = this.state
    return map(batch => (
      <BatchItem key={batch.id} batch={batch} onSuccess={this.props.onSuccess} />
    ), batches)
  }

  componentDidMount = () => this.fetchBatches()
  render() {
    const { error, isAdding, batch: { quantity, expirationDate } } = this.state
    return !error ? (
      <div>
        {isAdding ? (
          <div id="addBatchContainer">
            <input type="number" value={quantity} onChange={e => this.handleOnQuantityChange(e)} />
            <input type="date" value={expirationDate} onChange={e => this.handleOnDateChange(e)}/>
            <div className="btn btn-primary" id="add" onClick={this.addBatch}>
              <span className="glyphicon glyphicon-plus" />
            </div>
          </div>
        ) : (
            <div className="flex flex-row-reverse">
              <div className="btn btn-primary" id="add" onClick={() => this.setState({ isAdding: true })}>
                <span className="glyphicon glyphicon-plus" />
              </div>

            </div >
          )
        }
        <table className="table table-striped">
          <thead>
            <tr className="row-name">
              <th>Código</th>
              <th>Quantidade</th>
              <th>Data de Validade</th>
              <th>Opções</th>
            </tr>
          </thead>
          <tbody>
            {this.renderBatches()}
          </tbody>
        </table>
      </div >
    ) : (
        <FetchError msg={`${error}`} reload={this.fetchBatches} />
      )
  }
}

export default BatchList