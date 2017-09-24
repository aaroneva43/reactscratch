import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { createStore, applyMiddleware } from 'redux'
import { Provider, connect } from 'react-redux'
import createSagaMiddleware, { END } from 'redux-saga';


import reducers from './reducers'
import Posts from './containers/Posts'


const middleware = [createSagaMiddleware]
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers, composeEnhancers(
    applyMiddleware(...middleware)
))


ReactDOM.render(

    <Provider store={store}>
       <Posts></Posts>
    </Provider>,
    document.getElementById('root')
)