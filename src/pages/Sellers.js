import { useQuery } from "@apollo/client";
import { Table } from "antd";
import { useState } from "react";
import { GET_SELLERS } from "../queries";
import { Topbar } from "../components";
import moment from "moment";

export const Sellers = () => {
  const [searchValue, setSearchValue] = useState();
  const {
    loading: list_loading,
    error: list_error,
    data: list_data,
  } = useQuery(GET_SELLERS, {
    variables: { searchString: searchValue },
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
      render: (data) => (!data ? "unknown" : data),
    },
    {
      title: "Followers",
      dataIndex: "FOLLOWER",
      render: (data) => (!data ? 0 : data),
    },
    {
      title: "Created at",
      dataIndex: "CREATE_AT",
      render: (data) => moment(data).format("DD/MM/YYYY"),
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
        rowKey="ID"
      />
    </div>
  );
};
