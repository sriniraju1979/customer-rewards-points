import { createContext } from "react";

export const HomeContext = createContext({
  customers: [],
  transactions: [],
  pointsTable: [],
  activeCustomer: null,
});
