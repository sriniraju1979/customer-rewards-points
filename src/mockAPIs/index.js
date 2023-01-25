import {
  amountToPoints,
  createMockTransaction,
  createMockCustomer,
  convNumToMonth,
} from "utils";

/**
 * Mocking API calls with dummy data
 */

const customers = createMockCustomer(5);
const transactions = createMockTransaction(customers, 30);
const pointsCache = {};

export function getCustomers(delay = 300) {
  return new Promise((resolve, reject) => {
    if (typeof delay !== "number")
      reject(new Error("Invalid delay value provided"));
    setTimeout(() => {
      resolve(customers);
    }, delay);
  });
}

export function getTransactions(delay = 300) {
  return new Promise((resolve, reject) => {
    if (typeof delay !== "number")
      reject(new Error("Invalid delay value provided"));
    setTimeout(() => {
      resolve(transactions);
    }, delay);
  });
}

export function getCustomerMonthlyPoints(customerId, delay = 300) {
  return new Promise((resolve, reject) => {
    if (typeof delay !== "number")
      reject(new Error("Invalid delay value provided"));

    if (!pointsCache[customerId]) pointsCache[customerId] = {};

    let result = pointsCache[customerId].monthly;

    if (!result) {
      const customer = customers.find((customer) => customer?.id === customerId);
      result =
        pointsCache[customer.id].monthly ??
        transactions
          .filter((transaction) => transaction?.customer_name === customer?.name)
          .reduce((prev, curr) => {
            const month = convNumToMonth(new Date(curr.createdAt).getMonth());
            const points = amountToPoints(curr.amount);

            prev[month] = prev[month] ? prev[month] + points : points;
            return prev;
          }, {});
    }

    pointsCache[customerId].monthly = result;

    setTimeout(() => {
      resolve(result);
    }, delay);
  });
}

export function getPoints(search = "") {
  const filteredCustomers = customers.filter((customer) =>
    customer?.name?.toLowerCase().includes(search?.toLowerCase())
  );

  return Promise.all(filteredCustomers.map((customer) => getCustomerPoints(customer?.id)));
}

export function getCustomerPoints(customerId, delay = 300) {
  return new Promise((resolve, reject) => {
    if (typeof delay !== "number")
      reject(new Error("Invalid delay value provided"));

    if (!pointsCache[customerId]) pointsCache[customerId] = {};

    let result = pointsCache[customerId].stats;

    if (!result) {
      const customer = customers.find((customer) => customer?.id === customerId);
      const customerTransactions = transactions.filter(
        (transaction) => transaction?.customer_name === customer?.name
      );
      const points = customerTransactions.reduce(
        (prev, curr) => prev + amountToPoints(curr?.amount),
        0
      );

      result = {
        customer,
        points,
      };
    }

    pointsCache[customerId] = result;

    setTimeout(() => {
      resolve(result);
    }, delay);
  });
}
