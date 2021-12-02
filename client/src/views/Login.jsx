/*!

=========================================================
* Paper Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import { connect } from "react-redux";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  CardFooter
} from "reactstrap";
import { Form } from 'react-bootstrap';
import config from "config";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getUrlParameter } from '../utility/utility';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }
  componentDidMount() {
    if (getUrlParameter("m") != "")
      toast(getUrlParameter("m"), { type: 'error' });
  }
  componentWillReceiveProps(nextProps) { }
  componentWillUpdate() { }
  componentDidUpdate() { }
  handleSubmit(e) {

  }
  render() {
    return (
      <>
        <div className="content">
          <ToastContainer />
          <Row className="LoginPage">
            <Col md="3"></Col>
            <Col md="6">
              <Card>
                <form action={config.api.base_url + "/db/login"} method="POST" onSubmit={this.handleSubmit}>
                  <CardHeader>Matrix Dashboard Login</CardHeader>
                  <CardBody>

                    <Row>
                      <Form.Group as={Col} md={12} controlId="EmpId">
                        <Form.Label>EmployeeId</Form.Label>
                        <Form.Control required type="text" name="EmpId" onChange={(e) => this.setState({ username: e.target.value })} value={this.state.username} placeholder={"Enter EmployeeId"} />
                      </Form.Group>
                      <Form.Group as={Col} md={12} controlId="Password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control required type="password" name="password" onChange={(e) => this.setState({ password: e.target.value })} value={this.state.password} placeholder={"Enter Password"} />
                      </Form.Group>
                    </Row>

                  </CardBody>
                  <CardFooter>
                    <button type="submit" className="btn btn-primary">Submit</button>
                  </CardFooter>
                </form>
              </Card>
            </Col>
            <Col md="3"></Col>
          </Row>
        </div>
      </>
    );
  }
}


function mapStateToProps(state) {
  return {
    //CommonData: state.CommonData
  };
}



export default connect(
  mapStateToProps,
  {
  }
)(Login);