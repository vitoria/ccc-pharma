import React, { Component } from 'react'

import './global.css'

export default class FetchError extends Component {
    render() {
        const { reload, msg } = this.props
        return (
            <div id="errorContainer">
                <p>{msg}</p>
                <button onClick={reload}>Recarregar</button>
            </div>
        )
    }
}