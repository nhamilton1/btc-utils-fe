import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { Card, Statistic } from 'antd';
import React from 'react';

const CagrValue = props => {
  const { historicPriceRange } = props;

  const cagrFormula = (endVal, beginningVal, numOfYears) =>
    ((Math.pow(endVal / beginningVal, 1/numOfYears) - 1) * 100).toFixed(2);

  let numOfYears = historicPriceRange.length / 365;
  //bitcoin cagr values
  let btcEndVal = historicPriceRange[historicPriceRange.length - 1].btc_price;
  let btcBeginningVal = historicPriceRange[0].btc_price;
  const btcCagrVal = cagrFormula(btcEndVal, btcBeginningVal, numOfYears);

  let x = 1
  //gld cagr values
  let gldEndVal = historicPriceRange[historicPriceRange.length - x].gld_price;
  while(historicPriceRange[historicPriceRange.length - x].gld_price === null){
    gldEndVal = historicPriceRange[historicPriceRange.length - ++x].gld_price
  }
  let gldBeginningVal = historicPriceRange[0].gld_price;
  const gldCagrVal = cagrFormula(gldEndVal, gldBeginningVal, numOfYears);

  //spy cagr values
  let spyEndVal = historicPriceRange[historicPriceRange.length - x].spy_price;
  let spyBeginningVal = historicPriceRange[0].spy_price;
  const spyCagrVal = cagrFormula(spyEndVal, spyBeginningVal, numOfYears);

  return (
    <>
      <Card size="small">
        <Statistic
          title={`BTC CAGR`}
          value={`${btcCagrVal}%`}
          precision={2}
          valueStyle={btcCagrVal > 0 ? { color: '#3f8600' } : { color: 'red' }}
          prefix={btcCagrVal > 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
        />
      </Card>
      <Card size="small">
        <Statistic
          title={`GLD CAGR`}
          value={`${gldCagrVal}%`}
          precision={2}
          valueStyle={gldCagrVal > 0 ? { color: '#3f8600' } : { color: 'red' }}
          prefix={gldCagrVal > 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
        />
      </Card>
      <Card size="small">
        <Statistic
          title={`SPY CAGR`}
          value={`${spyCagrVal}%`}
          precision={2}
          valueStyle={spyCagrVal > 0 ? { color: '#3f8600' } : { color: 'red' }}
          prefix={spyCagrVal > 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
        />
      </Card>
    </>
  );
};

export default CagrValue;
