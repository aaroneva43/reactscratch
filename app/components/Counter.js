import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Counter extends Component {
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