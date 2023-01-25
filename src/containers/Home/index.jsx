import {
  useCallback,
  useDeferredValue,
  useEffect,
  useId,
  useState,
} from "react";

import { HomeContext } from "context";
import { getPoints, getTransactions, getCustomers } from "mockAPIs";
export function Home({ children }) {
  // States
  const [customers, setCustomers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [pointsTable, setPointsTable] = useState([]);
  const [activeCustomer, setActiveCustomer] = useState(null);
  const [search, setSearch] = useState("");
  const [error, setError] = useState(null);

  // Constants
  const searchId = useId();
  const deferredSearch = useDeferredValue(search);

  useEffect(() => {
    Promise.all([getCustomers(), getTransactions(), getPoints()])
      .then(([_customers, _transactions, _customerPoints]) => {
        // Considering them to be formatted
        setCustomers(_customers);
        setTransactions(_transactions);
        setPointsTable(_customerPoints);
      })
      .catch((customerErr, transactionErr, pointErr) => {
        const err = customerErr || transactionErr || pointErr;
        setError(typeof err === "string" ? err : err?.message);
      });
  }, []);

  useEffect(() => {
    getPoints(deferredSearch)
      .then((_customers) => setCustomers(_customers))
      .catch((err) => setError(typeof err === "string" ? err : err?.message));
  }, [deferredSearch]);

  const handleActiveCustomerClick = useCallback(
    (customer) => {
      setActiveCustomer(customer);
    },
    [setActiveCustomer]
  );

  const handleCustomerSearch = (event) => {
    const { value } = event.target;

    setSearch(value);
  };

  return (
    <HomeContext.Provider
      value={{
        customers,
        transactions,
        pointsTable: pointsTable,
        activeCustomer,
        handleActiveCustomerClick,
        handleCustomerSearch,
        error,
        searchId,
      }}
    >
      {children}
    </HomeContext.Provider>
  );
}
