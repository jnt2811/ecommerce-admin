import { DashboardOutlined, NumberOutlined, ShopOutlined, TagOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { useHistory } from "react-router-dom";
import { paths } from "../constants";

export const Sider = () => {
  const history = useHistory();

  const onChange = ({ key }) => history.push(key);

  return (
    <Layout.Sider style={styles.container}>
      <Menu items={items} theme="dark" onClick={onChange} />
    </Layout.Sider>
  );
};

const items = [
  {
    key: paths.DASHBOARD,
    label: "Dashboard",
    icon: <DashboardOutlined />,
  },
  {
    key: paths.ALL_CATEGORIES,
    label: "Categories",
    icon: <NumberOutlined />,
  },
  {
    key: paths.ALL_VOUCHERS,
    label: "Vouchers",
    icon: <TagOutlined />,
  },
  {
    key: paths.ALL_SELLERS,
    label: "Sellers",
    icon: <ShopOutlined />,
  },
];

const styles = {
  container: {
    height: "calc(100vh - 64px)",
    overflow: "auto",
  },
};
