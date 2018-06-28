import React, { Component, createElement } from 'react'
import ReactDOM from 'react-dom'

import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'

import createHistory from 'history/createBrowserHistory'
import { ConnectedRouter, routerMiddleware } from 'react-router-redux'

import 'babel-polyfill'
import createSagaMiddleware from 'redux-saga'
import sagas from './sagas'

import { Router, Switch, Redirect, Route } from 'react-router-dom';

import reducers from './reducers'


const history = createHistory()
const middleware = [routerMiddleware(history)]

// support redux-dev-tool
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// create store
const store = createStore(reducers, composeEnhancers(applyMiddleware(...middleware)))


import App from './containers/App';

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Switch>
                <Redirect from="/" exact to="/main" render={({ location }) => { return '' }} />

                <Route path="/" render={({ location }) => { return createElement(App, { location }) }} />
            </Switch>
        </ConnectedRouter>

    </Provider>, document.getElementById('root')
)
