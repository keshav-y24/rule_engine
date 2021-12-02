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
import { NavLink } from "react-router-dom";
import { Nav } from "reactstrap";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";

import logo from "logo.svg";
import { getuser, getCookie } from "../../utility/utility";
var ps;

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    }
    this.activeRoute.bind(this);
    this.sidebar = React.createRef();
  }
  // verifies if routeName is the one active (in browser input)
  activeRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  }
  componentWillMount() {
    setTimeout(function () {
      let user = getuser();
      this.setState({ user: user });
    }.bind(this), 500);
  }

  createurl() {
    if (getCookie("userid") == "") {
      return "?u=" + this.state.user.UserID;
    }
    return "";
  }

  componentDidMount() {
    if (!this.props.inMatrix) {
      if (navigator.platform.indexOf("Win") > -1) {
        ps = new PerfectScrollbar(this.sidebar.current, {
          suppressScrollX: true,
          suppressScrollY: false
        });
      }
    }
  }
  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
    }
  }
  render() {
    if (this.props.inMatrix) {
      return null;
    }
    let RoleId = 0;
    if (this.state.user && this.state.user.RoleId) {
      RoleId = this.state.user.RoleId;
    }
    return (
      <div
        className="sidebar"
        data-color={this.props.bgColor}
        data-active-color={this.props.activeColor}
      >
        <div className="logo">
          <a
            href="https://matrixdashboard.policybazaar.com.com"
            className="simple-text logo-mini"
          >
            <div className="logo-img">
              <img src={logo} alt="react-logo" />
            </div>
          </a>
          <a
            href="https://matrixdashboard.policybazaar.com.com"
            className="simple-text logo-normal"
          >
            Matrix Dashboard
          </a>
        </div>
        <div className="sidebar-wrapper" ref={this.sidebar}>
          <Nav>
            {this.props.routes.map((prop, key) => {
              if (prop.RoleId && prop.RoleId.indexOf(RoleId) === -1) {
                return;
              }else if (prop.hide) {
                return;
              }
              return (
                <li
                  className={
                    this.activeRoute(prop.path) +
                    (prop.pro ? " active-pro" : "")
                  }
                  key={key}
                >
                  <NavLink
                    to={prop.layout + prop.path + this.createurl()}
                    className="nav-link"
                    activeClassName="active"
                  >
                    <i className={prop.icon} />
                    <p>{prop.name}</p>
                  </NavLink>
                </li>
              );
            })}
          </Nav>
        </div>
      </div>
    );
  }
}

export default Sidebar;
