import { SearchOutlined, TwitterOutlined } from "@ant-design/icons";
import { Table, InputNumber, Typography, Button, Input, Space } from "antd";
import Layout, { Content, Footer, Header } from "antd/lib/layout/layout";
import moment from "moment";
import React, { useState } from "react";
import { useQuery } from "react-query";
import {
  fetchAsicData,
  fetchCurrentBTCPrice,
  fetchHashRateStats,
} from "../../api";
import AsicSkeleton from "./AsicSkeleton";
import DefsAndDenver from "./DefsAndDenver";

interface searchInterface {
  searchText?: string;
  searchedColumn?: string;
}

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

  const [, setState] = useState<searchInterface>({
    searchText: "",
    searchedColumn: "",
  });

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

  let currentBTCPrice = btcPrice?.price;
  let currentHash = hashRateStats?.current_hash_rate;
  let currentHashValue = Math.round(hashRateStats?.hash_value! * 100000000);
  let currentHashPrice = Number(
    (currentBTCPrice! * currentHashValue * 0.00000001).toFixed(4)
  );
  let elongatedHashPrice = currentHashPrice * 347.22;

  let searchInput: any = null;
  const getColumnSearchProps = (dataIndex: string) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => (searchInput = node)}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            onClick={() => handleReset(clearFilters, confirm)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setState({
                searchText: selectedKeys[0],
                searchedColumn: dataIndex,
              });
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: any) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : "orange" }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
    onFilterDropdownVisibleChange: (visible: any) => {
      if (visible) {
        setTimeout(() => searchInput.select(), 100);
      }
    },
  });

  const handleSearch = (selectedKeys: any[], confirm: () => void, dataIndex: string) => {
    confirm();
    setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  const handleReset = (clearFilters, confirm) => {
    clearFilters();
    setState({ searchText: "" });
    confirm({ closeDropdown: false });
  };

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
      ...getColumnSearchProps("model"),
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
      sorter: {
        compare: (a: { asicBTCPrice: number; }, b: { asicBTCPrice: number; }) => b.asicBTCPrice - a.asicBTCPrice,
        multiple: 2,
      },
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
      sorter: {
        compare: (a: { denverDerivative: number; }, b: { denverDerivative: number; }) => b.denverDerivative - a.denverDerivative,
        multiple: 1,
      },
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
      sorter: {
        compare: (a: { monthsToRoi: number; }, b: { monthsToRoi: number; }) => b.monthsToRoi - a.monthsToRoi,
      },
    },
    {
      title: "$/Month",
      dataIndex: "dollarPerMonth",
      key: "dollarPerMonth",
    },
  ] as any;

  const onChangekWhPrice = (value: React.SetStateAction<string | number>) => {
    setkWhPrice(value);
    localStorage.setItem("kWhPrice", value.toString());
  };

  interface formattedInterface {
    price: number;
    th: number;
    efficiency: number;
    watts: number;
    date: moment.MomentInput;
    model: string;
    vendor: string;
  }

  const formattingAsicData = asicData?.map((a: formattedInterface, idx: number) => {
    let asicBTCPrice =
      Math.round(1000000 * (a.price / currentBTCPrice!)) / 1000000;
    let value = Math.round(a.price / a.th);
    let wattDollar = Number((value * a.efficiency).toFixed(0));
    let denverDerivative = Number((wattDollar / elongatedHashPrice).toFixed(2));
    let btcPerMonth =
      Math.round(1000000 * ((a.th / (currentHash! * 1000000)) * 900 * 30.5)) /
      1000000;
    let dollarPerMonth = Math.round(btcPerMonth * currentBTCPrice!);
    let monthlyEnergy =
      Math.round(100 * (732 * (a.watts * 0.001) * Number(kWhPrice))) / 100;
    let profitMonth = Math.round(dollarPerMonth - monthlyEnergy);
    let monthsToRoi = Math.round(100 * (a.price / dollarPerMonth)) / 100;

    const data = {
      key: idx,
      date: moment(a.date, "MM-DD-YYYY", true).format("MMM Do YY"),
      efficiency: a.efficiency.toFixed(1),
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

  if (btcPriceLoading) {
    return <AsicSkeleton columns={columns} />;
  }
  if (hashRateStatsLoading) {
    return <AsicSkeleton columns={columns} />;
  }
  if (isLoading) {
    return <AsicSkeleton columns={columns} />;
  }

  const hiddenVals = [
    `Current BTC price: $${currentBTCPrice?.toLocaleString()}`,
    `Current Network Hashrate: ${currentHash} EH/s`,
    `Current Hash Price: $${currentHashPrice}`,
    `Elongated Hash Price: $${elongatedHashPrice?.toFixed(3)}`,
    `Current Hash Value: ${currentHashValue} sats`,
  ];

  return (
    <Layout>
      <Header>
        Insert your kWh Price:
        <InputNumber
          style={{ width: 80 }}
          placeholder="Your kWh Price"
          defaultValue="0.12"
          onChange={onChangekWhPrice}
          size="large"
          max={2}
          min={0.01}
          step={0.01}
          maxLength={6}
          value={kWhPrice}
        />
      </Header>
      <Content>
        <Table
          dataSource={formattingAsicData}
          columns={columns}
          scroll={{ x: "100%" }}
          style={{ width: "100%" }}
        />
      </Content>
      <Footer style={{ paddingTop: 0, width: "100%" }}>
        <Content>
          <DefsAndDenver hiddenVals={hiddenVals} />
        </Content>

        <Typography>Credit to Joe Rodgers for the idea.</Typography>

        <Typography>
          Joe's Twitter:
          <Button
            type="text"
            href="https://twitter.com/_joerodgers"
            icon={
              <TwitterOutlined
                style={{ fontSize: "1rem" }}
                className="twitterIcon"
              />
            }
            target={"_blank"}
          />
        </Typography>
      </Footer>
    </Layout>
  );
};

export default Asics;
