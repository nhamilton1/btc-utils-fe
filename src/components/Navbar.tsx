import React from "react";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
import MediaQuery from "react-responsive";

const { Header } = Layout;

const Navbar  = () => {
  return (
    <MediaQuery maxWidth={550}>
      {(matches: any) =>
        matches ? (
          <Menu theme="dark" mode="vertical" openKeys={["sub1"]}>
            <Menu.Item key="1">
              <Link to="/cagr">CAGR</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="normal-distribution">
                Mining Pool Normal Distribution
              </Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to="asics">Asic List</Link>
            </Menu.Item>
          </Menu>
        ) : (
          <Layout className="layout">
            <Header className="header">
              <div className="logo" />
              <Menu theme="dark" mode="horizontal" openKeys={["sub1"]}>
                <Menu.Item key="1">
                  <Link to="/cagr">CAGR</Link>
                </Menu.Item>
                <Menu.Item key="2">
                  <Link to="normal-distribution">
                    Mining Pool Normal Distribution
                  </Link>
                </Menu.Item>
                <Menu.Item key="3">
                  <Link to="asics">Asic List</Link>
                </Menu.Item>
              </Menu>
            </Header>
          </Layout>
        )
      }
    </MediaQuery>
  );
};

export default Navbar;
