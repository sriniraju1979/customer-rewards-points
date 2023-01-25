import styles from "./index.module.scss";
import { NavLink } from "react-router-dom";
export function SideMenu({ children, Header, menuProps = {} }) {
  return (
    <div className={styles["sidemenu_wrapper"]} {...menuProps}>
      <div className={styles["header"]}>Rewards Program</div>
      <ul className={styles["sidemenu-links"]}>
        <li>
          <NavLink
            to={`/`}
            className={({ isActive, isPending }) =>
              isActive ? styles["active"] : ""
            }
          >
            Customers
          </NavLink>
        </li>
        <li>
          <NavLink
            to={`transactions`}
            className={({ isActive, isPending }) =>
              isActive ? styles["active"] : ""
            }
          >
            Transactions
          </NavLink>
        </li>
      </ul>
      {children}
    </div>
  );
}
