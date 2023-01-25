import { useContext, useMemo } from "react";
import { Table } from "components";
import { HomeContext } from "context";

import styles from "./index.module.scss";

const defaultConfig = {
  title: "View customer monthly reward points by clicking on below table row",
};

export function CustomerList() {
  const { customers, handleActiveCustomerClick } = useContext(HomeContext);

  const tableConfig = useMemo(() => {
    const headers = [
      {
        label: "Customer Id",
        accessor: "id",
      },
      {
        label: "Customer Name",
        accessor: "name",
      },
      {
        label: "Rewards Points",
        accessor: "points",
      },
    ];

    const rows = customers?.map((row) => ({
      props: {
        onClick: () => handleActiveCustomerClick(row.customer),
        style: {
          cursor: "pointer",
        },
      },
      data: { ...row?.customer, points: row.points },
    }));

    return {
      ...defaultConfig,
      noDataMessage: "No customers",
      rowTitle: "Click to view customer monthly reward points",
      headers,
      rows,
    };
  }, [customers, handleActiveCustomerClick]);

  return (
    <div className={styles["customer__list__wrapper"]}>
      <Table config={tableConfig} />
    </div>
  );
}
