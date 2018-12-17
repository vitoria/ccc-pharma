import React, { Component } from 'react'
import { getMissingProducts } from '../../utils'

class ProductsMissing extends Component {
  constructor(props) {
    super(props)
    this.state = {
      product: false,
    }
  }

  componentDidMount = () => {
    getMissingProducts().then(response => {
      console.log(response)
    })
  }

  render() {
    return (
      <div>ProductsMissing</div>
    )
  }
}

export default ProductsMissing