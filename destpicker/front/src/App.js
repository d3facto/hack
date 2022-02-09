import React from 'react'

import { Button, Col, Form, Input, Row, Typography } from 'antd'

import { Destinations } from './Destinations'
import { destpicker } from './api'
import './App.css'

const { Paragraph, Title } = Typography

const EXAMPLE_API_RESULT = [
  {
    destination: { name: 'Chamonix', address: 'Chamonix' },
    averate_duration_second: 1500,
    average_distance_meter: 1500,
    max_duration_second: 2000,
    max_distance_meter: 2000,
    journeys: [
      {
        participant: { name: 'Marco', address: 'Paris' },
        distance_meter: 1000,
        duration_second: 1000,
      },
      {
        participant: { name: 'Antoine', address: 'Lyon' },
        distance_meter: 2000,
        duration_second: 2000,
      }
    ]
  },
  {
    destination: { name: 'Biarritz', address: 'Biarritz' },
    averate_duration_second: 2500,
    average_distance_meter: 2500,
    max_duration_second: 3000,
    max_distance_meter: 3000,
    journeys: [
      {
        participant: { name: 'Marco', address: 'Paris' },
        distance_meter: 3000,
        duration_second: 3000,
      },
      {
        participant: { name: 'Antoine', address: 'Lyon' },
        distance_meter: 2000,
        duration_second: 2000,
      }
    ]
  }
]

function App() {
  return (
    <>
      <Row className="main-container" gutter={8}>
        <Col className="gutter-row" span={12}>
          <DestPickerCard />
        </Col>
        <Col className="gutter-row" span={12}>
          <Card className="defacto-img-background" />
        </Col>
      </Row>
    </>
  )
}

function Card({ className, children }) {
  return <div className={`${className} card`}>{children}</div>
}

function DestPickerCard() {
  const onSubmit = (values) => {
    console.log('Success:', values);
  };

  const [participants, setParticipants] = React.useState([{ 'name': 'Marco', 'address': 'Paris' }, { 'name': 'Antoine', address: 'rue de marseille 69007 Lyon' }])
  const [destinations, setDestinations] = React.useState([{ 'name': 'Chamonix', 'address': 'Chamonix' }, { 'name': 'Biarrtz', address: 'Biarritz' }])

  destpicker(participants, destinations).then(console.log)

  return (
    <Card>
      <Row>
        <Col span={24}>
          <Title level={2}>Eric.ai </Title>
          <Paragraph>
            Say hello to Eric.ai 👋. He will help you organize the next off-sites!<br />
            Give him the name and address of every team member you want to gather and he'll tell you where is the best place to meet.
          </Paragraph>
        </Col>
      </Row>

      <Row className="margin-top-32">
        <Col span={24}>
          <Title level={3}>Off-site participants</Title>
          <Form onFinish={onSubmit} autoComplete="off" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
            <Form.Item
              label="Username"
              name="username"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>

      <Row className="margin-top-32">
        <Col span={24}>
          <Destinations apiResult={EXAMPLE_API_RESULT} />
        </Col>
      </Row>
    </Card>
  )
}

export default App
