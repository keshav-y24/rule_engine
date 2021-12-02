
import React from "react";
import { Form, Modal } from 'react-bootstrap';
import { connect } from "react-redux";
import { If, Then } from 'react-if';
// reactstrap components
import {
  Row,
  Button
} from "reactstrap";
import { fnRenderfrmControl } from '../../utility/utility.jsx';

class CommonForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    debugger;
    return (
      <Modal show={this.props.showModal} onHide={this.props.handleClose} dialogClassName="modal-90w">
        <Modal.Header closeButton>
          <Modal.Title>{this.props.FormTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form name={"frm" + this.props.root}>
            <Row>
              {
                this.props.columnlist.map(col => (
                  fnRenderfrmControl(col, this.props.formvalue, this.props.handleChange, this.props.event)
                ))}
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.props.handleClose}>
            Close
          </Button>
          <If condition={this.props.ModalValueChanged}>
            <Then>
              <input type="submit" value="Save Changes" className="btn btn-primary" onClick={this.props.handleSave} />
            </Then>
          </If>
        </Modal.Footer>
      </Modal>

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

  }
)(CommonForm);

