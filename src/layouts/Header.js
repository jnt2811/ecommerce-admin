import { LogoutOutlined, SettingOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Dropdown, Layout, Menu, Space } from "antd";
import { useHistory } from "react-router-dom";
import { paths } from "../constants";

const KEY_LOGOUT = "logout";

export const Header = () => {
  return (
    <Layout.Header style={styles.container}>
      <div style={styles.logo}>ADMIN</div>

      <UserPopup>
        <Button type="primary" ghost shape="circle" size="large" icon={<UserOutlined />}></Button>
      </UserPopup>
    </Layout.Header>
  );
};

const UserPopup = ({ children }) => {
  const history = useHistory();

  const onClick = ({ key }) => {
    if (key === KEY_LOGOUT);
    else history.push(key);
  };

  return (
    <Dropdown
      trigger="click"
      overlay={
        <div style={styles.popupWrapper}>
          <Space style={styles.popupWrapper.userInfo}>
            <Avatar size="large">Seller</Avatar>
            <div>Seller</div>
          </Space>
          <Menu items={items} mode="vertical" style={styles.popupWrapper.menu} onClick={onClick} />
        </div>
      }
    >
      {children}
    </Dropdown>
  );
};

const items = [
  {
    key: paths.SETTINGS,
    label: "Settings",
    icon: <SettingOutlined />,
  },
  {
    key: KEY_LOGOUT,
    label: "Logout",
    icon: <LogoutOutlined />,
  },
];

const styles = {
  container: {
    backgroundColor: "white",
    paddingInline: 15,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logo: {
    fontSize: 30,
    fontWeight: "bold",
  },
  popupWrapper: {
    backgroundColor: "white",
    minWidth: 200,
    boxShadow: "0 0 10px #00000025",
    userInfo: {
      padding: "15px 15px 5px 15px",
    },
    menu: {
      boxShadow: "none",
    },
  },
};
