import React from "react";
import { Layout } from "antd";
import NormalDistribution from "./components/NormalDistribution";
import Cagr from "./components/Cagr/Cagr";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <div className="App">
      <Navbar />
      <Layout>
        <Routes>
          <Route path="/" element={<Cagr />} />
          <Route path="/cagr" element={<Cagr />} />
          <Route path="/normal-distribution" element={<NormalDistribution />} />
        </Routes>
      </Layout>
    </div>
  );
};

export default App;
