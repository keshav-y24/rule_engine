
import React from "react";

import {
    GetCommonData, GetCommonspData, GetDataDirect
} from "../../store/actions/CommonAction";
import { getUrlParameter, getuser } from '../../utility/utility.jsx';


import { Row, Col } from 'react-bootstrap';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import CheckboxTree from 'react-checkbox-tree';

class ManagerHierarchy extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nodes: [],
            checked: [],
            expanded: [],
        }
        //this.onExpand = this.onExpand.bind(this);
    }
    componentDidMount() {

        let UserId = getuser().RoleId == 2 ? 75 : getuser().UserID;

        GetDataDirect({
            root: "Hierarchy",
            ManagerId: UserId,
            statename: "Hierarchy-" + UserId,
            value: this.props.value,
            state: true
        }, function (result) {

            let str = JSON.stringify(result);
            var res = str.replace(/UserName/g, "label");
            res = res.replace(this.props.value, "value");

            this.setState({ nodes: JSON.parse(res) });
        }.bind(this));
    }
    componentWillReceiveProps(nextProps) {

    }


    onButtonClick() {
        this.props.handleShow({
            SelectedSupervisors: this.state.checked
        });
        this.forceUpdate();
    }
    onMouseEnter(e) {
        document.getElementById("floating").style.right = 0
        document.getElementById("handle").style.right = "395px"
        //e.target.style.right = 0;
    }
    onMouseOut(e) {
        setTimeout(function () {
            document.getElementById("floating").style.right = "-400px"
            document.getElementById("handle").style.right = "-15px"
        }, 700);

        //e.target.style.right = "-350px";
    }
    RemoveChecked(checkeditem) {
        const { checked } = this.state;
        let index = checked.indexOf(checkeditem);
        if (index > -1) {
            checked.splice(index, 1);
        }
        this.setState(checked);
    }
    onClick() {

    }
    render() {
        const { nodes, checked } = this.state;
        if (nodes.length == 0) {
            return null;
        }
        return (


            <div id="floating" className="floating" onMouseLeave={this.onMouseOut}>

                <Row >
                    <Col md="8"><div id="handle" className="handle" onClick={this.onMouseEnter}>Filter</div></Col>
                    <Col md="4"><input type="button" className="btn btn-primary" onClick={this.onButtonClick.bind(this)} value="Show" /></Col>
                </Row>

                <Row>
                    <Col>

                        <div className="managers">
                            <CheckboxTree
                                nodes={nodes}
                                checked={this.state.checked}
                                expanded={this.state.expanded}
                                checkModel="all"
                                name="UserName"
                                showNodeIcon={false}
                                onCheck={checked => this.setState({ checked })}
                                onExpand={expanded => this.setState({ expanded })}
                                showExpandAll={true}
                            />
                        </div>
                    </Col>
                </Row>



            </div>

        )
    }
}

export default ManagerHierarchy;
