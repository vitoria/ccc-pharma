import React, { Component } from 'react'
import Login from './Login/index'
import Register from './Register/index'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import './global.css'

class Authetication extends Component {
    constructor(props) {
        super(props)
        this.state = { isOnLogin: true }
    }

    render() {
        return (
            <Router>
            <div id="authetication">
                <div id="authContainer">
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                </div>
            </div>
            </Router>
        )
    }
}

export default Authetication