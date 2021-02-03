import React, {Component} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { io } from "socket.io-client";
import { Layout, Menu } from 'antd';
const { Header, Content, Footer } = Layout;

var socket;

class FurflesHeader extends Component {
  constructor() {
    super();
    this.state = {
      endpoint: "http://localhost:8080",
    }

    socket = io.connect(this.state.endpoint);
  }

  render() {
    return (
      <Header>
        <div className="logo">
          LanchoneteJS
        </div>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
          <Menu.Item key="1"><Link to="/">Home</Link></Menu.Item>
          {/* <Menu.Item key="2"><Link to="/orders">Pedidos</Link></Menu.Item>
          <Menu.Item key="3"><Link to="/products">Produtos</Link></Menu.Item> */}
        </Menu>
      </Header>
    )
  }
}

export {FurflesHeader, socket}
