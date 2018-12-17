import React, { Component } from 'react'
import { deleteProductBatch } from '../../utils'

class BatchItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      deleted: false,
    }
  }

  handleDeleteBatch = () => {
    deleteProductBatch(this.props.batch.id).then(response => {
      if (response.status === 200) {
        this.setState({ deleted: true })
        this.props.onSuccess()
      } 
    })
  }

  render() {
    const { deleted } = this.state
    const { batch: {
      id,
      quantity,
      expirationDate,
    } } = this.props
    return !deleted ? (
      <tr className="row-content" key={id}>
        <td>{id}</td>
        <td>{quantity}</td>
        <td>{expirationDate}</td>
        <td>
          <div className="btn btn-danger edit" onClick={this.handleDeleteBatch}>
            <i className="fa fa-trash" aria-hidden="true"></i>
          </div>
        </td>
        {/* {showInfo && <ProductInfo product={product} />} */}
      </tr>
    ) : null
  }
}

export default BatchItem