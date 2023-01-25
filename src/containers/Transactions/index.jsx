import styles from "./index.module.scss";
import { TransactionStats } from "./../../components/Home/TransactionStats/index";
import { AddTransaction } from "./../../components/Home/AddTransaction/index";
import { Header } from "./../../components/Header/index";

export function TransactionContainer() {
  return (
    <div className={styles["transactions__wrapper"]}>
      <Header title="Customer Transactions" />
      <div className={styles["transactions__container"]}>
        <div className={styles["transactions__list__container"]}>
          <TransactionStats />
        </div>
        <div className={styles["add__transaction"]}>
          <AddTransaction />
        </div>
      </div>
    </div>
  );
}
