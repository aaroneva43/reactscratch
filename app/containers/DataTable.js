import React, { PureComponent } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { Provider, connect } from 'react-redux'
import { Form, Input } from 'antd';
const FormItem = Form.Item;
const createFormField = Form.createFormField

const CustomizedForm = Form.create({
    onFieldsChange(props, changedFields) {
        props.onChange(changedFields);
    },
    mapPropsToFields(props) {
        return {
            username: createFormField({
                ...props.username,
                value: props.username.value,
            }),
            sex: createFormField({
                ...props.sex,
                value: props.sex.value,
            }),
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

            <FormItem label="Sex">
                {getFieldDecorator('sex', {
                    rules: [{ required: true, message: 'Sex is required!' }],
                })(<Input />)}

            </FormItem>


        </Form>
    );
});

class Demo extends PureComponent {
    state = {
        fields: {
            username: {
                value: 'benjycui',
            },
            sex: {
                value: 'male',
            },
        },
    };
    handleFormChange = (changedFields) => {
        this.setState({
            fields: { ...this.state.fields, ...changedFields },
        });
    }
    render() {
        const fields = this.state.fields;
        return (
            <div>
                <CustomizedForm {...fields} onChange={this.handleFormChange} />
                <pre className="language-bash">
                    {JSON.stringify(fields, null, 2)}
                </pre>
            </div>
        );
    }
}

class Test extends PureComponent {
    render() {

        return <div>dddddddd</div>
    }
}

export default connect((state) => {
    return {
        entries: _.get(state, 'config.entries')
    }
})(Demo)


