import axios from "axios";

const poolURL = process.env.REACT_APP_BASE_URL + "/api/nd/pool_block_counter";
const historicURL = process.env.REACT_APP_BASE_URL + "/api/historic_prices";
const asicURL = "https://btc-utils-be.herokuapp.com/api/asics";
const btcPriceURL = "https://insights.braiins.com/api/v1.0/price-stats";
const hashRateStats = "https://insights.braiins.com/api/v1.0/hash-rate-stats";

export const fetchPoolBlockCounterPerDay = async ({ queryKey }): Promise<number[]> => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, poolName] = queryKey;
  try {
    const res = await axios.get(poolURL, { params: { pool: poolName } });
    return res.data.data;
  } catch (error) {
    console.log(error);
    throw(error);
  }
};

export interface historicPricesInterface { 
  btc_price: number;
  date: string;
  gld_price: number;
  spy_price: number;
}

export const fetchHistoricPriceRange = async ({ queryKey }): Promise<historicPricesInterface[]> => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, date] = queryKey;
  try {
    const res = await axios.get(historicURL, {
      params: { startDate: date[0], endDate: date[1] },
    });
    return res.data;
  } catch (err) {
    console.log(err);
    throw(err);
  }
};

export const fetchAsicData = async () => {
  try {
    const res = await axios.get(asicURL);
    return res.data;
  } catch (err) {
    console.error(err);
    throw(err);
  }
};

interface currBtcPriceInterface {
  price: number;
  timestamp?: string;
}

export const fetchCurrentBTCPrice = async (): Promise<currBtcPriceInterface> => {
  try {
    const res = await axios.get(btcPriceURL);
    return res.data;
  } catch (err) {
    console.error(err);
    throw(err);
  }
};


interface hashRateStatsInterface {
  avg_fees_per_block?: number;
  current_hash_rate?: number;
  fees_percent?: number;
  hash_price?: number;
  hash_rate_30?: number;
  hash_value?: number;
  rev_usd?: number;
}

export const fetchHashRateStats = async (): Promise<hashRateStatsInterface> => {
  try {
    const res = await axios.get(hashRateStats);
    return res.data;
  } catch (err) {
    console.error(err);
    throw(err);
  }
};
