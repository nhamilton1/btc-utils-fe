import { GithubOutlined, TwitterOutlined } from "@ant-design/icons";
import { Button, Col, Row, Typography } from "antd";
import React from "react";

const FooterComp = () => {
  return (
    <>
      <Row justify="center">
        <Col>
          <Button
            type="text"
            href="https://github.com/nhamilton1"
            icon={
              <GithubOutlined
                className="githubIcon"
                style={{ fontSize: "2rem" }}
              />
            }
            target={"_blank"}
            style={{ paddingRight: "25%" }}
          />

          <Button
            type="text"
            href="https://twitter.com/AdrenaIine"
            icon={
              <TwitterOutlined
                style={{ fontSize: "2rem" }}
                className='myTwitterIcon'
              />
            }
            target={"_blank"}
            style={{ paddingLeft: "25%" }}
          />

          <Typography>Made by Nick</Typography>
        </Col>
        <Col></Col>
      </Row>
    </>
  );
};

export default FooterComp;
