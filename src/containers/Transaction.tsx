import React from "react";
import { Table, Tag, Button } from "antd";

// Components
import TransactionModal from "../components/TransactionModal";

// TYPES
import {
  TransactionItem,
  Pagination,
  CurrencyInfo,
} from "../types/transaction";

// API
import * as fakeApi from "../service";

// Table Column
const columns = [
  {
    title: "Creation Date",
    dataIndex: "creationDate",
    key: "creationDate",
    // eslint-disable-next-line jsx-a11y/anchor-is-valid
    render: (date: string) => <a>{date}</a>,
  },
  {
    title: "payDate",
    dataIndex: "payDate",
    key: "payDate",
  },
  {
    title: "State",
    dataIndex: "state",
    key: "state",
    render: (state: string) => {
      let color = "red";

      if (state === "PS_RUNNING") color = "geekblue";
      if (state === "PS_FINISHED") color = "green";

      return (
        <Tag color={color} key={state}>
          {state.toUpperCase()}
        </Tag>
      );
    },
  },
  {
    title: "Fiat",
    dataIndex: "fiat",
    key: "fiat",
    render: (fiat: CurrencyInfo) => {
      return (
        <React.Fragment>
          <p>{fiat.amount}</p>
          <p>{fiat.currency}</p>
        </React.Fragment>
      );
    },
  },
  {
    title: "Crypto",
    dataIndex: "crypto",
    key: "crypto",
    render: (crypto: CurrencyInfo) => {
      return (
        <React.Fragment>
          <p>{crypto.amount}</p>
          <p>{crypto.currency}</p>
        </React.Fragment>
      );
    },
  },
];

interface IProps {
  perPage?: number;
  pageNumber?: number;
}

interface IState {
  pageSize: number;
  current: number;
  total: number;
  rows?: TransactionItem[];
  visible: boolean;
  loading: boolean;
}

class Transaction extends React.Component<IProps, IState> {
  constructor(props: Readonly<IProps>) {
    super(props);

    this.state = {
      pageSize: 5,
      current: 1,
      total: 0,
      visible: false,
      rows: [],
      loading: true,
    };
  }

  componentDidMount() {
    const { current } = this.state;

    // Get transactions from data.json
    this.getData(current);
  }

  handlePagination = async (page: number) => {
    this.setState({ loading: true });
    // Get transactions from data.json
    this.getData(page);
  };

  getData = (page: number) => {
    const { pageSize } = this.state;
    fakeApi.getTransactions(pageSize, page).then((res: Pagination) => {
      this.setState({
        rows: res.rows!,
        pageSize: res.pageSize!,
        total: res.total!,
        current: res.current!,
        loading: false,
      });
    });
  };

  showModal = () => {
    this.setState((state) => ({ visible: !state.visible }));
  };

  handleSubmit = (item: TransactionItem) => {
    this.showModal();
    item.creationDate = new Date().toISOString();
    fakeApi.addTransaction(item).then((res) => {
      if (res) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        let rows = this.state.rows;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars

        // To show new item in the table at first, added new item at first position in Array.
        rows = [item, ...rows!];

        // To avoid warning such like dataSource length should be less than total, I added this code.
        // If we use real api not fake one. then, we don't need to do like this.
        rows = rows.slice(0, rows.length - 1);
        this.setState((state) => ({
          rows: rows,
          total: state.total + 1,
          pageSize: state.pageSize,
          loading: false,
        }));
      }
    });
  };

  render() {
    const { rows, pageSize, current, total, visible, loading } = this.state;

    return (
      <div className="container">
        <Button type="primary" onClick={this.showModal} className="btn-add">
          Add New
        </Button>
        <Table
          loading={loading}
          columns={columns}
          dataSource={rows}
          pagination={
            rows
              ? {
                  current,
                  pageSize,
                  total,
                  onChange: this.handlePagination,
                }
              : false
          }
        />
        {visible && (
          <TransactionModal
            showModal={this.showModal}
            handleSubmit={this.handleSubmit}
            visible={visible}
          />
        )}
      </div>
    );
  }
}

export default Transaction;
