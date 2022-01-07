import { Skeleton } from 'antd'
import React from 'react'

const CagrSkeleton = () => {
    return (
        <div style={{width: "50%"}}>
            <Skeleton active paragraph={{ rows: 4 }}/>
        </div>
    )
}

export default CagrSkeleton
