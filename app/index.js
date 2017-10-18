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

const history = createHistory()
const sagaMiddleWare = createSagaMiddleware();
const middleware = [sagaMiddleWare, routerMiddleware(history)]

// support redux-dev-tool
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;



// create store
const store = createStore(combineReducers({
    ...reducers,
    router: routerReducer //sync route with redux status
}), composeEnhancers(applyMiddleware(...middleware)))

sagaMiddleWare.run(sagas)



const Home = (props) => {
    const { history } = props
    return <div>
        <p onClick={() => { history.push('/about/A') }} >A</p>
        <p onClick={() => { history.push('/about/B') }} >B</p>
    </div>
}

const Menu = () => (
    <Route render={({ location: { pathname }, history }) => {

        return (<div>

            <div className="nav">
                <Link to="/">home</Link>
                <Link to="/about/">about</Link>

            </div>
            <div hidden={!/\/about\/[^\/]+/.test(pathname)}>
                <Link to="/about/A">aboutA</Link>
                <Link to="/about/B">aboutB</Link>
            </div>
        </div>)
    }



    } />
)

const App = () => (
    <ConnectedRouter basename="/somedir" history={history}>

        <div>
            <Menu />

            <div>
                <Route exact path="/" component={Home} />
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

            </div>

        </div>
    </ConnectedRouter>
)


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