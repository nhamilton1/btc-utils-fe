import React from 'react';
import { Layout, Menu } from 'antd';
import { HomeOutlined, AreaChartOutlined, RiseOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const Sidebar = (props) => {

    return (
        <Layout.Sider style={{ minHeight: '100vh' }} width={'8vw'} >
          <Menu theme="dark" mode="inline" openKeys={"sub1"}>
            <Menu.Item key="1">
              <Link to="/">
                <HomeOutlined style={{ fontSize: '2rem',  paddingTop: '.4rem' }}/>
              </Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="normal-distribution">
                <AreaChartOutlined style={{ fontSize: '2rem',  paddingTop: '.4rem' }}/>
              </Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to="/cagr">
                <RiseOutlined style={{ fontSize: '2rem', paddingTop: '.1rem' }}/>
              </Link>
            </Menu.Item>
            <Menu.Item key="4">
            </Menu.Item>
          </Menu>
        </Layout.Sider>
      );
}

export default Sidebar
