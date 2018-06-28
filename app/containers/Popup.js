import React, { PureComponent } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { Provider, connect } from 'react-redux'
import { Form, Input } from 'antd';

import { setConfg } from '../actions'

class Popup extends PureComponent {

    onChange = (e) => {
        const setConfig = this.props.setConfg;

        setConfig({
            entry: this.props.entry,
            data: e.target.value
        })
    }
    render() {
        const me = this;

        const { v } = me.props;

        return (
            <div>
                <input onChange={me.onChange.bind(me)} value={v}></input>
                <br />
                <br />
                <input onChange={me.onChange.bind(me)} value={v}></input>

            </div>
        );
    }
}


export default connect(
    (state, ownProps) => {

        const entries = _.get(state, 'config', {})

        return {
            v: _.get(entries, [ownProps.entry], '')
        }

    },
    {
        setConfg: setConfg
    }
)(Popup)


