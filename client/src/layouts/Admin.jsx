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
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";
import { Route, Switch } from "react-router-dom";

import DemoNavbar from "components/Navbars/DemoNavbar.jsx";
import Footer from "components/Footer/Footer.jsx";
import Sidebar from "components/Sidebar/Sidebar.jsx";

import NotAccessable from "views/NotAccessable.jsx";

import routes from "routes.js";
import {
  GetDataDirect
} from "../store/actions/CommonAction";
import { getUrlParameter, getuser, getCookie, setCookie } from '../utility/utility.jsx';
import config from "../config";


var ps;

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      backgroundColor: "black",
      activeColor: "info",
      mainclass: "main-panel",
      inMatrix: false ,
      user: {}
    };
    this.mainPanel = React.createRef();
  }

  componentWillMount() {

    // if (getUrlParameter("u") != "") {
    //   // GetDataDirect({
    //   //   root: "UserDetails",
    //   //   UserID: getUrlParameter("u"),
    //   //   statename: "Users-" + getUrlParameter("u"),
    //   //   state: true
    //   // }, function (result) {
    //   // this.setState({ user: result[0] });
    //   //}.bind(this));
    // }
    // else {

    //   var userid = getCookie("userid");
    //   if (userid != "") {
    //     // GetDataDirect({
    //     //   root: "UserDetails",
    //     //   UserID: userid,
    //     //   statename: "Users-" + userid,
    //     //   state: true
    //     // }, function (result) {
    //     //   this.setState({ user: result[0], mainclass: "main-panel", inMatrix: false });
    //     // }.bind(this));
    //   }
    //   else {
    //     this.Logout();
    //   }
    // }
  }


  Logout() {
    setCookie("userid", "", -1);
    localStorage.clear();
    window.location.href = config.site_base_url;
  }

  componentDidMount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(this.mainPanel.current);
      document.body.classList.toggle("perfect-scrollbar-on");
    }
  }
  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
      document.body.classList.toggle("perfect-scrollbar-on");
    }
  }
  componentDidUpdate(e) {
    if (e.history.action === "PUSH") {
      this.mainPanel.current.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
    }

  }
  handleActiveClick = color => {
    this.setState({ activeColor: color });
  };
  handleBgClick = color => {
    this.setState({ backgroundColor: color });
  };
  render() {
    // let RoleId = 0;
    // if (this.state.user && this.state.user.RoleId) {
    //   RoleId = this.state.user.RoleId;
    // }
    return (
      <div className="wrapper">
        <Sidebar
          {...this.props}
          routes={routes}
          bgColor={this.state.backgroundColor}
          activeColor={this.state.activeColor}
          inMatrix={this.state.inMatrix}
        />
        <div className={this.state.mainclass} ref={this.mainPanel}>
          <DemoNavbar {...this.props} inMatrix={this.state.inMatrix} Logout={this.Logout} />
          <Switch>
            {routes.map((prop, key) => {
              
              // if (prop.RoleId && prop.RoleId.indexOf(RoleId) === -1) {
                
              //   return (<Route
              //     path={prop.layout + prop.path}
              //     component={NotAccessable}
              //     key={key} />);
              // }
              return (
                <Route
                  path={prop.layout + prop.path}
                  component={prop.component}
                  key={key} />);
            })
            }
          </Switch>
          <Footer fluid />
        </div>
        {/* <FixedPlugin
          bgColor={this.state.backgroundColor}
          activeColor={this.state.activeColor}
          handleActiveClick={this.handleActiveClick}
          handleBgClick={this.handleBgClick}
        /> */}
      </div>
    );
  }
}

export default Dashboard;
