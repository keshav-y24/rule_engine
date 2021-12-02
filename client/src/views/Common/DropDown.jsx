
import React from "react";
import { Form } from 'react-bootstrap';
import { connect } from "react-redux";
// reactstrap components

import {
    GetCommonData
} from "../../store/actions/CommonAction";
class DropDown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
        }
    }
    componentDidMount() {
    }
    componentWillReceiveProps(nextProps) {
        this.setState({ items: nextProps.items});

    }

    displayoption(item) {        
            return <option key={item.Id} value={item.Id}>{item.Display}</option>
    }

    render() {

        
        let { value, onChange, visible,items } = this.props;
        if (!items) {
            items = [];
        }
        if (visible == false) {
            return null;
        }
        return (

            <div>

                <Form.Control as="select" disabled={this.props.disabled} value={value} onChange={onChange}>
                    <option key={0} value={0}>{this.props.firstoption ? this.props.firstoption : "Select"}</option>
                    {items.map(item => (
                        this.displayoption(item)
                    ))}

                </Form.Control>
            </div>

        );
    }
}


export default DropDown;

