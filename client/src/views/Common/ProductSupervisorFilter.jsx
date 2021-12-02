
import React from "react";
import { ButtonGroup, Button, Modal, Form } from 'react-bootstrap';
import { Multiselect } from 'multiselect-react-dropdown';
import { If, Then, Else, When, Unless, Switch, Case, Default } from 'react-if';
import {
  GetCommonData, GetCommonspData
} from "../../store/actions/CommonAction";
import { connect } from "react-redux";

// reactstrap components
import {
  Row,
  Col
} from "reactstrap";

class ProductSupervisorFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: this.props.showModal,
      products: [],
      Supervisor: [],
      SelectedSupervisors: [],
      SelectedProduct: 0
    };
    this.handleChangeProduct = this.handleChangeProduct.bind(this);
    this.handleChangeSupervisor = this.handleChangeSupervisor.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.ShowModal = this.ShowModal.bind(this);

    this.multiselectcss = {
      multiselectContainer: { // To change css for multiselect (Width,height,etc..)

      },
      searchBox: { // To change search box element look
        maxHeight: "100px",
        "overflow": "auto",
      },
      inputField: { // To change input field position or margin
        paddingLeft: "10px",
      },
      chips: { // To change css chips(Selected options)
        // "background": "red",
      },
      optionContainer: { // To change css for option container 
        // "border": "2px solid",
      },
      option: { // To change css for dropdown options
        // "color": "blue",
      },
      groupHeading: { // To chanage group heading style

      }
    }
  }
  componentDidMount() {
    this.props.GetCommonspData({
      limit: 10,
      skip: 0,
      root: "GetProducts",
      params: {}
    });
  }
  componentWillReceiveProps(nextProps) {

    if (!nextProps.CommonData.isError) {
      this.setState({ products: nextProps.CommonData["GetProducts"] });
      if (this.state.SelectedProduct) {
        this.setState({ Supervisor: nextProps.CommonData["GetSupervisor"] });
      }
    }
  }

  handleChangeProduct = (e, props) => {
    this.setState({ SelectedProduct: e.target.value })
    this.props.GetCommonspData({
      limit: 10,
      skip: 0,
      root: "GetSupervisor",
      params: [{ ProductId: e.target.value }]
    });
  }

  handleChangeSupervisor = (e, props) => {
    var SelectedSupervisors = this.state.SelectedSupervisors;
    SelectedSupervisors.push(e.UserID);
    this.setState({ SelectedSupervisors: SelectedSupervisors });
  }
  handleShow() {
    this.props.handleShow({
      SelectedSupervisors: this.state.SelectedSupervisors,
      SelectedProduct: this.state.SelectedProduct
    });
    this.setState({ showModal: false });
  }
  handleClose() {
    this.setState({ showModal: false });
  }
  ShowModal() {
    this.setState({ showModal: true });
  }
  render() {
    const columns = this.columnlist;
    const { items, products, Supervisor, showModal } = this.state;
    
    return (<>

      <Button variant="secondary" onClick={this.ShowModal}>
        Show Filter
          </Button>
      <Modal show={showModal} onHide={this.handleClose} >
        <Modal.Header closeButton>
          <Modal.Title>Filter</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <Form.Control as="select" name="products" onChange={this.handleChangeProduct}>
                <option key={0} value={0}>Select</option>
                {products.map(item => (
                  <option key={item.ProductID} value={item.ProductID}>{item.Product}</option>
                ))}
              </Form.Control>
            </Col>
          </Row>
          <Row>
            <Col >
              <If condition={this.state.SelectedProduct}>
                <Then>
                  <Multiselect
                    options={Supervisor} // Options to display in the dropdown
                    selectedvalues={this.state.SelectedSupervisors} // Preselected value to persist in dropdown
                    onSelect={this.handleChangeSupervisor} // Function will trigger on select event
                    style={this.multiselectcss}
                    displayValue="UserName" // Property name to display in the dropdown options
                  />
                </Then>
              </If>
            </Col>

          </Row>
        </Modal.Body>
        <Modal.Footer>
         
          <If condition={this.state.SelectedSupervisors.length > 0}>
            <Then>
              <Button variant="primary" onClick={this.handleShow}>Show</Button>
            </Then>
          </If>
          <Button variant="secondary" onClick={this.handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
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
    GetCommonspData
  }
)(ProductSupervisorFilter);