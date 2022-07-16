import { DeleteOutlined } from "@ant-design/icons";
import { useMutation, useQuery } from "@apollo/client";
import { Button, Col, Form, Input, Popconfirm, Row, Table } from "antd";
import { Topbar } from "../components";
import moment from "moment";
import { ADD_CATEGORY, GET_CATEGORIES, UPDATE_CATEGORY } from "../queries";
import { useState } from "react";

export const Categories = () => {
  const [form] = Form.useForm();
  const [searchValue, setSearchValue] = useState();
  const {
    loading: list_loading,
    error: list_error,
    data: list_data,
  } = useQuery(GET_CATEGORIES, { variables: { searchString: searchValue } });
  const [addCategory, { data: add_data, loading: add_loading, error: add_error }] = useMutation(
    ADD_CATEGORY,
    { refetchQueries: [{ query: GET_CATEGORIES }, { variables: { searchString: searchValue } }] }
  );

  const onFinish = (values) => {
    console.log(values);

    addCategory({
      variables: {
        categories: [values],
      },
    });

    form.resetFields();
  };

  console.log("list categories", list_data, list_loading, list_error);
  console.log("add new category", add_data, add_loading, add_error);

  const columns = [
    {
      title: "Name",
      dataIndex: "CATEGORIES_NAME",
    },
    {
      title: "Slug",
      dataIndex: "SLUG",
    },
    {
      title: "Description",
      dataIndex: "DESCRIPTION",
    },
    {
      title: "Created at",
      dataIndex: "CREATE_AT",
      render: (data) => moment(data).format("DD/MM/YYYY"),
    },
    {
      title: "Actions",
      render: (_, record) => <DeleteButton record={record} />,
    },
  ];

  return (
    <div>
      <Topbar title="Categories" onSearch={setSearchValue} />

      <Row gutter={15}>
        <Col flex="350px">
          <Form form={form} layout="vertical" onFinish={onFinish}>
            <Form.Item label="Name" name="CATEGORIES_NAME" rules={[{ required: true }]}>
              <Input />
            </Form.Item>

            <Form.Item label="Slug" name="SLUG" rules={[{ required: true }]}>
              <Input />
            </Form.Item>

            <Form.Item label="Description" name="DESCRIPTION">
              <Input.TextArea rows={4} />
            </Form.Item>

            <Button type="primary" block loading={add_loading} htmlType="submit">
              Add new
            </Button>
          </Form>
        </Col>

        <Col flex="auto">
          <Table
            rowKey="ID"
            columns={columns}
            dataSource={list_data?.getCategories}
            loading={list_loading}
            pagination={{ pageSize: 5 }}
          />
        </Col>
      </Row>
    </div>
  );
};

const DeleteButton = ({ record }) => {
  const [updateCategory, { data: update_data, loading: update_loading, error: update_error }] =
    useMutation(UPDATE_CATEGORY, { refetchQueries: [{ query: GET_CATEGORIES }] });

  console.log("update category", update_data, update_loading, update_error);

  return (
    <Popconfirm
      title="Are you sure?"
      onConfirm={() =>
        updateCategory({
          variables: { category: { ID: record.ID, STATE: false } },
        })
      }
    >
      <Button icon={<DeleteOutlined />} type="primary" danger loading={update_loading}></Button>
    </Popconfirm>
  );
};
