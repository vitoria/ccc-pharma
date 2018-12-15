import React, { Component } from 'react'

import './global.css'

export default class Container extends Component {
    render() {
        const { children } = this.props
        return (
            <div id="mainContainer">
                {children}
            </div>
        )
    }
}