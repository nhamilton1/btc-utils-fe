import { Space, DatePicker, Col, Row, Typography } from "antd";
import moment from "moment";
import React from "react";
import { useState } from "react";
import { useQuery } from "react-query";
import CagrChart from "./CagrChart";
import { fetchHistoricPriceRange } from "../../api";
import Layout from "antd/lib/layout/layout";
import CagrSkeleton from "./CagrSkeleton";
import CagrValue from "./CagrValue";
import Title from "antd/lib/typography/Title";
import Paragraph from "antd/lib/typography/Paragraph";

const { RangePicker } = DatePicker;
const oneYearAgoToday = moment().subtract(1, "year").format("YYYY-MM-DD");
const todaysDate = moment(new Date()).format("YYYY-MM-DD");

const initialDates = [oneYearAgoToday, todaysDate];

const Cagr = () => {
  const [date, setDate] = useState(initialDates);

  const { data: historicPriceRange, isLoading } = useQuery(
    ["fetchHistoricPriceRange", date],
    fetchHistoricPriceRange,
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
    }
  );

  if (isLoading) {
    return <CagrSkeleton />;
  }

  // fixes bug where if selected the start date on a weekend, sat or sunday, the value would be null
  historicPriceRange.map((n, idx) => {
    let j = idx + idx;
    if (
      (historicPriceRange[idx].spy_price === null &&
        historicPriceRange[j].spy_price !== null) ||
      (historicPriceRange[idx].gld_price === null &&
        historicPriceRange[idx].gld_price === null)
    ) {
      historicPriceRange[idx].spy_price = historicPriceRange[j].spy_price;
      historicPriceRange[idx].gld_price = historicPriceRange[j].gld_price;
      j = idx + 1;
      idx = 0;
    } else {
      j++;
    }
    historicPriceRange[0].spy_price = historicPriceRange[1].spy_price;
    historicPriceRange[0].gld_price = historicPriceRange[1].gld_price;
    return n;
  });

  const dateFormat = "YYYY-MM-DD";

  //disables anythingbefore the start date and anything after the current date.
  const disabledDate = (current) => {
    let start = "2010-07-17";
    let end = Date.now();
    if (current < moment(start)) {
      return true;
    } else if (current > moment(end)) {
      return true;
    } else {
      return false;
    }
  };

  const onChangeSetDate = (range) => {
    const startValue = range[0].format().slice(0, 10);
    const endValue = range[1].format().slice(0, 10);
    setDate([startValue, endValue]);
  };

  return (
    <Layout>
      <Row>
        <Col span={20}>
          <CagrChart historicPriceRange={historicPriceRange} />
        </Col>
        <Col
          span={4}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexFlow: "column wrap",
          }}
        >
          <CagrValue historicPriceRange={historicPriceRange} />
        </Col>
      </Row>
      <Space direction="vertical" size={12}>
        <RangePicker
          format={dateFormat}
          disabledDate={disabledDate}
          onChange={onChangeSetDate}
          defaultValue={[moment(oneYearAgoToday), moment(todaysDate)]}
        />
      </Space>
      <Typography
        style={{
          display: "flex",
          flexFlow: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Title style={{ fontSize: "1.2rem" }}>CAGR info</Title>
        <Paragraph style={{ width: "50%" }}>
          CAGR stands for Compound Annual Grow Rate. The CAGR is a mathematical
          formula that provides a "smoothed" rate of return. It tells you what
          an investment yields on an annually compounded basis.
        </Paragraph>
      </Typography>
    </Layout>
  );
};

export default Cagr;
