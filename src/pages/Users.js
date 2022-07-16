import { useQuery } from "@apollo/client";
import { Table } from "antd";
import { useState } from "react";
import { GET_USERS } from "../queries";
import { Topbar } from "../components";
import moment from "moment";

export const Users = () => {
  const [searchValue, setSearchValue] = useState();
  const {
    loading: list_loading,
    error: list_error,
    data: list_data,
  } = useQuery(GET_USERS, {
    variables: { searchString: searchValue },
  });

  console.log("list users", list_data, list_loading, list_error);

  const columns = [
    {
      title: "Name",
      render: (_, record) => record?.LAST_NAME + " " + record?.FIRST_NAME,
    },
    {
      title: "Dob",
      dataIndex: "DATE_OF_BIRTH",
      render: (data) => moment(data).format("DD/MM/YYYY"),
    },
    {
      title: "Gender",
      dataIndex: "GENDER",
    },
    {
      title: "Phone",
      dataIndex: "PHONE_NUMBER",
    },
    {
      title: "Address",
      dataIndex: "ADDRESS",
    },
  ];

  return (
    <div>
      <Topbar title="Users" loadingSearch={list_loading} onSearch={setSearchValue} />

      <Table
        columns={columns}
        dataSource={list_data?.getUsers}
        loading={list_loading}
        pagination={{ pageSize: 5 }}
        rowKey="ID"
      />
    </div>
  );
};
