import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { createStore, applyMiddleware } from 'redux'
import { Provider, connect } from 'react-redux'
import 'babel-polyfill'
import createSagaMiddleware from 'redux-saga';
import sagas from './sagas'



import reducers from './reducers'
import Posts from './containers/Posts'

const sagaMiddleWare = createSagaMiddleware();
const middleware = [sagaMiddleWare]
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers, composeEnhancers(
    applyMiddleware(...middleware)
))
sagaMiddleWare.run(sagas)



ReactDOM.render(

    <Provider store={store}>
        <Posts></Posts>
    </Provider>,
    document.getElementById('root')
)