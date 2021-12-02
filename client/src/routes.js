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
import Dashboard from "views/Dashboard.jsx";

import Notifications from "views/Notifications.jsx";
import Icons from "views/Icons.jsx";
import Typography from "views/Typography.jsx";
import TableList from "views/Tables.jsx";

import UserPage from "views/User.jsx";


import UsersWFH from "views/UsersWFH.jsx";



var routes = [

    {
        path: "/dashboard",
        name: "Dashboard",
        icon: "nc-icon nc-bank",
        component: Dashboard,
        layout: "/admin",
        hide: true
    },
    {
        path: "/icons",
        name: "Icons",
        icon: "nc-icon nc-diamond",
        component: Icons,
        layout: "/admin",
        hide: true
    },
    {
        path: "/notifications",
        name: "Notifications",
        icon: "nc-icon nc-bell-55",
        component: Notifications,
        layout: "/admin",
        hide: true
    },
    {
        path: "/user-page",
        name: "User Profile",
        icon: "nc-icon nc-single-02",
        component: UserPage,
        layout: "/admin",
        hide: true
    },
    {
        path: "/tables",
        name: "Table List",
        icon: "nc-icon nc-tile-56",
        component: TableList,
        layout: "/admin",
        hide: true
    },
    {
        path: "/typography",
        name: "Typography",
        icon: "nc-icon nc-caps-small",
        component: Typography,
        layout: "/admin",
        hide: true
    },    
    {
        path: "/UsersWFH",
        name: "UsersWFH",
        icon: "nc-icon nc-circle-10",
        component: UsersWFH,
        layout: "/admin",
        RoleId: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    },
    


];
export default routes;