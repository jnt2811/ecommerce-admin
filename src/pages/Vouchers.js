import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useMutation, useQuery } from "@apollo/client";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Popconfirm,
  Row,
  Space,
  Table,
} from "antd";
import { Topbar } from "../components";
import moment from "moment";
import { ADD_VOUCHER, GET_VOUCHERS, UPDATE_VOUCHER } from "../queries";
import { useState } from "react";

export const Vouchers = () => {
  const [formAddNew] = Form.useForm();
  const [formEdit] = Form.useForm();
  const [voucherEdit, setVoucherEdit] = useState();
  const { loading: list_loading, error: list_error, data: list_data } = useQuery(GET_VOUCHERS);
  const [addVoucher, { data: add_data, loading: add_loading, error: add_error }] = useMutation(
    ADD_VOUCHER,
    { refetchQueries: [{ query: GET_VOUCHERS }] }
  );
  const [updateVoucher, { data: update_data, loading: update_loading, error: update_error }] =
    useMutation(UPDATE_VOUCHER, { refetchQueries: [{ query: GET_VOUCHERS }] });

  const onFinish = (values) => {
    values.VALID_UNTIL = moment(values.VALID_UNTIL).valueOf();
    values.DISCOUNT_PRICE = values.DISCOUNT_PRICE.toString();

    const isAddNew = !voucherEdit;

    if (isAddNew) {
      console.log(values);
      addVoucher({ variables: { vouchers: [values] } });
      formAddNew.resetFields();
    } else {
      values.ID = voucherEdit.ID;
      delete values.VALID_UNTIL;
      console.log(values);
      updateVoucher({ variables: { voucher: values } });
      formEdit.resetFields();
      setVoucherEdit();
    }
  };

  console.log("list vouchers", list_data, list_loading, list_error);
  console.log("add new voucher", add_data, add_loading, add_error);
  console.log("update voucher", update_data, update_loading, update_error);

  const columns = [
    {
      title: "Name",
      dataIndex: "VOUCHER_NAME",
    },
    {
      title: "Code",
      dataIndex: "VOUCHER_CODE",
    },
    {
      title: "Discount price",
      dataIndex: "DISCOUNT_PRICE",
    },
    {
      title: "Valid until",
      dataIndex: "VALID_UNTIL",
      render: (data) => moment(data).format("DD/MM/YYYY"),
    },
    {
      title: "Created at",
      dataIndex: "CREATE_AT",
      render: (data) => moment(data).format("DD/MM/YYYY"),
    },
    {
      title: "Actions",
      render: (_, record) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            type="primary"
            onClick={() => {
              setVoucherEdit(record);
              formEdit.setFields(
                Object.keys(record).map((name) => ({ name, value: record[name] }))
              );
            }}
          ></Button>
          <DeleteButton record={record} />
        </Space>
      ),
    },
  ];

  const renderForm = (form, isAddNew = true) => (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Form.Item label="Name" name="VOUCHER_NAME" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item label="Code" name="VOUCHER_CODE" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item label="Discount price" name="DISCOUNT_PRICE" rules={[{ required: true }]}>
        <InputNumber min={0} addonAfter="VND" style={{ width: "100%" }} />
      </Form.Item>

      {isAddNew && (
        <Form.Item label="Valid until" name="VALID_UNTIL" rules={[{ required: true }]}>
          <DatePicker format="DD/MM/YYYY" style={{ width: "100%" }} />
        </Form.Item>
      )}
    </Form>
  );

  return (
    <div>
      <Topbar title="Vouchers" />

      <Row gutter={15}>
        <Col flex="350px">
          {renderForm(formAddNew)}

          <Button type="primary" block loading={add_loading} onClick={() => formAddNew.submit()}>
            Add new
          </Button>
        </Col>

        <Col flex="auto">
          <Table
            rowKey="ID"
            columns={columns}
            dataSource={list_data?.getVouchers}
            loading={list_loading}
            pagination={{ pageSize: 5 }}
          />
        </Col>
      </Row>

      <Modal
        title="Edit voucher"
        visible={!!voucherEdit}
        onOk={() => formEdit.submit()}
        onCancel={() => {
          setVoucherEdit();
          formEdit.resetFields();
        }}
        confirmLoading={update_loading}
      >
        {renderForm(formEdit, false)}
      </Modal>
    </div>
  );
};

const DeleteButton = ({ record }) => {
  const [updateVoucher, { data: update_data, loading: update_loading, error: update_error }] =
    useMutation(UPDATE_VOUCHER, { refetchQueries: [{ query: GET_VOUCHERS }] });

  console.log("delete voucher", update_data, update_loading, update_error);

  return (
    <Popconfirm
      title="Are you sure?"
      onConfirm={() =>
        updateVoucher({
          variables: { voucher: { ID: record.ID, STATE: false } },
        })
      }
    >
      <Button icon={<DeleteOutlined />} type="primary" danger loading={update_loading}></Button>
    </Popconfirm>
  );
};
