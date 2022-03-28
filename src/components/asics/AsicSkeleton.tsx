import { Table, Skeleton } from "antd";
import Layout, { Content, Header } from "antd/lib/layout/layout";
import SkeletonButton from "antd/lib/skeleton/Button";
import React from "react";

const AsicSkeleton = ({ columns }) => {
  const rowCount = 10;

  return (
    <>
      <Layout>
        <Header>
          Insert your kWh Price:
          <SkeletonButton style={{ width: 80, marginTop: '.820rem' }} size="large" />
        </Header>
        <Content>
          <Table
            rowKey="key"
            pagination={false}
            dataSource={[...Array(rowCount)].map((_, index) => ({
              key: `key${index}`,
            }))}
            columns={columns.map((column) => {
              return {
                ...column,
                render: function renderPlaceholder() {
                  return (
                    <Skeleton
                      key={column.dataIndex}
                      title={true}
                      paragraph={false}
                    />
                  );
                },
              };
            })}
          />
        </Content>
      </Layout>
    </>
  );
};

export default AsicSkeleton;
