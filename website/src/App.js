import React, {useEffect} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { io } from "socket.io-client";
import { Layout, Menu } from 'antd';
import Home from "./pages/home";
import Orders from "./pages/orders";
import "antd/dist/antd.css";
import "./App.css"
import { FurflesHeader } from "./global/header";

const { Header, Content, Footer } = Layout;

const App = () => {

  return (
    <Router>
      <Layout className="layout">
        <FurflesHeader />
        <Content style={{ padding: '50px' }}>
          <div className="site-layout-content">
            <Switch>
              {/* <Route path="/orders">
                <Home />
              </Route> */}
              <Route path="/">
                <Orders />
              </Route>
            </Switch>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>LanchoneteJS @ B2W | Unicorn Tech | reactRio</Footer>
      </Layout>

    </Router>
  );
}

export default App;
