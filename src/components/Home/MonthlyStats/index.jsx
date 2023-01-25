import { useContext, useEffect, useState } from "react";
import { HomeContext } from "context";

import styles from "./index.module.scss";
import { getCustomerMonthlyPoints } from "mockAPIs";
import { Table } from "components";

export function MonthlyStats() {
  const { activeCustomer } = useContext(HomeContext);
  const [tableConfig, setTableConfig] = useState({});

  useEffect(() => {
    if (activeCustomer?.id)
      getCustomerMonthlyPoints(activeCustomer?.id).then((data) => {
        const headers = [
          {
            label: "Month",
            accessor: "month",
          },
          {
            label: "Points",
            accessor: "points",
          },
        ];
        const rows = Object.entries(data).map(([month, points]) => ({
          data: { month, points },
        }));
        const title = `${activeCustomer?.name} Monthly Reward Points`;

        setTableConfig({
          headers,
          rows,
          title,
        });
      });
  }, [activeCustomer]);

  return (
    activeCustomer && (
      <div className={styles["month__stats__wrapper"]}>
        <Table config={tableConfig} />
      </div>
    )
  );
}
