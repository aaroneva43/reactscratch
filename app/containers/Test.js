import React, { PureComponent } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { Provider, connect } from 'react-redux'
import { Form, Input, Modal } from 'antd';

import { setConfg } from '../actions'
import Popup from './Popup2'

class Test extends PureComponent {
    state = {
        fields: {
            username: {
                value: 'benjycui',
            },
            sex: {
                value: 'male',
            },
        },
        modalVisible: true
    };
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

                <button onClick={() => { me.setState({ modalVisible: true }) }}>Show Modal</button>

                <Modal
                    title={'Popup'}
                    visible={me.state.modalVisible}
                    onCancel={() => {
                        me.setState({ modalVisible: false })
                    }}
                >
                    <Popup
                        entry={'yyy'}
                        onChange={(changedFields) => {
                            const setConfig = this.props.setConfg;

                            setConfig({
                                entry: 'yyy',
                                data: changedFields
                            })
                        }}
                        fields={this.state.fields}
                    ></Popup>
                </Modal>
            </div >


        );
    }
}


export default connect((state, ownProps) => {

    const entries = _.get(state, 'config', {})

    return {
        v: _.get(entries, [ownProps.entry], '')
    }

}, {
        setConfg: setConfg
    })(Test)


