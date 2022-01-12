import { Skeleton, Typography } from "antd";
import React, { useState } from "react";
import { useQuery } from "react-query";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { fetchPoolBlockCounterPerDay } from "../api";
import {
  GetNewZPercent,
  getMean,
  getStdDeviation,
  generatePoints,
} from "../helpers/NDfunctions";
import { renderToolTip } from "../utils/renderToolTip";
import PoolSelector from "./PoolSelector";
import Layout from "antd/lib/layout/layout";
import Title from "antd/lib/typography/Title";
import Paragraph from "antd/lib/typography/Paragraph";

const NormalDistribution = () => {
  const [poolName, setPoolName] = useState("SlushPool");

  const { data: poolBlockCounterPerDay, isLoading } = useQuery(
    ["fetchPoolBlockCounterPerDay", poolName],
    fetchPoolBlockCounterPerDay,
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
    }
  );

  if (isLoading) {
    return <Skeleton paragraph={{ rows: 10 }} />;
  }

  const dataPoints = Object.values(poolBlockCounterPerDay).sort(
    (a, b) => a - b
  );

  const lowerBound = Math.min(...dataPoints),
    upperBound = Math.max(...dataPoints);

  const zScore = (x) => Number(((x - mean) / stdDev).toFixed(2));

  let mean = getMean(lowerBound, upperBound);
  let stdDev = getStdDeviation(lowerBound, upperBound);
  let points = generatePoints(lowerBound, upperBound);
  let removeDupes = [...new Set(points.map((x) => Number(x.toFixed(0))))];
  // let data = removeDupes.map(x => ({ x, y: zScore(x), z: GetZPercent(zScore(x)) }));
  let newDataSet = removeDupes.map((x) => ({
    x,
    y: zScore(x),
    z: GetNewZPercent(zScore(x)),
  }));

  return (
    <Layout>
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart data={newDataSet}>
          <Area
            dataKey="z"
            fill="#ffaa15"
            name="z"
            animationEasing="ease-in"
            type="monotone"
          />
          <XAxis dataKey="x" orientation="top" scale="band" />
          <YAxis allowDataOverflow={true} type="number" />
          <Tooltip content={renderToolTip} />
          <CartesianGrid opacity={0.1} vertical={false} />
        </AreaChart>
      </ResponsiveContainer>
      <PoolSelector poolName={poolName} setPoolName={setPoolName} />
      <Typography
        style={{
          display: "flex",
          flexFlow: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Title style={{ fontSize: "1.2rem" }}>
          Normal Distribution for {poolName.replace("+", " ")}
        </Title>
        <Paragraph style={{ width: "80%" }}>
          The normal distribution graph takes the amount of blocks mined per day
          from {poolName.replace("+", " ")} for the past month. The x-axis
          represents a range from getting no blocks to the most amount of blocks
          mined by the pool, plus some. The y-axis takes the zscore and turns it
          into the zscore percentage, where 50% represents the average amount of
          blocks mined by the pool per day.
        </Paragraph>
      </Typography>
    </Layout>
  );
};

export default NormalDistribution;
