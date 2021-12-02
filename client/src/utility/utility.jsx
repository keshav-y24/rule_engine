
import React from "react";
import { Form } from 'react-bootstrap';
import * as Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css'
import Moment from 'react-moment';
import moment from 'moment';
import {

    Col
} from "reactstrap";

import DropDownList from "views/Common/DropDownList.jsx"

export function fnBindRootData(col, props) {
    if (col.type === "dropdown") {
        props.GetCommonData({
            limit: 10,
            skip: 0,
            root: col.config.root,
            cols: col.config.cols,
            con: col.config.con,
            data: col.config.data,
            state: true,
            statename: col.config.statename
        });
    }
}

export function fnRenderfrmControl(col, formvalue, handleChange, event) {

    if (col) {
        // if (col.editable === false && (event === "Edit" || event === "Copy")) {
        //     return <Form.Group as={Col} md={3} controlId={col.name}>
        //         <Form.Label>{col.label}</Form.Label>
        //         <Form.Control disabled="disabled" type="text" placeholder={"Enter " + col.label} value={formvalue[col.name]} />
        //     </Form.Group>
        // }
        var name = col.alias ? col.alias : col.name;

        if (col.type === "bool") {
            return <Form.Group as={Col} md={1} controlId={name} key={name}>
                <Form.Label>{col.label}</Form.Label>
                <input type="checkbox"
                    label=""
                    disabled={(col.editable === false && event === "Edit") ? "disabled" : ""}
                    onChange={handleChange}
                    checked={formvalue[name]}
                    name={name} id={name} />
            </Form.Group>
        }
        if (col.type === "dropdown") {
            let filterkey = null;
            let filtervalue = null;
            if (col && col.config && col.config.cols && col.config.cols.length > 2) {
                filterkey = col.config.cols[2];
                filtervalue = formvalue[filterkey];
            }
            return <Form.Group as={Col} md={3} controlId={name} key={name}>
                <Form.Label>{col.label}</Form.Label>
                <DropDownList
                    disabled={(col.editable === false && (event === "Edit")) ? "disabled" : ""}
                    visible={true} col={col}
                    value={formvalue[name]}
                    filterkey={filterkey}
                    filtervalue={filtervalue}
                    onChange={handleChange} />
            </Form.Group>
        }
        if (col.type === "textarea") {
            return <Form.Group as={Col} md={6} controlId={name} key={name}>
                <Form.Label>{col.label}</Form.Label>
                <Form.Control required
                    disabled={(col.editable === false && (event === "Edit")) ? "disabled" : ""}
                    type="text" onChange={handleChange} as="textarea" placeholder={"Enter " + col.label} value={formvalue[name]} />
            </Form.Group>
        }
        if (col.type === "int" || col.type === "number" || col.type === "decimal") {
            return <Form.Group as={Col} md={2} controlId={name} key={name}>
                <Form.Label>{col.label}</Form.Label>
                <Form.Control required
                    disabled={(col.editable === false && (event === "Edit")) ? "disabled" : ""}
                    type="number" onChange={handleChange} placeholder={"Enter " + col.label} value={formvalue[name]} />
            </Form.Group>
        }
        if (col.type === "hidden" || col.hide) {
            return null;
        }
        if (col.type === "datetime") {
            let datestr = formvalue[name];
            if (datestr === "") {
                datestr = new Date();
            } else {
                datestr = new Date(datestr);
            }

            return <Form.Group as={Col} md={3} controlId={name} key={name}>
                <Form.Label>{col.label}</Form.Label>
                <Datetime value={datestr}

                    id={name} dateFormat="YYYY-MM-DD"
                    timeFormat={true}
                    onChange={moment => handleChange(moment, name)}
                    utc={true}
                    inputProps={{
                        id: name,
                        name: name,
                        required: true,
                        disabled: (col.editable === false && (event === "Edit")) ? "disabled" : ""
                    }} />

            </Form.Group>
        }
        if (col.type === "time") {
            let datestr = formvalue[name]
            if (datestr === "") {
                datestr = new Date();
            } else {
                datestr = new Date(datestr);
            }

            return <Form.Group as={Col} md={3} controlId={name} key={name}>
                <Form.Label>{col.label}</Form.Label>
                <Datetime

                    value={datestr} id={name} dateFormat={false} utc={true}
                    onChange={moment => handleChange(moment, name)} timeFormat={true}
                    inputProps={{
                        id: name,
                        name: name,
                        required: true,
                        disabled: (col.editable === false && (event === "Edit")) ? "disabled" : ""
                    }} />

            </Form.Group>
        }


        return <Form.Group as={Col} md={3} key={name} controlId={name}>
            <Form.Label>{col.label}</Form.Label>
            <Form.Control
                disabled={(col.editable === false && (event === "Edit")) ? "disabled" : ""}
                type="text" onChange={handleChange} placeholder={"Enter " + col.label} value={formvalue[name]} />
        </Form.Group>
    }
    else return null;
}
export function getMax(arr, prop) {
    var max;
    for (var i = 0; i < arr.length; i++) {
        if (max === null || parseInt(arr[i][prop]) > parseInt(max[prop]))
            max = arr[i];
    }
    return max;
}




