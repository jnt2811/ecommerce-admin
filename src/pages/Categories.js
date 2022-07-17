import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useMutation, useQuery } from "@apollo/client";
import { Button, Col, Form, Input, Modal, notification, Popconfirm, Row, Space, Table } from "antd";
import { Topbar } from "../components";
import moment from "moment";
import { ADD_CATEGORY, GET_CATEGORIES, UPDATE_CATEGORY } from "../queries";
import { useEffect, useRef, useState } from "react";
import { toSlug } from "../helpers";

export const Categories = () => {
  const nameRef = useRef();
  const [formAddNew] = Form.useForm();
  const [formEdit] = Form.useForm();
  const [categoryEdit, setCategoryEdit] = useState();
  const [searchValue, setSearchValue] = useState();
  const {
    loading: list_loading,
    error: list_error,
    data: list_data,
  } = useQuery(GET_CATEGORIES, { variables: { searchString: searchValue } });
  const [
    addCategory,
    { data: add_data, loading: add_loading, error: add_error, reset: add_reset },
  ] = useMutation(ADD_CATEGORY, {
    refetchQueries: [{ query: GET_CATEGORIES, variables: { searchString: searchValue } }],
  });
  const [
    updateCategory,
    { data: update_data, loading: update_loading, error: update_error, reset: update_reset },
  ] = useMutation(UPDATE_CATEGORY, {
    refetchQueries: [{ query: GET_CATEGORIES, variables: { searchString: searchValue } }],
  });

  console.log("list categories", list_data, list_loading, list_error);
  console.log("add new category", add_data, add_loading, add_error);
  console.log("update category", update_data, update_loading, update_error);

  useEffect(() => {
    if (add_data) {
      if (add_data?.addNewCategories?.status === "KO") {
        notification.error({
          placement: "bottomLeft",
          message: add_data?.addNewCategories?.message,
        });
        add_reset();
      } else if (add_data?.addNewCategories?.status === "OK") {
        notification.success({
          placement: "bottomLeft",
          message: "Add new category successfully!",
        });
        add_reset();
        formAddNew.resetFields();
        setTimeout(() => {
          nameRef.current?.focus();
        }, 500);
      }
    }
  }, [add_data, add_reset, formAddNew]);

  useEffect(() => {
    if (update_data) {
      if (update_data?.updateCategories?.status === "KO") {
        notification.error({
          placement: "bottomLeft",
          message: update_data?.updateCategories?.message,
        });
        update_reset();
      } else if (update_data?.updateCategories?.status === "OK") {
        notification.success({
          placement: "bottomLeft",
          message: "Update category successfully!",
        });
        update_reset();
        formEdit.resetFields();
        setCategoryEdit();
      }
    }
  }, [formEdit, update_data, update_reset]);

  const onFinish = (values) => {
    const isAddNew = !categoryEdit;

    if (isAddNew) {
      console.log("add new", values);

      addCategory({
        variables: {
          categories: [values],
        },
      });
    } else {
      console.log("edit", values);

      updateCategory({
        variables: { category: { ...values, ID: categoryEdit.ID } },
      });
    }
  };

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
      width: "200px",
      render: (data) => moment(data).format("DD/MM/YYYY HH:mm"),
    },
    {
      title: "Updated at",
      dataIndex: "UPDATE_AT",
      width: "200px",
      render: (data) => moment(data).format("DD/MM/YYYY HH:mm"),
    },
    {
      title: "Actions",
      fixed: "right",
      width: "100px",
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => {
              setCategoryEdit(record);
              formEdit.setFields(
                Object.keys(record).map((name) => ({ name, value: record[name] }))
              );
            }}
          ></Button>
          <DeleteButton record={record} searchValue={searchValue} />
        </Space>
      ),
    },
  ];

  const onChangeName = ({ target }, form) => {
    form.setFields([{ name: "SLUG", value: toSlug(target.value) }]);
  };

  const renderForm = (form, isAddNew = true) => (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Form.Item label="Name" name="CATEGORIES_NAME" rules={[{ required: true }]}>
        <Input onChange={(e) => onChangeName(e, form)} ref={nameRef} />
      </Form.Item>

      <Form.Item label="Slug" name="SLUG" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item label="Description" name="DESCRIPTION">
        <Input.TextArea rows={4} />
      </Form.Item>

      {isAddNew && (
        <Button type="primary" block loading={add_loading} htmlType="submit">
          Add new
        </Button>
      )}
    </Form>
  );

  return (
    <div>
      <Topbar title="Categories" onSearch={setSearchValue} />

      <Row gutter={15} wrap={false}>
        <Col flex="350px">{renderForm(formAddNew)}</Col>

        <Col flex="auto">
          <Table
            rowKey="ID"
            columns={columns}
            dataSource={list_data?.getCategories}
            loading={list_loading}
            pagination={{ pageSize: 5 }}
            scroll={{ x: 1200 }}
          />
        </Col>
      </Row>

      <Modal
        title="Edit category"
        visible={!!categoryEdit}
        onOk={() => formEdit.submit()}
        onCancel={() => {
          setCategoryEdit();
          formEdit.resetFields();
        }}
        confirmLoading={update_loading}
      >
        {renderForm(formEdit, false)}
      </Modal>
    </div>
  );
};

const DeleteButton = ({ record, searchValue }) => {
  const [updateCategory, { data: update_data, loading: update_loading, error: update_error }] =
    useMutation(UPDATE_CATEGORY, {
      refetchQueries: [{ query: GET_CATEGORIES }, { variables: { searchString: searchValue } }],
    });

  console.log("delete category", update_data, update_loading, update_error);

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
