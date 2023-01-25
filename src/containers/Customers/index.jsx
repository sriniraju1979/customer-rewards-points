import { HomeContext } from "context";
import { MonthlyStats, CustomerList } from "components";
import { useContext } from "react";

import styles from "./index.module.scss";
import { Header } from "./../../components/Header/index";

export function CustomerContainer() {
  const { searchId, search, handleCustomerSearch } = useContext(HomeContext);
  return (
    <div className={styles["home-container"]}>
      <Header title="Customer Rewards" />
      <div className={styles["customers__container"]}>
        <div className={styles["search__container"]}>
          <label htmlFor={searchId}>Search Customer</label>
          <input
            type="text"
            name="customername"
            placeholder="Search customer by name"
            id={searchId}
            value={search}
            onChange={handleCustomerSearch}
          />
        </div>
        <div className={styles["customer-list__container"]}>
          <CustomerList />
          <MonthlyStats />
        </div>
      </div>
    </div>
  );
}
