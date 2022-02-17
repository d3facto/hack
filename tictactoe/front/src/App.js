import React from "react";
import { Col, Row, Typography } from "antd";

import "./App.css";
import { TicTacToe } from "./TicTacToe";

const { Title } = Typography;

function App() {
  return (
    <>
      <Row className="main-container" gutter={8}>
        <Col className="gutter-row" span={24}>
          <Card>
            <Row>
              <Col span={24}>
                <Title level={2}>Arthur Hackathon 🧠</Title>
              </Col>
            </Row>

            <Row className="margin-top-32">
              <Col span={24}>
                <Title level={3}>Tic Tac Toe</Title>
                <TicTacToe />
              </Col>
            </Row>
          </Card>
        </Col>
        {/* <Col className="gutter-row" span={12}>
          <Card className="defacto-img-background" />
        </Col> */}
      </Row>
    </>
  );
}

function Card({ className, children }) {
  return <div className={`${className} card`}>{children}</div>;
}

export default App;
