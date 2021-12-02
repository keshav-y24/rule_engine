
import React from "react";
import {
    GetCommonData, GetCommonspData, GetDataDirect
} from "../../store/actions/CommonAction";
import { cloneDeep } from "@babel/types";
import { If, Then, Else } from 'react-if';

//import TreeView from "./TreeView";


class TreeView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nodes: []
        }
        this.onClick = this.onClick.bind(this);
        this.onCheckedChange = this.onCheckedChange.bind(this);

    }
    componentDidUpdate() {

    }
    componentWillReceiveProps(nextProps) {

    }



    onClick(item) {
        GetDataDirect({
            root: "Hierarchy",
            ManagerId: item.UserID,
            statename : "Hierarchy-"+ item.UserID,
            state: true
        }, function (result) {
            this.props.nodes.childern = result;
            this.setState({ nodes: result });
        }.bind(this));
    }
    onCheckedChange(e, i) {

        if (e.target.checked) {
            let index = this.props.checked.indexOf(i);
            if (index == -1) {
                this.props.checked.push(i);
            }
        }
        else {
            let index = this.props.checked.indexOf(i);
            if (index > -1) {
                this.props.checked.splice(index, 1);
            }
        }
        this.forceUpdate();
    }

    onRenderCondition(item) {
        const { checked } = this.props;
        let inputChecked = false;
        //let prefix = "+";        
        if (this.props.ManagerId == item.ManagerId) {
            if (checked.indexOf(item) > -1) {
                inputChecked = true;
            }
            if (item.RoleId == 12) {
                return <li key={item.UserID} className="list-group-item ">
                    <input type="checkbox" checked={inputChecked} onChange={(event) => this.onCheckedChange(event, item)} ></input>
                    <span >{item.UserName}</span>
                    <TreeView ManagerId={item.UserID} key={Math.random()} nodes={this.props.nodes.childern} checked={checked}></TreeView>
                </li>
            }


            return <li key={item.UserID} className="list-group-item">
                <span>{item.UserName}</span>
                <TreeView ManagerId={item.UserID} key={Math.random()} nodes={this.props.nodes.childern} checked={checked}></TreeView>
            </li>
        }

        else {
            return null;
        }


    }

    render() {
        const { nodes, checked } = this.props;
        if (nodes) {
            
            return (

                <ul className="list-group reportings" >
                    {nodes.map(item => (
                        this.onRenderCondition(item)

                    ))}
                </ul>

            )
        }
        else {
            return null;
        }
    }
}

export default TreeView;
