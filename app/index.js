import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import { Provider, connect } from 'react-redux'
import 'babel-polyfill'
import createSagaMiddleware from 'redux-saga'
import sagas from './sagas'

import createHistory from 'history/createBrowserHistory'
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'


import {
    Router,
    Route,
    Link
} from 'react-router-dom';



import reducers from './reducers'
import Posts from './containers/Posts'
import styles from './index.scss'

import Devices from './containers/Devices'

const history = createHistory()
const sagaMiddleWare = createSagaMiddleware();
const middleware = [sagaMiddleWare, routerMiddleware(history)]

// support redux-dev-tool
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;



// create store
const store = createStore(reducers, composeEnhancers(applyMiddleware(...middleware)))

// run saga, watch 
sagaMiddleWare.run(sagas)


const Modal = ({ match, history }) => {

    const back = (e) => {
        e.stopPropagation()
        history.goBack()
    }
    return (
        <div
            onClick={back}
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                background: 'rgba(0, 0, 0, 0.15)'
            }}
        >
            <div className='modal' style={{
                position: 'absolute',
                background: '#fff',
                top: 25,
                left: '10%',
                right: '10%',
                padding: 15,
                border: '2px solid #444'
            }}>
                <h1>{123}</h1>
                <div color={'#pink'} />
                <button type='button' onClick={back}>
                    Close
          </button>
            </div>
        </div>
    )
}
const previousLocation = ''

const Menu = () => (
    <Route render={({ location, location: { pathname }, history }) => {

        return (<div>

            <div className="nav">
                <Link to="/" >home</Link>
                <Link to="/about/">about</Link>
                <Link to={{
                    pathname: `/modal/`,
                    state: { modal: true }
                }}>modal</Link>

            </div>
            <div hidden={!/\/about\/[^\/]+/.test(pathname)}>
                <Link to="/about/A">aboutA</Link>
                <Link to="/about/B">aboutB</Link>
            </div>
        </div>)
    }



    } />
)


const Main = ({ location }) => {
    return (
        <div>
            <Route exact
                path="/"
                component={Devices}
            />

            <Route path="/about/:id?"
                render={
                    ({ history, location, match }) => {
                        console.log(match.params.id)
                        return (<div>
                            {match.params.id || 'about'}
                        </div>)
                    }

                }
            />
            <Route exact
                path="/modal/"
                component={Modal}
            />

        </div>
    )
}
const App = () => {
    
    return (<ConnectedRouter basename="/somedir" history={history}>

        <div>
            <Menu />

            <Main />

        </div>
    </ConnectedRouter>)
}




ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, document.getElementById('root'))

// ReactDOM.render(

//     <Provider store={store}>
//         <Posts></Posts>
//     </Provider>,
//     document.getElementById('root')
// )