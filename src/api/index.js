import axios from "axios";

const poolURL = process.env.REACT_APP_BASE_URL + "/api/nd/pool_block_counter";
const historicURL = process.env.REACT_APP_BASE_URL + "/api/historic_prices";
const asicURL = "https://nd-deploy.herokuapp.com/api/asics";
const btcPriceURL = "https://insights.braiins.com/api/v1.0/price-stats";
const hashRateStats = "https://insights.braiins.com/api/v1.0/hash-rate-stats";

export const fetchPoolBlockCounterPerDay = async ({ queryKey }) => {
  // eslint-disable-next-line no-unused-vars
  const [_, poolName] = queryKey;
  try {
    const res = await axios.get(poolURL, { params: { pool: poolName } });
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchHistoricPriceRange = async ({ queryKey }) => {
  // eslint-disable-next-line no-unused-vars
  const [_, date] = queryKey;
  try {
    const res = await axios.get(historicURL, {
      params: { startDate: date[0], endDate: date[1] },
    });
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const fetchAsicData = async () => {
  try {
    const res = await axios.get(asicURL);
    return res.data;
  } catch (err) {
    console.error(err);
  }
};

export const fetchCurrentBTCPrice = async () => {
  try {
    const res = await axios.get(btcPriceURL);
    return res.data;
  } catch (err) {
    console.error(err);
  }
};

export const fetchHashRateStats = async () => {
  try {
    const res = await axios.get(hashRateStats);
    return res.data;
  } catch (err) {
    console.error(err);
  }
};
