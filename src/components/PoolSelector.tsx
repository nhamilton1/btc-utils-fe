import { Select } from "antd";
import React from "react";



interface PoolInterface {
  poolName: string;
  setPoolName: any;
}

const PoolSelector = (props: PoolInterface) => {
  const { poolName, setPoolName } = props;
  const pools = [
    "SlushPool",
    "F2Pool",
    "ViaBTC",
    "Poolin",
    "AntPool",
    "Luxor",
    "Foundry USA",
    "Binance Pool",
    "BTC.com",
    "MARA Pool",
    "SBI Crypto",
  ];
  return (
    <Select
      defaultValue={poolName}
      style={{ width: 120, color: "white", marginLeft: "3.5%" }}
      onChange={(e) => setPoolName(e)}
    >
      {pools.map((poolName, idx) => (
        <Select.Option key={idx} value={poolName.replace(" ", "+")}>
          {poolName}
        </Select.Option>
      ))}
    </Select>
  );
};

export default PoolSelector;
