import React from "react";
import FooterComp from "./components/FooterComp";
import { Layout } from "antd";
import NormalDistribution from "./components/NormalDistribution";
// import Cagr from "./components/Cagr/Cagr";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Asics from "./components/asics/Asics";
import { Content, Footer } from "antd/lib/layout/layout";

const App = () => {
  return (
    <div className="App">
      <Navbar />
      <Layout>
        <Content>
          <Routes>
            <Route path="/" element={<Asics />} />
            {/* <Route path="/cagr" element={<Cagr />} /> */}
            <Route path="/normal-distribution" element={<NormalDistribution />} />
            <Route path="/asics" element={<Asics />} />
          </Routes>
        </Content>
        <Footer>
          <FooterComp />
        </Footer>
      </Layout>
    </div>
  );
};

export default App;
