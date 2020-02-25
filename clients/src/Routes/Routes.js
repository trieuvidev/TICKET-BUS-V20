import React from "react";

import HomePage from "../Pages/User/HomePage/HomePage";
import NotFound from "../Pages/User/NotFound/NotFound";

const router = [ 
  {
    path: "/",
    exact: true,
    main: () => <HomePage /> 
  },
  {
    path: "*",
    exact: true,
    main: () => <NotFound />
  }
]
export default router;