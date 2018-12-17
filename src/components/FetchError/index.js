import React, { Component } from 'react'

import './global.css'

export default class FetchError extends Component {
  render() {
    const { reload, msg, success } = this.props
    return (
      <div id="errorContainer" className={`${reload ? 'large' : 'small'} ${success ? 'green' : 'red'}`}>
        <p>{msg}</p>
        {reload && <button onClick={reload}>Recarregar</button>}
      </div>
    )
  }
}