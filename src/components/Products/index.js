import React, { Component } from 'react'
import { BASE_URL, TOKEN } from '../../utils'

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
        .then(data => this.setState({ isLoading: false, data, error: {} }))
        .catch(error => this.setState({ isLoading: false, data: {}, error}))
    }

    componentDidMount = () => {
        this.fetchData()
    }

    render() {
        const { isLoading, error } = this.state
        return (
            <div>
            {isLoading ?
                <Spinner/> : error ?
                    <FetchError msg={`${error}`} reload={this.fetchData}/> : 'Helloooo'
            }
            </div>
        )
    }
}