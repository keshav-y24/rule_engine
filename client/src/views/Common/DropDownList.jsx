
import React from "react";
import { Form } from 'react-bootstrap';
import { connect } from "react-redux";
// reactstrap components

import {
    GetCommonData
} from "../../store/actions/CommonAction";

import _ from 'underscore';

class DropDownList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
        }
    }
    componentDidMount() {
        if (this.state.items && this.state.items.length === 0) {
            this.props.GetCommonData({
                root: this.props.col.config.root,
                cols: this.props.col.config.cols,
                con: this.props.col.config.con,
                data: this.props.col.config.data,
                statename: this.props.col.config.statename,
                state: this.props.col.config.state == false ? false : true,
            });
        }
    }
    componentWillReceiveProps(nextProps) {

        if (!nextProps.CommonData.isError) {
            let items = nextProps.CommonData[this.props.col.config.statename ?? this.props.col.config.root];
            
            if (nextProps.col.distinct) {
                //debugger;
                items = _.uniq(items, function (x) {
                    return x.Id;
                });
            }

            this.setState({ items: items });

        }
    }

    displayoption(item) {

        if (this.props.filterkey && this.props.filtervalue) {
            if (this.props.filterkey.toLowerCase() == "productid") {
                if (this.props.filtervalue == 7) {
                    if (item[this.props.filterkey] == 7 || item[this.props.filterkey] == 1000) {                    
                        return <option key={Math.random()} value={item.Id}>{item.Display}</option>
                    }
                }
            }
            if (item[this.props.filterkey] == this.props.filtervalue) {                                                     
                return <option key={Math.random()} value={item.Id}>{item.Display}</option>
            }
        }
        else
            return <option key={item.Id} value={item.Id}>{item.Display}</option>
    }

    render() {

        let { items } = this.state;
        const { value, onChange, visible } = this.props;
        if (!items) {
            items = [];
        }
        if (visible == false) {
            return null;
        }
        return (

            <div>

                <Form.Control as="select" disabled={this.props.disabled} value={value} name={this.props.col.name} onChange={onChange}>
                    <option key={0} value={0}>{this.props.firstoption ? this.props.firstoption : "Select"}</option>
                    {items.map(item => (
                        this.displayoption(item)
                    ))}

                </Form.Control>
            </div>

        );
    }
}
function mapStateToProps(state) {
    return {
        CommonData: state.CommonData
    };
}

export default connect(
    mapStateToProps,
    {
        GetCommonData
    }
)(DropDownList);

