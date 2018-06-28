import React, { PureComponent } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { Provider, connect } from 'react-redux'
import { Form, Input, Modal } from 'antd';

import { setConfg } from '../actions'

const FormItem = Form.Item;


const Popup2 = Form.create({
    onFieldsChange(props, changedFields) {
        props.onChange(changedFields.username.value);
    },
    mapPropsToFields(props) {
        return {
            username: Form.createFormField({
                ...props.fields.username,
                value: props.v
            })
        };
    },
    onValuesChange(_, values) {
        console.log(values);
    },
})((props) => {
    const { getFieldDecorator } = props.form;
    return (
        <Form layout="inline">
            <FormItem label="Username">
                {getFieldDecorator('username', {
                    rules: [{ required: true, message: 'Username is required!' }],
                })(<Input />)}
            </FormItem>
        </Form>
    );
});


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
)(Popup2)


