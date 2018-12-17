import React, { Component } from 'react'
import { BASE_URL } from '../../utils'

const categories = {
  MEDICINE: 'Medicamento',
  COMSMETIC: 'Cosmético',
  FOOD: 'Alimento',
  HYGIENE: 'Higiene'
}

const getStatus = status => status === 'UNAVAILABLE' ? 'Indisponível' : 'Disponível'

class ProductItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      deleted: false,
    }
  }

  handleDeleteProduct = () => {
    fetch(`${BASE_URL}/products/${this.props.product.id}`, {
      method: 'delete'
    }).then(response => {
      if (response.status === 200) {
        this.setState({ deleted: true })
      } else {
        console.log('Something went wrong')
      }
    }).catch(err => console.log(err))
  }

  render() {
    const {
      product: {
        id,
        barCode,
        name,
        manufacturer,
        category,
        status,
        price,
      }
    } = this.props
    console.log(this.state)
    return !this.state.deleted ? (
      <tr className="row-content" key={id}>
        <td>{name}</td>
        <td>{barCode}</td>
        <td>{manufacturer}</td>
        <td>{categories[category]}</td>
        <td>{status !== 'UNAVAILABLE' ? price : '-'}</td>
        <td>
          <span className={`badge ${status}`}>
            {getStatus(status)}
          </span>
        </td>
        <td>
          <div className="btn btn-danger edit" onClick={this.handleDeleteProduct}>
            <i className="fa fa-trash" aria-hidden="true"></i>
          </div>
          &nbsp;
              <div className="btn btn-info edit">
            <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
          </div>
        </td>
      </tr>
    ) : null
  }
}

export default ProductItem