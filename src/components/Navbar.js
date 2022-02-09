import React from "react";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
const { Header } = Layout;

const Navbar = () => {
  return (
    <Layout className="layout">
      <Header className="header">
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" openKeys={"sub1"} >
          <Menu.Item key="1">
            <Link to="/cagr">CAGR</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="normal-distribution">Mining Pool Normal Distribution</Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="asics">Asic List</Link>
          </Menu.Item>
        </Menu>
      </Header>
    </Layout>
  );
};

export default Navbar;
