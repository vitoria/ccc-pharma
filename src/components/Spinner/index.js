import React, { Component } from 'react'

import './global.css'

export default class Spinner extends Component {
    render() {
        return (
            <div className="lds-hourglass"></div>
        )
    }
}