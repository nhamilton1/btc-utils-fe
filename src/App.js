import React from "react";
import { Layout } from "antd";
import NormalDistribution from "./components/NormalDistribution";
import Cagr from "./components/Cagr/Cagr";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Asics from "./components/asics/Asics";

const App = () => {
  return (
    <div className="App">
      <Navbar />
      <Layout>
        <Routes>
          <Route path="/" element={<Asics />} />
          <Route path="/cagr" element={<Cagr />} />
          <Route path="/normal-distribution" element={<NormalDistribution />} />
          <Route path="/asics" element={<Asics />} />
        </Routes>
      </Layout>
    </div>
  );
};

export default App;
