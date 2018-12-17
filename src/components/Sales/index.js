import React, { Component } from 'react'
import animation from '../../asserts/animation1.gif'

class Sales extends Component {
    render() {
        return (
            <div className="flex-column">
                <div><img src={animation}></img></div>
                <span>A culpa é do back...</span>
            </div>
        )
    }
}

export default Sales