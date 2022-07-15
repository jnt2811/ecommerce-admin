import { Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import { paths } from "../constants";
import { Login } from "../pages";
import { MainRoutes } from "./MainRoutes";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={paths.LOGIN} component={Login} />
        <Route path={paths.MAIN} component={MainRoutes} />
      </Switch>
    </BrowserRouter>
  );
};
