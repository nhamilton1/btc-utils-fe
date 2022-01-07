import { Space, DatePicker, Col, Row} from 'antd'
import moment from 'moment'
import React from 'react'
import { useState } from 'react'
import { useQuery } from 'react-query'
import CagrChart from './CagrChart'
import { fetchHistoricPriceRange } from '../../api'
import Layout from 'antd/lib/layout/layout'
import CagrSkeleton from './CagrSkeleton'
import CagrValue from './CagrValue'

const { RangePicker } = DatePicker;
const oneYearAgoToday = moment().subtract(1, 'year').format('YYYY-MM-DD')
const todaysDate = moment(new Date()).format('YYYY-MM-DD')

const initialDates = [oneYearAgoToday ,todaysDate]

const Cagr = () => {
    const [date, setDate] = useState(initialDates)
    
    const { data: historicPriceRange, isLoading } =
    useQuery(["fetchHistoricPriceRange", date], fetchHistoricPriceRange,
    {
        keepPreviousData: true,
        refetchOnWindowFocus: false,
        staleTime: Infinity
    })

    if (isLoading) {
        return <CagrSkeleton />
    }

    const dateFormat = 'YYYY-MM-DD';

    const disabledDate = current => {
        let start = '2010-07-17';
        let end = Date.now();
        if (current < moment(start)){
            return true;
        }
        else if (current > moment(end)){
            return true;
        }
        else {
            return false; 
        }
    }

    const onChangeSetDate = (range) => {
        const startValue = range[0].format().slice(0, 10);
        const endValue = range[1].format().slice(0, 10);
        setDate([startValue, endValue])
    }

    return (
        <Layout>
            <Row>
                <Col span={19}>
                    <CagrChart historicPriceRange={historicPriceRange}/>
                </Col>
                <Col span={5} style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexFlow:'column wrap'}}>
                    <CagrValue historicPriceRange={historicPriceRange} />
                </Col>
            </Row>
                <Space direction="vertical" size={12}>
                    <RangePicker 
                        format={dateFormat}
                        disabledDate={disabledDate}
                        onChange={onChangeSetDate}
                        defaultValue={[
                            moment(oneYearAgoToday),
                            moment(todaysDate)
                        ]}
                        />
                </Space>
        </Layout>
    )
}

export default Cagr
