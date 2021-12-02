
import React from "react";
import { Alert } from 'react-bootstrap';


class AlertBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: this.props.show
        }
    }
    componentDidUpdate() {

    }
    componentWillReceiveProps(nextProps) {
        this.setState({ show: nextProps.show });
        if (nextProps.show) {
            setTimeout(function () {
                this.setState({ show: false });
            }.bind(this), 5000);
        }
    }
    render() {
        if (this.state.show) {
            return (
                <Alert variant={this.props.variant}>
                    {this.props.body}
                </Alert>
            );
        }
        else {
            return null;
        }
    }
}

export default AlertBox;
