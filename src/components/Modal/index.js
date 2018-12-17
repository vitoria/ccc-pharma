import React, { Component } from 'react'

import './global.css'

class Modal extends Component {
    render() {
        return (
            <div id="modalContainer">
                <div id="modal">
                    <span
                        id="closeBtn"
                        onClick={this.props.onClose}
                    >
                        <i className="fas fa-times" />
                    </span>
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default Modal