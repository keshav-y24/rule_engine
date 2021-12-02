import React from "react";
import { ButtonGroup, Button, Modal, Form } from 'react-bootstrap';

import {
  GetCommonData, InsertData, UpdateData
} from "../store/actions/CommonAction";
import {
  addRecord
} from "../store/actions/CommonMongoAction";
import { connect } from "react-redux";

import DataTable from './Common/DataTableWithFilter';
import { fnRenderfrmControl, fnBindRootData, fnDatatableCol, fnCleanData, GetJsonToArray, getUrlParameter, getuser, joinObject } from '../utility/utility.jsx';
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col
} from "reactstrap";
import { If, Then } from 'react-if';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class UsersWFH extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      showModal: false,
      items: [],
      activePage: 1,
      root: "Users",
      PageTitle: "UsersWFH",
      FormTitle: "",
      formvalue: {},
      event: "",
      ModalValueChanged: false,
    };
    this.handleClose = this.handleClose.bind(this);

    this.handleSave = this.handleSave.bind(this);
    this.selectedrow = { "UserID": 0, "UserName": "", "EmployeeId": "" }
    this.columnlist = [ 
      {
        name: "UserName",
        label: "UserName",
        type: "string",
        editable: false,
        sortable: true,
        searchable: true
      },
      {
        name: "UserID",
        label: "UserID",
        type: "hidden",
        hide: true,
        sortable: false,
        searchable: false
      },
      {
        name: "EmployeeId",
        label: "EmployeeId",
        type: "string",
        editable: false,
        sortable: true,
        searchable: true
      },
      {
        name: "CallingCompany",
        label: "CallingCompany",
        type: "dropdown",
        sortable: true,
        searchable: true,
        config: {
          root: "UsersWFH",
          //data: [{"Id":"WFH","Display":"WFH"},{"Id":"WEBPHONE","Display":"WEBPHONE"},{"Id":"KNOWLARITY","Display":"KNOWLARITY"},{"Id":"EXOTEL","Display":"EXOTEL"},{"Id":"ASWATINDIA","Display":"ASWATINDIA"},{"Id":"ASWAT","Display":"ASWAT"}],            
          data: [{ "Id": "WFH", "Display": "WFH" }, { "Id": "KNOWLARITY", "Display": "KNOWLARITY" }],
        }
      },
      {
        name: "DIDNo",
        label: "Mobile No",
        type: "string",
        sortable: true,
        searchable: true
      },
      {
        name: "IsWFH",
        label: "IsWFH",
        type: "bool",
        sortable: true,
        //searchable: true  
      }
    ];

  }



  fnBindStore(col, nextProps) {
    if (col.type == "dropdown") {
      let items;
      if (nextProps.CommonData[this.state.root] && nextProps.CommonData[col.config.root]) {
        items = joinObject(nextProps.CommonData[this.state.root], nextProps.CommonData[col.config.root], col.name)
        this.setState({ items: items });
      }
    }
  }

  componentDidMount() {
    this.columnlist.map(col => (
      fnBindRootData(col, this.props)
    ));

    this.props.GetCommonData({
      limit: 10,
      skip: 0,
      c: "L",
      root: this.state.root,
      cols: GetJsonToArray(this.columnlist, "name"),
      con: [{ "Isactive": 1 }]
    });
  }

  componentWillReceiveProps(nextProps) {

    if (!nextProps.CommonData.isError) {
      this.setState({ items: nextProps.CommonData[this.state.root] });

      this.columnlist.map(col => (
        this.fnBindStore(col, nextProps)
      ));
    }

    // if (nextProps.CommonData && nextProps.CommonData.InsertSuccessData && nextProps.CommonData.InsertSuccessData.status) {
    //   if (nextProps.CommonData.InsertSuccessData.status !== 200)
    //     alert(nextProps.CommonData.InsertSuccessData.error);
    //   else {
    //     this.setState({ showModal: false });
    //   }
    // }

    // if (nextProps.CommonData && nextProps.CommonData.UpdateSuccessData && nextProps.CommonData.UpdateSuccessData.status) {
    //   if (nextProps.CommonData.UpdateSuccessData.status !== 200)
    //     alert(nextProps.CommonData.UpdateSuccessData.error);
    //   else {
    //     this.setState({ showModal: false });
    //   }
    // }

  }


  fnDatatableCol() {
    var columns = fnDatatableCol(this.columnlist);
    columns.push({
      name: "Action",
      cell: row => <ButtonGroup aria-label="Basic example">
        {/* <Button variant="secondary" onClick={() => this.handleCopy(row)}><i className="fa fa-files-o" aria-hidden="true"></i></Button> */}
        <Button variant="secondary" onClick={() => this.handleEdit(row)}><i className="fa fa-pencil-square-o" aria-hidden="true"></i></Button>
      </ButtonGroup>
    });
    return columns;
  }


  handleEdit(row) {
    this.setState({ od: Object.assign({}, row, {}), formvalue: Object.assign({}, row, {}), event: "Edit", showModal: true, FormTitle: "Edit Record" });
  }

  handleClose() {
    this.setState({ showModal: false });
  }


  handleSave() {

    let formvalue = JSON.parse(JSON.stringify(this.state.formvalue));
    //this.fnCleanData(formvalue, true)

    if (this.state.event === "Edit") {
      let id = formvalue["UserID"];
      delete formvalue["UserID"]
      delete formvalue["CallingCompany_display"]
      //formvalue["IsWFH"] = 1;
      //formvalue["IsProgressive"] = 0;
      
      if (formvalue["DIDNo"] == "") {
        formvalue["DIDNo"] = null;
      }

      //this.fnCleanData(formvalue, true);
      if (formvalue["IsWFH"] == false) {
        formvalue["CallingCompany"] = null;

      }
      this.props.UpdateData({
        root: this.state.root,
        body: formvalue,
        c: "L",
        querydata: { "UserID": id }
      }, function (data) {
        toast("Record updated successfully...", { type: 'success' });
      });


      this.props.addRecord({
        root: "History",
        body: {
          module: "UsersWFH",
          od: this.state.od,
          nd: formvalue,
          ts: new Date(),
          by: getuser().UserId
        }
      });
      this.setState({ showModal: false });

    } else if (this.state.event === "Copy") {

    } else {

    }
    setTimeout(function () {
      this.props.GetCommonData({
        root: this.state.root,
        cols: GetJsonToArray(this.columnlist, "name"),
        c: "L",
      });
    }.bind(this), 2000);
    this.setState({ showModal: false });
    return false;
  }
  handleChange = (e, props) => {
    let formvalue = this.state.formvalue;

    if (e.target && e.target.type === "checkbox") {
      formvalue[e.target.id] = e.target.checked;
    }
    else if (e._isAMomentObject) {
      formvalue[props] = e.format()
    }
    else {
      formvalue[e.target.id] = e.target.value === "" ? null : e.target.value;
    }

    this.setState({ formvalue: formvalue, ModalValueChanged: true });
  }

  fnCleanData(formvalue, IsUpdate) {
    formvalue = fnCleanData(this.columnlist, formvalue, IsUpdate);
    this.setState({ formvalue: formvalue });
  }

  render() {
    const columns = this.fnDatatableCol();
    const { items, PageTitle, showModal, FormTitle, formvalue, ModalValueChanged, event } = this.state;

    return (
      <>
        <div className="content">
          <ToastContainer />
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <Row>
                    <Col md={11}>
                      <CardTitle tag="h4">{PageTitle}</CardTitle>
                    </Col>
                    <Col md={1}>

                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <DataTable
                    columns={columns}
                    data={items}
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Modal show={showModal} onHide={this.handleClose} dialogClassName="modal-90w">
            <Modal.Header closeButton>
              <Modal.Title>{FormTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Row>
                  {this.columnlist.map(col => (
                    fnRenderfrmControl(col, formvalue, this.handleChange, event)
                  ))}
                </Row>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleClose}>
                Close
          </Button>
              <If condition={ModalValueChanged}>
                <Then>
                  <Button variant="primary" onClick={this.handleSave}>Save Changes</Button>
                </Then>
              </If>
            </Modal.Footer>
          </Modal>
        </div>
      </>
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
    GetCommonData,
    InsertData,
    UpdateData,
    addRecord
  }
)(UsersWFH);