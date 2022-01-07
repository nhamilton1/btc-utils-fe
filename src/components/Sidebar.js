import React from "react";
import { Layout, Menu } from "antd";
import {
  HomeOutlined,
  AreaChartOutlined,
  RiseOutlined,
} from "@ant-design/icons";

import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";

const Sidebar = (props) => {
  const { handleClick } = props;

  return (
    <Router>
      <Layout.Sider style={{ minHeight: "100vh" }} width={"8vw"}>
        <Menu theme="dark" mode="inline" openKeys={"sub1"}>
          <Menu.Item key="1" onClick={handleClick}>
            <Link to="/pool-normal-distribution">
              <AreaChartOutlined
                style={{ fontSize: "2rem", paddingTop: ".4rem" }}
              />
            </Link>
          </Menu.Item>
          <Menu.Item key="2" onClick={handleClick}>
            <Link to="/cagr">
              <RiseOutlined style={{ fontSize: "2rem", paddingTop: ".1rem" }} />
            </Link>
          </Menu.Item>
          <Menu.Item key="3" onClick={handleClick}></Menu.Item>
          <Menu.Item key="4" onClick={handleClick}></Menu.Item>
        </Menu>
      </Layout.Sider>
    </Router>
  );
};

export default Sidebar;
