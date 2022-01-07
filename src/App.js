import React, { useState } from "react";
import { Layout } from "antd";
import Sidebar  from './components/Sidebar'
import { Content } from "antd/lib/layout/layout";
// import Navbar from './components/Navbar';
import NormalDistribution from "./components/NormalDistribution";
import Cagr from "./components/Cagr/Cagr";


const App = () => {
  const [render, updateRender] = useState(1);

  const components = {
    1: <NormalDistribution/>,
    2: <Cagr/>,
    3: <div>Option 3</div>,
    4: <div>Option 4</div>
  };


  const handleMenuClick = menu => {
    updateRender(menu.key);
  };


  return(
    <div className="App">
      {/* <Navbar /> */}
       <Layout style={{ minHeight: "100vh" }}>
        <Sidebar handleClick={handleMenuClick}/>
        <Layout style={{margin: '2vh 2vw'}}>
          <Content>{components[render]}</Content>
        </Layout>
      </Layout>
    </div>
  )
};

export default App;
