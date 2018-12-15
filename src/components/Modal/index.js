import React, { Component } from 'react'

import './global.css'

class Modal extends Component {
    render() {
        return (
            <div id="modalContainer">
                <div id="modal">
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default Modal