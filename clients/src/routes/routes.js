import React from "react";

import HomeUser from "../Pages/Users/HomeUser/HomeUser";
import NotFound from "../Pages/Users/NotFound/NotFound";
import LoginFormAdmin from "../Components/Admin/LoginFormAdmin";
import HomeAdmin from "../Pages/Admin/HomeAdmin/HomeAdmin";

const routes = [
  {
    path: "/",
    exact: true,
    main: () => <HomeUser />
  },
  {
    path: "/administrator",
    exact: true,
    main: (history) => <LoginFormAdmin history={history} />
  },
  {
    path: "/admin",
    exact: true,
    main: (history) => <HomeAdmin history={history}/>
  },
  // {
  //   path: "*",
  //   exact: true,
  //   main: () => <NotFound />
  // }
];
export default routes;
