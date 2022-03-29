import { Col, Divider, List, Row } from "antd";
import React from "react";
import MediaQuery from "react-responsive";
import { denvD, terms } from "./utils";


interface IProps {
  hiddenVals: Array<string>;
}

const DefsAndDenver: React.FC<IProps> = ({hiddenVals}) => {
  return (
    <MediaQuery maxWidth={1224}>
      {(matches) =>
        matches ? (
          <>
            <Divider orientation="left">Hidden Values</Divider>
            <List
              header="Values that are used in the table, but are not displayed"
              size="small"
              bordered
              dataSource={hiddenVals}
              renderItem={(item: string) => <List.Item>{item}</List.Item>}
            />

            <Divider orientation="left">Definitions</Divider>
            <List
              size="small"
              bordered
              dataSource={terms}
              renderItem={(item) => <List.Item>{item}</List.Item>}
            />

            <Divider orientation="left">Denver's Derivative</Divider>
            <List
              header="Denver's Derivative (DD) = WattDollar/Elongated hash price ="
              size="small"
              bordered
              dataSource={denvD}
              renderItem={(item) => <List.Item>{item}</List.Item>}
            />
          </>
        ) : (
          <Row gutter={100} justify="center">
            <Col span={8}>
              <Divider orientation="left">Hidden Values</Divider>
              <List
                header="Values that are used in the table, but are not displayed"
                size="small"
                bordered
                dataSource={hiddenVals}
                renderItem={(item: string) => <List.Item>{item}</List.Item>}
              />
            </Col>
            <Col span={8}>
              <Divider orientation="left">Definitions</Divider>
              <List
                size="small"
                bordered
                dataSource={terms}
                renderItem={(item) => <List.Item>{item}</List.Item>}
              />
            </Col>
            <Col span={8}>
              <Divider orientation="left">Denver's Derivative</Divider>
              <List
                header="Denver's Derivative (DD) = WattDollar/Elongated hash price ="
                size="small"
                bordered
                dataSource={denvD}
                renderItem={(item) => <List.Item>{item}</List.Item>}
              />
            </Col>
          </Row>
        )
      }
    </MediaQuery>
  );
};

export default DefsAndDenver;
