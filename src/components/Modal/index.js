import React, { Component, Fragment } from 'react'

import './global.css'

class Modal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpen: true
    }
  }

  handleOnCloseBtnClick = () => (
    this.props.onClose ?
      this.props.onClose() :
      this.setState({ isOpen: false })
  )

  render() {
    const { isOpen } = this.state
    const { children } = this.props
    return isOpen ? (
      <div id="modalContainer">
        <div id="modal">
          <span
            id="closeBtn"
            onClick={this.handleOnCloseBtnClick}
          >
            <i className="fas fa-times" />
          </span>
          {children}
        </div>
      </div>
    ) : null
  }
}

export default Modal