export function fnDatatableCol(columnlist) {

    var columns = []
    columnlist.forEach(col => {
        if (!col.hide) {
            if (col.type === "datetime") {
                columns.push({
                    name: col.label,
                    selector: col.alias ? col.alias : col.name,
                    sortable: col.sortable === undefined ? true : col.sortable,
                    searchable: col.searchable === undefined ? false : col.searchable,
                    width: "150px",
                    cell: row => row[col.name] ? <Moment format="DD/MM/YYYY HH:mm:ss" utc={true}>{row[col.name]}</Moment> : "N.A",
                })
            } else if (col.type === "time") {
                columns.push({
                    name: col.label,
                    selector: col.alias ? col.alias : col.name,
                    sortable: col.sortable === undefined ? true : col.sortable,
                    searchable: col.searchable === undefined ? false : col.searchable,
                    cell: row => <Moment format="HH:mm:ss">{row[col.name]}</Moment>,
                })
            } else if (col.type === "bool") {
                columns.push({
                    name: col.label,
                    selector: col.alias ? col.alias : col.name,
                    sortable: col.sortable === undefined ? true : col.sortable,
                    searchable: col.searchable === undefined ? false : col.searchable,
                    cell: row => <span>{row[col.alias ? col.alias : col.name] ? 'Yes' : 'No'}</span>,
                });
            } else if (col.type === "dropdown") {
                columns.push({
                    name: col.label,
                    selector: col.alias ? col.alias + "_display" : col.name + "_display",
                    sortable: col.sortable === undefined ? true : col.sortable,
                    searchable: col.searchable === undefined ? false : col.searchable,
                    type: col.type === undefined ? false : col.type,
                    config: col.config === undefined ? false : col.config,
                })
            }
            else {
                columns.push({
                    name: col.label,
                    selector: col.alias ? col.alias : col.name,
                    sortable: col.sortable === undefined ? true : col.sortable,
                    searchable: col.searchable === undefined ? false : col.searchable,
                    cell: col.cell === undefined ? null : col.cell,
                    width: "150px",
                })
            }
        }
    });

    return columns;
}

export function fnCleanData(columnlist, formvalue, IsUpdate) {

    columnlist.forEach(col => {
        if (col.type === "datetime") {
            let datestr = formvalue[col.name] //? moment(formvalue[col.name]).format("YYYY-DD-MM HH:mm:ss") : "";
            if (datestr === "Invalid date") {
                delete formvalue[col.alias ? col.alias : col.name];
            }
            else {
                formvalue[col.alias ? col.alias : col.name] = datestr;
            }
        }
        if (col.type === "dropdown") {
            delete formvalue[col.alias ? col.alias + "_display" : col.name + "_display"];
        }
        if (formvalue[col.alias ? col.alias : col.name] === "" ||
            formvalue[col.alias ? col.alias : col.name] === null ||
            formvalue[col.alias ? col.alias : col.name] === "null" ||
            formvalue[col.alias ? col.alias : col.name] === undefined ||
            formvalue[col.alias ? col.alias : col.name] === "undefined") {
            delete formvalue[col.alias ? col.alias : col.name];
        }
        if (IsUpdate && col.editable === false) {
            delete formvalue[col.alias ? col.alias : col.name];
        }
    });
    return formvalue;
}


export function GetJsonToArray(columnlist, name) {
    let cols = [];
    columnlist.forEach(col => {
        if (col.type === "number" || col.type === "decimal") {
            if (col.alias) {
                cols.push("ISNULL(" + col[name] + ",0) AS " + col.alias);
            }
            else {
                cols.push("ISNULL(" + col[name] + ",0) AS " + col[name]);
            }
        }

        else {
            if (col.alias) {
                cols.push("ISNULL(" + col[name] + ",'') AS " + col.alias);
            } else {
                cols.push("ISNULL(" + col[name] + ",'') AS " + col[name]);
            }
            //cols.push("ISNULL(NULLIF(" + col[name] + ", ''), " + col[name] + ") AS " + col[name] + "");
        }

    });
    return cols;
}

export function joinObject(json1, json2, jcolname) {

    json2.forEach(j => {
        json1.forEach(k => {
            if (j.Id === k[jcolname]) {
                k[jcolname + "_display"] = j.Display;
            }
            else {
                if (!k[jcolname + "_display"]) {
                    if (k[jcolname] != "") {

                        k[jcolname + "_display"] = k[jcolname];
                    }
                    else {
                        k[jcolname + "_display"] = "";
                    }
                }
            }
        });
    });

    return json1;
}

export function CompareJson(obj1, obj2) {
    var flag = true;

    obj1.forEach(k => {
        if (obj1[k] !== obj2[k]) {
            flag = false;
        }
    });


    return flag;
}



export function getUrlParameter(name) {

    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(window.location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

export function OpenSalesView(custid, leadid, productid) {
    let baseurl = "https://matrix.policybazaar.com";
    try {
        //baseurl = window.parent.location.href   
    }
    catch (e) {

    }

    return baseurl + "/pgv/SV/LeadContent.htm#/Sales/" + window.btoa(custid + "/" + productid + "/" + leadid);
}

export function hhmmss(secs) {
    var minutes = Math.floor(secs / 60);
    secs = secs % 60;
    var hours = Math.floor(minutes / 60)
    minutes = minutes % 60;
    return `${("0" + hours).slice(-2)} h, ${("0" + minutes).slice(-2)} m, ${("0" + secs).slice(-2)} s`;
}

export function getuser() {

    try {

        //let userid = getUrlParameter("u") === "" ? getCookie("userid") : getUrlParameter("u");

        //let user = JSON.parse(localStorage.getItem("Users-" + userid))
        let user = [{"RoleId":2,"UserID":18863,"EmployeeId":"AU00720","UserName":"Negi","ManagerId":4059,"RoleName":"ADMIN"}]
        if (user && user.length > 0) {
            user[0].EmployeeId = user[0].EmployeeId.trim();
            return user[0];
        }
        else
            return {};
    } catch (error) {
        console.error(error);
        return {};
    }
}

export function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

export function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}