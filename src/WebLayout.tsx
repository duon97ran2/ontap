import { Layout, Menu } from 'antd'
import React from 'react'
import { NavLink, Outlet } from 'react-router-dom';

type Props = {}
const { Header, Content, Footer } = Layout;

const WebLayout = (props: Props) => {
  return (
    <Layout>
      <Header>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
          <Menu.Item>
            <NavLink to="/">Home</NavLink>
          </Menu.Item>
          <Menu.Item>
            <NavLink to="products">Product</NavLink>
          </Menu.Item>
          <Menu.Item>
            <NavLink to="products/add">Add</NavLink>
          </Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <div className="site-layout-content"><Outlet /></div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
    </Layout>
  )
}

export default WebLayout