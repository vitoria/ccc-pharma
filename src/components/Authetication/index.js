import React, { Component } from 'react'
import Login from './Login/index'
import Register from './Register/index'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { instanceOf, PropTypes } from 'prop-types'
import { withCookies, Cookies } from 'react-cookie'
import { withRouter } from 'react-router-dom'

import './global.css'

class Authetication extends Component {
    constructor(props) {
        super(props)
        this.state = { isOnLogin: true }
    }

    static propTypes = {
        cookies: instanceOf(Cookies).isRequired,
        history: PropTypes.shape({
            push: PropTypes.func.isRequired
        })
    }

    componentDidMount = () => {
        this.props.cookies.get('ccc-pharma-token') && this.props.history.push('/')
    }

    componentDidUpdate = () => {
        this.props.cookies.get('ccc-pharma-token') && this.props.history.push('/')
    }

    render() {
        return (
            <Router>
            <div id="authetication">
                <div id="authContainer">
                    <Route exact path="/login" component={Login} />
                    <Route path="/login/:registered" component={Login} />
                    <Route exact path="/register" component={Register} />
                </div>
            </div>
            </Router>
        )
    }
}

export default withRouter(withCookies(Authetication))