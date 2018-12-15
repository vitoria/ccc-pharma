import React, { Component } from 'react'
import { BASE_URL, TOKEN } from '../../utils'
import { map } from 'ramda'

import Spinner from  '../Spinner/index'
import FetchError from '../FetchError/index'

export default class Product extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: false,
            data: {}
        }
    }

    fetchData = () => {
        this.setState({ isLoading: true })
        fetch(`${BASE_URL}/products`, {
            method: 'get',
            headers: {
                Authorization: TOKEN,
            },
        })
        .then(response => response.json())
        .then(data => {
            console.log("in fecth", data)
            this.setState({ isLoading: false, data, error: false })
        })
        .catch(error => this.setState({ isLoading: false, data: false, error}))
    }

    componentDidMount = () => {
        this.fetchData()
    }

    renderProducts = () => {
        const { data } = this.state
        console.log(data)
        return data ? map((product, index) => {
            console.log(index)
            return <div key={product}>{ product }</div>
        }, data) : 'Nop'
    }

    render() {
        const { isLoading, error } = this.state
        const productsRended = this.renderProducts()
        console.log(productsRended)
        return (
            <div>
            {isLoading ?
                <Spinner/> : error ?
                    <FetchError msg={`${error}`} reload={this.fetchData}/> : <div>{productsRended}</div>
            }
            </div>
        )
    }
}