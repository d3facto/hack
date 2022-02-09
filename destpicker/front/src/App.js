import React from 'react'

import { Button, Col, Form, Input, Row, Typography, Space, Spin } from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'

import { Destinations } from './Destinations'
import { destpicker } from './api'
import './App.css'

const { Paragraph, Title } = Typography

function App() {
  const onSubmit = async (values) => {
    console.log(values)
    setIsLoading(true)
    try {
      const destinations = values.destinations.map(d => ({ name: d.value, address: d.value }))
      const response = await destpicker(values.participants, destinations)
      setTransitSummary(response.data)
      console.log({ apiData: response.data }) // TODO remove
    } catch (error) {
      alert("Oh nooooooo, an error happened while calling the API. Take a look at the console.")
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const [isLoading, setIsLoading] = React.useState(false)
  const [transitSummary, setTransitSummary] = React.useState(null)


  return (
    <>
      <Row className="main-container" gutter={8}>
        <Col className="gutter-row" span={12}>
          <Card>
            <Row>
              <Col span={24}>
                <Title level={2}>Eric.ai 🧠</Title>
                <Paragraph>
                  Say hello to Eric.ai 👋. He will help you organize the next off-sites!<br />
                  Give him the name and address of every team member you want to gather and he'll tell you where is the best place to meet.
                </Paragraph>
              </Col>
            </Row>

            <Row className="margin-top-32">
              <Col span={24}>
                <Form onFinish={onSubmit} autoComplete="off" layout="vertical">
                  <Title level={3}>Off-site participants</Title>

                  <Form.List name="participants">
                    {(fields, { add, remove }) => (
                      <>
                        {fields.map(({ key, name, ...restField }) => (
                          <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                            <Form.Item
                              {...restField}
                              name={[name, 'name']}
                              rules={[{ required: true, message: 'Missing name' }]}
                            >
                              <Input placeholder="Name" />
                            </Form.Item>
                            <Form.Item
                              {...restField}
                              name={[name, 'address']}
                              rules={[{ required: true, message: 'Missing address' }]}
                            >
                              <Input placeholder="Address" />
                            </Form.Item>
                            <MinusCircleOutlined onClick={() => remove(name)} />
                          </Space>
                        ))}
                        <Form.Item>
                          <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                            Add participant
                          </Button>
                        </Form.Item>
                      </>
                    )}
                  </Form.List>

                  <Title level={3}>Destination candidates</Title>

                  <Form.List name="destinations">
                    {(fields, { add, remove }) => (
                      <>
                        {fields.map(({ key, name, ...restField }) => (
                          <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                            <Form.Item
                              {...restField}
                              name={[name, 'value']}
                              rules={[{ required: true, message: 'Missing name' }]}
                            >
                              <Input placeholder="Name" />
                            </Form.Item>
                            <MinusCircleOutlined onClick={() => remove(name)} />
                          </Space>
                        ))}
                        <Form.Item>
                          <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                            Add destination
                          </Button>
                        </Form.Item>
                      </>
                    )}
                  </Form.List>

                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      Submit
                    </Button>
                  </Form.Item>
                </Form>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col className="gutter-row" span={12}>
          {transitSummary === null ? <Card className="defacto-img-background" /> : (
            <Card>
              <Row className="margin-top-32">
                <Col span={24}>
                  <Title level={3}>Results !!!</Title>
                </Col>
                <Col span={24}>
                  {isLoading ? <Spin size="large" /> : (<Destinations apiResult={transitSummary} />)}
                </Col>
              </Row>
            </Card>
          )}
        </Col>
      </Row>
    </>
  )
}

function Card({ className, children }) {
  return <div className={`${className} card`}>{children}</div>
}

export default App
