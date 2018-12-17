import React, { Component } from 'react'

import './global.css'

class Modal extends Component {
  render() {
    const { children, onClose } = this.props
    return (
      <div id="modalContainer">
        <div id="modal">
          <span
            id="closeBtn"
            onClick={onClose}
          >
            <i className="fas fa-times" />
          </span>
          {children}
        </div>
      </div>
    )
  }
}

export default Modal