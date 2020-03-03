
import React from "react";
import Dashboard from "../Components/Admin/Dashboard";
import ListUsers from "../Components/Admin/ListUsers";

const menuRoutes = [
  {
    path: "/admin/dashboard",
    exact: true,
    main: (history) => <Dashboard history={history} />
  },
  {
    path: "/admin/users",
    exact: true,
    main: (history) => <ListUsers history={history} />
  }
];
export default menuRoutes;