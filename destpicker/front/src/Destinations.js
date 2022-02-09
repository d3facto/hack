import moment from 'moment'
import { Typography, Table } from 'antd'

const { Paragraph } = Typography


// antd doc: https://ant.design/components/form/

function duration(seconds) {
  return moment.utc(seconds * 1000).format('HH:mm:ss');
}
function distance(d) {
  return `${d / 1000}km`;
}

const columns = [
  { title: 'Destination', dataIndex: ['destination', 'name'], key: 'name' },
  { title: 'Avg Duration', dataIndex: 'average_duration_second', render: (a) => duration(a), key: 'avg_duration' },
  { title: 'Max Duration', dataIndex: 'max_duration_second', render: (a) => duration(a), key: 'max_duration' },
  { title: 'Avg Distance', dataIndex: 'average_distance_meter', render: (a) => distance(a), key: 'avg_distance' },
];


export function Destinations({ apiResult }) {
  return <Table
    columns={columns}
    expandable={{
      expandedRowRender: record => <Journey journeys={record.journeys} />,
    }}
    dataSource={apiResult}
  />
}


// apiResult is the result from the API, it is never null
const journey_columns = [
  { title: 'Participant', dataIndex: ['participant', 'name'] },
  { title: 'duration', dataIndex: 'duration_second', render: (a) => duration(a) },
  { title: 'distance', dataIndex: 'distance_meter', render: (a) => distance(a) },
];

export function Journey({ journeys }) {
  return <Table
    columns={journey_columns}
    dataSource={journeys}
  />
}