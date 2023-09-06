import ExpenseStatistics from "~/components/expenses/ExpenseStatistics";
import Chart from "~/components/expenses/Chart";
import styles from "~/styles/expenses/expensesChart.css";
import { json } from "@remix-run/node";
import db from "~/utils/db.server";
import {
  useLoaderData,
  useRouteError,
  isRouteErrorResponse,
} from "@remix-run/react";
import Error from "~/components/utils/Error";
import type { LoaderFunction } from "@remix-run/node";
import type { Expense } from "@prisma/client";

type LoaderData = { expensesListItems: Array<Expense> };
export const loader: LoaderFunction = async () => {
  const expensesListItems = await db.expense.findMany({
    orderBy: { createdAt: "desc" },
  });
  if (!expensesListItems || expensesListItems.length === 0) {
    throw json(
      { message: "Could not load expenses for the requested analysis." },
      {
        status: 404,
        statusText: "Expenses not found",
      }
    );
  }
  return json({
    expensesListItems,
  });
};

export default function ExpensesAnalysisPage() {
  const data = useLoaderData<LoaderData>();
  // const hasExpenses = data && data.expensesListItems.length > 0;

  return (
    <main>
      {/* {hasExpenses && ( */}
      <>
        <Chart expenses={data.expensesListItems} />
        <ExpenseStatistics expenses={data.expensesListItems} />
      </>
      {/* )} */}
    </main>
  );
}

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error) && error.status === 404) {
    return (
      <main>
        <Error title={error.statusText}>
          <p>
            {error.data?.message ||
              "Something went wrong - could not load expenses."}
          </p>
        </Error>
      </main>
    );
  }

  return <div className="error">I did a whoopsies.</div>;
}
