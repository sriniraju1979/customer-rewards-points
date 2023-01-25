import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "./ErrorPage";
import { DefaultLayout } from "./../layouts/Deafult/index";
import { CustomerContainer } from "./../containers/Customers/index";
import { TransactionContainer } from "containers";

export const routes = createBrowserRouter([
  {
    element: <DefaultLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <CustomerContainer />,
      },
      {
        path: "/transactions",
        element: <TransactionContainer />,
      },
      {
        path: "/bar",
        element: <div>foo</div>,
      },
    ],
  },
]);
