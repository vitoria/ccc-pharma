import React, { Component } from 'react'
import { Link } from 'react-router-dom'
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
                {/* { map(option => <Link to={{pathname:"/2"}}><span>{option.name}</span></Link>, options) } */}
            </nav>
        )
    }
}