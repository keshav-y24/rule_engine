
import React from "react";
import { Form } from 'react-bootstrap';
import { connect } from "react-redux";
// reactstrap components

import {
    GetMySqlData
} from "../../store/actions/CommonMysqlAction";
class DropDownListMysql extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
        }
    }
    componentDidMount() {
        if (this.state.items && this.state.items.length === 0) {
            this.CallApi();
        }
    }
    componentWillReceiveProps(nextProps) {
        debugger;
        // if (nextProps.col.config.rebind) {
            
        // }

        if (!nextProps.CommonData.isError) {
            //debugger;
            if (nextProps.CommonData[this.props.col.config.root]) {
                let str = JSON.stringify(nextProps.CommonData[this.props.col.config.root]);
                var res = str.replace(this.props.col.config.Idfield, "Id");
                res = res.replace(this.props.col.config.Displayfield, "Display");

                this.setState({ items: JSON.parse(res) });
            }
        }
    }

    componentWillUpdate(){
        //this.CallApi();
    }

    CallApi() {

        this.props.GetMySqlData({
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
        GetMySqlData
    }
)(DropDownListMysql);

