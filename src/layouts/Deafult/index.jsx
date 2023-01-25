import { Footer } from "components";
import { SideMenu } from "components/SideMenu";
import styles from "./index.module.scss";
import { Outlet } from "react-router-dom";

export function DefaultLayout({ children }) {
  return (
    <div className={styles["default__wrapper"]}>
      <SideMenu />
      <main className={styles["main__wrapper"]}>
        <Outlet />
        <Footer />
      </main>
    </div>
  );
}
