
import React from "react";
import { Form } from 'react-bootstrap';
import { connect } from "react-redux";
// reactstrap components

import {
    GetCommonData
} from "../../store/actions/CommonMongoAction";
class DropDownListMongo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
        }
    }
    componentDidMount() {
        if (this.state.items && this.state.items.length === 0) {
            this.props.GetCommonData({
                limit: 10,
                skip: 0,
                root: this.props.col.config.root,
                cols: this.props.col.config.cols,
                con: this.props.col.config.con,
                data: this.props.col.config.data,
                statename: this.props.col.config.statename,
                state: this.props.col.config.state
            });
        }
    }
    componentWillReceiveProps(nextProps) {

        if (!nextProps.CommonData.isError) {
            if (nextProps.CommonData[this.props.col.config.root]) {
                let str = JSON.stringify(nextProps.CommonData[this.props.col.config.root]);
                var res = str.replace(this.props.col.config.Idfield, "Id");
                res = res.replace(this.props.col.config.Displayfield, "Display");

                this.setState({ items: JSON.parse(res) });
            }
        }
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
                    <option key={0} value={0}>Select</option>
                    {items.map(item => (
                        <option key={item.Id} value={item.Id}>{item.Display}</option>
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
)(DropDownListMongo);

