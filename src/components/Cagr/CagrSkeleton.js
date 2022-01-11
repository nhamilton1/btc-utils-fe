import { Col, Row, Skeleton } from "antd";
import Layout from "antd/lib/layout/layout";
import React from "react";

const CagrSkeleton = () => {
  return (
    <Layout>
      <Row>
        <Col span={19}>
          <Skeleton active paragraph={{ rows: 10 }} />
        </Col>
        <Col
          span={5}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexFlow: "column wrap",
          }}
        >
          <Skeleton.Button size="large" style={{ margin: "1vh" }} />
          <Skeleton.Button size="large" style={{ margin: "1vh" }} />
          <Skeleton.Button size="large" style={{ margin: "1vh" }} />
        </Col>
      </Row>
    </Layout>
  );
};

export default CagrSkeleton;
