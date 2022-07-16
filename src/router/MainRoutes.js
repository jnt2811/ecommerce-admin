import { Redirect, Route, Switch } from "react-router-dom";
import { Categories, Dashboard, NoMatch, Sellers, Settings, Users, Vouchers } from "../pages";
import { paths } from "../constants";
import { Sider, Header } from "../layouts";
import { Layout } from "antd";

export const MainRoutes = () => {
  return (
    <Layout>
      <Header />

      <Layout>
        <Sider />

        <Layout.Content style={styles.container}>
          <Switch>
            <Route exact path={paths.DASHBOARD} component={Dashboard} />
            <Route exact path={paths.ALL_CATEGORIES} component={Categories} />
            <Route exact path={paths.ALL_VOUCHERS} component={Vouchers} />
            <Route exact path={paths.ALL_SELLERS} component={Sellers} />
            <Route exact path={paths.ALL_USERS} component={Users} />
            <Route exact path={paths.SETTINGS} component={Settings} />
            <Redirect exact from={paths.MAIN} to={paths.DASHBOARD} />
            <Route component={NoMatch} />
          </Switch>
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

const styles = {
  container: {
    padding: 15,
  },
};
