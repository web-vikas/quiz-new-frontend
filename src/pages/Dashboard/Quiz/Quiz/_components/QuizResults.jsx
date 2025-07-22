import { Card, Table } from "antd";
export const QuizResults = () => {
  //=======================state==================
  //=======================Other Method=======================
  const columns = [
    {
      title: "Quiz Name",
      width: 150,
      dataIndex: "name",
      key: "name",
      fixed: "left",
    },
    {
      title: "Score",
      dataIndex: "address",
      key: "1",
      width: 150,
    },
    {
      title: "Time To Complete",
      dataIndex: "address",
      key: "2",
      width: 150,
    },
    {
      title: "Name",
      dataIndex: "address",
      key: "3",
      width: 150,
    },
    {
      title: "Email",
      dataIndex: "address",
      key: "4",
      width: 150,
    },
    {
      title: "Phone",
      dataIndex: "address",
      key: "5",
      width: 150,
    },
    {
      title: "User",
      dataIndex: "address",
      key: "6",
      width: 150,
    },
    {
      title: "Time Token",
      dataIndex: "address",
      key: "7",
      width: 150,
    },
    { title: "Column 8", dataIndex: "address", key: "8" },
    {
      title: "Action",
      key: "operation",
      fixed: "right",
      width: 100,
      render: () => <a>action</a>,
    },
  ];
  const dataSource = Array.from({ length: 4 }).map((_, i) => ({
    key: i,
    name: `Edward ${i}`,
    age: 32,
    address: `London Park no. ${i}`,
  }));
  return (
    <div>
      <Card title="Result">
        <Table columns={columns} dataSource={dataSource} scroll={{ x: 1500 }} />
      </Card>
    </div>
  );
};
