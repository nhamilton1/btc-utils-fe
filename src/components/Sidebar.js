import React from "react";
import { Layout, Menu } from "antd";
import {
  HomeOutlined,
  AreaChartOutlined,
  RiseOutlined,
} from "@ant-design/icons";

const Sidebar = (props) => {
  const { handleClick } = props;

  return (
    <Layout.Sider style={{ minHeight: "100vh" }} width={"8vw"}>
      <Menu theme="dark" mode="inline" openKeys={"sub1"}>
        <Menu.Item key="1" onClick={handleClick}>
          <AreaChartOutlined
            style={{ fontSize: "2rem", paddingTop: ".4rem" }}
          />
        </Menu.Item>
        <Menu.Item key="2" onClick={handleClick}>
          <RiseOutlined style={{ fontSize: "2rem", paddingTop: ".1rem" }} />
        </Menu.Item>
        <Menu.Item key="3" onClick={handleClick}></Menu.Item>
        <Menu.Item key="4" onClick={handleClick}></Menu.Item>
      </Menu>
    </Layout.Sider>
  );
};

export default Sidebar;
