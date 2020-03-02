
import React from "react";
import Dashboard from "../Components/Admin/Dashboard";
import ListUsers from "../Components/Admin/ListUsers";

const menuRoutes = [
  {
    path: "/admin/dashboard",
    exact: true,
    main: () => <Dashboard />
  },
  {
    path: "/admin/users",
    exact: true,
    main: () => <ListUsers />
  }
];
export default menuRoutes;