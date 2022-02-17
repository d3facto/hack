import React, { useCallback, useEffect, useState } from "react";
import { Col, Row, Typography } from "antd";

import "./App.css";
import { TicTacToe } from "./TicTacToe";
import { Sprinkle } from "./Sprinkles";

const { Title } = Typography;

function App() {
  const [showSprinkle, setShow] = useState(false);

  useEffect(() => {
    if (showSprinkle) {
      setTimeout(() => {
        setShow(false);
      }, 2500);
    }
  }, [showSprinkle]);

  const onWin = useCallback(() => setShow(true), []);

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
                <TicTacToe onWin={onWin} />
              </Col>
            </Row>
          </Card>
        </Col>
        {/* <Col className="gutter-row" span={12}>
          <Card className="defacto-img-background" />
        </Col> */}
      </Row>
      {showSprinkle && <Sprinkle />}
    </>
  );
}

function Card({ className, children }) {
  return <div className={`${className} card`}>{children}</div>;
}

export default App;
