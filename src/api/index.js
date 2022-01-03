import axios from "axios"


const URL = process.env.REACT_APP_BASE_URL + '/pool_block_counter'

export const fetchPoolBlockCounterPerDay = async ({ queryKey }) => {
    // eslint-disable-next-line no-unused-vars
    const [ _, poolName ] = queryKey
    try { 
        const res = await axios.get(URL, { params: { pool: poolName } })
        return res.data.data
    } catch (error) { 
        console.log(error) 
    }
}
