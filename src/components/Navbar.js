import React from "react";
import { Layout, Menu, Space } from "antd";
import { Link } from "react-router-dom";
import { AreaChartOutlined, HomeOutlined, RiseOutlined } from "@ant-design/icons";
const { Header } = Layout;

const Navbar = () => {
  return (
    <Layout className="layout">
      <Header className="header">
        <div className="logo" />
        <Space direction="horizontal">
          <Menu theme="dark" mode="horizontal" openKeys={"sub1"}>
              <Menu.Item key="1">
                <Link to="normal-distribution">
                  Pool Normal Distribution Chart
                </Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to="/cagr">
                  CAGR Graph
                </Link>
              </Menu.Item>
            </Menu>
        </Space>
      </Header>
    </Layout>
  );
};

export default Navbar;
