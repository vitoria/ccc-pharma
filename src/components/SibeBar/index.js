import React, { Component } from 'react'
import { map } from 'ramda'

import './global.css'

const options = [
    {
        name: 'Home',
        link: 'home'
    },
    {
        name: 'Produtos',
        link: 'produtos'
    }
]

export default class SideBar extends Component {
    render() {
        return (
            <nav>
                { map(option => <span>{option.name}</span>, options) }
            </nav>
        )
    }
}