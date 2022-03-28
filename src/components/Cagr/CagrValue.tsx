import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { Card, Statistic } from "antd";
import { historicPricesInterface } from "api";
import React from "react";
import { gridStyle } from "../styles";

const CagrValue = (props: {
  historicPriceRange: historicPricesInterface[];
}): JSX.Element => {
  const { historicPriceRange } = props;

  const cagrFormula = (
    endVal: number,
    beginningVal: number,
    numOfYears: number
  ) =>
    Number(
      ((Math.pow(endVal / beginningVal, 1 / numOfYears) - 1) * 100).toFixed(2)
    );

  let numOfYears = historicPriceRange?.length / 365;
  //bitcoin cagr values
  let btcEndVal: number =
    historicPriceRange[historicPriceRange?.length - 1] === null
      ? historicPriceRange[historicPriceRange?.length - 2]?.btc_price
      : historicPriceRange[historicPriceRange?.length - 1]?.btc_price;
      
  let btcBeginningVal: number = historicPriceRange[0]?.btc_price;
  const btcCagrVal = cagrFormula(btcEndVal, btcBeginningVal, numOfYears);
  console.log(historicPriceRange);

  //gld cagr values
  let gldEndVal: number =
    historicPriceRange[historicPriceRange?.length - 1]?.gld_price;
  let gldBeginningVal: number = historicPriceRange[0]?.gld_price;
  const gldCagrVal = cagrFormula(gldEndVal, gldBeginningVal, numOfYears);

  //spy cagr values
  let spyEndVal = historicPriceRange[historicPriceRange?.length - 1].spy_price;
  let spyBeginningVal = historicPriceRange[0].spy_price;
  const spyCagrVal = cagrFormula(spyEndVal, spyBeginningVal, numOfYears);

  // removed size="small" from card
  return (
    <>
      <Card>
        <Card.Grid style={gridStyle}>
          <Statistic
            title={`BTC CAGR`}
            value={`${btcCagrVal}%`}
            precision={2}
            valueStyle={
              btcCagrVal > 0 ? { color: "#3f8600" } : { color: "red" }
            }
            prefix={
              btcCagrVal > 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />
            }
          />
        </Card.Grid>
        <Card.Grid style={gridStyle}>
          <Statistic
            title={`GLD CAGR`}
            value={`${gldCagrVal}%`}
            precision={2}
            valueStyle={
              gldCagrVal > 0 ? { color: "#3f8600" } : { color: "red" }
            }
            prefix={
              gldCagrVal > 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />
            }
          />
        </Card.Grid>
        <Card.Grid style={gridStyle}>
          <Statistic
            title={`SPY CAGR`}
            value={`${spyCagrVal}%`}
            precision={2}
            valueStyle={
              spyCagrVal > 0 ? { color: "#3f8600" } : { color: "red" }
            }
            prefix={
              spyCagrVal > 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />
            }
          />
        </Card.Grid>
      </Card>
    </>
  );
};

export default CagrValue;
