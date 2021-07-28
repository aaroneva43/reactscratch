import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider, connect } from 'react-redux'
import thunk from 'redux-thunk'

import { Router, Route } from 'react-router'
import { createBrowserHistory } from 'history'

import MobxTimer from './containers/MobxTimer'
import Posts from './containers/Posts'
import Counter from './components/Counter'


import reducers from './reducers'
import { appActions, INVALIDATE_POSTS, RECEIVE_POSTS, REQUEST_POSTS } from './actions'

const browserHistory = createBrowserHistory();
const middleware = [thunk]
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers, {}, composeEnhancers(
    applyMiddleware(...middleware)
))

ReactDOM.render(

    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={
                connect(
                    (state) => {
                        return {
                            value: state.count
                        }
                    },
                    (dispatch) => {
                        return {
                            onBtnClick: (text) => dispatch(appActions.getNumAction(text))
                        }
                    }
                )(Counter)
            } />
            <Route path="/b" component={
                Posts
            } />
            <Route path="/mobxtimer" component={
                MobxTimer
            } />
        </Router>
    </Provider>,
    document.getElementById('root')
)

