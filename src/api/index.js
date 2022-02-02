import axios from "axios";

const poolURL = process.env.REACT_APP_BASE_URL + "/api/nd/pool_block_counter";
const historicURL = process.env.REACT_APP_BASE_URL + "/api/historic_prices";
const asicURL = process.env.REACT_APP_BASE_URL + "/api/asics";


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
    const res = await axios.get(asicURL)
    return res
  } catch (err) {
    console.error(err);
  }
};
