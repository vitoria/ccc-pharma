import React, { Component } from 'react'
import AuthenticationBtn from '../Authetication/AuthenticationBtn/index'

import './global.css'

export default class Header extends Component {
    render() {
        return (
            <header>
                <span>CCC Pharma</span>
                <AuthenticationBtn />
            </header>
        )
    }
}