import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { createStore } from 'redux'
import { Provider, connect } from 'react-redux'

import { Router, Route, browserHistory } from 'react-router'

class Counter extends Component {
    render() {
        const { value, onBtnClick } = this.props
        return (
            <div>
                <span>{value}</span>
                <button onClick={(evt) => { onBtnClick(evt.target.textContent) }}>Increase</button>
                <button onClick={(evt) => { onBtnClick(evt.target.textContent) }}>Decrease</button>
            </div>
        )
    }
}

Counter.PropTypes = {
    value: PropTypes.number.isRequired,
    onBtnClick: PropTypes.func.isRequired
}


function counter(state = { count: 10 }, action) {
    const count = state.count
    switch (action.type) {
        case 'numchange':
            return action.payload == 'increase' ? { count: count + 1 } : { count: count - 1 }
        default:
            return state
    }
}

const store = createStore(counter)

const getNumAction = (text) => {
    return { type: 'numchange', payload: text == 'Increase' ? 'increase' : 'decrease' }
}

const App = connect(
    (state) => {
        return {
            value: state.count
        }
    },
    (dispatch) => {
        return {
            onBtnClick: (text) => dispatch(getNumAction(text))
        }
    }
)(Counter)

const Bpp = connect(
    (state) => {
        return {
            value: state.count
        }
    },
    (dispatch) => {
        return {
            onBtnClick: (text) => dispatch(getNumAction(text))
        }
    }
)((self) => {
    
    const { value, onBtnClick } = self
    return (<div>Bpp value:{value}</div>)
})

ReactDOM.render(

    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={App} />
            <Route path="/b" component={Bpp} />
        </Router>
    </Provider>,
    document.getElementById('root')
)