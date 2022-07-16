import { useQuery } from "@apollo/client";
import { Space, Table } from "antd";
import React, { useState } from "react";
import { GET_SELLERS } from "../queries";
import { Topbar } from "../components";

export const Sellers = () => {
  const [searchValue, setSearchValue] = useState();
  const {
    loading: list_loading,
    error: list_error,
    data: list_data,
  } = useQuery(GET_SELLERS, {
    variables: { search_string: searchValue },
  });

  console.log("list sellers", list_data, list_loading, list_error);

  const columns = [
    {
      title: "Name",
      dataIndex: "SELLER_NAME",
    },
    {
      title: "Rating",
      dataIndex: "RATING",
    },
    {
      title: "Followers",
      dataIndex: "FOLLOWER",
    },
    {
      title: "Created at",
      dataIndex: "CREATE_AT",
    },
    {
      title: "Actions",
      dataIndex: "",
      render: (_, record) => <Space></Space>,
    },
  ];

  return (
    <div>
      <Topbar title="Sellers" loadingSearch={list_loading} onSearch={setSearchValue} />

      <Table
        columns={columns}
        dataSource={list_data?.getSeller}
        loading={list_loading}
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
};
