import { useContext, useMemo } from "react";
import { HomeContext } from "context";

import styles from "./index.module.scss";
import { Table } from "components";

const defaultConfig = {};
const renamedColumns = {
  customer_trans_id: "Transaction ID",
  customer_name: "customer name",
  createdAt: "created Date",
};

export function TransactionStats() {
  const { transactions } = useContext(HomeContext);

  const tableConfig = useMemo(() => {
    if (!transactions[0]) return defaultConfig;

    const headers = [
      "customer_trans_id",
      "customer_name",
      "createdAt",
      "amount",
      "status",
    ].map((key) => ({
      label: (renamedColumns[key] ? renamedColumns[key] : key)?.toUpperCase(),
      accessor: key,
    }));
    const rows = transactions.map((transaction) => {
      return {
        data: {
          ...transaction,
          createdAt: transaction.createdAt?.toLocaleDateString(),
        },
      };
    });
    const title = `Customer Reward Transactions list`;

    return Object.assign(defaultConfig, { headers, rows, title });
  }, [transactions]);

  return (
    <div className={styles["transactions__list__wrapper"]}>
      <Table config={tableConfig} />
    </div>
  );
}
