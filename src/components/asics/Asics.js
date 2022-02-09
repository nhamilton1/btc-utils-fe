import { Table, InputNumber } from "antd";
import Layout, { Content, Footer, Header } from "antd/lib/layout/layout";
import Paragraph from "antd/lib/typography/Paragraph";
import Title from "antd/lib/typography/Title";
import moment from "moment";
import React, { useState } from "react";
import { useQuery } from "react-query";
import {
  fetchAsicData,
  fetchCurrentBTCPrice,
  fetchHashRateStats,
} from "../../api";

const Asics = () => {
  const [kWhPrice, setkWhPrice] = useState(
    localStorage.getItem("kWhPrice") || 0.12
  );

  const { data: asicData, isLoading } = useQuery(
    "fetchAsicData",
    fetchAsicData,
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
    }
  );
  const { data: btcPrice, isLoading: btcPriceLoading } = useQuery(
    "fetchCurrentBTCPrice",
    fetchCurrentBTCPrice,
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
    }
  );
  const { data: hashRateStats, isLoading: hashRateStatsLoading } = useQuery(
    "fetchHashRateStats",
    fetchHashRateStats,
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
    }
  );

  if (btcPriceLoading) {
    return <div>Loading Data...</div>;
  }
  if (hashRateStatsLoading) {
    return <div>Loading Data...</div>;
  }
  if (isLoading) {
    return <div>Loading Data...</div>;
  }

  let currentBTCPrice = btcPrice?.price;
  let currentHash = hashRateStats?.current_hashrate;
  let currentHashValue = Math.round(hashRateStats?.hash_value * 100000000);
  let currentHashPrice = Number(
    (currentBTCPrice * currentHashValue * 0.00000001).toFixed(4)
  );
  let elongatedHashPrice = currentHashPrice * 347.22;

  const columns = [
    {
      title: "Vendor",
      dataIndex: "vendor",
      key: "vendor",
    },
    {
      title: "Asic Model",
      dataIndex: "model",
      key: "model",
    },
    {
      title: "TH",
      dataIndex: "th",
      key: "th",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Watts",
      dataIndex: "watts",
      key: "watts",
    },
    {
      title: "W/TH",
      dataIndex: "efficiency",
      key: "efficiency",
    },
    {
      title: "ASIC BTC Price",
      dataIndex: "asicBTCPrice",
      key: "asicBTCPrice",
    },
    {
      title: "Value ($/TH)",
      dataIndex: "value",
      key: "value",
    },
    {
      title: "Watt $",
      dataIndex: "wattDollar",
      key: "wattDollar",
    },
    {
      title: "Denver Derivative",
      dataIndex: "denverDerivative",
      key: "denverDerivative",
    },
    {
      title: "BTC Per Month",
      dataIndex: "btcPerMonth",
      key: "btcPerMonth",
    },
    {
      title: "Monthly Energy",
      dataIndex: "monthlyEnergy",
      key: "monthlyEnergy",
    },
    {
      title: "Profit/month",
      dataIndex: "profitMonth",
      key: "profitMonth",
    },
    {
      title: "Months to ROI",
      dataIndex: "monthsToRoi",
      key: "monthsToRoi",
    },
    {
      title: "$/Month",
      dataIndex: "dollarPerMonth",
      key: "dollarPerMonth",
    },
  ];

  const onChangekWhPrice = (value) => {
    setkWhPrice(value);
    localStorage.setItem("kWhPrice", value);
  };

  const formattingAsicData = asicData.map((a, idx) => {
    let asicBTCPrice =
      Math.round(1000000 * (a.price / currentBTCPrice)) / 1000000;
    let value = Math.round(a.price / a.th);
    let wattDollar = value * a.efficiency;
    let denverDerivative = Number((wattDollar / elongatedHashPrice).toFixed(2));
    let btcPerMonth =
      Math.round(1000000 * ((a.th / (currentHash * 1000000)) * 900 * 30.5)) /
      1000000;
    let dollarPerMonth = Math.round(btcPerMonth * currentBTCPrice);
    let monthlyEnergy =
      Math.round(100 * (732 * (a.watts * 0.001) * kWhPrice)) / 100;
    let profitMonth = Math.round(dollarPerMonth - monthlyEnergy);
    let monthsToRoi = Math.round(100 * (a.price / dollarPerMonth)) / 100;

    const data = {
      key: idx,
      date: moment(a.date).format("MMM Do YY"),
      efficiency: a.efficiency,
      model: a.model,
      price: a.price,
      th: a.th,
      vendor: a.vendor,
      watts: a.watts,
      asicBTCPrice,
      value,
      wattDollar,
      currentHashPrice,
      elongatedHashPrice,
      denverDerivative,
      btcPerMonth,
      dollarPerMonth,
      monthlyEnergy,
      profitMonth,
      monthsToRoi,
    };

    return data;
  });

  return (
    <Layout>
      <Header>
        Insert your kWh Price:
        <InputNumber
          style={{ width: 80}}
          placeholder="Your kWh Price"
          defaultValue="0.12"
          onChange={onChangekWhPrice}
          size="large"
          max={1}
          min={0.01}
          step={0.01}
          maxLength={6}
          value={kWhPrice}
        />
      </Header>
      <Content>
        <Table dataSource={formattingAsicData} columns={columns} scroll={{y: '50vh'}}/>
      </Content>
      <Footer style={{display: 'flex', flexFlow: 'column wrap' ,alignItems: 'center', justifyContent: 'center'}}>
        <Title style={{textAlign:'center'}}>Asic Pricing Chart</Title>
        <Title level={5}>Some terms to define:</Title>
        <Paragraph style={{width: '30%'}}>
        Watts/Th = An ASIC's total watt consumption divided by its nominal Th/s rating.<br />
        $/Th = The total cost of an ASIC divided by its nominal Th/s rating.<br />
        WattDollar = The product of an ASIC's watts/Th multiplied by $/Th.<br />
        Hash price = USD value of 1 Th/s over the course of 24 hours.<br />
        Elongated hash price = USD value of 1 Th/s over the course of 50,000 blocks.<br />
        </Paragraph>
        <Title level={5}>
          Denver's Derivative (DD) = WattDollar/Elongated hash price =
        </Title>
        <Paragraph>
          {">"}50 = If your power is less than ~$0.035 OR you're going to run
          the ASIC for five-plus years.
          <br />
          {"<"}50 = If your power is less than ~$0.055 OR you're going to run
          the ASIC for four-plus years.
          <br />
          {"<"}40 = If your power is less than ~$0.075 OR you're going to run
          the ASIC for three-plus years.
          <br />
          {"<"}30 = If your power is less than ~$0.125 OR you're going to run
          the ASIC for three years.
          <br />
          {"<"}20 = If your power is less than ~$0.15 OR you're going to run the
          ASIC for two-plus years.
          <br />
          {"<"}15 = Borrow to buy all the hardware (just kidding but not
          really).
          <br />
        </Paragraph>
      </Footer>
    </Layout>
  );
};

export default Asics;
