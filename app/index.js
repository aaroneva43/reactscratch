import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { createStore } from 'redux'
import { Provider, connect } from 'react-redux'

import Posts from './containers/Posts'


const store = createStore(counter)

ReactDOM.render(

    <Provider store={store}>
       <Posts></Posts>
    </Provider>,
    document.getElementById('root')
)